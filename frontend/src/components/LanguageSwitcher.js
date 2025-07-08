import React, { useState } from 'react';

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [showModal, setShowModal] = useState(false);
    const [newLanguage, setNewLanguage] = useState('');

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        if (selectedLanguage !== currentLanguage) {
            setNewLanguage(selectedLanguage);
            setShowModal(true);
        }
    };

    const handleConfirm = () => {
        setCurrentLanguage(newLanguage);
        setShowModal(false);
        // Here you would typically implement the actual language switch
        // For example, using i18next or your preferred internationalization solution
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="relative">
            <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
            </select>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h2 className="text-xl font-semibold mb-4">Language Switch Confirmation</h2>
                        <p className="mb-6">
                            {newLanguage === 'hi'
                                ? 'We\'ll take you to the Hindi version of the site. Would you like to continue?'
                                : 'We\'ll take you to the English version of the site. Would you like to continue?'}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            >
                                Yes, Switch
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher; 