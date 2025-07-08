const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get current conversation
router.get('/conversation', async (req, res) => {
  try {
    // For simplicity, we'll use a single session for now
    // In production, you'd want to use user sessions or cookies
    let chat = await Chat.findOne({ sessionId: 'default_session' });
    
    if (!chat) {
      // Create new chat session if none exists
      chat = new Chat({
        sessionId: 'default_session',
        messages: [],
        conversationCount: 0
      });
      await chat.save();
    }

    res.json({
      success: true,
      messages: chat.messages,
      conversationCount: chat.conversationCount
    });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch conversation',
      error: error.message
    });
  }
});

// Save conversation
router.post('/conversation', async (req, res) => {
  try {
    const { messages, conversationCount } = req.body;
    
    let chat = await Chat.findOne({ sessionId: 'default_session' });
    
    if (!chat) {
      chat = new Chat({
        sessionId: 'default_session',
        messages: messages,
        conversationCount: conversationCount
      });
    } else {
      chat.messages = messages;
      chat.conversationCount = conversationCount;
      chat.lastActivity = Date.now();
    }
    
    await chat.save();
    
    res.json({
      success: true,
      message: 'Conversation saved successfully'
    });
  } catch (error) {
    console.error('Error saving conversation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save conversation',
      error: error.message
    });
  }
});

// Clear conversation
router.delete('/conversation', async (req, res) => {
  try {
    let chat = await Chat.findOne({ sessionId: 'default_session' });
    
    if (chat) {
      chat.messages = [];
      chat.conversationCount = 0;
      chat.lastActivity = Date.now();
      await chat.save();
    }
    
    res.json({
      success: true,
      message: 'Conversation cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing conversation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear conversation',
      error: error.message
    });
  }
});

// Get conversation history (for admin purposes)
router.get('/history', async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ lastActivity: -1 })
      .limit(50)
      .select('sessionId conversationCount lastActivity createdAt');
    
    res.json({
      success: true,
      chats: chats
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history',
      error: error.message
    });
  }
});

// Clean up old conversations (older than 7 days)
router.delete('/cleanup', async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const result = await Chat.deleteMany({
      lastActivity: { $lt: sevenDaysAgo }
    });
    
    res.json({
      success: true,
      message: `Cleaned up ${result.deletedCount} old conversations`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error cleaning up conversations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clean up conversations',
      error: error.message
    });
  }
});

module.exports = router; 