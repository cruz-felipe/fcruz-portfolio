"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface Project {
  id: string; href: string; index: string; title: string; blurb: string;
  metrics: string[]; featured?: boolean; tag: string; weight?: string;
  personal?: boolean; image?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildProjects(cards: any[]): Project[] {
  return cards.map((c: any) => ({
    id: c.id, href: `/work/${c.id}`, index: c.index, title: c.title,
    blurb: c.blurb, metrics: [c.metric1, c.metric2].filter(Boolean),
    featured: c.weight === "featured", tag: c.tag,
    weight: c.weight === "featured" ? undefined : c.weight,
    personal: c.personal || false, image: c.image || "",
  }));
}

// ── Data panel inside featured card ──
function AgentWorkspacePanel({ hovered }: { hovered: boolean }) {
  const afterRows = [
    { label: "Customer", value: "Eli Manning", sub: "Account #73514" },
    { label: "IVR path", value: "Modem issue", sub: "3rd contact in 30 days" },
    { label: "Last agent", value: "Kate Austen", sub: "Technical complaint" },
    { label: "Debt", value: "$69.98 overdue", sub: "35 days, Pay Now flagged" },
  ];
  const beforeTools = ["Account Info", "ID Mgmt", "Manage Modem", "Tx History", "Security", "StaticIP", "Web DVR", "Wifi", "Managed Device", "Add Ons", "Billing", "Tickets"];

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {/* BEFORE */}
      <div style={{
        position: "absolute", inset: 0, padding: "2rem",
        opacity: hovered ? 0 : 1, transition: "opacity 0.4s ease",
        pointerEvents: "none", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(245,244,240,0.22)", marginBottom: "1.25rem",
          paddingBottom: "0.75rem", borderBottom: "0.5px solid rgba(245,244,240,0.06)",
        }}>
          Before — 32 tools per call
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "1.25rem" }}>
          {beforeTools.map((t, i) => (
            <div key={i} style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              color: i === 0 ? "rgba(245,244,240,0.9)" : "rgba(245,244,240,0.25)",
              background: i === 0 ? "rgba(208,2,27,0.18)" : "rgba(245,244,240,0.04)",
              border: `0.5px solid ${i === 0 ? "rgba(208,2,27,0.3)" : "rgba(245,244,240,0.07)"}`,
              padding: "2px 6px",
            }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 1.5rem" }}>
          {[["Account No", "0780107351404"], ["Status", "ACTIVE"], ["Name", "JERICHO TSG"], ["Collection", "NotOnHold"]].map(([k, v], i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(245,244,240,0.2)", marginBottom: "1px" }}>{k}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(245,244,240,0.4)", fontWeight: 400 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(245,244,240,0.12)" }}>
          Switch tools, open another tab, check tickets...
        </div>
      </div>

      {/* AFTER */}
      <div style={{
        position: "absolute", inset: 0, padding: "2rem",
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease",
        pointerEvents: "none", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "0.75rem", paddingBottom: "0.75rem",
          borderBottom: "0.5px solid rgba(245,244,240,0.08)",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,244,240,0.28)" }}>
            After — 1 workspace
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "5px", height: "5px", background: "#4ade80" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(245,244,240,0.3)" }}>Active 02:46</span>
          </div>
        </div>
        {afterRows.map((row, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "80px 1fr", gap: "0.5rem",
            padding: "0.4rem 0",
            borderBottom: i < afterRows.length - 1 ? "0.5px solid rgba(245,244,240,0.05)" : "none",
            alignItems: "start",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(245,244,240,0.22)" }}>{row.label}</span>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400, color: "rgba(245,244,240,0.85)", lineHeight: 1.3 }}>{row.value}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(245,244,240,0.28)", marginTop: "1px" }}>{row.sub}</div>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: "auto", padding: "0.75rem",
          background: "rgba(208,2,27,0.1)",
          border: "0.5px solid rgba(208,2,27,0.22)",
          display: "flex", alignItems: "baseline", gap: "0.75rem",
        }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "28px",
            fontWeight: 800, color: "var(--red)", letterSpacing: "-0.04em", lineHeight: 1,
          }}>3 min</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(245,244,240,0.3)" }}>
            avg handle time, down from 10 min
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <Link
        href={project.href}
        className="featured-card-link"
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          textDecoration: "none", color: "var(--ink)",
          background: "var(--ink)", overflow: "hidden",
          minHeight: "380px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left */}
        <div
          className="featured-card-content"
          style={{
            padding: "3rem",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            borderRight: "0.5px solid rgba(245,244,240,0.06)",
          }}
        >
          <div>
            {/* Tag row */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <div style={{ width: "20px", height: "2px", background: "var(--red)" }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(245,244,240,0.28)",
              }}>
                Featured
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                letterSpacing: "0.08em", color: "rgba(245,244,240,0.16)",
              }}>
                {project.tag}
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800, letterSpacing: "-0.03em",
              lineHeight: 0.96, color: "var(--white)",
              margin: "0 0 1.5rem",
              textWrap: "balance",
            }}>
              {project.title}
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px", fontWeight: 300, lineHeight: 1.8,
              color: "rgba(245,244,240,0.48)", margin: 0,
              maxWidth: "340px",
              textWrap: "pretty",
            }}>
              {project.blurb}
            </p>
          </div>

          {/* Metrics + CTA */}
          <div style={{ paddingTop: "2rem", borderTop: "0.5px solid rgba(245,244,240,0.07)" }}>
            <div style={{ display: "flex", gap: "2.5rem", marginBottom: "1.5rem" }}>
              {project.metrics.map((m: string) => (
                <div key={m}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "14px",
                    fontWeight: 800, color: "var(--red)", letterSpacing: "-0.02em",
                  }}>
                    {m}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase",
                color: hovered ? "var(--white)" : "rgba(245,244,240,0.3)",
                transition: "color 0.2s",
              }}>
                View project
              </span>
              {/* Bauhaus arrow — geometric, right angle */}
              <svg
                width="16" height="10" viewBox="0 0 16 10" fill="none"
                style={{
                  color: hovered ? "var(--red)" : "rgba(245,244,240,0.25)",
                  transform: hovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s",
                }}
              >
                <path d="M0 5h14M9 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right — data panel */}
        <div style={{ background: "color-mix(in srgb, var(--red) 4%, #111)", position: "relative", overflow: "hidden" }}>
          <AgentWorkspacePanel hovered={hovered} />
        </div>
      </Link>
    </div>
  );
}

