import ThemeRegistry from '@/components/ThemeRegistry';
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "RegTime - Timeføring System",
  description: "Enkel timeføring for testing av backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no" className={inter.variable}>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
