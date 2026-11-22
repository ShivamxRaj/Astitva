import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { supabase } from '../lib/supabaseClient';

/* ═══════════════════════════════════════
   Keyword → Response mapping (Professional / Enterprise)
   ═══════════════════════════════════════ */
const RESPONSES = {
  greeting: {
    text: `Hello, I am the Avaykta Assistant.\nI am here to help you report an unclaimed case, track an existing report, or search our verified database.\n\nHow may I assist you today?`,
    chips: ['Track a report', 'Report a case', 'Search database', 'Contact support'],
  },
  track: {
    keywords: ['track', 'status', 'report id', 'case id', 'kahan pahuncha', 'check status', 'tracking'],
    text: `To track an active report, please enter your **Report ID** (e.g. **#AVY-2026051215426853** or **AVY-1778530818885**).\n\nI will instantly check our live database and provide the current verification and investigation status.`,
    chips: ['Search database', 'Report a case', 'Helpline support'],
  },
  report: {
    keywords: ['report', 'body', 'unclaimed', 'mila', 'mile', 'laash', 'dead'],
    text: `To report an unclaimed body, please use the **Report Case** button in the navigation bar.\n\n• Anonymous Reporting: You do not need to share any personal details.\n• Immediate Transmission: Relevant authorities and verified partner NGOs are alerted.\n\nWould you like guidance through the reporting requirements?`,
    chips: ['Required details', 'Report anonymously', 'How it works'],
  },
  search: {
    keywords: ['search', 'missing', 'dhundna', 'family', 'pariwar', 'find', 'khoyi', 'lost'],
    text: `To search for a missing person, visit our **Search Portal**.\n\nYou can query active records by:\n• Full or partial name\n• Location, city, or district\n• Estimated age range and gender\n• Unique Case ID\n\nWould you like to open the Search section?`,
    chips: ['Open Search', 'Helpline support', 'Contact support'],
  },
  process: {
    keywords: ['process', 'kaise', 'how', 'steps', 'kya karna', 'work', 'procedure'],
    text: `The Avaykta humanitarian verification workflow:\n\n1. Initial Intake: An unclaimed case is reported to the verified registry.\n2. Verification & Record Creation: Case details, physical traits, and clothing markings are documented.\n3. Institutional Notification: Regional police departments, morgues, and registered NGOs are notified.\n4. Matching & Identification: Active missing-person inquiries are systematically cross-referenced.\n5. Dignified Resolution: Families are respectfully contacted and the case is closed with dignity.\n\nThe entire process is 100% free, confidential, and compliant with statutory standards.`,
    chips: ['Report a case', 'Search database', 'More questions'],
  },
  anonymous: {
    keywords: ['anonymous', 'private', 'naam nahi', 'identity', 'safe', 'secure', 'privacy', 'gupt'],
    text: `Yes, reports can be submitted completely anonymously.\n\n• Zero Tracking: No phone numbers, IP addresses, or personal credentials are recorded.\n• Relevant Data Only: Authorities receive incident and case details exclusively.\n• Whistleblower Protection: Submissions comply with statutory data privacy standards.`,
    chips: ['Report anonymously', 'Security standards'],
  },
  helpline: {
    keywords: ['helpline', 'phone', 'call', 'number', 'contact', 'dial', 'ring'],
    text: `Official Support Channels:\n\n• 24/7 Helpline: +91 62994 46452\n• WhatsApp Support: Direct chat assistance available\n• Email Inquiries: support@avaykta.app\n\nNote: For life-threatening emergencies, please call 112 immediately.`,
    chips: ['Open WhatsApp', 'Call helpline', 'Support Us'],
  },
  human: {
    keywords: ['human', 'officer', 'real person', 'agent', 'support', 'baat', 'talk'],
    text: `You can connect directly with our operational support team:\n\n• WhatsApp Support: Fastest response time (9 AM – 8 PM IST)\n• Direct Telephone: +91 62994 46452\n• Email Support: support@avaykta.app`,
    chips: ['Open WhatsApp', 'Call helpline'],
  },
  thanks: {
    keywords: ['thanks', 'thank', 'shukriya', 'dhanyawad', 'thnx', 'thx'],
    text: `You are welcome.\n\nEvery report and search brings us closer to reuniting families with dignity. Avaykta is here whenever you need assistance.`,
    chips: ['Go to Home', 'Report a case'],
  },
  guide: {
    keywords: ['guide', 'yes, guide', 'info is needed', 'details needed', 'what info', 'required'],
    text: `Information required to report a case:\n\n• **Location:** Specific area, landmark, or coordinates where the body was found\n• **Date & Time:** Approximate date and estimated time\n• **Physical Description:** Estimated age range, gender, visible marks, and clothing\n• **Photographs (Optional):** Clear photograph if available\n\nNote: You are NOT required to provide personal identity details to submit a report.`,
    chips: ['Report now', 'Report anonymously', 'More questions'],
  },
  data: {
    keywords: ['data stored', 'data', 'storage', 'encrypt', 'database', 'security'],
    text: `Data Protection & Security Architecture:\n\n• End-to-End Encryption: Case records are stored with AES-256 database encryption.\n• Identity Segregation: Anonymous submissions contain zero personal identifiers.\n• Role-Based Access: Case files are strictly accessible by authorized personnel and law enforcement.\n\nAll operations adhere to the Information Technology Act (IT Act 2000).`,
    chips: ['Report a case', 'How it works'],
  },
  default: {
    text: `I could not find an exact match for your inquiry.\n\nPlease select one of the common options below, or type your question:`,
    chips: ['Report a case', 'Search database', 'How it works', 'Helpline support'],
  },
};

