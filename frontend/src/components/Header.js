import React from 'react';

export default function Header({ onOversikt, onRegistrere, onKalender, onSummering, onAddCompany }) {
  return (
    <header className="mb-8 w-full bg-white bg-opacity-50 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4 justify-between items-center w-full">
        <button className="px-4 py-2 bg-blue-600 text-white rounded font-semibold" onClick={onOversikt}>OVERSIKT</button>
        <button className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onRegistrere}>REGISTRERE</button>
        <button className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onKalender}>KALENDER</button>
        <button className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onSummering}>SUMMERING (KLART TIL FAKTURERING)</button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
          onClick={onAddCompany}
        >
          Legg til selskap
        </button>
      </div>
    </header>
  );
} 
