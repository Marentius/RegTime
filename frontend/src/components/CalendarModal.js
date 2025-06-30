import React from 'react';
import { getDaysInMonth, getFirstDayOfWeek } from '../lib/utils';

export default function CalendarModal({ open, onClose, timeEntries, currentDate, onDateChange }) {
  if (!open) return null;

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = getFirstDayOfWeek(month, year);

  // Lag et map: dato (yyyy-mm-dd) -> array av timeføringer
  const entriesByDate = {};
  timeEntries.forEach(entry => {
    if (!entriesByDate[entry.date]) entriesByDate[entry.date] = [];
    entriesByDate[entry.date].push(entry);
  });

  // Lag array med alle dagene i måneden
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({
      day: i,
      dateStr,
      entries: entriesByDate[dateStr] || [],
    });
  }

  // Fyll ut tomme celler før første dag
  const blanks = Array(firstDayOfWeek).fill(null);
  const calendarCells = [...blanks, ...days];

  const handlePrevMonth = () => {
    onDateChange(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(year, month + 1, 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Lukk"
        >
          &times;
        </button>
        <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-200 rounded">&lt; Forrige</button>
            <h2 className="text-2xl font-bold">
            {currentDate.toLocaleString('no-NO', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-200 rounded">Neste &gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"].map((d) => (
            <div key={d} className="text-center font-semibold text-gray-700 mb-2">{d}</div>
          ))}
          {calendarCells.map((cell, idx) =>
            cell ? (
              <div key={idx} className="border rounded min-h-[90px] p-1 align-top bg-gray-50">
                <div className="font-bold text-xs mb-1">{cell.day}</div>
                <ul className="space-y-1">
                  {cell.entries.map((entry) => (
                    <li key={entry.id} className="text-xs bg-blue-100 rounded px-1 py-0.5" title={`${entry.companyName}: ${entry.description}`}>
                      <span className="font-semibold">{entry.hours}t</span> - {entry.companyName}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div key={idx}></div>
            )
          )}
        </div>
      </div>
    </div>
  );
} 