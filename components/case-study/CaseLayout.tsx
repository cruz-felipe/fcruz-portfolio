"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScreenGallery } from "./ScreenGallery";

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
  { slug: "taekwondo-learning-app",   index: "05", title: "Taekwondo Learning App", personal: true },
];

function noWidow(t: string) { return t.replace(/\s+(\S+)$/, "\u00a0$1"); }
function cleanPara(t: string) {
  return noWidow(t.replace(/ \u2014 /g, ", ").replace(/ \u2013 /g, ", "));
}

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
      letterSpacing: "0.18em", textTransform: "uppercase" as const,
      color: "rgba(10,10,10,0.38)", marginBottom: "0.6rem",
    }}>{children}</div>
  );
}

export default function CaseLayout({ data }: { data: CaseStudyData }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const sectionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionsRef.current; if (!el) return;
    const items = el.querySelectorAll(".reveal-item");
    const o = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).style.opacity = "1", (e.target as HTMLElement).style.transform = "none"; }),
      { threshold: 0.04 }
    );
    items.forEach(item => { o.observe(item); });
    return () => o.disconnect();
  }, []);

  return (
    <main id="main-content" style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", width: "100%", overflowX: "clip" }}>

      {/* NAV */}
      <header className="case-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid var(--border)",
        padding: "1.5rem var(--pad)", alignItems: "center",
        background: "rgba(245,240,232,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a href="/" style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase" as const,
            color: "var(--muted)", textDecoration: "none", transition: "color 0.15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M9 4H1M4 1L1 4l3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square"/>
            </svg>
            all work
          </a>
        </div>
        <div className="case-nav-middle" />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--faint)" }}>
            {data.index} / 05
          </span>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        borderBottom: "1px solid var(--border)",
        paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
        paddingTop: "4rem", paddingBottom: "3rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(14px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 8vw, 10rem)",
          lineHeight: 0.88, letterSpacing: "0.01em",
          color: "var(--ink)", marginBottom: "2.5rem",
          textWrap: "balance",
        }}>
          {data.title.toUpperCase()}
        </h1>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
          lineHeight: 1.72, color: "rgba(10,10,10,0.68)",
          maxWidth: "820px", textWrap: "pretty",
        }}>
          {cleanPara(data.tagline)}
        </p>
      </section>

      {/* CONTEXT - two col */}
      <section className="context-section" style={{
        borderBottom: "1px solid var(--border)",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
        paddingTop: "2.5rem", paddingBottom: "2.5rem",
        gap: "4rem", alignItems: "start",
      }}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "15px",
          lineHeight: 1.82, color: "rgba(10,10,10,0.68)", textWrap: "pretty",
        }}>
          {cleanPara(data.context)}
        </p>
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <MonoLabel>My role</MonoLabel>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.65, color: "rgba(10,10,10,0.6)", textWrap: "pretty" }}>
              {cleanPara(data.roleDetail)}
            </p>
          </div>
          {data.impactSummary && (
            <div style={{ marginBottom: "1.5rem" }}>
              <MonoLabel>Business impact</MonoLabel>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.65, color: "rgba(10,10,10,0.6)", textWrap: "pretty" }}>
                {cleanPara(data.impactSummary)}
              </p>
            </div>
          )}
          {!data.hideNda && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--faint)", lineHeight: 1.65, textWrap: "pretty" }}>
              {data.showNdaNote
                ? "Client identity omitted per NDA. Artifacts are illustrative representations, not reproductions of client deliverables."
                : "Client identity omitted per NDA. Strategic challenges, decisions and outcomes are accurate."
              }
            </p>
          )}
        </div>
      </section>

      {/* METRICS */}
      {data.metrics.length > 0 && (
        <section className="case-metrics" style={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.metrics.length}, 1fr)`,
          borderBottom: "1px solid var(--border)",
        }}>
          {data.metrics.map((m, i) => (
            <div key={i} className="metric-cell" style={{
              paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
              paddingTop: "2.5rem", paddingBottom: "2.5rem",
              borderRight: i < data.metrics.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                lineHeight: 0.9, letterSpacing: "0.01em",
                color: "var(--ink)", marginBottom: "0.75rem",
              }}>
                <AnimatedMetric value={m.value} />
              </div>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "13px",
                color: "var(--muted)", lineHeight: 1.6,
                maxWidth: "260px", textWrap: "pretty",
              }}>
                {cleanPara(m.label)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* BODY SECTIONS */}
      <div ref={sectionsRef}>
        {data.sections.map((section, si) => (
          <div key={si}>

            {/* Pullquote */}
            {section.pullquote && (
              <div style={{
                borderBottom: "1px solid var(--border)",
                paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
                paddingTop: "4rem", paddingBottom: "4rem",
              }}>
                <blockquote style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  lineHeight: 1.3, color: "var(--ink)",
                  maxWidth: "820px", textWrap: "pretty", marginBottom: "1.5rem",
                }}>
                  {noWidow(section.pullquote)}
                </blockquote>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  letterSpacing: "0.14em", textTransform: "uppercase" as const,
                  color: "var(--muted)",
                }}>
                  {section.title}
                </div>
              </div>
            )}

            {/* Body text */}
            {(Array.isArray(section.body) ? section.body.length > 0 : !!section.body) && (
              <section className="case-section reveal-item" style={{
                borderBottom: "1px solid var(--border)",
                paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
                paddingTop: "2.5rem", paddingBottom: "2.5rem",
                opacity: 0, transform: "translateY(10px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}>
                {!section.pullquote && (
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
                    letterSpacing: "0.18em", textTransform: "uppercase" as const,
                    color: "var(--muted)", marginBottom: "1.5rem",
                  }}>
                    {section.title}
                  </div>
                )}
                <div style={{ maxWidth: "680px" }}>
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
              <div className="screen-gallery-section reveal-item" style={{
                borderBottom: "1px solid var(--border)",
                paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
                paddingTop: "2.5rem", paddingBottom: "2.5rem",
                opacity: 0, transform: "translateY(10px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}>
                <ScreenGallery screens={section.screens} narrow={section.narrowScreens} />
              </div>
            )}

            {/* Artifact - bg matches artifact type: keep light bg so SVG text stays readable */}
            {data.artifacts[si]?.component && (
              <section className="artifact-section reveal-item" style={{                
                paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
                paddingTop: "2.5rem", paddingBottom: "2.5rem", marginBottom: "3rem",
                background: "#F0EFE9",
                opacity: 0, transform: "translateY(10px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}>
                <div className="artifact-scroll" style={{ marginBottom: "1.25rem", overflowX: "auto" }}>
                  {data.artifacts[si].component}
                </div>
                {(data.artifacts[si].title || data.artifacts[si].caption) && (
                  <div className="artifact-caption" style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "baseline", gap: "2rem",
                    paddingTop: "1rem", borderTop: "1px solid rgba(10,10,10,0.1)",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-mono)", fontSize: "10px",
                      color: "rgba(10,10,10,0.45)", letterSpacing: "0.08em", flexShrink: 0,
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
                )}
              </section>
            )}

          </div>
        ))}
      </div>

      {/* MORE WORK */}
      <section style={{
        background: "var(--ink)",
        paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
        paddingTop: "3rem", paddingBottom: "3rem",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
          letterSpacing: "0.18em", textTransform: "uppercase" as const,
          color: "rgba(245,240,232,1)", marginBottom: "2rem",
        }}>
          More work
        </div>
        {ALL_WORK.map((work, i) => {
          const isCurrent = work.title === data.title;
          const currentIdx = ALL_WORK.findIndex(w => w.title === data.title);
          const isNext = currentIdx === i - 1;

          const rowContent = (
            <>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                color: "rgba(245,240,232,0.25)", minWidth: "2.5rem", flexShrink: 0,
                letterSpacing: "0.08em",
              }}>{work.index}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3vw, 3rem)",
                  lineHeight: 0.92, letterSpacing: "0.01em",
                  color: isCurrent ? "rgba(255,255,255,1)" : "rgba(245,240,232,0.85)",
                }}>
                  {work.title.toUpperCase()}
                </span>
                {!isCurrent && (
                  <svg className="work-arrow" width="20" height="12" viewBox="0 0 20 12" fill="none"
                    style={{ flexShrink: 0, opacity: 0, transition: "opacity 0.15s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}>
                    <path d="M0 6h18M12 1l6 5-6 5" stroke="rgba(245,240,232,0.7)" strokeWidth="1.2" strokeLinecap="square"/>
                  </svg>
                )}
                {isNext && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "8px",
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: "rgba(245,240,232,0.35)",
                    border: "0.5px solid rgba(245,240,232,0.2)", padding: "2px 6px",
                  }}>Next</span>
                )}
                {"personal" in work && work.personal && !isCurrent && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "8px",
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: "rgba(245,240,232,0.25)",
                    border: "0.5px solid rgba(245,240,232,0.12)", padding: "2px 6px",
                  }}>Personal</span>
                )}
              </div>
              {!isCurrent && (
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{
                  flexShrink: 0, opacity: 0,
                  transition: "opacity 0.15s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                }} className="work-arrow">
                  <path d="M0 7h18M12 1l6 6-6 6" stroke="rgba(245,240,232,0.7)" strokeWidth="1.2" strokeLinecap="square"/>
                </svg>
              )}
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
            <div key={work.slug} style={rowStyle}>{rowContent}</div>
          ) : (
            <Link key={work.slug} href={`/work/${work.slug}`} style={rowStyle}
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
                const arrow = e.currentTarget.querySelector(".work-arrow") as HTMLElement | null;
                if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(4px)"; }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                const arrow = e.currentTarget.querySelector(".work-arrow") as HTMLElement | null;
                if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "none"; }
              }}
            >{rowContent}</Link>
          );
        })}
      </section>

    </main>
  );
}
