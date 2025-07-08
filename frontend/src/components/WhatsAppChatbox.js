import React, { useState, useRef, useEffect } from 'react';

const BOT_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
const USER_AVATAR = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=64';

const initialBotMessages = [
  {
    from: 'bot',
    text: 'Hello Sir/Madam, thank you for joining Avyakta. What issue are you facing? Please tell me, I will definitely help you out to the best of my ability.',
    options: [
      'Report an Issue',
      'Track My Request',
      'Contact Support',
      'Know About Avyakta',
      'Other',
    ],
    timestamp: new Date(),
  },
];

const botResponses = {
  'Report an Issue': {
    text: 'What type of issue would you like to report?',
    options: ['Unclaimed Body', 'Website Problem', 'Other'],
  },
  'Track My Request': {
    text: 'Please enter your request ID or describe your request.',
    options: [],
  },
  'Contact Support': {
    text: 'You can reach us at support@avyakta.org or describe your issue here.',
    options: [],
  },
  'Know About Avyakta': {
    text: 'Avyakta is a humanitarian platform to help report and support unclaimed/orphaned dead bodies with dignity. Would you like to know more?',
    options: ['Our Mission', 'How It Works', 'Back'],
  },
  'Other': {
    text: 'Please describe your query, and we will do our best to help!',
    options: [],
  },
  'Unclaimed Body': {
    text: 'Thank you for your courage. Please provide details about the case (location, time, any info).',
    options: [],
  },
  'Website Problem': {
    text: 'Please describe the problem you faced on the website.',
    options: [],
  },
  'Our Mission': {
    text: 'Our mission is to ensure dignity and support for every unclaimed soul. We connect people, authorities, and volunteers to help with reporting and closure.',
    options: ['Back'],
  },
  'How It Works': {
    text: 'You can report a case, track requests, and get support. Our team and volunteers coordinate with authorities to ensure respectful handling.',
    options: ['Back'],
  },
  'Back': {
    text: 'How can I help you today?',
    options: [
      'Report an Issue',
      'Track My Request',
      'Contact Support',
      'Know About Avyakta',
      'Other',
    ],
  },
};

function WhatsAppChatbox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialBotMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleOption = (option) => {
    addMessage('user', option);
    setTimeout(() => {
      const response = botResponses[option];
      if (response) {
        addMessage('bot', response.text, response.options);
      } else {
        addMessage('bot', "I'm not sure how to help with that. Please describe your issue.");
      }
    }, 600);
  };

  const addMessage = (from, text, options = []) => {
    setMessages((msgs) => [
      ...msgs,
      {
        from,
        text,
        options,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage('user', input);
    setInput('');
    setTimeout(() => {
      // Simple bot echo or fallback
      addMessage('bot', "Thank you for your message. Our team will get back to you soon.");
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition-all duration-300"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open WhatsApp chat'}
      >
        <img src={BOT_AVATAR} alt="Chat" className="w-10 h-10" />
      </button>

      {/* Chatbox */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-green-500 animate-fade-in-up">
          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3 flex items-center gap-3">
            <img src={BOT_AVATAR} alt="Bot" className="w-8 h-8 rounded-full" />
            <div>
              <div className="font-bold">Avyakta Support</div>
              <div className="text-xs opacity-80">Online</div>
            </div>
            <button className="ml-auto text-white text-xl opacity-70 hover:opacity-100" onClick={() => setOpen(false)}>&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-2 overflow-y-auto bg-gray-50" style={{ maxHeight: 400 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex mb-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'bot' && (
                  <img src={BOT_AVATAR} alt="Bot" className="w-7 h-7 rounded-full mr-2 self-end" />
                )}
                <div
                  className={`rounded-2xl px-4 py-2 text-sm max-w-[70%] shadow
                    ${msg.from === 'bot' ? 'bg-green-100 text-gray-900' : 'bg-green-500 text-white'}`}
                >
                  {msg.text}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          className="bg-white border border-green-400 text-green-700 rounded-xl px-3 py-1 text-xs font-semibold hover:bg-green-50 transition"
                          onClick={() => handleOption(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.from === 'user' && (
                  <img src={USER_AVATAR} alt="You" className="w-7 h-7 rounded-full ml-2 self-end" />
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 px-3 py-2 bg-white border-t">
            <input
              type="text"
              className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2 font-semibold transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default WhatsAppChatbox; 