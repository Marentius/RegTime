import React from 'react';

export default function CompanyCard({ name, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <span className="text-xl font-semibold mb-2">{name}</span>
    </div>
  );
} 