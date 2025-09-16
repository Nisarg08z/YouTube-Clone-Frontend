import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <p className="text-gray-400 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link to="/">
        <button className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition">Go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;


