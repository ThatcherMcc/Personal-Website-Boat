// src/app/layout.tsx
'use client';

import './globals.css';
import WaveBackground from 'rt/components/WeatherUpdater';
import MyBoat from 'rt/components/Boat';

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      
      <body>
        <WaveBackground />
        <MyBoat />
        {children}
      </body>
    </html>
  );
}