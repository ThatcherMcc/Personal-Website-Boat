// src/app/layout.tsx
'use client';

import './globals.css';
import WaveBackground from 'rt/components/WaveBackground';
import MyBoat from 'rt/components/Boat';
import { WeatherProvider } from 'rt/components/WeatherProvider';

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      
      <body>
        <WeatherProvider>
          {children}
          <WaveBackground />
          <MyBoat />
        </WeatherProvider>
      </body>
    </html>
  );
}