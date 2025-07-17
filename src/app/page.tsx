// src/app/page.tsx
// This is your main homepage content. The weather/ocean visuals are handled by CSS on the <body>.

export default function HomePage() {
  return (
    <main className="flex-col relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <h1 className="text-6xl font-bold text-white z-20 drop-shadow-lg">
        Captain's Log
      </h1>
      <img src="/NewBoat.png" style={{width: '50%', height: '50%'}}/>
    </main>
  );
}