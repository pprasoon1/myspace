import './globals.css';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Portfolio Blog App',
  description: 'Personal portfolio and blog with chat',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
