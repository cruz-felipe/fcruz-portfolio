"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(pct);
      setAtBottom(pct > 90);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Progress bar — lives inside the 2px red rule at top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px",
        zIndex: 9999, pointerEvents: "none", background: "rgba(13,13,13,0.15)",
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "var(--red)",
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Back to top — square, Bauhaus */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed", bottom: "2rem", right: "2rem",
          width: "36px", height: "36px",
          background: "var(--ink)", color: "var(--white)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: atBottom ? 1 : 0,
          pointerEvents: atBottom ? "auto" : "none",
          transform: atBottom ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          zIndex: 998,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
        </svg>
      </button>
    </>
  );
}
