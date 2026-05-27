"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Footer({ data }: { data: any }) {
  const year = new Date().getFullYear();
  const email = data?.contactEmail || "fcruz@outlook.com";
  const linkedin = data?.contactLinkedIn || "https://linkedin.com/in/fmcruz";
  const illustration = data?.contactIllustration || "https://www.artstation.com/felipecruz";
  const tagline = data?.footerTagline || "Senior UI Designer · Team Lead · São Paulo, Brazil";

  return (
    <footer id="contact" aria-label="Contact and links" style={{ borderTop: "0.5px solid var(--border)" }}>
      <div style={{ padding: "var(--space-xl) var(--pad) var(--space-lg)" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: "1.5rem" }}>Contact</span>

        {/* Email as primary CTA — massive, hovers red */}
        <a href={`mailto:${email}`} style={{
          display: "block", fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 6.5rem)", fontWeight: 800,
          letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)",
          textDecoration: "none", marginBottom: "var(--space-lg)",
          transition: "color 0.2s", width: "fit-content",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
        >
          Get in touch.
        </a>

        {/* Links row */}
        <div className="footer-cta-row" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <a href={`mailto:${email}`} style={{
            fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
            color: "white", background: "var(--ink)", textDecoration: "none", padding: "10px 20px", transition: "background 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
          >Send email</a>

          <span className="footer-cta-divider" style={{ width: "1px", height: "20px", background: "var(--border)", flexShrink: 0 }} />

          {[{ label: "LinkedIn", href: linkedin }, { label: "Illustration", href: illustration }].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--muted)", textDecoration: "none", padding: "10px 0", borderBottom: "0.5px solid var(--border)",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >{label}</a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom" style={{ borderTop: "0.5px solid var(--border)", padding: "1.25rem var(--pad)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <img src="/logo.svg" alt="Felipe Cruz" style={{ height: "18px", width: "auto", display: "block" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--faint)" }}>{tagline}</span>
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--faint)" }}>© {year}</span>
      </div>
    </footer>
  );
}
