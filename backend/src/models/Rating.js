const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 500
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
ratingSchema.index({ isApproved: 1, createdAt: -1 });
ratingSchema.index({ rating: 1 });

module.exports = mongoose.model('Rating', ratingSchema); 