const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const Anthropic = require('@anthropic-ai/sdk');
const Case = require('../models/Case');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Anthropic (Claude)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Multer setup for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// --- REPORT SUBMIT ROUTE ---
router.post('/report', upload.single('photo'), async (req, res) => {
  try {
    const {
      location, latitude, longitude, date_of_sighting, description,
      gender, approximate_age, height_cm, clothing,
      identifying_marks, contact_info, additional_info
    } = req.body;

    const case_id = "AVY-" + Date.now();
    let photo_url = null;

    // 1. Upload to Supabase Storage if photo exists
    if (req.file) {
      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `cases/${case_id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('case-photos')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('case-photos')
        .getPublicUrl(filePath);
      
      photo_url = publicUrl;
    }

    const caseData = {
      case_id,
      location,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      date_of_sighting,
      description,
      gender,
      approximate_age: parseInt(approximate_age),
      height_cm,
      clothing,
      identifying_marks,
      contact_info,
      additional_info,
      photo_url,
      status: 'unidentified'
    };

    // 2. Save to Supabase Table
    const { error: dbError } = await supabase
      .from('orphan_cases')
      .insert([caseData]);

    if (dbError) throw dbError;

    // 3. Save to MongoDB
    const newCase = new Case(caseData);
    await newCase.save();

    res.status(201).json({
      success: true,
      case_id,
      message: "Report submitted successfully"
    });

  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- FETCH ALL CASES ROUTE ---
router.get('/all', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orphan_cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- SEARCH CASES ROUTE (AI Powered) ---
router.post('/search', async (req, res) => {
  try {
    const { name, gender, age, location, date, marks, description } = req.body;

    // 1. Fetch all cases from Supabase
    const { data: allCases, error: fetchError } = await supabase
      .from('orphan_cases')
      .select('*');

    if (fetchError) throw fetchError;

    // 2. Use Claude to find matches
    const systemPrompt = `You are an AI matching system for Avyakta, a missing persons platform in India.
Given a family's search details and a list of reported unidentified cases from the database,
find the best matches. Return ONLY valid JSON array of matched cases with a matchScore (0-100)
and matchReason field added to each case object. Sort by matchScore descending.
Only include cases with matchScore above 40.
The output must be a pure JSON array, nothing else.`;

    const userMessage = `Family is searching for:
Name: ${name}
Gender: ${gender}
Age: ${age}
Last seen location: ${location}
Date: ${date}
Identifying marks: ${marks}
Description: ${description}

Database cases (JSON):
${JSON.stringify(allCases)}

Return matched cases array with matchScore and matchReason added.`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const matches = JSON.parse(response.content[0].text);

    res.json({ success: true, matches });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
