import React, { useState, useRef, useEffect } from 'react';
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon, 
  ExclamationTriangleIcon, 
  ShieldExclamationIcon,
  InformationCircleIcon,
  UserIcon,
  HeartIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const FloatingActionButton = ({ isChatOpen: externalIsChatOpen, onChatToggle }) => {
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Use external chat state if provided, otherwise use internal state
  const chatOpen = externalIsChatOpen !== undefined ? externalIsChatOpen : isChatOpen;
  const setChatOpen = externalIsChatOpen !== undefined ? onChatToggle : setIsChatOpen;

  // API Configuration
  const API_KEY = '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';
  const API_URL = 'https://api.perplexity.ai/chat/completions';

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear chat history when opening chat
  useEffect(() => {
    if (chatOpen) {
      setMessages([{
        type: 'bot',
        text: "Hi! I'm here to help you with any questions about our website or support you in difficult situations. How can I assist you today?",
        timestamp: new Date(),
        quickActions: [
          { text: "About Avyakta", action: "about" },
          { text: "Emergency Help", action: "emergency" },
          { text: "Contact Us", action: "contact" },
          { text: "How to Report", action: "report" }
        ]
      }]);
    }
  }, [chatOpen]);

  // Enhanced AI-powered response function
  const getAIResponse = async (message) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `You are a compassionate AI assistant helping users with a platform dedicated to giving dignity to the forgotten. Avyakta helps identify unclaimed bodies, provides emergency support, and connects families with lost loved ones.

Key Information:
- Emergency: Call 100 (Police), 102 (Ambulance), 101 (Fire)
- Helpline: +91 62994 46452
- Email: support@avyakta.org
- Location: New Delhi, India
- Specialized: Women (1091), Children (1098), Mental Health (9152987821)

Services:
- Emergency response and guidance
- Case reporting and tracking
- Legal assistance and support
- Mental health resources
- Financial aid information
- Multi-language support (English/Hindi)

Always prioritize safety and emergency situations. Be compassionate, helpful, and provide actionable guidance. Keep responses concise but informative.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI API Error:', error);
      return null;
    }
  };

  // Fallback response function for when AI is not available
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Emergency situations - HIGH PRIORITY
    if (lowerMessage.includes('dead') || lowerMessage.includes('body') || lowerMessage.includes('corpse') || lowerMessage.includes('unconscious') || lowerMessage.includes('not breathing')) {
      return {
        text: "🚨 EMERGENCY: This is a critical situation!\n\nIMMEDIATE ACTIONS:\n1️⃣ Call 100 (Police) immediately\n2️⃣ Call 102 (Ambulance) if medical help needed\n3️⃣ Stay at location if safe\n4️⃣ Don't touch or move anything\n5️⃣ Take photos if safe to do so\n\nWhile help arrives:\n• Note exact location details\n• Check for any identification\n• Look for witnesses\n• Stay calm and wait for authorities\n\nI'm here to guide you through this difficult time.",
        quickActions: [
          { text: "🚨 Call 100 Now", action: "call_100" },
          { text: "🚑 Call Ambulance", action: "call_ambulance" },
          { text: "📍 Location Help", action: "location_help" },
          { text: "📋 Report Online", action: "report_online" }
        ]
      };
    }

    // Missing Person Cases
    if (lowerMessage.includes('missing') || lowerMessage.includes('lost') || lowerMessage.includes('disappeared') || lowerMessage.includes('can\'t find')) {
      return {
        text: "🔍 MISSING PERSON CASE\n\nURGENT STEPS:\n1️⃣ File FIR at nearest police station\n2️⃣ Contact local hospitals and morgues\n3️⃣ Check CCTV footage in area\n4️⃣ Share on social media with photos\n5️⃣ Contact us for additional support\n\nWhat to provide:\n• Recent photo\n• Last known location\n• Clothing description\n• Personal details\n• Timeline of events\n\nWe can help you create a missing person report and coordinate with authorities.",
        quickActions: [
          { text: "📋 File Missing Report", action: "missing_report" },
          { text: "🏥 Check Hospitals", action: "check_hospitals" },
          { text: "👮 Contact Police", action: "contact_police" },
          { text: "📞 Call Helpline", action: "call_helpline" }
        ]
      };
    }

    // Medical Emergencies
    if (lowerMessage.includes('heart attack') || lowerMessage.includes('stroke') || lowerMessage.includes('bleeding') || lowerMessage.includes('accident') || lowerMessage.includes('injury')) {
      return {
        text: "🚑 MEDICAL EMERGENCY\n\nIMMEDIATE ACTION:\n1️⃣ Call 102 (Ambulance) NOW\n2️⃣ Call 100 (Police) if accident\n3️⃣ Don't move injured person\n4️⃣ Apply first aid if trained\n5️⃣ Keep person warm and comfortable\n\nWhile waiting:\n• Monitor breathing\n• Keep airway clear\n• Don't give food/water\n• Stay with the person\n\nEvery second counts in medical emergencies!",
        quickActions: [
          { text: "🚑 Call Ambulance", action: "call_ambulance" },
          { text: "🚨 Call Police", action: "call_100" },
          { text: "📞 Emergency Help", action: "emergency_help" },
          { text: "🏥 Find Hospital", action: "find_hospital" }
        ]
      };
    }

    // About Avyakta
    if (lowerMessage.includes('about') || lowerMessage.includes('what is') || lowerMessage.includes('avyakta')) {
      return {
        text: "🏛️ ABOUT AVYAKTA\n\nAvyakta is a compassionate platform dedicated to giving dignity to the forgotten. We help:\n\n• Report and identify unclaimed bodies\n• Provide emergency support 24/7\n• Connect families with lost loved ones\n• Support victims of violence and abuse\n• Offer counseling and legal assistance\n• Coordinate with authorities\n\nOur Mission:\nTo ensure no life goes unnoticed or unclaimed. Every person deserves dignity, justice, and peace.\n\nWe work with:\n• Police departments\n• Hospitals and morgues\n• NGOs and support organizations\n• Legal authorities\n• Medical professionals",
        quickActions: [
          { text: "🎯 Our Mission", action: "mission" },
          { text: "🆘 Emergency Help", action: "emergency" },
          { text: "📞 Contact Us", action: "contact" },
          { text: "🌐 Website Info", action: "website_info" }
        ]
      };
    }

    // Contact Information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
      return {
        text: "📞 CONTACT INFORMATION\n\n24/7 Emergency Helpline:\n📞 +91 62994 46452\n\nGeneral Support:\n📧 Email: support@avyakta.org\n🌐 Website: www.avaykta.app\n📍 Location: New Delhi, India\n\nSpecialized Helplines:\n👩 Women: 1091\n👶 Children: 1098\n🚨 Police: 100\n🚑 Ambulance: 102\n🔥 Fire: 101\n\nResponse Times:\n• Emergency: Immediate\n• General queries: Within 24 hours\n• Reports: Within 48 hours\n\nWe're here 24/7 to help you!",
        quickActions: [
          { text: "📞 Call Helpline", action: "call_helpline" },
          { text: "📧 Send Email", action: "send_email" },
          { text: "🌐 Visit Website", action: "visit_website" },
          { text: "📍 Find Us", action: "find_location" }
        ]
      };
    }
    
    // Default response
    return {
      text: "👋 Hi! I'm here to help you 24/7.\n\nI can assist with:\n\n🚨 EMERGENCIES:\n• Medical emergencies\n• Accidents and injuries\n• Violence and abuse\n• Missing persons\n• Unclaimed bodies\n• Natural disasters\n\n💙 SUPPORT:\n• Mental health help\n• Legal assistance\n• Financial aid\n• Safety guidance\n• Resource information\n\n📋 SERVICES:\n• Case reporting\n• Status tracking\n• Contact information\n• Website navigation\n• Admin access\n\nWhat would you like help with? I'm here to listen and guide you.",
      quickActions: [
        { text: "🚨 Emergency Help", action: "emergency" },
        { text: "📞 Contact Us", action: "contact" },
        { text: "💙 Get Support", action: "support" },
        { text: "📋 Report Case", action: "report" }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        text: inputMessage,
        timestamp: new Date(),
      },
    ]);
    setInputMessage('');
    setIsLoading(true);

    // Heart-touching, comprehensive response
    const responseText = `💙 Dear Friend,

Thank you for reaching out. No matter what you're facing, please know you are not alone. We are here for you, day and night, with open hearts and helping hands.

🚨 *Emergency Help*
If you or someone near you is in immediate danger, please call:
• Police: 100
• Ambulance: 102
• Fire: 101
• Women: 1091 | Children: 1098 | Mental Health: 9152987821

Your safety is our top priority. Stay calm, and help is on the way.

🔍 *Missing Person or Unclaimed Body*
If you are searching for a loved one or have found someone in need, please:
• File an FIR at your nearest police station
• Contact local hospitals and authorities
• Share details and photos with us—we will support you every step of the way

🏥 *Medical Emergencies*
For accidents, injuries, or sudden illness, call 102 for an ambulance. Stay with the person, keep them comfortable, and wait for help. Every moment matters, and your courage can save a life.

🏛️ *About Avyakta*
We are dedicated to giving dignity to the forgotten, reuniting families, and supporting those in crisis. Our mission is to bring hope, justice, and peace to every soul.

📞 *Contact & Support*
• Helpline: +91 62994 46452
• Email: support@avyakta.org
• Website: www.avaykta.app
• Location: New Delhi, India

We offer legal aid, counseling, financial help, and a listening ear. Whatever your need, we will walk with you.

🌈 *You Matter*
Your pain is seen, your voice is heard, and your story matters. Together, we can find light even in the darkest times. Please let us know how we can help you today. 💙`;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: responseText,
          timestamp: new Date(),
          quickActions: [],
        },
      ]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickAction = (action) => {
    let response;
    switch (action) {
      // Emergency Actions
      case 'call_100':
        window.location.href = 'tel:100';
        response = { text: "🚨 Calling emergency services (100) now. Please stay on the line and follow their instructions. I'm here if you need further guidance." };
        break;
      case 'call_ambulance':
        window.location.href = 'tel:102';
        response = { text: "🚑 Calling ambulance (102) now. Medical help is on the way. Stay with the person and keep them comfortable." };
        break;
      case 'call_fire':
        window.location.href = 'tel:101';
        response = { text: "🔥 Calling fire brigade (101) now. Evacuate the area immediately and wait for firefighters." };
        break;
      case 'call_helpline':
        window.location.href = 'tel:+916299446452';
        response = { text: "📞 Calling our helpline now. Our team will assist you immediately with any questions or concerns." };
        break;
      case 'women_helpline':
        window.location.href = 'tel:1091';
        response = { text: "👩 Calling women helpline (1091) now. You'll get immediate support and guidance." };
        break;
      case 'child_helpline':
        window.location.href = 'tel:1098';
        response = { text: "👶 Calling child helpline (1098) now. Child protection services will assist immediately." };
        break;
      case 'aasra_helpline':
        window.location.href = 'tel:9152987821';
        response = { text: "💙 Calling AASRA suicide prevention helpline now. You matter and help is available. Please stay on the line." };
        break;
      case 'kiran_helpline':
        window.location.href = 'tel:1800-599-0019';
        response = { text: "💙 Calling KIRAN mental health helpline now. Professional counselors are ready to help you." };
        break;
      case 'traffic_police':
        window.location.href = 'tel:103';
        response = { text: "🚦 Calling traffic police (103) now. They'll help with accident scene management and traffic control." };
        break;

      // Communication Actions
      case 'send_email':
        window.location.href = 'mailto:support@avyakta.org';
        response = { text: "📧 Opening email client. Please send us your message and we'll respond within 24 hours. Include your contact details for faster response." };
        break;
      case 'visit_website':
        window.open('https://www.avaykta.app', '_blank');
        response = { text: "🌐 Opening our website in a new tab. You'll find comprehensive information about our services, contact details, and emergency resources." };
        break;
      case 'find_location':
        window.open('https://maps.google.com/?q=New+Delhi+India', '_blank');
        response = { text: "📍 Opening Google Maps with our location. We're located in New Delhi, India. You can get directions and contact us for specific address details." };
        break;

      // Navigation Actions
      case 'contact':
        window.location.href = '/contact';
        response = { text: "📞 Taking you to our contact page. You'll find multiple ways to reach us including phone, email, and location details." };
        break;
      case 'emergency':
        window.location.href = '/emergency';
        response = { text: "🚨 Taking you to our emergency help page. You'll find immediate assistance and step-by-step guidance for various emergency situations." };
        break;
      case 'admin_login':
        window.location.href = '/admin';
        response = { text: "🔐 Taking you to the admin login page. You can register or login to access case management and reporting features." };
        break;
      case 'reports':
        window.location.href = '/reports';
        response = { text: "📋 Taking you to the reports section. You can view, track, and manage cases with proper authorization." };
        break;

      // Support Actions
      case 'missing_report':
        response = { text: "📋 For missing person reports:\n\n1️⃣ File FIR at nearest police station\n2️⃣ Contact local hospitals and morgues\n3️⃣ Share on social media with photos\n4️⃣ Contact us for additional support\n\nWe can help coordinate with authorities and create awareness campaigns." };
        break;
      case 'check_hospitals':
        response = { text: "🏥 Contact these hospitals in your area:\n\n• Government hospitals\n• Private hospitals\n• Trauma centers\n• Emergency departments\n\nCall each hospital's emergency number and provide:\n• Person's description\n• Last known location\n• Timeline of events\n• Your contact details" };
        break;
      case 'contact_police':
        window.location.href = 'tel:100';
        response = { text: "👮 Calling police (100) now. They'll help with missing person cases, investigations, and legal procedures." };
        break;
      case 'find_shelter':
        response = { text: "🏠 For shelter and protection:\n\n• Contact local women's shelters\n• Government protection homes\n• NGO-run safe houses\n• Religious organizations\n\nCall 1091 (Women Helpline) for immediate shelter assistance. They can guide you to the nearest safe location." };
        break;
      case 'medical_exam':
        response = { text: "🏥 For medical examination:\n\n1️⃣ Go to nearest government hospital\n2️⃣ Ask for medico-legal case (MLC)\n3️⃣ Don't wash or change clothes\n4️⃣ Bring all evidence\n5️⃣ Request female doctor if preferred\n\nImportant: Medical examination is crucial for legal proceedings and your health." };
        break;
      case 'file_fir':
        response = { text: "📋 To file FIR:\n\n1️⃣ Go to nearest police station\n2️⃣ Provide detailed statement\n3️⃣ Include all evidence\n4️⃣ Get FIR copy\n5️⃣ Note FIR number\n\nYou have the right to file FIR. If police refuse, contact higher authorities or call 100 for assistance." };
        break;
      case 'legal_aid':
        response = { text: "⚖️ For legal assistance:\n\n• National Legal Services Authority (NALSA)\n• State Legal Services Authority\n• District Legal Services Authority\n• Free legal aid available\n• Lawyer assistance provided\n\nContact your nearest legal services authority or call us for guidance on accessing free legal help." };
        break;
      case 'talk_someone':
        response = { text: "💬 You're not alone. Talk to:\n\n• Trusted family member\n• Close friend\n• Teacher or counselor\n• Religious leader\n• Mental health professional\n\nOr call these helplines:\n📞 AASRA: 9152987821\n📞 KIRAN: 1800-599-0019\n\nSomeone is always ready to listen and help." };
        break;
      case 'professional_help':
        response = { text: "🏥 For professional mental health help:\n\n• Government hospitals\n• Private psychiatrists\n• Counseling centers\n• NGO mental health services\n• Online therapy platforms\n\nStart with your nearest government hospital's psychiatry department. Many offer free or low-cost services." };
        break;
      case 'apply_aid':
        response = { text: "💰 To apply for financial assistance:\n\n1️⃣ Contact local authorities\n2️⃣ Collect required documents\n3️⃣ Fill application forms\n4️⃣ Submit with proof\n5️⃣ Follow up regularly\n\nRequired documents:\n• FIR copy\n• Medical reports\n• Identity proof\n• Income certificate\n• Address proof\n\nWe can help you navigate the application process." };
        break;
      case 'know_schemes':
        response = { text: "📚 Government schemes available:\n\n• Victim Compensation Fund\n• Legal Aid Services\n• Medical Expense Support\n• Rehabilitation Programs\n• Education Assistance\n• Housing Support\n\nContact your local District Legal Services Authority or call us for detailed information about eligibility and application procedures." };
        break;
      case 'safety_app':
        response = { text: "📱 Safety apps and features:\n\n• Emergency SOS on phone\n• Location sharing apps\n• Personal safety apps\n• Women safety apps\n• Emergency contact lists\n\nSet up emergency contacts on your phone and keep important numbers handy. Your safety is the top priority!" };
        break;
      case 'stay_informed':
        response = { text: "📻 Stay informed during emergencies:\n\n• Local radio stations\n• Government announcements\n• Weather updates\n• Emergency broadcasts\n• Social media (official accounts)\n\nFollow official government channels and local authorities for accurate information and safety instructions." };
        break;
      case 'safe_location':
        response = { text: "🏠 Safe locations to go:\n\n• Police stations\n• Hospitals\n• Fire stations\n• Government buildings\n• Trusted family/friend's home\n• Public places with people\n\nChoose well-lit, populated areas. Your safety is the most important thing right now." };
        break;
      case 'evacuate':
        response = { text: "🚪 Evacuation procedures:\n\n1️⃣ Leave immediately\n2️⃣ Don't use elevators\n3️⃣ Stay low if smoke\n4️⃣ Meet at safe location\n5️⃣ Don't re-enter building\n\nFollow emergency personnel instructions. Get out quickly and safely!" };
        break;
      case 'location_help':
        response = { text: "📍 For location assistance:\n\n• Use GPS on your phone\n• Note landmarks nearby\n• Check street names\n• Look for building numbers\n• Use Google Maps\n\nProvide as much detail as possible:\n• Exact address\n• Nearby landmarks\n• Building description\n• Floor/room number\n\nThis helps emergency services reach you faster." };
        break;
      case 'report_online':
        response = { text: "📱 For online reporting:\n\n1️⃣ Visit our website\n2️⃣ Go to 'Report Case' section\n3️⃣ Fill detailed form\n4️⃣ Upload photos (if safe)\n5️⃣ Provide contact details\n6️⃣ Submit and get tracking number\n\nOnline reports are processed within 48 hours. For emergencies, always call 100 first." };
        break;
      case 'emergency_report':
        response = { text: "🚨 For emergency reporting:\n\n1️⃣ Call 100 immediately\n2️⃣ Stay at location if safe\n3️⃣ Provide clear details\n4️⃣ Don't touch anything\n5️⃣ Wait for authorities\n6️⃣ Contact us for support\n\nEmergency reports get immediate attention. We'll coordinate with authorities and keep you updated." };
        break;
      case 'online_report':
        response = { text: "💻 Online reporting process:\n\n1️⃣ Visit www.avaykta.app\n2️⃣ Click 'Report Case'\n3️⃣ Choose case type\n4️⃣ Fill all details\n5️⃣ Upload evidence\n6️⃣ Submit and track\n\nYou'll receive a tracking number and regular updates on your case progress." };
        break;
      case 'call_help':
        response = { text: "📞 For immediate help:\n\n🚨 Emergency: 100\n🚑 Ambulance: 102\n🔥 Fire: 101\n👩 Women: 1091\n👶 Children: 1098\n💙 Mental Health: 9152987821\n\nOur helpline: +91 62994 46452\n\nCall the appropriate number based on your situation. Help is available 24/7." };
        break;
      case 'report_form':
        response = { text: "📋 Report form requirements:\n\nPersonal Details:\n• Full name\n• Contact number\n• Email address\n• Address\n\nCase Details:\n• Type of incident\n• Date and time\n• Location\n• Description\n• Evidence (photos/videos)\n\nWitness Information:\n• Names and contacts\n• Statements\n\nFill all fields accurately for faster processing." };
        break;
      case 'get_help':
        response = { text: "🆘 Getting help:\n\nImmediate:\n• Call emergency numbers\n• Go to safe location\n• Contact trusted person\n\nShort-term:\n• File police report\n• Get medical help\n• Contact support organizations\n\nLong-term:\n• Legal assistance\n• Counseling\n• Financial support\n\nYou're not alone. Help is available at every step." };
        break;
      case 'emergency_help':
        response = { text: "🚨 Emergency help available:\n\nImmediate Response:\n• Police: 100\n• Ambulance: 102\n• Fire: 101\n• Women: 1091\n• Children: 1098\n\nOur Support:\n• 24/7 helpline\n• Emergency guidance\n• Coordination with authorities\n• Follow-up assistance\n\nCall the appropriate emergency number first, then contact us for additional support." };
        break;
      case 'find_hospital':
        response = { text: "🏥 Finding hospitals:\n\nEmergency:\n• Government hospitals\n• Trauma centers\n• Emergency departments\n\nSpecialized:\n• Women's hospitals\n• Children's hospitals\n• Mental health centers\n\nUse Google Maps or call 102 for ambulance service. Government hospitals provide free emergency care." };
        break;
      case 'medical_help':
        response = { text: "🏥 Medical help available:\n\nEmergency:\n• Call 102 for ambulance\n• Go to nearest hospital\n• Emergency departments\n\nSpecialized Care:\n• Women's health\n• Child care\n• Mental health\n• Trauma care\n\nGovernment hospitals provide free emergency care. Don't delay seeking medical attention." };
        break;
      case 'report_case':
        response = { text: "📋 Reporting a case:\n\nEmergency:\n1️⃣ Call 100 immediately\n2️⃣ Stay at location\n3️⃣ Provide details\n4️⃣ Wait for authorities\n\nNon-emergency:\n1️⃣ Visit police station\n2️⃣ Fill FIR\n3️⃣ Get copy\n4️⃣ Contact us\n\nWe can help coordinate with authorities and provide additional support." };
        break;
      case 'compensation':
        response = { text: "💰 Compensation available:\n\nGovernment Schemes:\n• Victim Compensation Fund\n• Legal Aid Services\n• Medical Expense Support\n\nRequirements:\n• FIR copy\n• Medical reports\n• Identity proof\n• Income certificate\n\nContact District Legal Services Authority or call us for application guidance." };
        break;
      case 'financial_help':
        response = { text: "💰 Financial assistance:\n\nAvailable Support:\n• Emergency funds\n• Medical expenses\n• Legal costs\n• Rehabilitation\n• Education\n\nHow to Apply:\n1️⃣ Contact authorities\n2️⃣ Submit documents\n3️⃣ Follow procedures\n4️⃣ Regular follow-up\n\nWe can help you navigate the application process and connect with relevant organizations." };
        break;
      case 'know_rights':
        response = { text: "📚 Your legal rights:\n\nBasic Rights:\n• Right to file FIR\n• Right to legal assistance\n• Right to medical examination\n• Right to protection\n• Right to compensation\n• Right to privacy\n\nImportant:\n• Keep all documents\n• Follow legal procedures\n• Don't sign blank papers\n• Get copies of reports\n• Maintain timeline\n\nKnowledge of your rights helps ensure justice." };
        break;
      case 'lawyer_help':
        response = { text: "⚖️ Lawyer assistance:\n\nFree Legal Aid:\n• National Legal Services Authority\n• State Legal Services Authority\n• District Legal Services Authority\n\nServices:\n• Legal consultation\n• Court representation\n• Document preparation\n• Rights education\n\nContact your nearest legal services authority. Free legal aid is available for eligible cases." };
        break;
      case 'helpline':
        response = { text: "📞 Helpline numbers:\n\nEmergency:\n🚨 Police: 100\n🚑 Ambulance: 102\n🔥 Fire: 101\n\nSpecialized:\n👩 Women: 1091\n👶 Children: 1098\n💙 Mental Health: 9152987821\n\nOur Helpline:\n📞 +91 62994 46452\n\nAll helplines are available 24/7. Call the appropriate number based on your situation." };
        break;
      case 'support':
        response = { text: "💙 Support available:\n\nImmediate:\n• Emergency services\n• Crisis intervention\n• Safety assistance\n\nOngoing:\n• Legal support\n• Medical care\n• Counseling services\n• Financial aid\n• Family support\n\nLong-term:\n• Rehabilitation\n• Education\n• Employment\n• Community integration\n\nYou're not alone. Comprehensive support is available at every stage." };
        break;
      case 'how_help':
        response = { text: "🤝 How we help:\n\nEmergency Response:\n• Immediate assistance\n• Coordination with authorities\n• Crisis intervention\n• Safety guidance\n\nCase Management:\n• Report processing\n• Status tracking\n• Follow-up support\n• Resource coordination\n\nSupport Services:\n• Legal assistance\n• Medical referrals\n• Counseling\n• Financial aid\n• Family support\n\nWe work with police, hospitals, NGOs, and legal authorities to provide comprehensive support." };
        break;
      case 'website_info':
        response = { text: "🌐 Website information:\n\nPages Available:\n🏠 Home: Mission and overview\n📞 Contact: Get in touch with us\n🚨 Emergency: Quick access to help\n👤 Admin Login: For authorities\n📋 Reports: View and manage cases\n\nFeatures:\n• Multi-language support\n• Mobile responsive\n• Emergency numbers\n• Online reporting\n• Status tracking\n\nVisit www.avaykta.app for complete information and services." };
        break;
      case 'mission':
        response = { text: "🎯 Our mission:\n\nTo ensure no life goes unnoticed or unclaimed. We believe:\n\n• Every person deserves dignity\n• Families deserve closure\n• Victims deserve justice\n• Communities deserve peace\n\nWhat We Do:\n• Identify unclaimed bodies\n• Support families in crisis\n• Provide emergency assistance\n• Coordinate with authorities\n• Offer comprehensive support\n\nOur Values:\n• Compassion\n• Justice\n• Dignity\n• Integrity\n• Service" };
        break;
      case 'register':
        response = { text: "📝 Registration process:\n\nWho Can Register:\n• Police officers\n• Medical professionals\n• NGO workers\n• Government officials\n• Authorized personnel\n• Common users\n\nSteps:\n1️⃣ Fill personal details\n2️⃣ Verify mobile with OTP\n3️⃣ Provide credentials\n4️⃣ Security verification\n5️⃣ Terms agreement\n6️⃣ Account activation\n\nVisit our admin page to start registration." };
        break;
      case 'help':
        response = { text: "📞 Need help?\n\nTechnical Support:\n• Registration issues\n• Login problems\n• Website navigation\n• Report submission\n\nGeneral Support:\n• Information requests\n• Service inquiries\n• Coordination help\n• Resource guidance\n\nContact us:\n📞 +91 62994 46452\n📧 support@avyakta.org\n\nWe're here to help with any questions or issues." };
        break;
      case 'security':
        response = { text: "🔒 Security information:\n\nData Protection:\n• Encrypted storage\n• Secure transmission\n• Access controls\n• Regular backups\n\nAuthentication:\n• Multi-factor verification\n• OTP confirmation\n• Security codes\n• Session management\n\nPrivacy:\n• Confidential information\n• Limited access\n• Secure sharing\n• Data retention policies\n\nYour information is protected with industry-standard security measures." };
        break;

      default:
        response = { text: "I understand you need help. Please let me know what specific assistance you require, and I'll guide you through the process or connect you with the right resources." };
    }

    // Add the response to messages
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: response.text,
      timestamp: new Date(),
      quickActions: response.quickActions || []
    }]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Action Button Group */}
      <div className="fixed bottom-24 right-6 z-50">
        {/* Main FAB */}
        <button
          onClick={() => setIsFabExpanded(!isFabExpanded)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
            isFabExpanded ? 'rotate-45' : ''
          }`}
        >
          {isFabExpanded ? (
            <XMarkIcon className="w-7 h-7 transition-transform duration-300" />
          ) : (
            <ShieldExclamationIcon className="w-7 h-7 transition-transform duration-300" />
          )}
        </button>

        {/* Expanded Options */}
        <div
          className={`absolute bottom-20 right-0 flex flex-col gap-4 transition-all duration-300 ${
            isFabExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Chat Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-xl"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
          </button>

          {/* SOS Button */}
          <button
            onClick={() => {
              window.location.href = 'tel:100';
            }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-xl animate-pulse"
          >
            <span className="text-sm font-bold">SOS</span>
          </button>
        </div>
      </div>

      {/* Chat Box */}
      <div
        className={`fixed bottom-6 left-6 w-80 h-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 transform border border-gray-200 ${
          chatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ShieldExclamationIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Chat Support</h3>
                <p className="text-blue-100 text-sm">AI-Powered 24/7 Support</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-blue-100 p-2 hover:bg-blue-600 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 custom-scrollbar">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                <div
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col max-w-[80%]">
                    <div
                      className={`rounded-2xl p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  </div>
                  
                  {/* Quick Action Buttons */}
                  {message.type === 'bot' && message.quickActions && (
                    <div className="flex flex-wrap gap-2 mt-3 animate-fade-in" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                      {message.quickActions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => handleQuickAction(action.action)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-all duration-200 hover:scale-105"
                        >
                          {action.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl" style={{ pointerEvents: 'auto' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about Avyakta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white text-gray-900"
                disabled={false}
                autoComplete="off"
                spellCheck="false"
                style={{ zIndex: 1000 }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton; 