"use client";
import { useRef, useEffect, useState } from "react";

const SKILLS = [
  "Product Design",
  "Design Systems",
  "BSS / OSS",
  "Team Leadership",
  "Cross-functional Influence",
  "UX Research",
  "Interaction Design",
  "Design Ops",
  "Telecom B2B & B2C",
  "Stakeholder Management",
  "Figma",
  "Illustration & Concept Art",
];

const EXPERIENCE = [
  {
    role: "Senior UI Designer → Group Leader",
    company: "Netcracker Technology",
    period: "Aug 2023 — Present",
    note: "Joined as Senior UI Designer. Took on Group Leader responsibilities for the Brazil design team. Cross-functional alignment, design system governance, and IC work on global OSS/BSS products.",
  },
  {
    role: "Senior Experience Designer",
    company: "EPAM Systems",
    period: "Aug 2022 — Aug 2023",
    note: "UX strategy and interaction design for enterprise clients across industries. Design systems, usability evaluations, and alignment between design, product and engineering teams.",
  },
  {
    role: "UX/UI Designer → Group Leader",
    company: "Netcracker Technology",
    period: "Dec 2018 — Aug 2022",
    note: "Started as UX/UI Designer, promoted to Group Leader. Full-cycle product design on OSS/BSS telecom platforms across multiple countries.",
  },
  {
    role: "UX Mentor",
    company: "CareerFoundry",
    period: "Feb 2021 — Feb 2026",
    note: "Mentored designers through career transitions with portfolio reviews, interview preparation and feedback on what the industry actually rewards.",
  },
];

const SIDE = [
  {
    role: "Penciler",
    company: "MSP Estúdios",
    period: "Apr 2026 — Present",
    note: "Working within the visual language and narrative universe of established IP.",
  },
];

const EDUCATION = [
  { degree: "Interaction Design", school: "UC San Diego", last: false },
  { degree: "Bachelor, Industrial Design", school: "Estácio", last: true },
];

function useVisible(threshold = 0.08) {
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

  return (
    <section
      id="about"
      aria-label="About Felipe Cruz"
      ref={ref}
      style={{
        padding: "var(--space-xl) var(--pad)",
        borderTop: "0.5px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink)", margin: 0 }}>
          About
        </h2>
      </div>

      {/* Top: photo + bio — photo aligns to first paragraph top, not column top */}
      <div className="about-top" style={{ alignItems: "flex-start" }}>
        <div className="about-photo-col">
          {/* Offset the photo down by the same amount as the first paragraph's top margin
              so photo top = first line of bio text, not column top */}
          <div style={{
            width: "100%",
            maxWidth: "260px",
            position: "relative",
            borderRadius: "2px",
            overflow: "hidden",
            marginTop: "4px",
          }}>
            <img
              src="/photo.jpg"
              alt="Felipe Cruz sketching in Tiradentes, Brazil"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "2px",
                objectFit: "cover",
                objectPosition: "center top",
                aspectRatio: "3/4",
              }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "var(--red)" }} />
          </div>
        </div>

        <div className="about-bio-col" style={{ maxWidth: "720px" }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--ink)",
            marginBottom: "1.25rem",
            opacity: 0.88,
          }}>
            {data.aboutBio1 || "I'm Felipe. I've been at this long enough to know that most design problems are really communication failures."}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--ink)",
            opacity: 0.72,
            marginBottom: "1.25rem",
          }}>
            {data.aboutBio2 || ""}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--ink)",
            opacity: 0.72,
            marginBottom: "2.5rem",
          }}>
            {data.aboutBio3 || ""}
          </p>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--faint)",
            marginBottom: "1rem",
          }}>
            {data.aboutBeyondLabel || "Beyond the work"}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--ink)",
            opacity: 0.72,
            marginBottom: "1rem",
          }}>
            {data.aboutBeyond1 || ""}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--ink)",
            opacity: 0.72,
            marginBottom: "1rem",
          }}>
            {data.aboutBeyond2 || ""}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--ink)",
            opacity: 0.72,
            marginBottom: "2.5rem",
          }}>
            {data.aboutBeyond3 || ""}
          </p>

          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--faint)",
            display: "block",
            marginBottom: "0.75rem",
          }}>
            Expertise
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(data.skills || SKILLS).map((skill: string) => (
              <span key={skill} style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--ink)",
                background: "color-mix(in srgb, var(--ink) 6%, var(--paper))",
                borderRadius: "2px",
                padding: "5px 12px",
                letterSpacing: "0.01em",
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
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--faint)",
            display: "block",
            marginBottom: "1.5rem",
          }}>
            Experience
          </span>
          {(data.experience || [...EXPERIENCE, ...SIDE]).map((job: {role:string;company:string;period:string;note:string}, i: number) => (
            <div key={i} className="experience-entry" style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1rem",
              padding: "1.4rem 0",
              borderBottom: i === ([...EXPERIENCE, ...SIDE].length - 1) ? "none" : "1px solid var(--border)",
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.15rem",
                }}>
                  {job.role}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--faint)",
                  marginBottom: "0.3rem",
                }}>
                  {job.company}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--ink)",
                  opacity: 0.65,
                  lineHeight: 1.5,
                }}>
                  {job.note}
                </div>
              </div>
              <span className="experience-period" style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--faint)",
                whiteSpace: "nowrap",
                paddingTop: "2px",
              }}>
                {job.period}
              </span>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--faint)",
            display: "block",
            marginBottom: "1.5rem",
          }}>
            Education
          </span>
          {(data.education || EDUCATION).map((ed: {degree:string;school:string;last?:boolean}, i: number) => (
            <div key={i} style={{
              padding: "1.4rem 0",
              borderBottom: ed.last ? "none" : "1px solid var(--border)",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "0.15rem",
              }}>
                {ed.degree}
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--faint)",
              }}>
                {ed.school}
              </div>
            </div>
          ))}

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--faint)",
            lineHeight: 1.6,
            marginTop: "1.5rem",
          }}>
            Company names and client details are omitted across this portfolio
            in compliance with active NDAs.
          </p>
        </div>
      </div>
    </section>
  );
}
