"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 80) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  const links = [
    { label: "Work", href: "work" },
    { label: "About", href: "about" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      {/* Progress line — red, 2px, fixed top */}
      <div style={{ height: "2px", background: "var(--red)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }} />

      <nav
        role="navigation"
        aria-label="Primary navigation"
        style={{
          position: "fixed", top: "2px", left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 var(--pad)",
          height: "56px",
          background: scrolled ? "rgba(245,244,240,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "0.5px solid var(--border)" : "0.5px solid transparent",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Wordmark — condensed, geometric */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", zIndex: 101 }}
        >
          {/* Bauhaus mark: F + C initials in a square grid */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect width="24" height="24" fill="var(--ink)" />
            <rect x="5" y="5" width="2" height="14" fill="var(--white)" />
            <rect x="5" y="5" width="9" height="2" fill="var(--white)" />
            <rect x="5" y="11" width="7" height="2" fill="var(--red)" />
            <rect x="15" y="5" width="2" height="7" fill="var(--white)" />
            <rect x="13" y="5" width="6" height="2" fill="var(--white)" />
            <rect x="13" y="17" width="6" height="2" fill="var(--white)" />
          </svg>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink)",
          }}>
            Felipe Cruz
          </span>
        </Link>

        {/* Desktop nav — mono, uppercase, small */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          {links.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.15s",
                padding: "4px 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ display: "none", background: "none", border: "none", padding: "4px", cursor: "pointer", zIndex: 101 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M3 3l14 14M17 3L3 17" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="square" />
            ) : (
              <>
                <line x1="2" y1="6" x2="18" y2="6" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="square" />
                <line x1="2" y1="10" x2="14" y2="10" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="square" />
                <line x1="2" y1="14" x2="18" y2="14" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="square" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu — full screen, geometric */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "var(--ink)",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            padding: "var(--pad)",
          }}
          onClick={() => setMenuOpen(false)}
        >
          {/* Red accent bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--red)" }} />
          {links.map(({ label, href }, i) => (
            <button
              key={label}
              onClick={() => { scrollTo(href); setMenuOpen(false); }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 12vw, 5.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--white)",
                background: "none", border: "none",
                padding: "0.5rem 0",
                textAlign: "left",
                cursor: "pointer",
                lineHeight: 1.05,
                opacity: 0,
                animation: `menuIn 0.35s ease ${i * 70}ms forwards`,
                width: "100%",
              }}
            >
              <span style={{ color: "var(--red)", fontFamily: "var(--font-mono)", fontSize: "0.18em", verticalAlign: "middle", letterSpacing: "0.1em", marginRight: "1rem" }}>
                0{i + 1}
              </span>
              {label}
            </button>
          ))}
          <style>{`
            @keyframes menuIn {
              from { opacity: 0; transform: translateX(-16px); }
              to   { opacity: 1; transform: translateX(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
