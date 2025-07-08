import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{title}</h2>}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal; 