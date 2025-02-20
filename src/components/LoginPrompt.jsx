import React from 'react';

const LoginPrompt = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-8 rounded-lg w-1/3 shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
        <h2 className="text-2xl font-semibold mb-4 text-white">You need to log in</h2>
        <p className="text-lg mb-6 text-gray-300">Please log in first.</p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