function WorkListItem({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.45s ease ${index * 50}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 50}ms`,
    }}>
      <Link
        href={project.href}
        className="work-list-item"
        style={{
          display: "grid",
          gridTemplateColumns: "44px 1fr 240px 120px",
          gap: "0 2rem",
          alignItems: "center",
          padding: "1.5rem 0",
          borderTop: "0.5px solid var(--border)",
          textDecoration: "none", color: "var(--ink)",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Index — mono */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "10px",
          color: hovered ? "var(--red)" : "var(--faint)",
          letterSpacing: "0.08em",
          transition: "color 0.15s",
        }}>
          {project.index}
        </span>

        {/* Title */}
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.05rem, 1.6vw, 1.5rem)",
          fontWeight: 800, letterSpacing: "-0.025em",
          lineHeight: 1, color: "var(--ink)",
        }}>
          {project.title}
          {project.personal && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "8px",
              fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--faint)",
              border: "0.5px solid var(--border)",
              padding: "2px 5px", marginLeft: "0.75rem",
              verticalAlign: "2px",
            }}>Personal</span>
          )}
        </span>

        {/* Blurb */}
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "12px",
          fontWeight: 300,
          color: hovered ? "#555" : "var(--faint)",
          lineHeight: 1.55, transition: "color 0.15s",
        }}>
          {project.blurb}
        </span>

        {/* Metric */}
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "13px",
          fontWeight: 800,
          color: hovered ? "var(--red)" : "var(--faint)",
          textAlign: "right", transition: "color 0.15s",
          letterSpacing: "-0.02em",
        }}>
          {project.metrics[0]}
        </span>
      </Link>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Work({ data }: { data: any }) {
  const PROJECTS = buildProjects(data.workCards || []);
  const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section id="work" aria-label="Selected work" style={{ padding: "var(--space-xl) var(--pad)" }}>
      {/* Section header — Bauhaus label system */}
      <div style={{
        display: "flex", alignItems: "center", gap: "1.25rem",
        marginBottom: "3rem",
      }}>
        <div style={{ width: "20px", height: "2px", background: "var(--red)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)",
        }}>
          Selected work
        </span>
      </div>

      {/* Featured */}
      <div style={{ marginBottom: "0" }}>
        <FeaturedCard project={featured} />
      </div>

      {/* List */}
      <div>
        {rest.map((project, i) => (
          <WorkListItem key={project.id} project={project} index={i + 1} />
        ))}
        <div style={{ height: "0.5px", background: "var(--border)" }} />
      </div>
    </section>
  );
}
