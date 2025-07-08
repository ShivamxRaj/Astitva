const express = require('express');
const router = express.Router();

// GET /api/admin/dashboard - Get dashboard data
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard route working' });
});

// GET /api/admin/reports - Get all reports for admin
router.get('/reports', (req, res) => {
  res.json({ message: 'Admin reports route working' });
});

module.exports = router; 