import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  PhoneIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [isSearching, setIsSearching] = useState(false);

  const categories = {
    all: { name: 'All Questions', icon: <InformationCircleIcon className="w-5 h-5" /> },
    general: { name: 'General', icon: <InformationCircleIcon className="w-5 h-5" /> },
    process: { name: 'Case Process', icon: <DocumentTextIcon className="w-5 h-5" /> },
    privacy: { name: 'Privacy', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    support: { name: 'Support', icon: <PhoneIcon className="w-5 h-5" /> },
    help: { name: 'How to Help', icon: <HeartIcon className="w-5 h-5" /> }
  };

  const faqData = {
    general: {
      title: 'General Information',
      icon: InformationCircleIcon,
      questions: [
        {
          question: 'What is Avyakta?',
          answer: 'Avyakta is a humanitarian platform dedicated to identifying unclaimed bodies and helping families find their missing loved ones. We use technology to bridge the gap between law enforcement, hospitals, and grieving families.'
        },
        {
          question: 'How much does it cost to use Avyakta?',
          answer: 'All our services are completely free. We operate as a humanitarian organization supported by donations, grants, and volunteers.'
        },
        {
          question: 'Is Avyakta a government agency?',
          answer: 'No, we are an independent NGO that works in close collaboration with police departments, hospitals, and government agencies to facilitate the identification process.'
        }
      ]
    },
    process: {
      title: 'Case Management',
      icon: DocumentTextIcon,
      questions: [
        {
          question: 'How long does it take to process a case?',
          answer: 'Emergency Cases take immediate action (within hours); Standard Cases take 24-48 hours. The timeline depends on available information and local jurisdiction cooperation.'
        },
        {
          question: 'How do I track my reported case?',
          answer: 'You can use the Track Report feature on our website by entering the unique Case ID you received. You can also contact our support team.'
        },
        {
          question: 'Who handles the investigation after I submit a report?',
          answer: 'The primary investigation is managed by local police and authorities. Avyakta acts as a facilitating platform to organize, match, and escalate cases where necessary.'
        }
      ]
    },
    privacy: {
      title: 'Privacy & Security',
      icon: ShieldCheckIcon,
      questions: [
        {
          question: 'Is my identity protected?',
          answer: 'Absolutely. We use high-level encryption and offer completely anonymous reporting. Your data is not shared without consent.'
        },
        {
          question: 'Is my location shared automatically?',
          answer: 'No. You can manually enter your location or choose to use GPS. Precise coordinates are only used for the investigation.'
        }
      ]
    },
    support: {
      title: 'Support & Contact',
      icon: PhoneIcon,
      questions: [
        {
          question: 'How can I contact Avyakta support?',
          answer: 'You can reach us 24/7 via the helpline on our Contact page or use the live chat feature below.'
        },
        {
          question: 'Do you offer 24/7 help in emergencies?',
          answer: 'Yes, our emergency hotline and response protocols are active 24/7 to handle critical cases immediately.'
        }
      ]
    },
    help: {
      title: 'How You Can Help',
      icon: HeartIcon,
      questions: [
        {
          question: 'How can I help Avyakta?',
          answer: 'You can volunteer, spread awareness, report suspicious cases, or donate. We welcome technical, legal, and medical volunteers.'
        },
        {
          question: 'Are there success stories?',
          answer: 'Yes! Over 38 lives have been directly impacted or reunited. Due to privacy, we do not publicly share specific details, but the impact is real.'
        }
      ]
    }
  };

  const filteredData = Object.entries(faqData).filter(([key, category]) => {
    if (selectedCategory !== 'all' && key !== selectedCategory) return false;
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return category.questions.some(q => 
      q.question.toLowerCase().includes(searchLower) || 
      q.answer.toLowerCase().includes(searchLower)
    );
  });

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 section-light">
      <div className="container-responsive py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-merriweather font-bold mb-4" style={{ color: 'var(--navy)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-mid)' }}>
            Find answers to common questions. Can't find what you're looking for? 
            <button onClick={() => window.dispatchEvent(new Event('open-chat'))} className="ml-1 font-semibold hover:underline" style={{ color: 'var(--teal)' }}>
              Ask our chatbot.
            </button>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center bg-white border rounded-xl overflow-hidden shadow-sm transition-all focus-within:ring-2 focus-within:ring-teal-500" style={{ borderColor: '#CBD5E0' }}>
            <div className="pl-4">
              <MagnifyingGlassIcon className={`w-5 h-5 ${isSearching ? 'text-teal-600' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 outline-none bg-transparent"
              style={{ color: 'var(--text-dark)' }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="pr-4 text-gray-400 hover:text-gray-600">
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === key 
                  ? 'bg-navy text-white shadow-md' 
                  : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
              style={{ 
                background: selectedCategory === key ? 'var(--navy)' : '#fff',
                color: selectedCategory === key ? '#fff' : 'var(--text-mid)',
                borderColor: '#E2E8F0'
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredData.length > 0 ? (
            filteredData.map(([categoryKey, category]) => (
              <div key={categoryKey} className="inst-card">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(46,125,156,0.1)' }}>
                    <category.icon className="w-6 h-6" style={{ color: 'var(--teal)' }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--navy)' }}>{category.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {category.questions
                    .filter(q => !searchTerm || 
                      q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, index) => {
                      const key = `${categoryKey}-${index}`;
                      const isExpanded = expandedItems.has(key);
                      
                      return (
                        <div key={index} className="border rounded-xl transition-all" style={{ borderColor: isExpanded ? 'var(--teal)' : '#E2E8F0', background: isExpanded ? 'var(--warm-white)' : '#fff' }}>
                          <button
                            onClick={() => toggleExpanded(categoryKey, index)}
                            className="w-full px-5 py-4 flex justify-between items-center text-left"
                          >
                            <span className="font-semibold" style={{ color: 'var(--navy)' }}>{item.question}</span>
                            {isExpanded ? (
                              <ChevronUpIcon className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-5 pb-4 text-sm" style={{ color: 'var(--text-mid)' }}>
                              <p className="pt-2 border-t border-gray-100">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 inst-card">
              <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--amber-warn)' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy)' }}>No questions found</h3>
              <p className="mb-6" style={{ color: 'var(--text-mid)' }}>We couldn't find any FAQs matching your search.</p>
              <button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Support Footer */}
        <div className="mt-16 max-w-3xl mx-auto inst-card text-center" style={{ background: 'rgba(46,125,156,0.05)' }}>
          <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>Still need help?</h3>
          <p className="mb-6" style={{ color: 'var(--text-mid)' }}>Our support team is here to help you. Get in touch with us for personalized assistance.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => window.dispatchEvent(new Event('open-chat'))} className="btn-primary">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" /> Chat with us
            </button>
            <a href="/contact" className="btn-secondary">
              <PhoneIcon className="w-5 h-5 mr-2" /> Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;