"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface WorkCard {
  id: string; index: string; title: string; blurb: string;
  metric1: string; metric2: string; tag: string;
  weight: string; personal: boolean; image: string;
}
interface PageData {
  heroHeadline: string; heroBio: string;
  heroCurrentRole: string; heroCurrentCompany: string;
  aboutBio1: string; aboutBio2: string; aboutBio3: string;
  aboutBeyond1: string; aboutBeyond2: string; aboutBeyond3: string;
  skills: string[];
  experience: Array<{ role: string; company: string; period: string; note: string }>;
  education: Array<{ degree: string; school: string }>;
  contactEmail: string; contactLinkedIn: string; contactIllustration: string;
  workCards: WorkCard[];
}

// ── Label ──────────────────────────────────────────
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: light ? "rgba(245,240,232,0.35)" : "rgba(10,10,10,0.4)",
      marginBottom: "0.65rem",
    }}>{children}</div>
  );
}

// ── Work item ──────────────────────────────────────
function WorkItem({ card, i }: { card: WorkCard; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      borderBottom: "1px solid var(--border)",
      paddingTop: "2rem", paddingBottom: "2rem",
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(12px)",
      transition: `opacity 0.45s ease ${i * 55}ms, transform 0.45s ease ${i * 55}ms`,
    }}>
      <Link href={`/work/${card.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {/* Index + tag row */}
        <div style={{
          display: "flex", gap: "1.5rem", alignItems: "center",
          marginBottom: "0.4rem",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--faint)" }}>
            {card.index}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "var(--faint)" }}>
            {card.tag}
          </span>
          {card.personal && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "var(--faint)", opacity: 0.7 }}>
              personal
            </span>
          )}
        </div>

        {/* Title + metrics in same row */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "2rem", marginBottom: "0.75rem" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
            lineHeight: 0.92, letterSpacing: "0.01em",
            color: "var(--ink)",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            {card.title.toUpperCase()}
          </div>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            {[card.metric1, card.metric2].filter(Boolean).map(m => (
              <div key={m} style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                letterSpacing: "0.06em", color: "var(--muted)",
                lineHeight: 1.9,
              }}>{m}</div>
            ))}
          </div>
        </div>

        {/* Blurb */}
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "14px",
          lineHeight: 1.65, color: "var(--muted)",
          maxWidth: "560px", textWrap: "pretty",
        }}>
          {card.blurb}
        </p>
      </Link>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────
export default function Page({ data }: { data: PageData }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const year = new Date().getFullYear();

  // ── shared grid styles ──
  const grid3: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  };
  const col2border: React.CSSProperties = {
    borderLeft: "1px solid var(--border)",
    paddingLeft: "3rem",
  };
  const col3border: React.CSSProperties = {
    borderLeft: "1px solid var(--border)",
    paddingLeft: "3rem",
  };
  const hRule: React.CSSProperties = {
    borderBottom: "1px solid var(--border)",
  };

  return (
    <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════ */}
      <header style={{
        ...grid3, ...hRule,
        padding: "1.5rem var(--pad)",
        alignItems: "center",
      }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--ink)" }}>
          felipe cruz
        </div>
        <div />
        <nav style={{ display: "flex", gap: "2.5rem", justifyContent: "flex-end" }}>
          {[["work", "#work"], ["about", "#about"], ["contact", "#contact"]].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "var(--muted)", textDecoration: "none", transition: "color 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
            >{label}</a>
          ))}
        </nav>
      </header>

      {/* ══════════════════════════════════════════════
          HERO - three columns
      ══════════════════════════════════════════════ */}
      <section className="hero-grid" style={{ ...grid3, ...hRule, padding: "3rem var(--pad)" }}>
        {/* Col 1 - bio + currently */}
        <div style={{ paddingRight: "3rem" }}>
          <Label>bio</Label>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "15px",
            lineHeight: 1.72, color: "rgba(10,10,10,0.72)",
            marginBottom: "2.5rem", textWrap: "pretty",
          }}>
            {data.heroBio}
          </p>
          <Label>currently</Label>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "14px",
            lineHeight: 1.6, color: "rgba(10,10,10,0.6)",
            textWrap: "pretty",
          }}>
            {data.heroCurrentRole}<br />
            {data.heroCurrentCompany}
          </p>
        </div>

        {/* Col 2 - numbers */}
        <div className="hero-col2" style={{ ...col2border, paddingRight: "3rem" }}>
          <Label>numbers</Label>
          {[
            { value: "11", label: "years building enterprise products" },
            { value: "9", label: "countries" },
            { value: "1M+", label: "end users across B2C telecom" },
            { value: "32→1", label: "legacy tools into one workspace" },
          ].map(({ value, label }) => (
            <div key={value} style={{ marginBottom: "1.75rem" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                lineHeight: 0.88, letterSpacing: "0.02em",
                color: "var(--ink)",
              }}>{value}</div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "12px",
                color: "var(--muted)", marginTop: "0.2rem",
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Col 3 - headline quote + skills */}
        <div className="hero-col3" style={{ ...col3border }}>
          <p style={{
            fontFamily: "var(--font-body)", fontStyle: "italic",
            fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
            lineHeight: 1.75, color: "rgba(10,10,10,0.55)",
            marginBottom: "2.5rem", textWrap: "pretty",
          }}>
            &ldquo;{data.heroHeadline}&rdquo;
          </p>
          <Label>skills</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {data.skills.map(s => (
              <span key={s} style={{
                fontFamily: "var(--font-body)", fontSize: "14px",
                color: "rgba(10,10,10,0.58)", lineHeight: 1.7,
              }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WORK BLEED TITLE
      ══════════════════════════════════════════════ */}
      <div id="work" className="bleed-grid" style={{ ...grid3, ...hRule, padding: "0 var(--pad)", overflow: "hidden" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5.5rem, 13vw, 15rem)",
          lineHeight: 0.86, letterSpacing: "0.01em",
          color: "var(--ink)",
          paddingBottom: "0.06em",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          WORK
        </div>
        <div style={{
          ...col2border,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5.5rem, 13vw, 15rem)",
          lineHeight: 0.86, letterSpacing: "0.01em",
          color: "var(--ink)",
          paddingBottom: "0.06em",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }} className="bleed-col2">
          CASE<br />STUDIES
        </div>
        <div style={{
          ...col3border,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          paddingBottom: "1.5rem",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease 0.3s",
        }}>
          <Label>selected projects</Label>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "13px",
            color: "var(--muted)", lineHeight: 1.65, textWrap: "pretty",
          }}>
            Enterprise product design across BSS/OSS, telecom infrastructure, B2B and B2C.
            NDA-constrained where noted.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          WORK LIST
      ══════════════════════════════════════════════ */}
      <section style={{ padding: "0 var(--pad) 0", ...hRule }}>
        {data.workCards.map((card, i) => (
          <WorkItem key={card.id} card={card} i={i} />
        ))}
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT BLEED TITLE
      ══════════════════════════════════════════════ */}
      <div id="about" className="bleed-grid" style={{ ...grid3, ...hRule, padding: "0 var(--pad)", overflow: "hidden" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5.5rem, 13vw, 15rem)",
          lineHeight: 0.86, letterSpacing: "0.01em",
          color: "var(--ink)", paddingBottom: "0.06em",
        }}>
          ABOUT
        </div>
        <div style={{
          ...col2border,
          display: "flex", alignItems: "flex-end",
          paddingBottom: "1.5rem",
        }}>
          <p style={{
            fontFamily: "var(--font-body)", fontStyle: "italic",
            fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
            lineHeight: 1.45, color: "rgba(10,10,10,0.6)",
            textWrap: "pretty",
          }}>
            Most design problems are really communication failures. Between design and engineering, between what was decided and what actually shipped.
          </p>
        </div>
        <div className="bleed-col3" style={{ ...col3border }} />
      </div>

      {/* ══════════════════════════════════════════════
          ABOUT CONTENT - three columns
      ══════════════════════════════════════════════ */}
      <section className="about-grid" style={{ ...grid3, ...hRule, padding: "3rem var(--pad)" }}>
        {/* Col 1 - bio text */
        <div style={{ paddingRight: "3rem" }}>
          <Label>long bio</Label>
          {[data.aboutBio1, data.aboutBio2, data.aboutBio3].map((t, i) => (
            <p key={i} style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              lineHeight: 1.78, color: "rgba(10,10,10,0.7)",
              marginBottom: "1.25rem", textWrap: "pretty",
            }}>{t}</p>
          ))}
          <div style={{ marginTop: "1.75rem" }}>
            <Label>beyond the work</Label>
            {[data.aboutBeyond1, data.aboutBeyond2, data.aboutBeyond3].filter(Boolean).map((t, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-body)", fontSize: "14px",
                lineHeight: 1.72, color: "rgba(10,10,10,0.55)",
                marginBottom: "1rem", textWrap: "pretty",
              }}>{t}</p>
            ))}
          </div>
        </div>

        {/* Col 2 - experience + education */}
        <div className="about-col2" style={{ ...col2border, paddingRight: "3rem" }}>
          <Label>experience</Label>
          {data.experience.map((job, i) => (
            <div key={i} style={{
              paddingBottom: "1.5rem", marginBottom: "1.5rem",
              borderBottom: i < data.experience.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-body)", fontWeight: 500,
                fontSize: "14px", color: "var(--ink)", marginBottom: "0.1rem",
              }}>
                {job.role}
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "var(--red)", marginBottom: "0.15rem",
              }}>
                {job.company}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                letterSpacing: "0.08em", color: "var(--faint)",
                marginBottom: "0.55rem",
              }}>
                {job.period}
              </div>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                lineHeight: 1.6, color: "rgba(10,10,10,0.55)",
                textWrap: "pretty",
              }}>{job.note}</p>
            </div>
          ))}
          <div style={{ marginTop: "0.5rem" }}>
            <Label>education</Label>
            {data.education.map((ed, i) => (
              <div key={i} style={{ marginBottom: "0.9rem" }}>
                <div style={{
                  fontFamily: "var(--font-body)", fontWeight: 500,
                  fontSize: "14px", color: "var(--ink)",
                }}>{ed.degree}</div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: "var(--muted)",
                }}>{ed.school}</div>
              </div>
            ))}
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              color: "rgba(10,10,10,0.32)", lineHeight: 1.65,
              marginTop: "1.5rem", textWrap: "pretty",
            }}>
              Company names and client details omitted per active NDAs.
            </p>
          </div>
        </div>

        {/* Col 3 - photo + skills */}
        <div className="about-col3" style={{ ...col3border }}>
          <div style={{ marginBottom: "2rem" }}>
            <img
              src="/photo.jpg"
              alt="Felipe Cruz"
              style={{
                width: "100%", display: "block",
                objectFit: "cover", objectPosition: "center top",
                aspectRatio: "3/4",
              }}
            />
          </div>
          <Label>expertise</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {data.skills.map(s => (
              <span key={s} style={{
                fontFamily: "var(--font-body)", fontSize: "14px",
                color: "rgba(10,10,10,0.6)", lineHeight: 1.7,
              }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT - black bg
      ══════════════════════════════════════════════ */}
      <section id="contact" style={{ background: "var(--ink)" }}>
        {/* LET'S TALK bleed */}
        <div className="contact-bleed" style={{ ...grid3, borderBottom: "1px solid rgba(245,240,232,0.08)", padding: "0 var(--pad)", overflow: "hidden" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5.5rem, 13vw, 15rem)",
            lineHeight: 0.86, letterSpacing: "0.01em",
            color: "#F5F0E8",
            paddingBottom: "0.06em",
          }}>
            LET&apos;S<br />TALK
          </div>
          <div style={{
            borderLeft: "1px solid rgba(245,240,232,0.08)",
            paddingLeft: "3rem",
            display: "flex", alignItems: "flex-end",
            paddingBottom: "2rem",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontStyle: "italic",
              fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
              lineHeight: 1.5, color: "rgba(245,240,232,0.45)",
              textWrap: "pretty",
            }}>
              Open to senior IC and lead roles at companies building products people actually use.
            </p>
          </div>
          <div style={{ borderLeft: "1px solid rgba(245,240,232,0.08)" }} />
        </div>

        {/* Links */}
        <div className="contact-grid" style={{ ...grid3, padding: "3rem var(--pad) 3rem" }}>
          <div>
            <Label light>email me</Label>
            <a href={`mailto:${data.contactEmail}`} style={{
              fontFamily: "var(--font-body)", fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              color: "#F5F0E8", textDecoration: "none",
              lineHeight: 1.2, display: "block",
              transition: "opacity 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >{data.contactEmail}</a>
          </div>
          <div style={{ borderLeft: "1px solid rgba(245,240,232,0.08)", paddingLeft: "3rem" }}>
            <Label light>elsewhere</Label>
            {[
              ["linkedin", data.contactLinkedIn],
              ["illustration", data.contactIllustration],
            ].map(([label, href]) => (
              <div key={label} style={{ marginBottom: "0.5rem" }}>
                <a href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--font-body)", fontStyle: "italic",
                  fontSize: "16px", color: "rgba(245,240,232,0.45)",
                  textDecoration: "none", transition: "color 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#F5F0E8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.45)"; }}
                >{label}</a>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: "1px solid rgba(245,240,232,0.08)", paddingLeft: "3rem" }}>
            <Label light>location</Label>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              color: "rgba(245,240,232,0.4)", lineHeight: 1.65,
            }}>
              São Paulo, Brazil.<br />
              Available remote and on-site.
            </p>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{
          borderTop: "1px solid rgba(245,240,232,0.08)",
          padding: "1.25rem var(--pad)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "0.1em", color: "rgba(245,240,232,0.25)",
          }}>
            Felipe Cruz — Senior UI Designer, Team Lead
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            color: "rgba(245,240,232,0.18)",
          }}>{year}</span>
        </div>
      </section>

    </main>
  );
}
