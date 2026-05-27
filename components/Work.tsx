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

// ── Featured card — dark, data panel right side ──
function AgentWorkspacePanel({ hovered }: { hovered: boolean }) {
  const afterRows = [
    { label: "Customer", value: "Eli Manning", sub: "Account #73514-4" },
    { label: "IVR path", value: "Modem issue", sub: "3rd contact in 30 days" },
    { label: "Last agent", value: "Kate Austen", sub: "01.21.20 — technical complaint" },
    { label: "Debt", value: "$69.98 overdue", sub: "35 days — Pay Now flagged" },
  ];
  const beforeTools = ["Account Info", "ID Management", "Manage Modem", "Transaction History", "Security", "StaticIP", "Web DVR Mgmt", "Wifi", "Managed Device", "Add On Svcs", "Billing", "Tickets"];

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {/* BEFORE */}
      <div style={{ position: "absolute", inset: 0, padding: "2rem", opacity: hovered ? 0 : 1, transition: "opacity 0.45s ease", pointerEvents: "none", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Before — 32 tools per call</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "1.25rem" }}>
          {beforeTools.map((t, i) => (
            <div key={i} style={{ fontFamily: "var(--font-body)", fontSize: "9px", color: i === 0 ? "white" : "rgba(255,255,255,0.3)", background: i === 0 ? "rgba(255,140,0,0.2)" : "rgba(255,255,255,0.04)", border: `0.5px solid ${i === 0 ? "rgba(255,140,0,0.35)" : "rgba(255,255,255,0.08)"}`, borderRadius: "1px", padding: "3px 8px" }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem" }}>
          {[["Account No","0780107351404"],["Status","ACTIVE"],["Name","JERICHO TSG"],["Collection","NotOnHold"],["Address","200 Jericho Quad, NY"],["Service","OL,iOPREMIER,ULTRA101"]].map(([k,v],i) => (
            <div key={i}><div style={{ fontFamily: "var(--font-body)", fontSize: "9px", color: "rgba(255,255,255,0.22)", marginBottom: "1px" }}>{k}</div><div style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{v}</div></div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontFamily: "var(--font-body)", fontSize: "9px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.04em" }}>Switch tools to find billing, open another tab, check tickets...</div>
      </div>

      {/* AFTER */}
      <div style={{ position: "absolute", inset: 0, padding: "2rem", opacity: hovered ? 1 : 0, transition: "opacity 0.45s ease", pointerEvents: "none", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", paddingBottom: "0.75rem", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>After — 1 workspace</span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} /><span style={{ fontFamily: "var(--font-body)", fontSize: "9px", color: "rgba(255,255,255,0.35)" }}>Call active · 02:46</span></div>
        </div>
        {afterRows.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: "0.75rem", padding: "0.45rem 0", borderBottom: i < afterRows.length - 1 ? "0.5px solid rgba(255,255,255,0.06)" : "none", alignItems: "start" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(255,255,255,0.25)", paddingTop: "1px" }}>{row.label}</span>
            <div><div style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, color: "white", lineHeight: 1.3 }}>{row.value}</div><div style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>{row.sub}</div></div>
          </div>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "1rem", padding: "0.75rem", background: "rgba(196,43,43,0.12)", border: "0.5px solid rgba(196,43,43,0.25)", borderRadius: "1px", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 800, color: "var(--red)", letterSpacing: "-0.04em", lineHeight: 1 }}>3 min</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>avg handle time  ↓ from 10 min</span>
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
      <Link href={project.href} className="featured-card-link"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", textDecoration: "none", color: "var(--ink)", background: "var(--ink)", overflow: "hidden", minHeight: "360px" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Left */}
        <div className="featured-card-content" style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Featured</span>
              <span style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>{project.tag}</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1, color: "white", margin: "0 0 1.5rem", textWrap: "balance" }}>
              {project.title}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: "340px", textWrap: "pretty" }}>
              {project.blurb}
            </p>
          </div>
          <div style={{ paddingTop: "2rem", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", gap: "2rem", marginBottom: "1.25rem" }}>
              {project.metrics.map((m: string) => (
                <span key={m} style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--red)", letterSpacing: "-0.01em" }}>{m}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: hovered ? "white" : "rgba(255,255,255,0.35)", transition: "color 0.2s" }}>View project</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ color: hovered ? "white" : "rgba(255,255,255,0.3)", transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s" }}>
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        {/* Right — data panel */}
        <div style={{ background: "color-mix(in srgb, var(--red) 6%, #111)", position: "relative", overflow: "hidden" }}>
          <AgentWorkspacePanel hovered={hovered} />
        </div>
      </Link>
    </div>
  );
}

// ── Work list items (Memoria-style) ──
function WorkListItem({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.5s ease ${index * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 50}ms` }}>
      <Link href={project.href} className="work-list-item"
        style={{ display: "grid", gridTemplateColumns: "48px 1fr 220px 100px", gap: "0 2rem", alignItems: "baseline", padding: "1.5rem 0", borderTop: "0.5px solid var(--border)", textDecoration: "none", color: "var(--ink)", transition: "background 0.15s", cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400, color: hovered ? "var(--ink)" : "var(--faint)", letterSpacing: "0.06em", transition: "color 0.2s" }}>{project.index}</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1, color: "var(--ink)" }}>
          {project.title}
          {project.personal && <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--faint)", border: "0.5px solid var(--border)", borderRadius: "1px", padding: "2px 5px", marginLeft: "0.75rem", verticalAlign: "2px" }}>Personal</span>}
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 300, color: hovered ? "#555" : "var(--faint)", lineHeight: 1.5, transition: "color 0.2s", alignSelf: "center" }}>{project.blurb}</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "12px", fontWeight: 700, color: hovered ? "var(--red)" : "var(--faint)", textAlign: "right", alignSelf: "center", transition: "color 0.2s", letterSpacing: "-0.01em" }}>{project.metrics[0]}</span>
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
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "3rem" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)" }}>Selected work</span>
      </div>

      {/* Featured card */}
      <div style={{ marginBottom: "0" }}>
        <FeaturedCard project={featured} />
      </div>

      {/* Work list */}
      <div>
        {rest.map((project, i) => (
          <WorkListItem key={project.id} project={project} index={i + 1} />
        ))}
        {/* Close the list */}
        <div style={{ height: "0.5px", background: "var(--border)" }} />
      </div>
    </section>
  );
}
