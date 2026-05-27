"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScreenGallery } from "./ScreenGallery";

// ── Count-up hook ──────────────────────────────────
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    o.observe(ref.current); return () => o.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return { ref, count };
}

function AnimatedMetric({ value }: { value: string }) {
  const m = value.match(/^(\d+)/);
  const { ref, count } = useCountUp(m ? parseInt(m[1]) : 0);
  if (!m) return <span>{value}</span>;
  return <span><span ref={ref}>{count}</span>{value.slice(m[1].length)}</span>;
}

// ── Types ──────────────────────────────────────────
interface Screen { src: string; caption: string; }
interface Metric { value: string; label: string; }
interface Section {
  title: string; body?: string | string[];
  screens?: Screen[]; narrowScreens?: boolean; pullquote?: string;
}
interface Artifact { id: string; title: string; caption: string; component: React.ReactNode; }

export interface CaseStudyData {
  index: string; title: string; tagline: string; role: string;
  roleDetail: string; impactSummary?: string; context: string;
  year: string; location?: string; metrics: Metric[];
  sections: Section[]; artifacts: Artifact[];
  hideNda?: boolean; showNdaNote?: boolean; wideHero?: boolean;
}

const ALL_WORK = [
  { slug: "predictive-support-hub", index: "01", title: "Predictive Support Hub" },
  { slug: "b2b-sales-rescue",        index: "02", title: "B2B Sales Rescue" },
  { slug: "quota-management",         index: "03", title: "Quota Management" },
  { slug: "dane-telecom",             index: "04", title: "Dane Telecom" },
  { slug: "vocabulary",               index: "05", title: "Vocabulary", personal: true },
];

function noWidow(t: string) { return t.replace(/\s+(\S+)$/, "\u00a0$1"); }
function cleanPara(t: string) {
  return noWidow(t.replace(/ — /g, ", ").replace(/ – /g, ", "));
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: "rgba(10,10,10,0.38)", marginBottom: "0.65rem",
    }}>{children}</div>
  );
}

