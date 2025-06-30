'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
    if (!userId) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return null; // evt. en loader/spinner
  }

  return <>{children}</>;
} 