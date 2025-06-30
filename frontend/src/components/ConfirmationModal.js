import React from 'react';

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Bekreft',
  cancelText = 'Avbryt',
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-gray-600 mb-6">{children}</div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sletter...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
} 