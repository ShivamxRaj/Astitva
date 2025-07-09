import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  PhoneIcon,
  CogIcon,
  HeartIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  LightBulbIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import FloatingActionButton from './FloatingActionButton';

const FAQPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Category configuration with icons and colors
  const categories = {
    all: { name: 'All Questions', icon: '💬', color: 'from-blue-500 to-purple-600' },
    general: { name: 'General', icon: '💬', color: 'from-blue-500 to-cyan-500' },
    reporting: { name: 'Reporting', icon: '🚨', color: 'from-orange-500 to-red-500' },
    cases: { name: 'Case Management', icon: '📋', color: 'from-purple-500 to-pink-500' },
    privacy: { name: 'Privacy & Security', icon: '🔐', color: 'from-indigo-500 to-blue-500' },
    support: { name: 'Support & Contact', icon: '🛠', color: 'from-teal-500 to-green-500' },
    technical: { name: 'Technical', icon: '⚙️', color: 'from-gray-500 to-slate-600' },
    help: { name: 'How You Can Help', icon: '❤️', color: 'from-pink-500 to-rose-500' }
  };

  // Comprehensive FAQ database
  const faqData = {
    general: {
      title: 'General Questions',
      icon: GlobeAltIcon,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        {
          question: 'What is Avyakta and what does it do?',
          answer: 'Avyakta is a comprehensive platform dedicated to giving dignity to the forgotten. We help identify unclaimed bodies, provide emergency support, and connect families with lost loved ones. Our services include case reporting, investigation coordination, legal assistance, and 24/7 emergency response. We work with police departments, hospitals, NGOs, and legal authorities to ensure no life goes unnoticed or unclaimed.'
        },
        {
          question: 'Who can use Avyakta?',
          answer: 'Avyakta serves multiple user types: **Police Officers** - for case management and investigation coordination; **NGO Workers** - for community outreach and family support; **Medical Professionals** - for reporting unidentified cases; **Government Officials** - for administrative oversight; **Common Citizens** - for reporting missing persons or suspicious cases; **Families** - for finding lost loved ones. Each user type has appropriate access levels and features.'
    },
        {
          question: 'Is this service available across India?',
          answer: 'Yes, Avyakta is available across all states and union territories of India. We have partnerships with local police departments, hospitals, and NGOs nationwide. Our digital platform is accessible 24/7 from anywhere in India, and we coordinate with local authorities for physical investigations and support. We\'re continuously expanding our network to reach more communities.'
        },
        {
          question: 'Do I need to register to report a case?',
          answer: 'For emergency situations, you can report immediately without registration. However, registration is recommended for: tracking your case status, receiving updates, accessing additional features, and maintaining case history. Registration is free and takes only a few minutes. You can also report anonymously, but this limits our ability to provide follow-up support.'
        },
        {
          question: 'Can anyone use the platform or only officials?',
          answer: 'Anyone can use the platform! We have different access levels: **Public Access** - for basic reporting and information; **Registered Users** - for case tracking and updates; **Verified Officials** - for case management and coordination; **Admin Access** - for system management. This ensures both accessibility for urgent cases and security for sensitive operations.'
        }
      ]
    },
    reporting: {
      title: 'Reporting Cases',
      icon: DocumentTextIcon,
      color: 'from-orange-500 to-red-500',
      questions: [
        {
          question: 'How can I report an unidentified body?',
          answer: 'To report an unidentified body: 1) **Immediate Action** - Call emergency services (100/102) first, 2) **Document** - Take photos if safe (without disturbing the scene), 3) **Report Online** - Use our platform with location details, physical description, clothing, and any identification found, 4) **Contact Authorities** - We\'ll automatically notify relevant police and medical authorities, 5) **Follow-up** - We\'ll coordinate investigation and family search efforts. Never touch or move anything at the scene.'
        },
        {
          question: 'Can I report anonymously?',
          answer: 'Yes, you can report anonymously. We understand situations requiring discretion. Anonymous reports are processed with the same urgency, but with limitations: no case tracking access, no follow-up communications, and reduced ability to request additional information. For sensitive cases, we recommend using a trusted intermediary or NGO contact. Your safety and privacy are our priorities.'
        },
        {
          question: 'Can I upload an image or document while reporting?',
          answer: 'Yes, you can upload images and documents. **Supported formats**: JPG, PNG, PDF (max 10MB each). **What to upload**: Recent photos, identification documents, medical records, police reports, or any relevant documentation. **Privacy**: All uploads are encrypted and only accessible to authorized personnel. **Guidelines**: Ensure images are clear, avoid graphic content, and respect privacy laws. We use AI to enhance image quality when possible.'
        },
        {
          question: 'What happens after I report a case?',
          answer: 'After reporting: 1) **Immediate Response** - Case is logged and assigned a unique ID, 2) **AI Analysis** - Our system searches for matches in existing databases, 3) **Authority Notification** - Relevant police, hospitals, and NGOs are automatically notified, 4) **Investigation Launch** - Coordinated search and investigation begins, 5) **Family Outreach** - If identified, family notification protocols are activated, 6) **Regular Updates** - You\'ll receive status updates via your preferred method.'
        },
        {
          question: 'What details are mandatory for reporting?',
          answer: '**Essential Information**: Location (exact coordinates preferred), date/time of discovery, basic physical description, clothing details, and your contact information. **Helpful Additional Details**: Photos, any identification found, medical conditions, distinctive features, personal belongings, and circumstances of discovery. **Legal Requirements**: We comply with local reporting laws and may require specific information based on jurisdiction. The more details provided, the better our chances of identification.'
        }
      ]
    },
    cases: {
      title: 'Case Management',
      icon: CheckCircleIcon,
      color: 'from-purple-500 to-pink-500',
      questions: [
        {
          question: 'How long does it take to process a case?',
          answer: 'Processing times vary: **Emergency Cases** - Immediate response (within hours); **Standard Cases** - 24-48 hours for initial processing; **Complex Cases** - 3-7 days for full investigation setup; **Cold Cases** - Ongoing with periodic reviews. Factors affecting timeline: available information, case complexity, jurisdiction cooperation, and resource availability. We provide regular updates throughout the process.'
        },
        {
          question: 'How do I track my reported case?',
          answer: 'Track your case through: 1) **Online Dashboard** - Log into your account for real-time updates, 2) **Case ID** - Use your unique case number to check status, 3) **Email/SMS Updates** - Automatic notifications for major developments, 4) **Support Team** - Contact our team for detailed status reports, 5) **Mobile App** - Push notifications for urgent updates. Case status includes: Received, Under Investigation, Identified, Family Contacted, Resolved, or Closed.'
        },
        {
          question: 'Who handles the investigation after I submit a report?',
          answer: 'Investigation is handled by: **Primary Team** - Our specialized investigators and case coordinators, **Local Authorities** - Police departments in the relevant jurisdiction, **Medical Professionals** - For forensic and medical examinations, **NGO Partners** - For family support and community outreach, **Legal Experts** - For compliance and legal procedures. We coordinate all parties to ensure comprehensive investigation while respecting jurisdictional boundaries.'
        },
        {
          question: 'Will I be contacted again after reporting?',
          answer: 'Yes, we will contact you for: **Case Updates** - Major developments and progress reports, **Additional Information** - If we need more details to proceed, **Witness Statements** - If your testimony is required, **Resolution Notification** - When the case is resolved, **Follow-up Support** - If you need counseling or assistance. You can choose your preferred contact method and frequency. We respect your privacy and won\'t share your information without consent.'
        }
      ]
    },
    privacy: {
      title: 'Privacy & Security',
      icon: ShieldCheckIcon,
      color: 'from-indigo-500 to-blue-500',
      questions: [
        {
          question: 'Is my identity protected?',
          answer: 'Absolutely. We use **bank-level encryption** to protect your identity. **Anonymous reporting** is available for sensitive cases. **Data minimization** - we only collect necessary information. **Access controls** - only authorized personnel can view your data. **Audit trails** - all access is logged and monitored. **Legal compliance** - we follow all data protection laws including IT Act 2000 and GDPR principles. Your identity is never shared without explicit consent.'
        },
        {
          question: 'Can police access the data I provide?',
          answer: 'Police access is **strictly controlled**: **Authorized Access** - Only with proper legal authorization (warrant/court order), **Specific Cases** - Access limited to relevant case information only, **Audit Required** - All access is logged and monitored, **Notification** - You\'ll be informed if your data is requested (unless prohibited by law), **Legal Compliance** - We follow all legal procedures and challenge improper requests. We prioritize your privacy while cooperating with legitimate law enforcement needs.'
        },
        {
          question: 'Is my location shared automatically?',
          answer: '**No, location is not shared automatically**. **Emergency Situations** - Only approximate location shared with emergency services, **Investigation Purposes** - Specific location shared only with authorized investigators, **Your Control** - You can choose what location details to provide, **Anonymization** - Precise coordinates are anonymized when possible, **Consent Required** - Detailed location sharing requires your explicit consent. We use location data only for case resolution, never for tracking or surveillance.'
        },
        {
          question: 'How secure is my submitted information?',
          answer: 'Your information is protected with **enterprise-grade security**: **Encryption** - AES-256 encryption for data at rest and in transit, **Secure Infrastructure** - Cloud security with regular penetration testing, **Access Controls** - Multi-factor authentication and role-based access, **Regular Audits** - Third-party security assessments, **Compliance** - ISO 27001, SOC 2, and legal compliance, **Incident Response** - 24/7 security monitoring and rapid response protocols. We treat your data with the same security standards as financial institutions.'
        },
        {
          question: 'Will my information be deleted after the case closes?',
          answer: '**Data retention follows legal requirements**: **Case Data** - Retained for legal compliance (typically 7-10 years), **Personal Information** - Deleted upon request after case closure, **Anonymized Data** - Kept for statistical and improvement purposes, **Legal Holds** - Data preserved if required by ongoing investigations, **Your Rights** - You can request data deletion at any time. We provide clear data retention policies and honor deletion requests within legal constraints.'
        }
      ]
    },
    support: {
      title: 'Support & Contact',
      icon: PhoneIcon,
      color: 'from-teal-500 to-green-500',
      questions: [
        {
          question: 'How can I contact Avyakta support?',
          answer: 'Multiple contact options available: **24/7 Helpline** - +91 1800-XXX-XXXX for urgent cases, **Email Support** - support@avyakta.org for detailed queries, **Live Chat** - Available on our website and mobile app, **Emergency Contact** - Direct line for critical situations, **Regional Offices** - Physical locations in major cities, **Social Media** - Official channels for general inquiries. Response times: Emergency - Immediate, Urgent - Within 2 hours, General - Within 24 hours.'
        },
        {
          question: 'What are your support working hours?',
          answer: '**24/7 Emergency Support** - Always available for critical cases, **General Support** - 8 AM to 10 PM IST daily, **Technical Support** - 9 AM to 6 PM IST weekdays, **Regional Offices** - 9 AM to 5 PM IST weekdays, **Holiday Coverage** - Emergency services available on all holidays. Outside regular hours, emergency protocols ensure critical cases receive immediate attention. We never close for urgent situations.'
        },
        {
          question: 'Do you offer 24/7 help in emergencies?',
          answer: '**Yes, 24/7 emergency support is available**. **Emergency Hotline** - Always staffed with trained responders, **Critical Case Protocol** - Immediate escalation for urgent situations, **Authority Coordination** - Real-time coordination with police and medical services, **Family Support** - Crisis intervention and counseling available, **Mobile Response** - Field teams available in major cities. Emergency cases bypass normal procedures for immediate action.'
        },
        {
          question: 'Is there a chatbot I can talk to?',
          answer: '**Yes, our AI chatbot is available 24/7**. **Features**: Instant responses to common questions, case status updates, emergency guidance, and basic support. **Capabilities**: Multi-language support (English/Hindi), context-aware responses, emergency escalation, and human handoff when needed. **Access**: Available on website, mobile app, and WhatsApp. **Limitations**: For complex cases or sensitive information, human support is recommended. The chatbot can handle 80% of common queries instantly.'
        },
        {
          question: 'How do I escalate a case?',
          answer: '**Case escalation process**: 1) **Contact Support** - Use helpline or email with case ID, 2) **Provide Details** - Explain why escalation is needed, 3) **Review Process** - Case reviewed by senior team within 24 hours, 4) **Escalation Decision** - You\'ll be notified of escalation status, 5) **Enhanced Support** - Dedicated case manager assigned if escalated. **Escalation criteria**: Delayed response, new critical information, legal complications, or family emergencies. We take escalation requests seriously and respond promptly.'
        }
      ]
    },
    technical: {
      title: 'Technical Issues',
      icon: CogIcon,
      color: 'from-gray-500 to-slate-600',
      questions: [
        {
          question: 'The website is not loading, what should I do?',
          answer: '**Troubleshooting steps**: 1) **Check Internet** - Ensure stable connection, 2) **Clear Cache** - Clear browser cache and cookies, 3) **Try Different Browser** - Chrome, Firefox, Safari, or Edge, 4) **Disable Extensions** - Temporarily disable ad blockers or VPN, 5) **Check URL** - Ensure you\'re on the correct website, 6) **Contact Support** - If issues persist, contact technical support with error details. **Alternative Access**: Use mobile app or contact helpline for urgent cases.'
        },
        {
          question: 'I didn\'t get OTP or email confirmation.',
          answer: '**OTP/Email issues**: 1) **Check Spam Folder** - Look in spam/junk folders, 2) **Verify Email/Phone** - Ensure correct contact information, 3) **Wait 5 Minutes** - Sometimes delays occur, 4) **Request New OTP** - Use "Resend" option, 5) **Check Network** - Ensure stable internet connection, 6) **Contact Support** - If multiple attempts fail. **Alternative Verification**: We can verify through phone call or manual verification if needed. **Security Note**: OTPs expire after 10 minutes for security.'
        },
        {
          question: 'My form is not submitting, what should I check?',
          answer: '**Form submission troubleshooting**: 1) **Required Fields** - Ensure all mandatory fields are completed, 2) **File Size** - Check if uploads exceed size limits, 3) **Internet Connection** - Ensure stable connection, 4) **Browser Compatibility** - Try different browser, 5) **JavaScript Enabled** - Ensure JavaScript is enabled, 6) **Clear Form** - Try refreshing and re-entering data. **Alternative Submission**: Contact support for manual form processing if technical issues persist.'
        },
        {
          question: 'Can I use this website on my phone?',
          answer: '**Yes, fully mobile-optimized**: **Mobile Website** - Responsive design works on all devices, **Mobile App** - Available for Android and iOS, **Features**: All desktop features available on mobile, **Performance**: Optimized for mobile networks, **Offline Capability**: Basic features work without internet, **Accessibility**: Voice input and screen reader support. **Recommended**: Use mobile app for best experience. **Security**: Same security standards as desktop version.'
        }
      ]
    },
    help: {
      title: 'How You Can Help',
      icon: HeartIcon,
      color: 'from-pink-500 to-rose-500',
      questions: [
        {
          question: 'How can I help Avyakta?',
          answer: '**Multiple ways to help**: 1) **Volunteer** - Join our community outreach programs, 2) **Spread Awareness** - Share information about our services, 3) **Report Cases** - Report any suspicious or unidentified cases, 4) **Donate** - Financial support for our operations, 5) **Partner** - If you represent an NGO or organization, 6) **Technical Skills** - Help with website, app, or data analysis, 7) **Legal Support** - Pro bono legal assistance, 8) **Medical Support** - Forensic or medical expertise. Every contribution, big or small, makes a difference.'
        },
        {
          question: 'Do you accept donations?',
          answer: '**Yes, we gratefully accept donations**: **Online Donations** - Secure payment gateway on our website, **Bank Transfer** - Direct transfer to our registered account, **Corporate Partnerships** - CSR initiatives and corporate support, **In-Kind Donations** - Equipment, services, or expertise, **Monthly Giving** - Recurring donation programs. **Transparency**: All donations are publicly reported, and you receive tax benefits. **Usage**: Funds go directly to case investigations, family support, and platform maintenance. **Accountability**: Regular financial reports and audits available.'
        },
        {
          question: 'Can I volunteer or join your team?',
          answer: '**Volunteer opportunities available**: **Field Volunteers** - Community outreach and case investigation, **Technical Volunteers** - Website, app, and data management, **Support Volunteers** - Helpline and family support, **Legal Volunteers** - Pro bono legal assistance, **Medical Volunteers** - Forensic and medical expertise, **Administrative Volunteers** - Office and coordination support. **Requirements**: Background check, training program, and commitment to our values. **Benefits**: Training, experience, and making a real difference. Contact us for current opportunities.'
        },
        {
          question: 'Are there success stories?',
          answer: '**Yes, countless success stories**: **Family Reunions** - Families reunited after years of separation, **Identifications** - Unidentified individuals given their names back, **Justice Served** - Cases resolved and perpetrators brought to justice, **Community Impact** - Communities made safer through our work. **Privacy**: We protect individual privacy and don\'t share specific details without consent. **Statistics**: We maintain success rates and impact metrics. **Testimonials**: Available from families and partners (with permission). Every case matters, and every success motivates us to help more people.'
        }
      ]
    }
  };

  // Calculate total questions and filtered questions
  const totalQuestions = Object.values(faqData).reduce((acc, category) => acc + category.questions.length, 0);
  const totalCategories = Object.keys(faqData).length;

  // Filter questions based on search term and category
  const filteredData = Object.entries(faqData).filter(([key, category]) => {
    if (selectedCategory !== 'all' && key !== selectedCategory) return false;
    
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return category.questions.some(q => 
      q.question.toLowerCase().includes(searchLower) || 
      q.answer.toLowerCase().includes(searchLower)
    );
  });

  const filteredQuestions = filteredData.reduce((acc, [key, category]) => {
    const filtered = category.questions.filter(q => 
      !searchTerm || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return acc + filtered.length;
  }, 0);

  // Toggle expanded state for FAQ items
  const toggleExpanded = (categoryKey, questionIndex) => {
    const key = `${categoryKey}-${questionIndex}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  // Handle chat opening
  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  // Handle search with typing animation
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  // Auto-scroll to search results
  useEffect(() => {
    if (searchTerm && filteredQuestions > 0) {
      const firstResult = document.querySelector('.faq-item');
      if (firstResult) {
        firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchTerm, filteredQuestions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Animation */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <SparklesIcon className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
            <SparklesIcon className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about Avyakta. Can't find what you're looking for? 
            <span className="text-purple-400 font-semibold"> Ask our chatbot below.</span>
          </p>
        </div>

        {/* Dynamic FAQ Count */}
        <div className="text-center mb-8 animate-fade-in-up animation-delay-200">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <LightBulbIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300 text-sm">
              Showing <span className="text-purple-400 font-semibold">{filteredQuestions}</span> FAQs from <span className="text-purple-400 font-semibold">{totalCategories}</span> categories
            </span>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-8 animate-fade-in-up animation-delay-300">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isSearching ? 'text-purple-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
            />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          </div>

        {/* Category Tabs with Icons */}
        <div className="mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                } ${category.color}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                {selectedCategory === key && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content with Smooth Animations */}
        <div className="max-w-5xl mx-auto space-y-8">
          {filteredData.map(([categoryKey, category], categoryIndex) => (
            <div 
              key={categoryKey} 
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${(categoryIndex + 1) * 100}ms` }}
            >
              {/* Category Header */}
              <div className={`inline-flex items-center space-x-4 mb-8 p-4 rounded-2xl bg-gradient-to-r ${category.color} shadow-lg`}>
                <category.icon className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>

              {/* Questions with Enhanced Animations */}
              <div className="space-y-4">
                {category.questions
                  .filter(q => !searchTerm || 
                    q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => {
                    const key = `${categoryKey}-${index}`;
                    const isExpanded = expandedItems.has(key);
                    
                    return (
                      <div 
                        key={index} 
                        className={`faq-item bg-white/5 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 ${searchTerm && (item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.answer.toLowerCase().includes(searchTerm.toLowerCase())) ? 'ring-2 ring-purple-400/50' : ''}`}
                      >
                        <button
                          onClick={() => toggleExpanded(categoryKey, index)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
                        >
                          <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-purple-300 transition-colors duration-300">
                            {item.question}
                          </h3>
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronUpIcon className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-all duration-300" />
                            )}
                          </div>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-6 pb-5">
                            <div className="pt-2 border-t border-white/10">
                              <p className="text-gray-300 leading-relaxed text-base">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results with Chatbot CTA */}
        {filteredData.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="max-w-md mx-auto">
              <ExclamationTriangleIcon className="w-20 h-20 text-gray-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-4">No questions found</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Didn't find your answer? Ask our chatbot below for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleChatOpen}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 inline mr-2" />
                  Chat with us
                </button>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
                  className="px-8 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Clear Filters
            </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Contact Support Section */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-500">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-10 border border-white/10 shadow-2xl max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Still need help?</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Our support team is here to help you 24/7. Get in touch with us for personalized assistance and guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleChatOpen}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 inline mr-2" />
                Chat with us
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 font-semibold">
                <PhoneIcon className="w-5 h-5 inline mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom FloatingActionButton with FAQ integration */}
      <FloatingActionButton 
        isChatOpen={isChatOpen}
        onChatToggle={setIsChatOpen}
      />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
};

export default FAQPage; 