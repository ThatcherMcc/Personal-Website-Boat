// src/app/layout.tsx
'use client'; // This layout itself needs to be a client component to use useState

import { useState } from 'react'; // Import useState
import './globals.css';
import WaveBackground from 'rt/components/WeatherUpdater';

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      
      <body>
        <WaveBackground />

        {children}
      </body>
    </html>
  );
}