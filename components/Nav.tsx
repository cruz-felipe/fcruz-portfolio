"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 80) setMenuOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  const links = [
    { label: "Work", href: "work" },
    { label: "About", href: "about" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      {/* 2px red rule — the only decoration on the page */}
      <div style={{ height: "2px", background: "var(--red)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 101 }} />

      <nav role="navigation" aria-label="Primary navigation" style={{
        position: "fixed", top: "2px", left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 var(--pad)",
        height: "60px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: menuOpen ? "0.5px solid var(--border)" : "0.5px solid transparent",
      }}>
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 101 }}>
          <img src="/logo.svg" alt="Felipe Cruz" style={{ height: "24px", width: "auto", display: "block" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink)" }}>
            Felipe Cruz
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          {links.map(({ label, href }) => (
            <button key={label} onClick={() => scrollTo(href)} style={{
              fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--muted)", background: "none", border: "none",
              cursor: "pointer", transition: "color 0.2s", padding: "4px 0",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >{label}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ display: "none", background: "none", border: "none", padding: "4px", cursor: "pointer", zIndex: 101 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="13" x2="14" y2="13" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "var(--white)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--pad)" }}
          onClick={() => setMenuOpen(false)}>
          {links.map(({ label, href }, i) => (
            <button key={label} onClick={() => { scrollTo(href); setMenuOpen(false); }}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 10vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", background: "none", border: "none", padding: "0.75rem 0", textAlign: "left", cursor: "pointer", lineHeight: 1.1, opacity: 0, animation: `fadeUp 0.4s ease ${i * 80}ms forwards`, width: "100%" }}>
              {label}
            </button>
          ))}
          <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}
    </>
  );
}