// ── Case layout ────────────────────────────────────
export default function CaseLayout({ data }: { data: CaseStudyData }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const sectionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionsRef.current; if (!el) return;
    const items = el.querySelectorAll("section, .artifact-section");
    const o = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    items.forEach(item => { item.classList.add("reveal"); o.observe(item); });
    return () => o.disconnect();
  }, []);

  // shared
  const hRule: React.CSSProperties = { borderBottom: "1px solid var(--border)" };
  const padX: React.CSSProperties = { paddingLeft: "var(--pad)", paddingRight: "var(--pad)" };

  return (
    <>
      {/* ── Top nav bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "52px", ...padX,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(245,240,232,0.96)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <a href="/" style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--muted)", textDecoration: "none", transition: "color 0.15s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M11 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
          All work
        </a>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "9px",
          letterSpacing: "0.12em", color: "var(--faint)",
        }}>
          {data.index} / 05
        </span>
      </div>

      <main
        id="main-content"
        style={{
          background: "var(--bg)", color: "var(--ink)",
          minHeight: "100vh", width: "100%", overflowX: "hidden",
          paddingTop: "52px",
        }}
      >

        {/* ── HERO ── */}
        <section style={{
          ...hRule, ...padX,
          paddingTop: "4rem", paddingBottom: "3rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(14px)",
          transition: "opacity 0.65s ease, transform 0.65s ease",
        }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--muted)", marginBottom: "1.75rem",
          }}>
            {data.index} — {data.role}{data.location ? ` · ${data.location}` : ""} · {data.year}
          </div>

          {/* Title — Bebas, huge */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 8vw, 10rem)",
            lineHeight: 0.88, letterSpacing: "0.01em",
            color: "var(--ink)", marginBottom: "3rem",
            textWrap: "balance",
          }}>
            {data.title.toUpperCase()}
          </h1>

          {/* Two-column below title */}
          <div className="case-hero-below" style={{
            display: "grid", gridTemplateColumns: "1fr 300px",
            gap: "4rem", alignItems: "start",
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.72, color: "rgba(10,10,10,0.7)",
              textWrap: "pretty",
            }}>
              {cleanPara(data.tagline)}
            </p>
            <div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                <Label>My role</Label>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  lineHeight: 1.65, color: "rgba(10,10,10,0.6)",
                  textWrap: "pretty",
                }}>
                  {cleanPara(data.roleDetail)}
                </p>
              </div>
              {data.impactSummary && (
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                  <Label>Business impact</Label>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "13px",
                    lineHeight: 1.65, color: "rgba(10,10,10,0.6)",
                    textWrap: "pretty",
                  }}>
                    {cleanPara(data.impactSummary)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── METRICS ── */}
        {data.metrics.length > 0 && (
          <section className="case-metrics" style={{
            display: "grid",
            gridTemplateColumns: `repeat(${data.metrics.length}, 1fr)`,
            ...hRule,
          }}>
            {data.metrics.map((m, i) => (
              <div key={i} className="metric-cell" style={{
                padding: "2.5rem var(--pad)",
                borderRight: i < data.metrics.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                  lineHeight: 0.9, letterSpacing: "0.01em",
                  color: "var(--ink)", marginBottom: "0.65rem",
                }}>
                  <AnimatedMetric value={m.value} />
                </div>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "13px",
                  color: "var(--muted)", lineHeight: 1.6,
                  maxWidth: "240px", textWrap: "pretty",
                }}>
                  {cleanPara(m.label)}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* ── CONTEXT ── */}
        <section className="context-section" style={{ ...hRule, ...padX, padding: "2.5rem var(--pad)" }}>
          <div className="case-context" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "4rem", alignItems: "start",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "15px",
              lineHeight: 1.82, color: "rgba(10,10,10,0.68)",
              textWrap: "pretty",
            }}>
              {cleanPara(data.context)}
            </p>
            {data.showNdaNote ? (
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "var(--muted)", lineHeight: 1.75, textWrap: "pretty",
              }}>
                Client identity omitted per NDA. System documentation artifacts shown are illustrative representations of the restructure approach, not reproductions of client deliverables.
              </p>
            ) : !data.hideNda ? (
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "var(--muted)", lineHeight: 1.75,
              }}>
                Client identity omitted per NDA. Strategic challenges, decisions and outcomes are accurate.
              </p>
            ) : null}
          </div>
        </section>

        {/* ── BODY SECTIONS ── */}
        <div ref={sectionsRef}>
          {data.sections.map((section, si) => (
            <div key={si}>
              {/* Pullquote — full bleed, editorial */}
              {section.pullquote && (
                <div className="cs-pullquote-section" style={{ ...padX }}>
                  <blockquote className="cs-pullquote">{noWidow(section.pullquote)}</blockquote>
                  <p className="cs-pullquote-attr">{section.title}</p>
                </div>
              )}

              {/* Body text */}
              {(Array.isArray(section.body) ? section.body.length > 0 : !!section.body) && (
                <section className="case-section" style={{ ...hRule, ...padX, padding: "2.5rem var(--pad)" }}>
                  {!section.pullquote && (
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "var(--muted)", marginBottom: "1.5rem",
                    }}>
                      {section.title}
                    </div>
                  )}
                  <div className="case-section-body" style={{ maxWidth: "680px" }}>
                    {Array.isArray(section.body)
                      ? section.body.map((para, pi) => (
                          <p key={pi}
                            className={pi === 0 ? "cs-lead" : "cs-body"}
                            style={{ marginBottom: pi < (section.body as string[]).length - 1 ? "1.5rem" : 0 }}>
                            {cleanPara(para)}
                          </p>
                        ))
                      : <p className="cs-lead">{cleanPara(section.body as string)}</p>
                    }
                  </div>
                </section>
              )}

              {/* Screen gallery */}
              {section.screens && section.screens.length > 0 && (
                <div className="screen-gallery-section" style={{ ...hRule, ...padX, padding: "2.5rem var(--pad)" }}>
                  <ScreenGallery screens={section.screens} narrow={section.narrowScreens} />
                </div>
              )}

              {/* Artifact */}
              {data.artifacts[si]?.component && (
                <section className="artifact-section" style={{
                  ...hRule, ...padX,
                  padding: "2.5rem var(--pad)",
                  background: "rgba(10,10,10,0.02)",
                }}>
                  <div className="artifact-scroll" style={{ marginBottom: "1.25rem", overflowX: "auto" }}>
                    {data.artifacts[si].component}
                  </div>
                  <div className="artifact-caption" style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "baseline", gap: "2rem",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-mono)", fontSize: "10px",
                      fontWeight: 500, color: "var(--ink)", opacity: 0.55,
                    }}>
                      {data.artifacts[si].title}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: "13px",
                      color: "var(--muted)", maxWidth: "480px", textWrap: "pretty",
                    }}>
                      {data.artifacts[si].caption}
                    </p>
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>

        {/* ── MORE WORK ── */}
        <section style={{ ...padX, padding: "3rem var(--pad)", background: "var(--ink)" }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.3)", marginBottom: "2rem",
          }}>
            More work
          </div>
          <div>
            {ALL_WORK.map((work, i) => {
              const isCurrent = work.title === data.title;
              const currentIdx = ALL_WORK.findIndex(w => w.title === data.title);
              const isNext = currentIdx === i - 1;

              const inner = (
                <>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px",
                    color: "rgba(245,240,232,0.25)", minWidth: "2.5rem",
                    letterSpacing: "0.08em",
                  }}>{work.index}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.8rem, 3vw, 3rem)",
                      lineHeight: 0.92, letterSpacing: "0.01em",
                      color: isCurrent ? "rgba(245,240,232,0.2)" : "rgba(245,240,232,0.85)",
                    }}>
                      {work.title.toUpperCase()}
                    </span>
                    {isNext && (
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "8px",
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: "rgba(245,240,232,0.35)",
                        border: "0.5px solid rgba(245,240,232,0.2)",
                        padding: "2px 6px",
                      }}>Next</span>
                    )}
                    {"personal" in work && work.personal && !isCurrent && (
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "8px",
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: "rgba(245,240,232,0.25)",
                        border: "0.5px solid rgba(245,240,232,0.12)",
                        padding: "2px 6px",
                      }}>Personal</span>
                    )}
                  </div>
                </>
              );

              const rowStyle: React.CSSProperties = {
                display: "flex", alignItems: "center", gap: "1.5rem",
                padding: "1rem 0",
                borderBottom: i < ALL_WORK.length - 1 ? "1px solid rgba(245,240,232,0.07)" : "none",
                textDecoration: "none", color: "inherit",
                opacity: isCurrent ? 0.35 : 1,
                cursor: isCurrent ? "default" : "pointer",
                transition: "opacity 0.15s",
              };

              return isCurrent ? (
                <div key={work.slug} style={rowStyle}>{inner}</div>
              ) : (
                <Link key={work.slug} href={`/work/${work.slug}`} style={rowStyle}
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >{inner}</Link>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
}
