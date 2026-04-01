'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
