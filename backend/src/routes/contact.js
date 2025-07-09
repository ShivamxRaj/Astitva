const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Contact message saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact message.' });
  }
});

module.exports = router; 