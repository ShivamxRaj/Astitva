const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema],
  conversationCount: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
chatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate session ID if not provided
chatSchema.pre('save', function(next) {
  if (!this.sessionId) {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Chat', chatSchema); 