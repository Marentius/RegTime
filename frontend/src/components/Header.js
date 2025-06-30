import React from 'react';

export default function Header({ onOversikt, onRegistrere, onKalender, onSummering, onAddCompany }) {
  return (
    <header className="flex flex-wrap gap-4 justify-between items-center mb-8 w-full">
      <div className="flex gap-4 flex-wrap w-full justify-between items-center">
        <div className="flex gap-4 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded font-semibold" onClick={onOversikt}>OVERSIKT</button>
          <button className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onRegistrere}>REGISTRERE</button>
          <button className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onKalender}>KALENDER</button>
          <button className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onSummering}>SUMMERING (KLART TIL FAKTURERING)</button>
        </div>
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