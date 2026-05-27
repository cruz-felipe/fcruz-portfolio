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
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return { ref, count };
}

function AnimatedMetric({ value }: { value: string }) {
  const numMatch = value.match(/^(\d+)/);
  const { ref, count } = useCountUp(numMatch ? parseInt(numMatch[1]) : 0);
  if (!numMatch) return <span>{value}</span>;
  const suffix = value.slice(numMatch[1].length);
  return <span><span ref={ref}>{count}</span>{suffix}</span>;
}

interface Screen { src: string; caption: string; }
interface Metric { value: string; label: string; }
interface Section { title: string; body?: string | string[]; screens?: Screen[]; narrowScreens?: boolean; pullquote?: string; }
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
  { slug: "b2b-sales-rescue", index: "02", title: "B2B Sales Rescue" },
  { slug: "quota-management", index: "03", title: "Quota Management" },
  { slug: "dane-telecom", index: "04", title: "Dane Telecom" },
  { slug: "vocabulary", index: "05", title: "Vocabulary", personal: true },
];

// Helper: prevent widows in text
function noWidow(text: string): string {
  return text.replace(/\s+(\S+)$/, "\u00a0$1");
}

// Helper: remove dashes, prevent widows in paragraph
function cleanPara(text: string): string {
  return noWidow(
    text
      .replace(/ — /g, ", ")
      .replace(/ – /g, ", ")
  );
}

