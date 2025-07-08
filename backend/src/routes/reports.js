const express = require('express');
const router = express.Router();

// GET /api/reports - Get all reports
router.get('/', (req, res) => {
  res.json({ message: 'Reports route working' });
});

// POST /api/reports - Create a new report
router.post('/', (req, res) => {
  res.json({ message: 'Report creation route working' });
});

module.exports = router; 