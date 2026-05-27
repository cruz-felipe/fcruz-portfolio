"use client";
import { useRef, useEffect, useState } from "react";

const SKILLS = [
  "Product Design","Design Systems","BSS / OSS","Team Leadership",
  "Cross-functional Influence","UX Research","Interaction Design",
  "Design Ops","Telecom B2B & B2C","Stakeholder Management",
  "Figma","Illustration & Concept Art",
];

const EXPERIENCE = [
  { role: "Senior UI Designer, Group Leader", company: "Netcracker Technology", period: "Aug 2023 — Present", note: "Joined as Senior UI Designer. Took on Group Leader responsibilities for the Brazil design team. Cross-functional alignment, design system governance, and IC work on global OSS/BSS products." },
  { role: "Senior Experience Designer", company: "EPAM Systems", period: "Aug 2022 — Aug 2023", note: "UX strategy and interaction design for enterprise clients across industries. Design systems, usability evaluations, and alignment between design, product and engineering teams." },
  { role: "UX/UI Designer, Group Leader", company: "Netcracker Technology", period: "Dec 2018 — Aug 2022", note: "Started as UX/UI Designer, promoted to Group Leader. Full-cycle product design on OSS/BSS telecom platforms across multiple countries." },
  { role: "UX Mentor", company: "CareerFoundry", period: "Feb 2021 — Feb 2026", note: "Mentored designers through career transitions with portfolio reviews, interview preparation and feedback on what the industry actually rewards." },
  { role: "Penciler", company: "MSP Estúdios", period: "Apr 2026 — Present", note: "Working within the visual language and narrative universe of established IP." },
];

const EDUCATION = [
  { degree: "Interaction Design", school: "UC San Diego" },
  { degree: "Bachelor, Industrial Design", school: "Estácio" },
];

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const SL = { fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--faint)", display: "block", marginBottom: "1.5rem" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function About({ data }: { data: any }) {
  const { ref, visible } = useVisible();
  return (
    <section id="about" aria-label="About Felipe Cruz" ref={ref} style={{
      padding: "var(--space-xl) var(--pad)",
      borderTop: "0.5px solid var(--border)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      {/* Section label */}
      <span style={SL}>About</span>

      {/* Top: photo + bio */}
      <div className="about-top" style={{ alignItems: "flex-start", marginBottom: "var(--space-lg)" }}>
        <div className="about-photo-col">
          <div style={{ width: "100%", maxWidth: "220px", position: "relative", overflow: "hidden" }}>
            <img src="/photo.jpg" alt="Felipe Cruz" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "var(--red)" }} />
          </div>
        </div>

        <div className="about-bio-col">
          {[data.aboutBio1, data.aboutBio2, data.aboutBio3].filter(Boolean).map((p: string, i: number) => (
            <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: i === 0 ? "clamp(1rem,1.3vw,1.1rem)" : "14px", fontWeight: 300, lineHeight: 1.82, color: i === 0 ? "#222" : "#555", marginBottom: "1.25rem" }}>{p}</p>
          ))}

          <span style={{ ...SL, marginTop: "0.5rem" }}>{data.aboutBeyondLabel || "Beyond the work"}</span>
          {[data.aboutBeyond1, data.aboutBeyond2, data.aboutBeyond3].filter(Boolean).map((p: string, i: number) => (
            <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 300, lineHeight: 1.82, color: "#555", marginBottom: "1.25rem" }}>{p}</p>
          ))}

          <span style={{ ...SL, marginTop: "0.5rem" }}>Expertise</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {(data.skills || SKILLS).map((s: string) => (
              <span key={s} style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400, color: "#555", background: "#f4f4f4", padding: "5px 12px", letterSpacing: "0.01em" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience + Education */}
      <div className="about-bottom" style={{ borderTop: "0.5px solid var(--border)", paddingTop: "var(--space-lg)" }}>
        <div>
          <span style={SL}>Experience</span>
          {(data.experience || EXPERIENCE).map((job: {role:string;company:string;period:string;note:string}, i: number) => (
            <div key={i} className="experience-entry" style={{ padding: "1.25rem 0", borderBottom: i < (data.experience || EXPERIENCE).length - 1 ? "0.5px solid var(--border)" : "none" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginBottom: "2px" }}>{job.role}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--faint)", marginBottom: "4px" }}>{job.company}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "#666", lineHeight: 1.65 }}>{job.note}</div>
              </div>
              <span className="experience-period" style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--faint)", whiteSpace: "nowrap", paddingTop: "2px" }}>{job.period}</span>
            </div>
          ))}
        </div>

        <div>
          <span style={SL}>Education</span>
          {(data.education || EDUCATION).map((ed: {degree:string;school:string}, i: number, arr: {degree:string;school:string}[]) => (
            <div key={i} style={{ padding: "1.25rem 0", borderBottom: i < arr.length - 1 ? "0.5px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginBottom: "2px" }}>{ed.degree}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--faint)" }}>{ed.school}</div>
            </div>
          ))}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 300, color: "var(--faint)", lineHeight: 1.65, marginTop: "1.5rem" }}>
            Company names and client details are omitted across this portfolio in compliance with active NDAs.
          </p>
        </div>
      </div>
    </section>
  );
}
