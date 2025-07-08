import React, { useState, useEffect } from 'react';
import { PhoneIcon, ExclamationTriangleIcon, XMarkIcon, InformationCircleIcon, ShieldCheckIcon, HeartIcon, FireIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';

const emergencyNumbers = [
  { 
    number: '112', 
    label: 'All-in-one Emergency Services', 
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    description: 'National emergency number for all services',
    priority: 1,
    color: 'bg-red-600'
  },
  { 
    number: '1091', 
    label: "Women's Helpline", 
    icon: <UserIcon className="h-6 w-6" />,
    description: '24/7 support for women in distress',
    priority: 2,
    color: 'bg-pink-600'
  },
  { 
    number: '1098', 
    label: 'Child Helpline', 
    icon: <UserGroupIcon className="h-6 w-6" />,
    description: 'Emergency support for children',
    priority: 2,
    color: 'bg-blue-600'
  },
  { 
    number: '100', 
    label: 'Police', 
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    description: 'Police emergency services',
    priority: 3,
    color: 'bg-indigo-600'
  },
  { 
    number: '101', 
    label: 'Fire', 
    icon: <FireIcon className="h-6 w-6" />,
    description: 'Fire and rescue services',
    priority: 3,
    color: 'bg-orange-600'
  },
  { 
    number: '102', 
    label: 'Ambulance', 
    icon: <HeartIcon className="h-6 w-6" />,
    description: 'Medical emergency services',
    priority: 3,
    color: 'bg-green-600'
  },
  { 
    number: '181', 
    label: "Women's Help (State-specific)", 
    icon: <UserIcon className="h-6 w-6" />,
    description: 'State-specific women helpline',
    priority: 4,
    color: 'bg-purple-600'
  },
];

const EmergencyHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const toggleSticky = () => {
    setIsSticky(!isSticky);
  };

  const EmergencyButton = ({ item }) => (
    <button
      onClick={() => handleCall(item.number)}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 animate-fade-in`}
      aria-label={`Call ${item.label} at ${item.number}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${item.color} shadow-md group-hover:shadow-lg transition-all duration-300`}>
          <div className="text-white">{item.icon}</div>
        </div>
        <div className="text-left">
          <p className={`font-bold text-xl ${item.color.replace('bg', 'text')}`}>{item.number}</p>
          <p className="text-gray-800 font-semibold text-base">{item.label}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${item.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
          <PhoneIcon className={`h-5 w-5 ${item.color.replace('bg', 'text')} group-hover:scale-110 transition-transform duration-200`} />
        </div>
        <span className={`text-sm font-medium hidden md:inline ${item.color.replace('bg', 'text')}`}>Call Now</span>
      </div>
    </button>
  );

  const EmergencyList = () => (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      {emergencyNumbers
        .sort((a, b) => a.priority - b.priority)
        .map((item, index) => (
          <div key={item.number} style={{ animationDelay: `${index * 0.1}s` }}>
            <EmergencyButton item={item} />
          </div>
        ))}
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 px-4 py-3 rounded-full group animate-pulse"
        aria-label="Open Emergency Help"
      >
        <div className="relative">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full animate-ping"></span>
        </div>
        <span className="hidden md:inline-block font-semibold text-base">Emergency Help</span>
      </button>

      {/* Sticky Sidebar */}
      {isSticky && !isMobile && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-2xl rounded-l-xl p-6 z-40 w-80 border-l-4 border-red-500 animate-slide-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-red-600">Emergency Help</h3>
            <button
              onClick={toggleSticky}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close Emergency Help"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <EmergencyList />
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white relative rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Emergency Help</h2>
                  <p className="text-red-100 text-base">
                    If you or someone is in danger or distress, don't hesitate to call these helplines immediately.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isMobile && (
                    <button
                      onClick={toggleSticky}
                      className="text-white hover:text-red-100 p-2 hover:bg-red-600 rounded-full transition-colors duration-200"
                      aria-label="Pin Emergency Help"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 4.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V4.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-red-100 p-2 hover:bg-red-600 rounded-full transition-colors duration-200"
                    aria-label="Close Emergency Help"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency Numbers */}
            <div className="p-6">
              <EmergencyList />
              {/* WhatsApp Emergency Contact */}
              <div className="mt-8 flex flex-col items-center">
                <a
                  href="https://wa.me/916299446452?text=Hello%20Avyakta%20Support%2C%20I%20need%20emergency%20help."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg text-lg transition mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.13 12.13 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.7 0-3.37-.44-4.83-1.28l-.35-.2-3.69.97.99-3.59-.22-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3s.99 2.67 1.13 2.85c.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.17 1.26.15 1.73.09.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
                  WhatsApp: Chat Now
                </a>
                <span className="text-sm text-gray-500 mt-2 text-center">You will be redirected to WhatsApp to chat with Avyakta Support for emergency help.</span>
              </div>
            </div>

            {/* Info Tooltip */}
            <div className="px-6 pb-6 border-t border-gray-200">
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Need more information?</span>
                </div>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                >
                  {showInfo ? 'Hide' : 'Show'} Details
                </button>
              </div>
              
              {showInfo && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-fade-in">
                  <h4 className="font-semibold text-blue-900 mb-2">Emergency Guidelines:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Stay calm and assess the situation</li>
                    <li>• Call emergency services immediately if needed</li>
                    <li>• Provide clear location and situation details</li>
                    <li>• Follow instructions from emergency responders</li>
                    <li>• Stay on the line until help arrives</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyHelp; 