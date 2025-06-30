import React from 'react';
import CompanySelect from './CompanySelect';

export default function RegisterTimeModal({ open, onClose, onSubmit, companies, values, onChange, loading, error }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Lukk"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Registrer timer</h2>
        {error && <div className="mb-2 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selskap</label>
            <CompanySelect companies={companies} value={values.companyId} onChange={e => onChange('companyId', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beskrivelse</label>
            <textarea
              value={values.description}
              onChange={e => onChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timer</label>
            <input
              type="number"
              step="0.5"
              value={values.hours}
              onChange={e => onChange('hours', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dato</label>
            <input
              type="date"
              value={values.date}
              onChange={e => onChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Lagrer...' : 'Registrer timeføring'}
          </button>
        </form>
      </div>
    </div>
  );
} 