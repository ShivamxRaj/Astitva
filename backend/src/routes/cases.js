const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Case = require('../models/Case');

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://xyz.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'public-anon-key'
);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyAw7bUUfo4EWW-gDOFJ3DYr6TqDiwGqbXQ");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    if (req.file) {
      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `cases/${case_id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('case-photos')
        .upload(filePath, file.buffer, { contentType: file.mimetype });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('case-photos').getPublicUrl(filePath);
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

    const { error: dbError } = await supabase.from('orphan_cases').insert([caseData]);
    if (dbError) throw dbError;

    const newCase = new Case(caseData);
    await newCase.save();

    res.status(201).json({ success: true, case_id, message: "Report submitted successfully" });
  } catch (error) {
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

// --- SEARCH CASES ROUTE (Gemini AI Powered) ---
router.post('/search', async (req, res) => {
  try {
    const { name, gender, age, location, date, marks, description } = req.body;

    const { data: allCases, error: fetchError } = await supabase
      .from('orphan_cases')
      .select('*');

    if (fetchError) throw fetchError;

    const prompt = `You are an AI matching system for Avyakta, a missing persons platform in India.
Given a family's search details and a list of reported unidentified cases from the database,
find the best matches. 

Family is searching for:
Name: ${name}
Gender: ${gender}
Age: ${age}
Last seen location: ${location}
Date: ${date}
Identifying marks: ${marks}
Description: ${description}

Database cases (JSON):
${JSON.stringify(allCases)}

Return ONLY a valid JSON array of matched cases with two extra fields added to each matching case object:
1. "matchScore" (0-100)
2. "matchReason" (A short sentence explaining why it matches)

Rules:
- Sort by matchScore descending.
- Only include cases with matchScore above 40.
- Return ONLY the JSON array. No markdown, no "here is the json", no other text.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean JSON response (remove markdown if any)
    const jsonStr = responseText.replace(/```json|```/g, "").trim();
    const matches = JSON.parse(jsonStr);

    res.json({ success: true, matches });

  } catch (error) {
    console.error('Gemini Search error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
