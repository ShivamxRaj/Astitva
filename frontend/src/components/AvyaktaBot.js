import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';

/* ═══════════════════════════════════════
   Keyword → Response mapping
   ═══════════════════════════════════════ */
const RESPONSES = {
  greeting: {
    text: `Namaste 🙏 I'm the Avyakta Assistant.\nI'm here to help you report, search, or understand our process.\nHow can I help you today?`,
    chips: ['Report a body', 'Search missing person', 'How does it work?', 'Talk to a human'],
  },
  report: {
    keywords: ['report', 'body', 'unclaimed', 'mila', 'mile', 'laash', 'dead'],
    text: `To report an unclaimed body, please click the 'Report Case' button in the navbar.\nYou can report anonymously — no personal details required.\nShall I guide you through the process?`,
    chips: ['Yes, guide me', 'Report anonymously', 'What info is needed?'],
  },
  search: {
    keywords: ['search', 'missing', 'dhundna', 'family', 'pariwar', 'find', 'khoyi', 'lost'],
    text: `To search for a missing person, go to the Search section. You can search by name, location, age, or case ID.\nWould you like me to take you there?`,
    chips: ['Open Search', 'What details needed?', 'Talk to helpline'],
  },
  process: {
    keywords: ['process', 'kaise', 'how', 'steps', 'kya karna', 'work', 'procedure'],
    text: `Here's how Avyakta works:\n1️⃣ Someone reports an unclaimed body\n2️⃣ Our team verifies and documents the case\n3️⃣ We notify police, NGOs, and hospitals\n4️⃣ If a match is found, family is contacted\n5️⃣ Case is resolved with dignity\n\nThe whole process is free and confidential.`,
    chips: ['Report now', 'Search now', 'More questions'],
  },
  anonymous: {
    keywords: ['anonymous', 'private', 'naam nahi', 'identity', 'safe', 'secure', 'privacy', 'gupt'],
    text: `Yes, you can report completely anonymously 🔒\nWe collect ZERO personal data in anonymous mode.\nAuthorities only receive the case details — never your identity.\nYour safety is our priority.`,
    chips: ['Report anonymously', 'How is data stored?'],
  },
  helpline: {
    keywords: ['helpline', 'phone', 'call', 'number', 'contact', 'dial', 'ring'],
    text: `Our 24/7 helpline: 1800-XXX-XXXX (Free)\nWhatsApp: Available via the WhatsApp button\nEmail: support@avyakta.org\n\nFor life-threatening emergencies, please call 112 immediately.`,
    chips: ['Open WhatsApp', 'Support Us'],
  },
  human: {
    keywords: ['human', 'officer', 'real person', 'agent', 'support', 'baat', 'talk'],
    text: `I'll connect you with our support team.\nThe fastest way is WhatsApp — usually responded to within 2 hours during 9AM-8PM.\nFor urgent help, call 1800-XXX-XXXX`,
    chips: ['Open WhatsApp', 'Call helpline'],
  },
  thanks: {
    keywords: ['thanks', 'thank', 'shukriya', 'dhanyawad', 'thnx', 'thx'],
    text: `You're welcome 🙏\nEvery report matters. Every search matters.\nAvyakta is here whenever you need us.`,
    chips: ['Go to Home', 'Report a case'],
  },
  guide: {
    keywords: ['guide', 'yes, guide', 'info is needed', 'details needed', 'what info'],
    text: `To report a case you'll need:\n📍 Location where the body was found\n📅 Approximate date & time\n🧍 Physical description (clothing, age, gender)\n📸 A photo (optional but helpful)\n\nYou do NOT need to share your personal details.`,
    chips: ['Report now', 'Report anonymously', 'More questions'],
  },
  data: {
    keywords: ['data stored', 'data', 'storage', 'encrypt', 'database'],
    text: `All data is stored securely with encryption.\n🔐 Reports are stored in our secure database\n🚫 Anonymous reports have zero personal identifiers\n👮 Only verified authorities can access case details\n\nWe follow strict data protection guidelines.`,
    chips: ['Report now', 'More questions'],
  },
  default: {
    text: `I didn't quite understand that.\nHere are some things I can help with:`,
    chips: ['Report a body', 'Search missing person', 'Call helpline', 'How it works'],
  },
};

const WHATSAPP_URL = 'https://wa.me/916299446452?text=Hello%20Avyakta%2C%20I%20need%20assistance.';

/* ── Match user input to an intent ── */
function matchIntent(input) {
  const lower = input.toLowerCase().trim();
  const intents = ['report', 'search', 'process', 'anonymous', 'helpline', 'human', 'thanks', 'guide', 'data'];
  for (const key of intents) {
    const r = RESPONSES[key];
    if (r.keywords && r.keywords.some((kw) => lower.includes(kw))) {
      return r;
    }
  }
  return RESPONSES.default;
}

/* ── Timestamp formatter ── */
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ═══════════════════════════════════════
   AvyaktaBot Component
   ═══════════════════════════════════════ */
const AvyaktaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasOpened, setHasOpened] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /* Scroll to bottom on new message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* Open chat → send greeting */
  const openChat = () => {
    setIsOpen(true);
    setHasOpened(true);
    if (messages.length === 0) {
      setMessages([
        { from: 'bot', text: RESPONSES.greeting.text, chips: RESPONSES.greeting.chips, time: new Date() },
      ]);
    }
  };

  /* Send user message + get bot reply */
  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text: text.trim(), time: new Date() };
    const response = matchIntent(text);
    const botMsg = { from: 'bot', text: response.text, chips: response.chips, time: new Date() };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  /* Handle chip click actions */
  const handleChip = (chip) => {
    const lower = chip.toLowerCase();
    if (lower === 'open whatsapp') {
      window.open(WHATSAPP_URL, '_blank');
      return;
    }
    if (lower === 'report anonymously' || lower === 'report now' || lower === 'report a case') {
      navigate('/report');
      setIsOpen(false);
      return;
    }
    if (lower === 'open search' || lower === 'search now') {
      navigate('/search');
      setIsOpen(false);
      return;
    }
    if (lower === 'go to home') {
      navigate('/');
      setIsOpen(false);
      return;
    }
    if (lower === 'support us') {
      // Dispatch custom event that Navbar listens for
      window.dispatchEvent(new CustomEvent('open-donation-modal'));
      return;
    }
    if (lower === 'call helpline' || lower === 'talk to helpline') {
      window.location.href = 'tel:1800-XXX-XXXX';
      return;
    }
    // For any other chip, treat it as a user message
    sendMessage(chip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Trigger Button ── */}
      <div className="fixed bottom-6 right-6 z-40" style={{ filter: 'drop-shadow(0 4px 20px rgba(27,58,107,0.4))' }}>
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium pointer-events-none"
            style={{ background: '#1B3A6B', color: '#F0F6FF' }}
          >
            Talk to Avyakta Assistant
          </div>
        )}

        <button
          onClick={isOpen ? () => setIsOpen(false) : openChat}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative flex items-center justify-center transition-all duration-200"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1B3A6B, #2E7D9C)',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Toggle Avyakta chatbot"
        >
          {isOpen ? (
            <XMarkIcon style={{ width: '24px', height: '24px', color: '#fff' }} />
          ) : (
            <ChatBubbleLeftRightIcon style={{ width: '24px', height: '24px', color: '#fff' }} />
          )}

          {/* Unread badge */}
          {!hasOpened && !isOpen && (
            <span
              className="absolute flex items-center justify-center"
              style={{
                top: '-2px',
                right: '-2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#C0392B',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                border: '2px solid #fff',
              }}
            >
              1
            </span>
          )}
        </button>
      </div>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="fixed z-50"
          style={{
            bottom: '80px',
            right: '20px',
            width: 'min(340px, 90vw)',
            height: 'min(480px, 70vh)',
            borderRadius: '16px',
            background: '#FAF7F2',
            border: '1px solid #E0D5C5',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'avyaktaBotSlideUp 250ms ease-out forwards',
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center gap-3 flex-shrink-0"
            style={{ background: '#1B3A6B', padding: '16px 20px' }}
          >
            {/* Bot avatar */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2E7D9C, #1B3A6B)',
              }}
            >
              <SparklesIcon style={{ width: '18px', height: '18px', color: '#fff' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Avyakta Assistant</div>
              <div style={{ color: '#7EB5D6', fontSize: '0.75rem' }}>
                <span style={{ color: '#4CAF50' }}>●</span> Online · Replies instantly
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              aria-label="Close chat"
            >
              <XMarkIcon style={{ width: '20px', height: '20px', color: '#fff' }} />
            </button>
          </div>

          {/* ── Messages ── */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ padding: '16px', background: '#FAF7F2' }}
          >
            <div className="flex flex-col gap-2">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  {/* Message bubble */}
                  <div
                    className="flex"
                    style={{ justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '10px 14px',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        marginBottom: '2px',
                        whiteSpace: 'pre-line',
                        ...(msg.from === 'bot'
                          ? {
                              background: '#fff',
                              border: '1px solid #E0D5C5',
                              borderRadius: '12px 12px 12px 4px',
                              color: '#2E4057',
                            }
                          : {
                              background: '#1B3A6B',
                              color: '#F0F6FF',
                              borderRadius: '12px 12px 4px 12px',
                            }),
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {/* Timestamp */}
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: '#93AABF',
                      textAlign: msg.from === 'user' ? 'right' : 'left',
                      marginBottom: '8px',
                      paddingLeft: msg.from === 'bot' ? '4px' : 0,
                      paddingRight: msg.from === 'user' ? '4px' : 0,
                    }}
                  >
                    {formatTime(msg.time)}
                  </div>

                  {/* Quick reply chips after bot messages */}
                  {msg.from === 'bot' && msg.chips && idx === messages.length - 1 && (
                    <div
                      className="flex flex-wrap gap-2 mb-3"
                      style={{ paddingLeft: '2px' }}
                    >
                      {msg.chips.map((chip, ci) => (
                        <button
                          key={ci}
                          onClick={() => handleChip(chip)}
                          className="transition-all duration-150"
                          style={{
                            background: '#fff',
                            border: '1px solid #D9CEBC',
                            color: '#2E7D9C',
                            borderRadius: '999px',
                            padding: '6px 14px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#E0F2F8';
                            e.currentTarget.style.borderColor = '#2E7D9C';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.borderColor = '#D9CEBC';
                          }}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ── Input Area ── */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 flex-shrink-0"
            style={{
              background: '#fff',
              borderTop: '1px solid #E0D5C5',
              padding: '12px 16px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: '1.5px solid #E0D5C5',
                borderRadius: '24px',
                padding: '8px 16px',
                fontSize: '0.875rem',
                color: '#2E4057',
                background: '#FAF7F2',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#2E7D9C';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(46,125,156,0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E0D5C5';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              className="flex items-center justify-center flex-shrink-0 transition-colors duration-150"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#2E7D9C',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1A5F78')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#2E7D9C')}
              aria-label="Send message"
            >
              <PaperAirplaneIcon style={{ width: '16px', height: '16px', color: '#fff' }} />
            </button>
          </form>
        </div>
      )}

      {/* Animation keyframe */}
      <style>{`
        @keyframes avyaktaBotSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AvyaktaBot;
