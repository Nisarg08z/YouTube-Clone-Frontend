import React from 'react';

const StatCard = ({ title, value }) => (
    <div className="p-4 bg-gray-900 rounded-lg text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default StatCard;