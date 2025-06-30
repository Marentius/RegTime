import React from 'react';

export default function CompanyCard({ name, onClick, onDelete }) {
  // Forhindre at klikk på sletteknappen også utløser 'onClick' på kortet
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Stopper event-bobling
    onDelete();
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition relative"
      onClick={onClick}
    >
      <button
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Slett selskap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <span className="text-xl font-semibold mb-2">{name}</span>
    </div>
  );
} 