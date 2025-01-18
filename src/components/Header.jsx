import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 p-2 mr-4 bg-gray-800 text-white rounded outline-none"
      />
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-purple-600 text-white rounded">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
