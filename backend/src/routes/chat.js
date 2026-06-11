const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get current conversation
router.get('/conversation', async (req, res) => {
  try {
    const sessionId = req.query.sessionId || 'default_session';
    let chat = await Chat.findOne({ sessionId });
    
    if (!chat) {
      chat = new Chat({
        sessionId,
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
    const { messages, conversationCount, sessionId = 'default_session' } = req.body;
    
    await Chat.findOneAndUpdate(
      { sessionId },
      { 
        $set: { 
          messages, 
          conversationCount, 
          lastActivity: Date.now() 
        } 
      },
      { upsert: true, new: true }
    );
    
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
    const sessionId = req.query.sessionId || 'default_session';
    let chat = await Chat.findOne({ sessionId });
    
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

// Translation endpoint for translating chat messages or general text
router.post('/translate', async (req, res) => {
  try {
    const { text, to = 'en', from } = req.body;
    
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required for translation' });
    }

    const key = process.env.AZURE_TRANSLATOR_KEY;
    const region = process.env.AZURE_TRANSLATOR_REGION || 'southeastasia';
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';

    // If API key is not configured or is placeholder, return original text as fallback
    if (!key || key === 'YOUR_AZURE_TRANSLATOR_KEY') {
      console.warn('Azure Translator key is not configured. Returning original text as fallback.');
      const textArray = Array.isArray(text) ? text : [text];
      const fallbackTranslations = textArray.map(t => ({ text: t, to }));
      return res.json({
        success: true,
        translations: fallbackTranslations,
        detectedLanguage: 'en',
        isFallback: true
      });
    }

    const textArray = Array.isArray(text) ? text.map(t => ({ Text: t })) : [{ Text: text }];

    const axios = require('axios');
    const response = await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'POST',
      params: {
        'api-version': '3.0',
        'to': to,
        ...(from && { from })
      },
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json'
      },
      data: textArray
    });

    const translations = response.data.map(item => ({
      text: item.translations[0].text,
      to: item.translations[0].to
    }));

    const detectedLanguage = response.data[0]?.detectedLanguage?.language || 'en';

    res.json({
      success: true,
      translations,
      detectedLanguage
    });

  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Translation failed',
      error: error.message
    });
  }
});

module.exports = router; 