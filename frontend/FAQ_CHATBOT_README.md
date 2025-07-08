# Avyakta FAQ Chatbot System

## Overview

The Avyakta FAQ Chatbot is a comprehensive, human-like chat interface that provides instant answers to common questions about the Avyakta platform. It's designed to help users quickly find information about reporting missing persons, account management, privacy, and more.

## Features

### 🤖 Intelligent Question Matching
- **Keyword-based matching**: The chatbot uses intelligent keyword matching to find the most relevant answers
- **Human-like responses**: All responses are written in a conversational, empathetic tone
- **Fallback responses**: When no exact match is found, the chatbot provides helpful fallback responses

### 💬 Interactive Chat Interface
- **Floating chat button**: Always accessible from any page
- **Real-time typing indicators**: Shows when the bot is "thinking"
- **Quick reply buttons**: Pre-defined common questions for easy access
- **Message timestamps**: Shows when each message was sent
- **Responsive design**: Works perfectly on desktop and mobile devices

### 📚 Comprehensive FAQ Database
The chatbot covers 8 main categories:

1. **General Questions** - What is Avyakta, how it works, mission
2. **Account & Registration** - How to register, user roles, password management
3. **Reporting Cases** - How to report missing persons, required information
4. **Case Management** - Tracking cases, timelines, status updates
5. **Privacy & Security** - Data protection, information access, account deletion
6. **Support & Contact** - How to get help, working hours, emergency contacts
7. **Technical Issues** - Website/app problems, photo uploads
8. **How You Can Help** - Donations, volunteering, partnerships

## Components

### 1. FAQChatbot.js
The main chatbot component that handles:
- Message display and management
- Question matching and response generation
- Typing indicators and animations
- Quick reply functionality

### 2. ChatButton.js
A floating action button that:
- Triggers the chatbot interface
- Shows pulse animation when closed
- Displays helpful tooltip on hover
- Integrates seamlessly with the main app

### 3. FAQPage.js
A comprehensive FAQ page that:
- Displays all questions organized by category
- Provides search functionality
- Allows filtering by category
- Shows expandable question/answer sections

## Usage

### For Users
1. **Chat Interface**: Click the floating chat button (bottom-right corner) to open the chatbot
2. **Quick Questions**: Use the pre-defined quick reply buttons for common questions
3. **Custom Questions**: Type any question in natural language
4. **FAQ Page**: Visit `/faq` for a comprehensive list of all questions and answers

### For Developers

#### Adding New Questions
To add new questions to the chatbot, edit the `faqDatabase` object in `FAQChatbot.js`:

```javascript
'your question key': {
  answer: "Your human-like answer here...",
  category: 'category_name',
  keywords: ['keyword1', 'keyword2', 'keyword3']
}
```

#### Categories Available
- `general` - General platform questions
- `account` - Registration and account management
- `reporting` - Case reporting functionality
- `cases` - Case management and tracking
- `security` - Privacy and security concerns
- `support` - Support and contact information
- `technical` - Technical issues and troubleshooting
- `help` - How users can help and contribute

#### Customizing Quick Replies
Edit the `quickReplies` array in `FAQChatbot.js` to change the suggested questions:

```javascript
const quickReplies = [
  "Your question 1",
  "Your question 2",
  // ... more questions
];
```

## Technical Details

### Question Matching Algorithm
The chatbot uses a scoring system to find the best match:
1. **Keyword matching**: Counts how many keywords from the question match user input
2. **Exact phrase matching**: Bonus points for exact phrase matches
3. **Fallback responses**: Random helpful responses when no match is found

### Response Generation
- **Human-like delays**: Random typing delays (1-3 seconds) for realistic interaction
- **Contextual responses**: Answers are tailored to the specific question
- **Empathetic tone**: All responses maintain a caring, supportive tone

### Styling
- **Modern UI**: Clean, professional design with gradients and animations
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Consistent**: Matches the overall Avyakta design system

## Integration

The chatbot is integrated into the main app through:
1. **App.js**: ChatButton component is included in the main layout
2. **Navbar.js**: FAQ page link added to navigation
3. **Routing**: `/faq` route added for the FAQ page

## Future Enhancements

Potential improvements for the chatbot system:
- **Machine Learning**: Implement more sophisticated NLP for better question understanding
- **Multi-language Support**: Add support for Hindi and other languages
- **Voice Integration**: Add voice input/output capabilities
- **Analytics**: Track popular questions and user interactions
- **Live Chat**: Integrate with human support agents for complex queries
- **Personalization**: Remember user preferences and previous interactions

## Support

For technical support or questions about the chatbot system:
- Check the FAQ page at `/faq`
- Use the chatbot itself for quick answers
- Contact the development team for complex issues

---

**Note**: This chatbot is designed to provide immediate, helpful responses while maintaining the human touch that families need during difficult times. Every response is crafted with empathy and understanding of the sensitive nature of missing person cases. 