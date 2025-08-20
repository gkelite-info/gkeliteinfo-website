"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 800, // animation duration
        once: true,    // run animation only once
      });
    }
  }, []);

  return <>{children}</>;
}
