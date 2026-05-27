"use client";
import { useEffect, useRef, useState } from "react";

// Stat hierarchy: lead (largest, most impressive number) → supporting → context
const STATS = [
  {
    value: "1M+",
    label: "End users",
    sublabel: "across B2C telecom products",
    size: "lead",
    countTo: undefined as number | undefined,
  },
  {
    value: "11yr",
    label: "Building enterprise products",
    sublabel: undefined as string | undefined,
    size: "supporting",
    countTo: 11,
  },
  {
    value: "32→1",
    label: "Legacy tools into one workspace",
    sublabel: undefined as string | undefined,
    size: "supporting",
    countTo: undefined as number | undefined,
  },
  {
    value: "9",
    label: "Countries",
    sublabel: undefined as string | undefined,
    size: "context",
    countTo: 9,
  },
];

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
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
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return <span ref={ref}>{count}</span>;
}

function StatValue({ stat }: { stat: typeof STATS[0] }) {
  const fontSize =
    stat.size === "lead"      ? "clamp(3.2rem, 5.5vw, 5.5rem)" :
    stat.size === "supporting" ? "clamp(2.4rem, 4vw, 4rem)" :
                                 "clamp(1.8rem, 3vw, 3rem)";

  const rendered =
    stat.value === "9" && stat.countTo           ? <><CountUp target={stat.countTo} /></> :
    stat.value === "11yr" && stat.countTo        ? <><CountUp target={stat.countTo} /><span style={{ color: "var(--red)" }}>yr</span></> :
    stat.value === "1M+"                         ? <>1<span style={{ color: "var(--red)" }}>M+</span></> :
    stat.value === "32→1"                        ? <>32<span style={{ color: "var(--red)" }}>→1</span></> :
    stat.value;

  return (
    <div style={{
      fontFamily: "var(--font-display)",
      fontSize,
      fontWeight: 800,
      letterSpacing: "-0.04em",
      lineHeight: 1,
      color: "var(--ink)",
      marginBottom: "0.5rem",
      transition: "font-size 0.2s",
    }}>
      {rendered}
    </div>
  );
}

export default function SignalStrip() {
  return (
    <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
      <div className="signal-strip-inner" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {STATS.map((stat, i) => (
          <div key={i} style={{
            padding: "2rem",
            paddingLeft:  i === 0 ? "2.5rem" : undefined,
            paddingRight: i === STATS.length - 1 ? "2.5rem" : undefined,
            borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "var(--red)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s ease" }}
              className="stat-bar" />

            <StatValue stat={stat} />

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: stat.size === "lead" ? "12px" : "11px",
              fontWeight: stat.size === "lead" ? 500 : 400,
              color: stat.size === "lead" ? "var(--ink)" : "var(--muted)",
              opacity: stat.size === "lead" ? 0.75 : 1,
              lineHeight: 1.45,
              margin: 0,
              maxWidth: "260px",
              letterSpacing: "0.01em",
            }}>
              {stat.label}
              {stat.sublabel && (
                <span style={{ display: "block", fontWeight: 400, color: "var(--muted)", fontSize: "11px", marginTop: "1px" }}>
                  {stat.sublabel}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
      <style>{`.signal-strip-inner > div:hover .stat-bar { transform: scaleX(1) !important; }`}</style>
    </section>
  );
}