const WHATSAPP_URL = 'https://wa.me/916299446452?text=Hello%20Avaykta%2C%20I%20need%20assistance.';

/* ── Formatted Text Renderer (Bold + Lists + Notes without raw phone emojis) ── */
const renderFormattedText = (str, isUser) => {
  if (!str) return null;
  if (!str.includes('**')) return str;
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={i}
          className={`font-semibold ${isUser ? 'text-white' : 'text-slate-900'}`}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderMessageContent = (text, isUser = false) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet items: • or -
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  isUser ? 'bg-sky-200' : 'bg-slate-400'
                }`}
              />
              <div className="flex-1 leading-relaxed">
                {renderFormattedText(content, isUser)}
              </div>
            </div>
          );
        }

        // Numbered steps: 1. , 2. , etc.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span
                className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  isUser
                    ? 'bg-sky-700 text-sky-100 border border-sky-500'
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                {numMatch[1]}
              </span>
              <div className="flex-1 leading-relaxed">
                {renderFormattedText(numMatch[2], isUser)}
              </div>
            </div>
          );
        }

        // Notice / Note callout
        if (trimmed.toLowerCase().startsWith('note:')) {
          return (
            <div
              key={idx}
              className={`mt-2 p-2 rounded-lg text-xs leading-relaxed ${
                isUser
                  ? 'bg-white/10 text-sky-100 border border-white/20'
                  : 'bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <strong className={isUser ? 'text-white' : 'text-slate-900'}>
                Note:{' '}
              </strong>
              {renderFormattedText(trimmed.substring(5).trim(), isUser)}
            </div>
          );
        }

        // Regular line
        return (
          <p key={idx} className="leading-relaxed">
            {renderFormattedText(trimmed, isUser)}
          </p>
        );
      })}
    </div>
  );
};

