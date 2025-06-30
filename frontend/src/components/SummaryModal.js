import React, { useState } from 'react';

function getWeek(dateStr) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

function getMonth(dateStr) {
  return new Date(dateStr).getMonth() + 1;
}

function getYear(dateStr) {
  return new Date(dateStr).getFullYear();
}

function sumBy(arr, keyFn) {
  const sums = {};
  arr.forEach(entry => {
    const key = keyFn(entry);
    sums[key] = (sums[key] || 0) + Number(entry.hours);
  });
  return sums;
}

function unique(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a - b);
}

export default function SummaryModal({ open, onClose, companies, timeEntries }) {
  const [filterYear, setFilterYear] = useState('Alle');
  const [filterMonth, setFilterMonth] = useState('Alle');
  const [filterWeek, setFilterWeek] = useState('Alle');

  if (!open) return null;

  // Finn unike år, måneder, uker
  const years = unique(timeEntries.map(e => getYear(e.date)));
  const months = unique(timeEntries.map(e => getMonth(e.date)));
  const weeks = unique(timeEntries.map(e => getWeek(e.date)));

  // Filtrer entries
  let filteredEntries = timeEntries;
  if (filterYear !== 'Alle') filteredEntries = filteredEntries.filter(e => getYear(e.date) === Number(filterYear));
  if (filterMonth !== 'Alle') filteredEntries = filteredEntries.filter(e => getMonth(e.date) === Number(filterMonth));
  if (filterWeek !== 'Alle') filteredEntries = filteredEntries.filter(e => getWeek(e.date) === Number(filterWeek));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Lukk"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Fakturerbare timer per selskap</h2>
        {/* Filtrering */}
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-1">År</label>
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="border rounded px-2 py-1">
              <option value="Alle">Alle</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Måned</label>
            <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className="border rounded px-2 py-1">
              <option value="Alle">Alle</option>
              {months.map(m => <option key={m} value={m}>{String(m).padStart(2, '0')}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Uke</label>
            <select value={filterWeek} onChange={e => setFilterWeek(e.target.value)} className="border rounded px-2 py-1">
              <option value="Alle">Alle</option>
              {weeks.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-8">
          {companies.map(company => {
            const entries = filteredEntries.filter(e => e.companyId === company.id);
            const yearSums = sumBy(entries, e => getYear(e.date));
            const monthSums = sumBy(entries, e => `${getYear(e.date)}-${String(getMonth(e.date)).padStart(2, '0')}`);
            const weekSums = sumBy(entries, e => `${getYear(e.date)}-UKE${getWeek(e.date)}`);
            return (
              <div key={company.id} className="border-b pb-4">
                <div className="font-bold text-lg mb-2">{company.name}</div>
                <div className="mb-1 font-semibold">Sum timer pr. år:</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(yearSums).length === 0 ? <span className="text-gray-400">Ingen</span> :
                    Object.entries(yearSums).map(([year, sum]) => (
                      <span key={year} className="bg-blue-100 rounded px-2 py-1 text-sm">{year}: {sum} t</span>
                    ))}
                </div>
                <div className="mb-1 font-semibold">Sum timer pr. måned:</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(monthSums).length === 0 ? <span className="text-gray-400">Ingen</span> :
                    Object.entries(monthSums).map(([month, sum]) => (
                      <span key={month} className="bg-green-100 rounded px-2 py-1 text-sm">{month}: {sum} t</span>
                    ))}
                </div>
                <div className="mb-1 font-semibold">Sum timer pr. uke:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(weekSums).length === 0 ? <span className="text-gray-400">Ingen</span> :
                    Object.entries(weekSums).map(([week, sum]) => (
                      <span key={week} className="bg-yellow-100 rounded px-2 py-1 text-sm">{week}: {sum} t</span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 