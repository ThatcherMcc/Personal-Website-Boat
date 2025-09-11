"use client";

import { useEffect } from "react";

export default function AllowScroll() {
  useEffect(() => {
    // Add the class to the body when the component mounts
    document.body.classList.add("allow-scroll");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("allow-scroll");
    };
  }, []);

  return null;
}
