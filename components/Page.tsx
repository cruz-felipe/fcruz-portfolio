"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// ─────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────
interface WorkCard {
  id: string; index: string; title: string; blurb: string;
  metric1: string; metric2: string; tag: string;
  weight: string; personal: boolean; image: string;
}
interface PageData {
  heroHeadline: string;
  heroBio: string;
  heroCurrentRole: string;
  heroCurrentCompany: string;
  aboutBio1: string; aboutBio2: string; aboutBio3: string;
  aboutBeyond1: string; aboutBeyond2: string; aboutBeyond3: string;
  skills: string[];
  experience: Array<{ role: string; company: string; period: string; note: string }>;
  education: Array<{ degree: string; school: string }>;
  contactEmail: string;
  contactLinkedIn: string;
  contactIllustration: string;
  workCards: WorkCard[];
}

// ─────────────────────────────────────────────────────
//  COLUMN RULE — thin vertical separator
// ─────────────────────────────────────────────────────
function ColRule() {
  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: 0,
      width: "1px", background: "rgba(10,10,10,0.18)",
    }} aria-hidden="true" />
  );
}

// ─────────────────────────────────────────────────────
//  SECTION LABEL — mono, uppercase, small
// ─────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: "rgba(10,10,10,0.5)",
      marginBottom: "0.75rem",
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────
//  WORK ITEM — editorial list row, no card
// ─────────────────────────────────────────────────────
function WorkItem({ card, i }: { card: WorkCard; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const isLast = i === 4;

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(10px)",
        transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
        borderBottom: isLast ? "none" : "1px solid rgba(10,10,10,0.15)",
        paddingBottom: isLast ? 0 : "2.5rem",
        marginBottom: isLast ? 0 : "2.5rem",
      }}
    >
      <Link
        href={`/work/${card.id}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        {/* Index + tag */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "9px",
          letterSpacing: "0.12em", color: "rgba(10,10,10,0.45)",
          marginBottom: "0.35rem",
          display: "flex", gap: "0.75rem",
        }}>
          <span>{card.index}</span>
          <span>{card.tag}</span>
          {card.personal && <span style={{ opacity: 0.6 }}>personal</span>}
        </div>

        {/* Big display title */}
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
          lineHeight: 0.92,
          letterSpacing: "0.02em",
          color: card.weight === "featured" ? "white" : "var(--ink)",
          marginBottom: "1rem",
          transition: "opacity 0.15s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          {card.title.toUpperCase()}
          {card.weight === "featured" && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              fontWeight: 500, letterSpacing: "0.14em",
              verticalAlign: "super", marginLeft: "0.5rem",
              color: "rgba(255,255,255,0.5)",
            }}>FEATURED</span>
          )}
        </div>

        {/* Blurb + metrics side by side */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "14px",
            lineHeight: 1.65, color: "rgba(10,10,10,0.7)",
            maxWidth: "360px", textWrap: "pretty",
          }}>
            {card.blurb}
          </p>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            {[card.metric1, card.metric2].filter(Boolean).map(m => (
              <div key={m} style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                fontWeight: 500, letterSpacing: "0.06em",
                color: "rgba(10,10,10,0.55)",
                lineHeight: 1.8,
              }}>{m}</div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────
//  PAGE — full editorial layout
// ─────────────────────────────────────────────────────
export default function Page({ data }: { data: PageData }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const year = new Date().getFullYear();

  // Split work into featured + rest for layout variation
  const featured = data.workCards.find(c => c.weight === "featured") || data.workCards[0];
  const rest = data.workCards.filter(c => c !== featured);

  return (
    <main id="main-content" style={{ background: "var(--yellow)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════════
          HEADER ROW — name + nav anchors
      ══════════════════════════════════════════════ */}
      <header style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid rgba(10,10,10,0.18)",
        padding: "1.75rem var(--pad) 1.25rem",
      }}>
        <div style={{
          fontFamily: "var(--font-body)", fontSize: "13px",
          fontWeight: 500, letterSpacing: "0.01em",
          color: "var(--ink)",
        }}>
          felipe cruz
        </div>
        <div /> {/* center empty */}
        <div style={{
          display: "flex", gap: "2.5rem", justifyContent: "flex-end",
          alignItems: "center",
        }}>
          {[
            { label: "work", href: "#work" },
            { label: "about", href: "#about" },
            { label: "contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              fontWeight: 500, letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.5)",
              textDecoration: "none", transition: "color 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(10,10,10,0.5)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO — three columns, Memoria pattern
          Col 1: name anchor + bio
          Col 2: role/context
          Col 3: empty / micro signal
      ══════════════════════════════════════════════ */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid rgba(10,10,10,0.18)",
        padding: "var(--pad) var(--pad) 0",
        gap: "0",
        position: "relative",
      }}>
        {/* Col 1 — bio */}
        <div style={{ paddingRight: "3rem", paddingBottom: "var(--pad)", position: "relative" }}>
          <Label>bio</Label>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "15px",
            lineHeight: 1.72, color: "rgba(10,10,10,0.78)",
            textWrap: "pretty",
          }}>
            {data.heroBio}
          </p>

          <div style={{ marginTop: "2.5rem" }}>
            <Label>currently</Label>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "14px",
              lineHeight: 1.6, color: "rgba(10,10,10,0.65)",
              textWrap: "pretty",
            }}>
              {data.heroCurrentRole}<br />
              {data.heroCurrentCompany}
            </p>
          </div>
        </div>

        {/* Col 2 — stats */}
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem", paddingBottom: "var(--pad)", borderLeft: "1px solid rgba(10,10,10,0.18)", position: "relative" }}>
          <Label>numbers</Label>
          {[
            { value: "11", label: "years in enterprise product design" },
            { value: "9", label: "countries" },
            { value: "1M+", label: "end users across B2C telecom" },
            { value: "32→1", label: "legacy tools into one workspace" },
          ].map(({ value, label }) => (
            <div key={value} style={{ marginBottom: "1.5rem" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4vw, 4.2rem)",
                lineHeight: 0.9, letterSpacing: "0.02em",
                color: "var(--ink)",
              }}>{value}</div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "12px",
                color: "rgba(10,10,10,0.5)", marginTop: "0.25rem",
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Col 3 — headline big */}
        <div style={{ paddingLeft: "3rem", paddingBottom: "var(--pad)", borderLeft: "1px solid rgba(10,10,10,0.18)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          {/* Massive headline bleeds down */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.3vw, 1.05rem)",
            lineHeight: 1.72, color: "rgba(10,10,10,0.55)",
            marginBottom: "2rem",
            textWrap: "pretty",
          }}>
            &ldquo;{data.heroHeadline}&rdquo;
          </p>
          <Label>skills</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem 0.75rem" }}>
            {data.skills.slice(0, 8).map(s => (
              <span key={s} style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "rgba(10,10,10,0.6)",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HEADLINE BLEED — massive display text
          Spans full width like Memoria
      ══════════════════════════════════════════════ */}
      <div
        id="work"
        style={{
          padding: "0 var(--pad)",
          borderBottom: "1px solid rgba(10,10,10,0.18)",
          overflow: "hidden",
        }}
      >
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "end",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 12vw, 13rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "white",
            paddingBottom: "0.08em",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}>
            WORK
          </div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 12vw, 13rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "white",
            paddingBottom: "0.08em",
            borderLeft: "1px solid rgba(10,10,10,0.18)",
            paddingLeft: "3rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            CASE<br />STUDIES
          </div>
          <div style={{
            borderLeft: "1px solid rgba(10,10,10,0.18)",
            paddingLeft: "3rem",
            paddingBottom: "1.5rem",
            alignSelf: "end",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}>
            <Label>selected projects</Label>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "13px",
              color: "rgba(10,10,10,0.55)", lineHeight: 1.65,
              textWrap: "pretty",
            }}>
              Enterprise product design across BSS/OSS, telecom infrastructure, B2B and B2C.
              NDA-constrained where noted.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          WORK LIST — full-width, no cards
      ══════════════════════════════════════════════ */}
      <section style={{
        padding: "3rem var(--pad) 4rem",
        borderBottom: "1px solid rgba(10,10,10,0.18)",
      }}>
        {/* Featured first, full treatment */}
        <WorkItem card={featured} i={0} />
        {/* Rest */}
        {rest.map((card, i) => (
          <WorkItem key={card.id} card={card} i={i + 1} />
        ))}
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT — three-column editorial
          Col 1: big headline + bio text
          Col 2: experience list
          Col 3: photo + education
      ══════════════════════════════════════════════ */}
      <section id="about">
        {/* About headline bleed */}
        <div style={{
          padding: "0 var(--pad)",
          borderBottom: "1px solid rgba(10,10,10,0.18)",
          overflow: "hidden",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 12vw, 13rem)",
              lineHeight: 0.88, letterSpacing: "0.01em",
              color: "white", paddingBottom: "0.08em",
            }}>
              ABOUT
            </div>
            <div style={{
              borderLeft: "1px solid rgba(10,10,10,0.18)",
              paddingLeft: "3rem",
              paddingBottom: "1.5rem",
              alignSelf: "end",
            }}>
              <p style={{
                fontFamily: "var(--font-body)", fontStyle: "italic",
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                lineHeight: 1.45, color: "rgba(10,10,10,0.7)",
                textWrap: "pretty",
              }}>
                I&apos;ve been at this long enough to know that most design problems are really communication failures.
              </p>
            </div>
            <div style={{ borderLeft: "1px solid rgba(10,10,10,0.18)" }} />
          </div>
        </div>

        {/* Three-column about content */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          padding: "3rem var(--pad) 4rem",
          gap: "0",
        }}>
          {/* Col 1 — bio text */}
          <div style={{ paddingRight: "3rem" }}>
            <Label>long bio</Label>
            {[data.aboutBio1, data.aboutBio2, data.aboutBio3].map((text, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-body)", fontSize: "15px",
                lineHeight: 1.78, color: "rgba(10,10,10,0.72)",
                marginBottom: "1.25rem", textWrap: "pretty",
              }}>{text}</p>
            ))}
            <div style={{ marginTop: "2rem" }}>
              <Label>beyond the work</Label>
              {[data.aboutBeyond1, data.aboutBeyond2, data.aboutBeyond3].filter(Boolean).map((text, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-body)", fontSize: "14px",
                  lineHeight: 1.72, color: "rgba(10,10,10,0.58)",
                  marginBottom: "1rem", textWrap: "pretty",
                }}>{text}</p>
              ))}
            </div>
          </div>

          {/* Col 2 — experience */}
          <div style={{ paddingLeft: "3rem", paddingRight: "3rem", borderLeft: "1px solid rgba(10,10,10,0.18)" }}>
            <Label>experience</Label>
            {data.experience.map((job, i) => (
              <div key={i} style={{
                paddingBottom: "1.75rem",
                marginBottom: "1.75rem",
                borderBottom: i < data.experience.length - 1 ? "1px solid rgba(10,10,10,0.12)" : "none",
              }}>
                <div style={{
                  fontFamily: "var(--font-body)", fontWeight: 500,
                  fontSize: "14px", color: "var(--ink)",
                  marginBottom: "0.15rem",
                }}>
                  {job.role}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: "rgba(10,10,10,0.55)", marginBottom: "0.2rem",
                }}>
                  {job.company}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  letterSpacing: "0.08em", color: "rgba(10,10,10,0.4)",
                  marginBottom: "0.6rem",
                }}>
                  {job.period}
                </div>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  lineHeight: 1.6, color: "rgba(10,10,10,0.58)",
                  textWrap: "pretty",
                }}>
                  {job.note}
                </p>
              </div>
            ))}

            <div style={{ marginTop: "0.5rem" }}>
              <Label>education</Label>
              {data.education.map((ed, i) => (
                <div key={i} style={{ marginBottom: "1rem" }}>
                  <div style={{
                    fontFamily: "var(--font-body)", fontWeight: 500,
                    fontSize: "14px", color: "var(--ink)",
                  }}>{ed.degree}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: "13px",
                    color: "rgba(10,10,10,0.5)",
                  }}>{ed.school}</div>
                </div>
              ))}
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                color: "rgba(10,10,10,0.38)", lineHeight: 1.65,
                marginTop: "1.5rem", textWrap: "pretty",
              }}>
                Company names and client details are omitted in compliance with active NDAs.
              </p>
            </div>
          </div>

          {/* Col 3 — photo + skills */}
          <div style={{ paddingLeft: "3rem", borderLeft: "1px solid rgba(10,10,10,0.18)" }}>
            <div style={{ position: "relative", marginBottom: "2rem" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {data.skills.map(s => (
                <span key={s} style={{
                  fontFamily: "var(--font-body)", fontSize: "14px",
                  color: "rgba(10,10,10,0.65)", lineHeight: 1.6,
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT — full width, massive CTA
          Teixeira-style: name left, headline center, big email
      ══════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          background: "var(--ink)",
          padding: "0 var(--pad)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Contact headline bleed */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 12vw, 13rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "var(--yellow)",
            paddingBottom: "0.08em",
          }}>
            LET&apos;S<br />TALK
          </div>
          <div style={{
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            paddingLeft: "3rem",
            paddingBottom: "2rem",
            alignSelf: "end",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontStyle: "italic",
              fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
              lineHeight: 1.5, color: "rgba(245,194,0,0.65)",
              textWrap: "pretty",
            }}>
              Open to senior IC and lead roles at companies building products people actually use.
            </p>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }} />
        </div>

        {/* Links row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          padding: "3rem 0 4rem",
          gap: "0",
        }}>
          <div>
            <Label>email</Label>
            <a
              href={`mailto:${data.contactEmail}`}
              style={{
                fontFamily: "var(--font-body)", fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.2vw, 1.65rem)",
                color: "var(--yellow)", textDecoration: "none",
                lineHeight: 1.2, display: "block",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {data.contactEmail}
            </a>
          </div>

          <div style={{ paddingLeft: "3rem", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            <Label>elsewhere</Label>
            {[
              { label: "linkedin", href: data.contactLinkedIn },
              { label: "illustration", href: data.contactIllustration },
            ].map(({ label, href }) => (
              <div key={label} style={{ marginBottom: "0.5rem" }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)", fontStyle: "italic",
                    fontSize: "16px", color: "rgba(245,194,0,0.6)",
                    textDecoration: "none", transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--yellow)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,194,0,0.6)"; }}
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          <div style={{ paddingLeft: "3rem", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            <Label>location</Label>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              color: "rgba(245,194,0,0.55)", lineHeight: 1.6,
            }}>
              São Paulo, Brazil.<br />
              Available for remote and on-site.
            </p>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1.25rem 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "0.12em", color: "rgba(245,194,0,0.35)",
          }}>
            Felipe Cruz — Senior UI Designer, Team Lead
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "0.08em", color: "rgba(245,194,0,0.25)",
          }}>
            {year}
          </span>
        </div>
      </section>

    </main>
  );
}
