"use client";

import { useEffect } from "react";

const PORTFOLIO_BG = "#070b13";

/**
 * Overrides the body background color for the portfolio route.
 * On mount, sets body to the dark portfolio color; on unmount, restores the sky blue.
 */
export default function PortfolioBodyStyle() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = PORTFOLIO_BG;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return null;
}
