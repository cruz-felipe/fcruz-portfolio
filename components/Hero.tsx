"use client";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Hero({ data }: { data: any }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section
      id="hero-section"
      style={{
        paddingTop: "calc(58px + var(--space-xl))",
        paddingBottom: "0",
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        borderBottom: "0.5px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid — Bauhaus constructivist geometry */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0, width: "40%", height: "100%",
        pointerEvents: "none", zIndex: 0, overflow: "hidden", opacity: 0.03,
      }}>
        {/* Vertical rule grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            position: "absolute",
            left: `${i * 25}%`,
            top: 0, bottom: 0,
            width: "0.5px",
            background: "var(--ink)",
          }} />
        ))}
        {/* Horizontal rule grid */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} style={{
            position: "absolute",
            top: `${i * 14.28}%`,
            left: 0, right: 0,
            height: "0.5px",
            background: "var(--ink)",
          }} />
        ))}
      </div>

      {/* Large geometric red rectangle — Bauhaus primary shape accent */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "calc(58px + var(--space-xl))",
        right: "var(--pad)",
        width: "3px",
        height: "120px",
        background: "var(--red)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.9s",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Headline — condensed weight, architectural */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 6vw, 7rem)",
            fontWeight: 800,
            lineHeight: 0.94,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: "var(--space-xl)",
            maxWidth: "980px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(0.16,1,0.3,1)",
            textWrap: "balance",
          }}
        >
          I design for the moment when complexity is no longer manageable and someone has to{" "}
          <span style={{ color: "var(--red)" }}>make it work.</span>
        </h1>

        {/* Below headline — 2-col grid */}
        <div
          className="hero-sub"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "0",
            alignItems: "stretch",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          <div style={{ paddingTop: "1.75rem", paddingBottom: "1.75rem", paddingRight: "3rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.88rem, 1vw, 0.97rem)",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "#555",
                maxWidth: "540px",
                textWrap: "pretty",
              }}
            >
              {data.heroBio}
            </p>
          </div>

          {/* Role block — separated by vertical rule */}
          <div style={{
            borderLeft: "0.5px solid var(--border)",
            paddingLeft: "2.5rem",
            paddingTop: "1.75rem",
            paddingBottom: "1.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--faint)",
                display: "block",
                marginBottom: "0.75rem",
              }}>
                {data.heroCurrentLabel || "Currently"}
              </span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.45,
                display: "block",
                letterSpacing: "0",
              }}>
                {data.heroCurrentRole}
              </span>
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 400,
                color: "var(--muted)",
                display: "block",
                marginTop: "0.25rem",
              }}>
                {data.heroCurrentCompany}
              </span>
            </div>

            {/* Bauhaus stripe */}
            <div style={{ display: "flex", gap: "4px", marginTop: "1.5rem" }}>
              <div style={{ width: "24px", height: "3px", background: "var(--red)" }} />
              <div style={{ width: "8px", height: "3px", background: "var(--ink)", opacity: 0.2 }} />
              <div style={{ width: "8px", height: "3px", background: "var(--ink)", opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
