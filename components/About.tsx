"use client";
import { useRef, useEffect, useState } from "react";

function useVisible(threshold = 0.06) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function About({ data }: { data: any }) {
  const { ref, visible } = useVisible();

  const skills: string[] = data.skills || [];
  const experience: Array<{ role: string; company: string; period: string; note: string }> = data.experience || [];
  const education: Array<{ degree: string; school: string }> = data.education || [];

  return (
    <section
      id="about"
      aria-label="About Felipe Cruz"
      ref={ref}
      style={{
        padding: "var(--space-xl) var(--pad)",
        borderTop: "0.5px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "4rem" }}>
        <div style={{ width: "20px", height: "2px", background: "var(--red)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)",
        }}>
          About
        </span>
      </div>

      {/* Photo + Bio */}
      <div className="about-top" style={{ alignItems: "flex-start" }}>
        <div className="about-photo-col">
          <div style={{
            width: "100%", maxWidth: "260px",
            position: "relative",
            overflow: "hidden",
          }}>
            <img
              src="/photo.jpg"
              alt="Felipe Cruz sketching in Tiradentes, Brazil"
              style={{
                width: "100%", display: "block",
                objectFit: "cover", objectPosition: "center top",
                aspectRatio: "3/4",
              }}
            />
            {/* Red rule at bottom of photo — Bauhaus accent */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "var(--red)" }} />
          </div>
        </div>

        <div className="about-bio-col" style={{ maxWidth: "740px" }}>
          {/* H2 — large, condensed, Bauhaus weight */}
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
            fontWeight: 800, letterSpacing: "-0.03em",
            lineHeight: 1, color: "var(--ink)",
            marginBottom: "2.5rem",
          }}>
            Felipe Cruz
          </h2>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.95rem, 1.3vw, 1.08rem)",
            fontWeight: 300, lineHeight: 1.78,
            color: "var(--ink)", marginBottom: "1.25rem", opacity: 0.88,
            textWrap: "pretty",
          }}>
            {data.aboutBio1}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px", fontWeight: 300, lineHeight: 1.78,
            color: "var(--ink)", opacity: 0.70, marginBottom: "1.25rem",
            textWrap: "pretty",
          }}>
            {data.aboutBio2}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px", fontWeight: 300, lineHeight: 1.78,
            color: "var(--ink)", opacity: 0.70, marginBottom: "2.5rem",
            textWrap: "pretty",
          }}>
            {data.aboutBio3}
          </p>

          {/* Beyond label */}
          <div style={{
            display: "flex", alignItems: "center", gap: "1rem",
            marginBottom: "1.25rem",
          }}>
            <div style={{ width: "14px", height: "2px", background: "var(--red)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)",
            }}>
              {data.aboutBeyondLabel || "Beyond the work"}
            </span>
          </div>

          {[data.aboutBeyond1, data.aboutBeyond2, data.aboutBeyond3].filter(Boolean).map((text: string, i: number) => (
            <p key={i} style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px", fontWeight: 300, lineHeight: 1.78,
              color: "var(--ink)", opacity: 0.68,
              marginBottom: i < 2 ? "1rem" : "2.5rem",
              textWrap: "pretty",
            }}>
              {text}
            </p>
          ))}

          {/* Skills grid */}
          <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "14px", height: "2px", background: "var(--red)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)",
            }}>
              Expertise
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {skills.map((skill: string) => (
              <span key={skill} style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                fontWeight: 400, letterSpacing: "0.04em",
                color: "var(--ink)",
                background: "rgba(13,13,13,0.05)",
                border: "0.5px solid var(--border-heavy)",
                padding: "4px 10px",
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience + Education */}
      <div
        className="about-bottom"
        style={{
          marginTop: "4rem",
          paddingTop: "var(--space-lg)",
          borderTop: "0.5px solid var(--border)",
        }}
      >
        {/* Experience */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
            <div style={{ width: "14px", height: "2px", background: "var(--red)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)",
            }}>
              Experience
            </span>
          </div>
          {experience.map((job, i) => (
            <div key={i} className="experience-entry" style={{
              display: "grid", gridTemplateColumns: "1fr auto",
              gap: "1rem", padding: "1.4rem 0",
              borderBottom: i < experience.length - 1 ? "0.5px solid var(--border)" : "none",
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "14px",
                  fontWeight: 700, color: "var(--ink)", marginBottom: "0.15rem",
                  letterSpacing: "0",
                }}>
                  {job.role}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: "12px",
                  color: "var(--red)", marginBottom: "0.35rem",
                  fontWeight: 500,
                }}>
                  {job.company}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: "var(--ink)", opacity: 0.6,
                  lineHeight: 1.55,
                  textWrap: "pretty",
                }}>
                  {job.note}
                </div>
              </div>
              <span className="experience-period" style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                color: "var(--faint)", whiteSpace: "nowrap", paddingTop: "2px",
                letterSpacing: "0.04em",
              }}>
                {job.period}
              </span>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
            <div style={{ width: "14px", height: "2px", background: "var(--red)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)",
            }}>
              Education
            </span>
          </div>
          {education.map((ed, i) => (
            <div key={i} style={{
              padding: "1.4rem 0",
              borderBottom: i < education.length - 1 ? "0.5px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "14px",
                fontWeight: 700, color: "var(--ink)", marginBottom: "0.15rem",
              }}>
                {ed.degree}
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "12px",
                color: "var(--faint)",
              }}>
                {ed.school}
              </div>
            </div>
          ))}

          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "10px",
            color: "var(--faint)", lineHeight: 1.65,
            marginTop: "1.75rem",
            textWrap: "pretty",
          }}>
            Company names and client details are omitted across this portfolio
            in compliance with active NDAs.
          </p>
        </div>
      </div>
    </section>
  );
}