/* ── Match user input to an intent ── */
function matchIntent(input) {
  const lower = input.toLowerCase().trim();
  const intents = ['track', 'report', 'search', 'process', 'anonymous', 'helpline', 'human', 'thanks', 'guide', 'data'];
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
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const getApiBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  let baseUrl = '';

  if (window.location.hostname === 'localhost') {
    baseUrl = 'http://localhost:5001';
  } else if (envUrl) {
    baseUrl = envUrl;
  } else {
    baseUrl = 'https://astitva-17kt.onrender.com';
  }

  // Ensure it has the /api suffix
  if (!baseUrl.endsWith('/api')) {
    baseUrl = `${baseUrl}/api`;
  }
  return baseUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Generate a unique session ID for this page load session (resets on refresh)
const SESSION_ID = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

/* ── Report / Case ID Tracking Helpers ── */
const extractCaseId = (text) => {
  if (!text) return null;
  // Match patterns like #AVY-12345, AVY-12345, #CASE-1234, CASE-1234
  const match = text.match(/#?(AVY|CASE)[-_][A-Za-z0-9_-]+/i);
  if (match) return match[0];
  const trimmed = text.trim();
  if (/^#?[A-Za-z0-9_-]{8,30}$/.test(trimmed) && /\d/.test(trimmed)) {
    return trimmed;
  }
  return null;
};

const looksLikeSpecificId = (text) => {
  const trimmed = text.trim();
  return /^(#?AVY|#?CASE)[-_]/i.test(trimmed) || /^#[A-Za-z0-9_-]{6,30}$/.test(trimmed);
};

const lookupCase = async (rawInput) => {
  const cleanedId = rawInput.trim().replace(/[^\w#-]/g, '');
  const withHash = cleanedId.startsWith('#') ? cleanedId : `#${cleanedId}`;
  const withoutHash = cleanedId.replace(/^#/, '');

  try {
    const { data } = await supabase
      .from('orphan_cases')
      .select('*')
      .or(`case_id.eq.${cleanedId},case_id.eq.${withHash},case_id.eq.${withoutHash}`)
      .maybeSingle();

    if (data) {
      return { found: true, data };
    }
  } catch (err) {
    console.warn('Supabase case lookup error:', err);
  }

  // Check offline local storage cache
  try {
    const cached = JSON.parse(localStorage.getItem('avaykta_offline_cases_cache') || '[]');
    const match = cached.find((c) => {
      const cId = (c.case_id || '').replace('#', '').toLowerCase();
      return cId === withoutHash.toLowerCase() || cId === cleanedId.toLowerCase();
    });
    if (match) {
      return { found: true, data: match };
    }
  } catch (e) {}

  return { found: false };
};

/* ═══════════════════════════════════════
   AvayktaBot Component
   ═══════════════════════════════════════ */
const AvayktaBot = () => {
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

  const getSessionId = () => {
    return SESSION_ID;
  };

  /* Fetch current conversation from MongoDB or set default greeting */
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_BASE_URL}/chat/conversation?sessionId=${getSessionId()}`)
        .then((res) => {
          if (!res.ok) throw new Error('API request failed');
          return res.json();
        })
        .then((data) => {
          if (data.success && data.messages && data.messages.length > 0) {
            const loadedMessages = data.messages.map((msg) => ({
              from: msg.sender,
              text: msg.text,
              time: msg.timestamp ? new Date(msg.timestamp) : new Date(),
            }));
            setMessages(loadedMessages);
          } else {
            setMessages([
              { from: 'bot', text: RESPONSES.greeting.text, chips: RESPONSES.greeting.chips, time: new Date() },
            ]);
          }
        })
        .catch((err) => {
          console.warn('Backend chat API offline/failed. Using in-memory storage.', err);
          if (messages.length === 0) {
            setMessages([
              { from: 'bot', text: RESPONSES.greeting.text, chips: RESPONSES.greeting.chips, time: new Date() },
            ]);
          }
        });
    }
  }, [isOpen]);

  /* Global event listener to open chat */
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setHasOpened(true);
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* Open chat */
  const openChat = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  /* Clear conversation on backend and local state */
  const clearConversation = async () => {
    try {
      await fetch(`${API_BASE_URL}/chat/conversation?sessionId=${getSessionId()}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to clear conversation on backend:', err);
    }
    setMessages([
      { from: 'bot', text: RESPONSES.greeting.text, chips: RESPONSES.greeting.chips, time: new Date() },
    ]);
  };

  // Translate helper using backend endpoint
  const translateText = async (textOrArray, toLanguage) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textOrArray,
          to: toLanguage
        })
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      if (data.success) {
        return {
          translations: data.translations.map(t => t.text),
          detectedLanguage: data.detectedLanguage,
          isFallback: data.isFallback
        };
      }
    } catch (e) {
      console.error('Translation error:', e);
    }
    return {
      translations: Array.isArray(textOrArray) ? textOrArray : [textOrArray],
      detectedLanguage: 'en',
      isFallback: true
    };
  };

  // Helper to save conversation to DB
  const saveConversationToDB = async (allMessages) => {
    try {
      const formattedMessages = allMessages.map((msg, idx) => ({
        id: idx,
        text: msg.text,
        sender: msg.from,
        timestamp: msg.time,
      }));

      const userInteractions = allMessages.filter(m => m.from === 'user').length;

      await fetch(`${API_BASE_URL}/chat/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedMessages,
          conversationCount: userInteractions,
          sessionId: getSessionId()
        }),
      });

      if (userInteractions >= 4) {
        setTimeout(async () => {
          await clearConversation();
        }, 15000);
      }
    } catch (err) {
      console.warn('Failed to persist message to backend database:', err);
    }
  };

  /* Send user message + get bot reply, saving both to MongoDB */
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Show user message instantly
    const userMsg = { from: 'user', text: text.trim(), time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Add typing indicator
    const typingMsg = { from: 'bot', text: '...', isTyping: true, time: new Date() };
    setMessages(prev => [...prev, typingMsg]);

    try {
      // 0. Live Case / Report ID Tracking check
      const candidateCaseId = extractCaseId(text.trim());
      if (candidateCaseId) {
        const result = await lookupCase(candidateCaseId);
        if (result.found) {
          const caseData = result.data;
          const statusUpper = (caseData.status || 'Active').toUpperCase();
          const dateStr = caseData.created_at || caseData.date_of_sighting
            ? new Date(caseData.created_at || caseData.date_of_sighting).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : 'Recently Reported';

          let statusDetail = 'Report is securely registered and active in the national database for verification.';
          if (caseData.status === 'identified') {
            statusDetail = 'This case has been successfully identified and resolution protocols are active.';
          } else if (caseData.status === 'investigating') {
            statusDetail = 'Authorities and partner medical officers are actively investigating and cross-referencing records.';
          }

          const botMsg = {
            from: 'bot',
            text: `**Report Status: ${statusUpper}**\n\n• **Report ID:** ${caseData.case_id}\n• **Status:** **${statusUpper}**\n• **Location:** ${caseData.location || 'Reported Location'}\n• **Filed On:** ${dateStr}\n\n${statusDetail}`,
            chips: [`View Case #${caseData.case_id.replace('#', '')}`, 'Track another report', 'Search database'],
            time: new Date(),
          };

          setMessages(prev => {
            const filtered = prev.filter(m => !m.isTyping);
            const updated = [...filtered, botMsg];
            saveConversationToDB(updated);
            return updated;
          });
          return;
        } else if (looksLikeSpecificId(text.trim())) {
          const botMsg = {
            from: 'bot',
            text: `No case record was found matching Report ID **${candidateCaseId}**.\n\nPlease double-check the ID (for example: **#AVY-...**). If you recently submitted this report, please allow a couple of minutes for database sync.`,
            chips: ['Track another report', 'Search database', 'Helpline support'],
            time: new Date(),
          };

          setMessages(prev => {
            const filtered = prev.filter(m => !m.isTyping);
            const updated = [...filtered, botMsg];
            saveConversationToDB(updated);
            return updated;
          });
          return;
        }
      }

      // 1. Translate user message to English
      const userTranslationResult = await translateText(text.trim(), 'en');
      const englishInput = userTranslationResult.translations[0];
      const detectedLang = userTranslationResult.detectedLanguage;

      // 2. Match intent in English
      const matchedResponse = matchIntent(englishInput);
      
      let finalBotText = matchedResponse.text;
      let finalChips = matchedResponse.chips;

      // 3. If user's language is not English, translate bot's response back
      if (detectedLang && detectedLang !== 'en' && !userTranslationResult.isFallback) {
        const textsToTranslate = [matchedResponse.text, ...(matchedResponse.chips || [])];
        const botTranslationResult = await translateText(textsToTranslate, detectedLang);
        
        if (botTranslationResult && !botTranslationResult.isFallback) {
          finalBotText = botTranslationResult.translations[0];
          if (matchedResponse.chips && matchedResponse.chips.length > 0) {
            finalChips = botTranslationResult.translations.slice(1);
          }
        }
      }

      const botMsg = { from: 'bot', text: finalBotText, chips: finalChips, time: new Date() };

      // Replace typing indicator with actual bot response
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isTyping);
        const updated = [...filtered, botMsg];
        saveConversationToDB(updated);
        return updated;
      });

    } catch (err) {
      console.error('Error in chatbot workflow:', err);
      // Fallback
      const matchedResponse = matchIntent(text);
      const botMsg = { from: 'bot', text: matchedResponse.text, chips: matchedResponse.chips, time: new Date() };
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isTyping);
        const updated = [...filtered, botMsg];
        saveConversationToDB(updated);
        return updated;
      });
    }
  };

  /* Handle chip click actions */
  const handleChip = (chip) => {
    const lower = chip.toLowerCase();
    if (chip.toLowerCase().startsWith('view case')) {
      const match = chip.match(/(#?AVY-[A-Za-z0-9_-]+|#?CASE-[A-Za-z0-9_-]+|[A-Za-z0-9_-]+$)/i);
      const caseIdToNav = match ? match[0].replace(/^#/, '') : '';
      if (caseIdToNav) {
        navigate(`/case/${encodeURIComponent(caseIdToNav)}`);
        setIsOpen(false);
        return;
      }
    }
    if (lower === 'track a report' || lower === 'track report' || lower === 'track another report') {
      sendMessage('Track a report');
      return;
    }
    if (lower === 'open whatsapp') {
      window.open(WHATSAPP_URL, '_blank');
      return;
    }
    if (lower === 'report anonymously' || lower === 'report now' || lower === 'report a case') {
      navigate('/report');
      setIsOpen(false);
      return;
    }
    if (lower === 'open search' || lower === 'search now' || lower === 'search database') {
      navigate('/search');
      setIsOpen(false);
      return;
    }
    if (lower === 'required details' || lower === 'what info is needed?' || lower === 'what details needed?') {
      sendMessage('What info is needed?');
      return;
    }
    if (lower === 'how it works' || lower === 'how does it work?') {
      sendMessage('How does it work?');
      return;
    }
    if (lower === 'contact support' || lower === 'talk to a human') {
      sendMessage('Talk to a human');
      return;
    }
    if (lower === 'security standards' || lower === 'how is data stored?') {
      sendMessage('How is data stored?');
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
    if (lower === 'call helpline' || lower === 'talk to helpline' || lower === 'helpline support') {
      window.location.href = 'tel:+916299446452';
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
            Talk to Avaykta Assistant
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
          aria-label="Toggle Avaykta chatbot"
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
            bottom: '76px',
            right: '12px',
            width: 'min(350px, calc(100vw - 24px))',
            height: 'min(500px, 75vh)',
            borderRadius: '16px',
            background: '#FAF7F2',
            border: '1px solid #E0D5C5',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'avayktaBotSlideUp 250ms ease-out forwards',
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
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Avaykta Assistant</div>
            </div>
            <button
              onClick={clearConversation}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', marginRight: '4px' }}
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <TrashIcon style={{ width: '18px', height: '18px', color: '#B0C4DE' }} />
            </button>
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
            style={{ padding: '16px', background: '#F8FAFC' }}
          >
            <div className="flex flex-col gap-2.5">
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
                        padding: '11px 15px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        marginBottom: '2px',
                        ...(msg.from === 'bot'
                          ? {
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '16px 16px 16px 4px',
                              color: '#1E293B',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            }
                          : {
                              background: '#1B3A6B',
                              color: '#FFFFFF',
                              borderRadius: '16px 16px 4px 16px',
                              boxShadow: '0 1px 3px rgba(27,58,107,0.15)',
                            }),
                      }}
                    >
                      {msg.isTyping ? (
                        <div className="flex items-center gap-1.5 py-1 px-1">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      ) : (
                        renderMessageContent(msg.text, msg.from === 'user')
                      )}
                    </div>
                  </div>
                  {/* Timestamp */}
                  <div
                    style={{
                      fontSize: '0.68rem',
                      color: '#94A3B8',
                      textAlign: msg.from === 'user' ? 'right' : 'left',
                      marginBottom: '6px',
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
                          className="transition-all duration-150 active:scale-95"
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#0F172A',
                            borderRadius: '999px',
                            padding: '6px 13px',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F1F5F9';
                            e.currentTarget.style.borderColor = '#94A3B8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#CBD5E1';
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
              background: '#FFFFFF',
              borderTop: '1px solid #E2E8F0',
              padding: '12px 16px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                border: '1px solid #CBD5E1',
                borderRadius: '24px',
                padding: '8px 16px',
                fontSize: '0.85rem',
                color: '#0F172A',
                background: '#F8FAFC',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1B3A6B';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(27,58,107,0.12)';
                e.currentTarget.style.background = '#FFFFFF';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = '#F8FAFC';
              }}
            />
            <button
              type="submit"
              className="flex items-center justify-center flex-shrink-0 transition-colors duration-150"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1B3A6B',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0F172A')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1B3A6B')}
              aria-label="Send message"
            >
              <PaperAirplaneIcon style={{ width: '16px', height: '16px', color: '#fff' }} />
            </button>
          </form>
        </div>
      )}

      {/* Animation keyframe */}
      <style>{`
        @keyframes avayktaBotSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AvayktaBot;
