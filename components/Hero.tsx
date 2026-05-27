"use client";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Hero({ data }: { data: any }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section id="hero-section" style={{
      paddingTop: "calc(62px + var(--space-xl))",
      paddingBottom: "var(--space-xl)",
      paddingLeft: "var(--pad)",
      paddingRight: "var(--pad)",
      borderBottom: "0.5px solid var(--border)",
    }}>
      {/* Headline — full width, architectural scale */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3rem, 6.5vw, 7.5rem)",
        fontWeight: 800,
        lineHeight: 0.95,
        letterSpacing: "-0.045em",
        color: "var(--ink)",
        marginBottom: "var(--space-xl)",
        maxWidth: "900px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        textWrap: "balance",
      }}>
        {/* Headline split to show red accent on last three words */}
        I design for the moment when complexity is no longer manageable and someone has to{" "}
        <span style={{ color: "var(--red)" }}>make it work.</span>
      </h1>

      {/* Below headline — 2-col asymmetric: bio wide left, role narrow right */}
      <div className="hero-sub" style={{
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        gap: "var(--space-xl)",
        alignItems: "end",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
      }}>
        <p className="hero-bio" style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
          fontWeight: 300,
          lineHeight: 1.82,
          color: "#555",
          maxWidth: "520px",
          textWrap: "pretty",
        }}>{data.heroBio}</p>

        <div className="hero-role" style={{
          borderTop: "0.5px solid var(--border)",
          paddingTop: "1.25rem",
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: "0.5rem" }}>
            {data.heroCurrentLabel || "Currently"}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5, display: "block" }}>
            {data.heroCurrentRole}<br />{data.heroCurrentCompany}
          </span>
        </div>
      </div>
    </section>
  );
}