export default function CaseLayout({ data }: { data: CaseStudyData }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  const sectionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionsRef.current; if (!el) return;
    const items = el.querySelectorAll("section, .artifact-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    items.forEach(item => { item.classList.add("reveal"); observer.observe(item); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Fixed back nav */}
      <div style={{
        position: "fixed", top: "2px", left: 0, right: 0, zIndex: 100, height: "60px",
        padding: "0 var(--pad)", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)", borderBottom: "0.5px solid var(--border)",
      }}>
        <a href="/" aria-label="Back to home" style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--faint)", textDecoration: "none", transition: "color 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; (e.currentTarget.querySelector("svg") as SVGElement | null)?.style.setProperty("transform", "translateX(-3px)"); }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--faint)"; (e.currentTarget.querySelector("svg") as SVGElement | null)?.style.setProperty("transform", "translateX(0)"); }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All work
        </a>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--faint)" }}>
          {data.index} / 05
        </span>
      </div>

      {/* 2px red rule */}
      <div style={{ height: "2px", background: "var(--red)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 101 }} />

      <main id="main-content" role="main" className="page-enter" style={{ background: "var(--white)", color: "var(--ink)", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>

        {/* ── HERO ── */}
        <section className="case-hero-inner" style={{
          paddingTop: "calc(62px + var(--space-xl))",
          paddingBottom: "var(--space-lg)",
          paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
          borderBottom: "0.5px solid var(--border)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem" }}>
            <div style={{ width: "4px", height: "4px", background: "var(--red)", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)" }}>
              {data.role}{data.location ? ` · ${data.location}` : ""} · {data.year}
            </span>
          </div>

          {/* Title — full width, architectural */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 8rem)",
            fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.045em",
            color: "var(--ink)", marginBottom: "var(--space-lg)",
            textWrap: "balance",
          }}>{data.title}</h1>

          {/* Below title — asymmetric: tagline wide left, role/impact narrow right */}
          <div className="case-hero-below" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "var(--space-xl)", alignItems: "start" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", fontWeight: 300, lineHeight: 1.7, color: "#333", margin: 0, textWrap: "pretty" }}>
              {cleanPara(data.tagline)}
            </p>
            <div>
              <div style={{ borderTop: "0.5px solid var(--border)", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)", margin: "0 0 0.5rem" }}>My role</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, lineHeight: 1.72, color: "#555", margin: 0, textWrap: "pretty" }}>{cleanPara(data.roleDetail)}</p>
              </div>
              {data.impactSummary && (
                <div style={{ borderTop: "0.5px solid var(--border)", paddingTop: "1.25rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--faint)", margin: "0 0 0.5rem" }}>Business impact</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, lineHeight: 1.72, color: "#555", margin: 0, textWrap: "pretty" }}>{cleanPara(data.impactSummary)}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── METRICS — full bleed grid ── */}
        {data.metrics.length > 0 && (
          <section className="metrics-section case-metrics" style={{ display: "grid", gridTemplateColumns: `repeat(${data.metrics.length}, 1fr)`, borderBottom: "0.5px solid var(--border)", width: "100%" }}>
            {data.metrics.map((m, i) => (
              <div key={i} className="metric-cell" style={{ padding: "var(--space-lg) var(--pad)", borderRight: i < data.metrics.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4.5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "0.75rem" }}>
                  <span style={{ color: "var(--red)" }}><AnimatedMetric value={m.value} /></span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 300, color: "var(--muted)", lineHeight: 1.6, margin: 0, maxWidth: "240px", textWrap: "pretty" }}>{cleanPara(m.label)}</p>
              </div>
            ))}
          </section>
        )}

        {/* ── CONTEXT ── */}
        <section className="context-section" style={{ padding: "var(--space-lg) var(--pad)", borderBottom: "0.5px solid var(--border)" }}>
          <div className="case-context" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", alignItems: "start" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 300, lineHeight: 1.82, color: "#333", margin: 0, textWrap: "pretty", maxWidth: "640px" }}>{cleanPara(data.context)}</p>
            {data.showNdaNote ? (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 300, color: "var(--muted)", lineHeight: 1.75, margin: 0, textWrap: "pretty" }}>
                Client identity omitted per NDA. System documentation artifacts shown are illustrative representations of the restructure approach, not reproductions of client deliverables.
              </p>
            ) : !data.hideNda ? (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 300, color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
                Client identity omitted per NDA. Strategic challenges, decisions and outcomes are accurate.
              </p>
            ) : null}
          </div>
        </section>

        {/* ── BODY SECTIONS ── */}
        <div ref={sectionsRef}>
          {data.sections.map((section, si) => (
            <div key={si}>
              {/* If this section has a pullquote, render it full-bleed BEFORE the body */}
              {section.pullquote && (
                <div className="cs-pullquote-section" style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}>
                  <blockquote className="cs-pullquote">{noWidow(section.pullquote)}</blockquote>
                  <p className="cs-pullquote-attr">{section.title}</p>
                </div>
              )}

              {/* Body section — section tag above, prose below */}
              {(Array.isArray(section.body) ? section.body.length > 0 : !!section.body) && (
                <section className="case-section" style={{ padding: "var(--space-lg) var(--pad)", borderBottom: "0.5px solid var(--border)" }}>
                  {!section.pullquote && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--red)", opacity: 0.55, display: "block", marginBottom: "1.75rem" }}>
                      {section.title}
                    </span>
                  )}
                  <div className="case-section-body" style={{ maxWidth: "680px" }}>
                    {Array.isArray(section.body) ? section.body.map((para, pi) => (
                      <p key={pi}
                        className={pi === 0 ? "cs-lead" : "cs-body"}
                        style={{ marginBottom: pi < (section.body as string[]).length - 1 ? "1.5rem" : 0 }}>
                        {cleanPara(para)}
                      </p>
                    )) : (
                      <p className="cs-lead">{cleanPara(section.body as string)}</p>
                    )}
                  </div>
                </section>
              )}

              {/* Screens */}
              {section.screens && section.screens.length > 0 && (
                <div className="screen-gallery-section" style={{ padding: "var(--space-lg) var(--pad)", borderBottom: "0.5px solid var(--border)" }}>
                  <ScreenGallery screens={section.screens} narrow={section.narrowScreens} />
                </div>
              )}

              {/* Artifact */}
              {data.artifacts[si]?.component && (
                <section className="artifact-section" style={{ padding: "var(--space-lg) var(--pad)", borderBottom: "0.5px solid var(--border)", background: "#fafafa" }}>
                  <div className="artifact-scroll" style={{ marginBottom: "1.5rem", overflowX: "auto", minWidth: 0 }}>
                    {data.artifacts[si].component}
                  </div>
                  <div className="artifact-caption" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "2rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "var(--ink)", margin: 0, opacity: 0.6 }}>{data.artifacts[si].title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 300, color: "var(--muted)", margin: 0, maxWidth: "480px", textWrap: "pretty" }}>{data.artifacts[si].caption}</p>
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>

        {/* ── MORE WORK ── */}
        <section aria-label="More work" style={{ padding: "var(--space-lg) var(--pad)", borderTop: "0.5px solid var(--border)" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: "2rem" }}>More work</span>
          <div>
            {ALL_WORK.map((work, i) => {
              const isCurrent = work.title === data.title;
              const isNext = ALL_WORK.findIndex(w => w.title === data.title) === i - 1;
              const inner = (
                <>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400, color: "var(--faint)", minWidth: "2.5rem", flexShrink: 0, letterSpacing: "0.06em" }}>{work.index}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.5vw, 1.3rem)", fontWeight: 800, letterSpacing: "-0.025em", color: isCurrent ? "var(--faint)" : "var(--ink)" }}>
                      {work.title}
                    </span>
                    {isNext && <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", border: "0.5px solid var(--red)", padding: "2px 6px" }}>Next</span>}
                    {work.personal && !isCurrent && <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--faint)", border: "0.5px solid var(--border)", padding: "2px 6px" }}>Personal</span>}
                  </div>
                </>
              );
              const rowStyle: React.CSSProperties = {
                display: "flex", alignItems: "center", padding: "1.1rem 0",
                borderBottom: i < ALL_WORK.length - 1 ? "0.5px solid var(--border)" : "none",
                textDecoration: "none", color: "var(--ink)",
                opacity: isCurrent ? 0.3 : 1, cursor: isCurrent ? "default" : "pointer",
              };
              return isCurrent ? (
                <div key={work.slug} aria-current="page" style={rowStyle}>{inner}</div>
              ) : (
                <Link key={work.slug} href={`/work/${work.slug}`} style={rowStyle}
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
                >{inner}</Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
