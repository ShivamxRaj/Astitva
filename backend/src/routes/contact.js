const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const Contact = require('../models/Contact');

// Initialize Supabase admin client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xnzxenupdsjzcxpbpxqs.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/contact/all - Fetch all contact messages from Supabase bypassing RLS
router.get('/all', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contact messages from Supabase.' });
  }
});

// DELETE /api/contact/:id - Delete a contact message from Supabase
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact message.' });
  }
});

// POST /api/contact - Local DB fallback/original route
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