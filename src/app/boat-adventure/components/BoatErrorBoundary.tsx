"use client";

import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class BoatErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[BoatAdventure] Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #1a3a5c 0%, #0d2137 100%)",
            color: "#b8d4e8",
            fontFamily: "Arial, Helvetica, sans-serif",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚓</div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#e0f0ff",
              marginBottom: "0.75rem",
            }}
          >
            The seas are rough today
          </h2>
          <p style={{ maxWidth: "360px", lineHeight: 1.6, opacity: 0.85 }}>
            Something went adrift. Try refreshing the page to get back on course.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1.5rem",
              padding: "0.6rem 1.4rem",
              borderRadius: "0.5rem",
              border: "1px solid #4a90b8",
              background: "rgba(74, 144, 184, 0.2)",
              color: "#e0f0ff",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Set Sail Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
