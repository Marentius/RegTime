'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// I en ekte applikasjon burde dette passordet vært lagret sikkert,
// f.eks. i en miljøvariabel på serveren.
const VERY_SIMPLE_PASSWORD = 'karlseneirik';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === VERY_SIMPLE_PASSWORD) {
      try {
        // For denne enkle løsningen, setter vi en verdi i nettleserens `localStorage`
        // for å "huske" at brukeren er logget inn.
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/');
      } catch (err) {
        setError('Kunne ikke logge inn. Sjekk at cookies er skrudd på i nettleseren din.');
      }
    } else {
      setError('Feil passord. Prøv igjen.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 bg-white bg-opacity-75 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Vennligst logg inn</h1>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2 font-semibold">
            Passord
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Gå inn
        </button>
      </form>
    </div>
  );
} 