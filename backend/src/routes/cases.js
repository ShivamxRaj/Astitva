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

    const now = new Date();
    const case_id = `#AVY-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${Math.floor(1000 + Math.random() * 9000)}`;
    let photo_url = null;

    if (req.file) {
      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const safeCaseId = case_id.replace('#', '');
      const filePath = `cases/${safeCaseId}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('case-photos')
        .upload(filePath, file.buffer, { contentType: file.mimetype });

      if (uploadError) {
        console.error('SUPABASE UPLOAD ERROR:', JSON.stringify(uploadError, null, 2));
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage.from('case-photos').getPublicUrl(filePath);
      photo_url = publicUrl;
    }

    const caseData = {
      case_id,
      location,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      date_of_sighting,
      description,
      gender,
      approximate_age: approximate_age ? parseInt(approximate_age) : null,
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

// --- TRACK CASE ROUTE ---
router.post('/track', async (req, res) => {
  try {
    const { case_id } = req.body;
    const { data, error } = await supabase
      .from('orphan_cases')
      .select('*')
      .eq('case_id', case_id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ success: false, message: "No report found with this ID." });
      throw error;
    }
    res.json({ success: true, case: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- UPDATE CASE STATUS ROUTE ---
router.patch('/update-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from('orphan_cases')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: "Case not found." });
    
    res.json({ success: true, case: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- SEARCH CASES ROUTE (Gemini AI Powered) ---
router.post('/search', upload.single('photo'), async (req, res) => {
  try {
    const { name, gender, age, location, date, marks, description } = req.body;

    const { data: allCases, error: fetchError } = await supabase
      .from('orphan_cases')
      .select('*');

    if (fetchError) throw fetchError;

    let prompt = `You are an AI matching system for Avyakta, a missing persons platform in India.
Given a family's search details and a list of reported unidentified cases from the database,
find the best matches. 

Family is searching for:
Name: ${name || 'N/A'}
Gender: ${gender || 'N/A'}
Age: ${age || 'N/A'}
Last seen location: ${location || 'N/A'}
Date: ${date || 'N/A'}
Identifying marks: ${marks || 'N/A'}
Description: ${description || 'N/A'}

Database cases (JSON):
${JSON.stringify(allCases || [])}

Return ONLY a valid JSON array of matched cases with two extra fields added to each matching case object:
1. "matchScore" (0-100)
2. "matchReason" (A short sentence explaining why it matches)`;

    let contents = [prompt];

    if (req.file) {
      const imagePart = {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype
        }
      };
      prompt += `\n\nCRITICAL MULTIMODAL INSTRUCTION: The family has also uploaded a photo of the missing person (provided as an inline image attachment). Compare the facial features, age build, hair, and clothing in the uploaded photo against the database case records (which have descriptive marks, clothing details, and photo_url links). Boost the matchScore significantly if visual characteristics in the uploaded image correspond to the physical characteristics recorded in the database cases!`;
      // recreate contents array with both prompt string and inline image part
      contents = [prompt, imagePart];
    }

    prompt += `\n\nRules:
- Sort by matchScore descending.
- Only include cases with matchScore above 40.
- Return ONLY the JSON array. No markdown, no "here is the json", no other text.`;

    // Reconstruct contents if prompt string got updated rules
    if (req.file) {
      contents[0] = prompt;
    } else {
      contents = [prompt];
    }

    const result = await model.generateContent(contents);
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
