const express = require('express');
const { body, validationResult } = require('express-validator');
const Rating = require('../models/Rating');
const router = express.Router();

// Get approved ratings for display
router.get('/approved', async (req, res) => {
  try {
    const ratings = await Rating.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name rating comment location createdAt');
    
    res.json({
      success: true,
      data: ratings
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ratings'
    });
  }
});

// Get rating statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Rating.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          totalRatings: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingCounts: {
            $push: '$rating'
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({
        success: true,
        data: {
          totalRatings: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
      });
    }

    const ratingCounts = stats[0].ratingCounts.reduce((acc, rating) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalRatings: stats[0].totalRatings,
        averageRating: Math.round(stats[0].averageRating * 10) / 10,
        ratingDistribution: {
          1: ratingCounts[1] || 0,
          2: ratingCounts[2] || 0,
          3: ratingCounts[3] || 0,
          4: ratingCounts[4] || 0,
          5: ratingCounts[5] || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rating statistics'
    });
  }
});

// Submit new rating
router.post('/submit', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment must not exceed 500 characters'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Rate limiting check (basic implementation)
    const clientIP = req.ip || req.connection.remoteAddress;
    const recentSubmission = await Rating.findOne({
      ipAddress: clientIP,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'You can only submit one rating per day'
      });
    }

    // Create new rating
    const rating = new Rating({
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment || '',
      location: req.body.location || '',
      ipAddress: clientIP,
      userAgent: req.get('User-Agent')
    });

    await rating.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your rating has been submitted for review.',
      data: {
        id: rating._id,
        name: rating.name,
        rating: rating.rating,
        comment: rating.comment,
        location: rating.location
      }
    });

  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit rating. Please try again.'
    });
  }
});

// Admin route to approve ratings (protected)
router.patch('/admin/approve/:id', async (req, res) => {
  try {
    const rating = await Rating.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }

    res.json({
      success: true,
      message: 'Rating approved successfully',
      data: rating
    });
  } catch (error) {
    console.error('Error approving rating:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve rating'
    });
  }
});

// Admin route to get pending ratings
router.get('/admin/pending', async (req, res) => {
  try {
    const ratings = await Rating.find({ isApproved: false })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: ratings
    });
  } catch (error) {
    console.error('Error fetching pending ratings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending ratings'
    });
  }
});

module.exports = router; 