export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#ededed",
        fontFamily: "var(--font-inter), Arial, Helvetica, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "700",
          margin: "0",
          lineHeight: "1",
          fontFamily: "var(--font-syne), system-ui, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          margin: "1rem 0 2rem",
          color: "#a0a0a0",
        }}
      >
        Page not found
      </p>
      <a
        href="/"
        style={{
          color: "#87ceeb",
          textDecoration: "none",
          fontSize: "1rem",
          borderBottom: "1px solid #87ceeb",
          paddingBottom: "2px",
        }}
      >
        ← Back to home
      </a>
    </div>
  );
}
