"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface WorkCard {
  id: string; index: string; title: string; blurb: string;
  metric1: string; metric2: string; tag: string;
  weight: string; personal: boolean; image: string;
  hidden?: boolean;
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500,
      letterSpacing: "0.18em", textTransform: "uppercase" as const,
      color: "rgba(10,10,10,0.4)", marginBottom: "0.65rem",
    }}>{children}</div>
  );
}

function WorkItem({ card, i }: { card: WorkCard; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="work-item" style={{
      borderTop: i > 0 ? "1px solid var(--border)" : "none",
      paddingTop: "4rem", paddingBottom: "4rem",
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(12px)",
      transition: `opacity 0.45s ease ${i * 55}ms, transform 0.45s ease ${i * 55}ms`,
    }}>
      <Link href={`/work/${card.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}
        onMouseEnter={(e) => {
          const arr = e.currentTarget.querySelector(".wi-arrow") as SVGElement | null;
          if (arr) { arr.style.opacity = "1"; arr.style.transform = "translateX(6px)"; }
        }}
        onMouseLeave={(e) => {
          const arr = e.currentTarget.querySelector(".wi-arrow") as SVGElement | null;
          if (arr) { arr.style.opacity = "0"; arr.style.transform = "none"; }
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--faint)" }}>{card.index}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "var(--faint)" }}>{card.tag}</span>
          {card.personal && <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--faint)", opacity: 0.7 }}>personal</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)", lineHeight: 0.92, letterSpacing: "0.01em", color: "var(--ink)" }}>
              {card.title.toUpperCase()}
            </div>
            <svg className="wi-arrow" width="24" height="14" viewBox="0 0 24 14" fill="none"
              style={{ flexShrink: 0, opacity: 0, transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}>
              <path d="M0 7h22M16 1l6 6-6 6" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="square"/>
            </svg>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            {[card.metric1, card.metric2].filter(Boolean).map(m => (
              <div key={m} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.06em", color: "var(--muted)", lineHeight: 1.9 }}>{m}</div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "480px", textWrap: "pretty" }}>
          {card.blurb}
        </p>
      </Link>
    </div>
  );
}

export default function Page({ data }: { data: PageData }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const year = new Date().getFullYear();

  return (
    <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* NAV */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid var(--border)",
        padding: "1.5rem var(--pad)", alignItems: "center",
        background: "rgba(245,240,232,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <a href="/" style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink)", textDecoration: "none" }}>felipe cruz</a>
        <div />
        <nav className="nav-links" style={{ display: "flex", gap: "2.5rem", justifyContent: "flex-end" }}>
          {[["work", "work"], ["about", "about"], ["contact", "contact"]].map(([label, id]) => (
            <button key={label}
              onClick={() => {
                const el = document.getElementById(id);
                if (!el) return;
                const y = el.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({ top: y, behavior: "smooth" });
              }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500,
                letterSpacing: "0.16em", textTransform: "lowercase",
                color: "var(--muted)", background: "none", border: "none",
                cursor: "pointer", transition: "color 0.15s", padding: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
            >{label}</button>
          ))}
        </nav>
        {/* Mobile menu button */}
        <button className="nav-hamburger" aria-label="Open menu"
          onClick={() => {
            const m = document.getElementById("mobile-nav");
            if (m) m.style.display = m.style.display === "flex" ? "none" : "flex";
          }}
          style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", padding: "4px", justifyContent: "flex-end",
          }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="var(--ink)" strokeWidth="1.5"/>
            <line x1="0" y1="7" x2="14" y2="7" stroke="var(--ink)" strokeWidth="1.5"/>
            <line x1="0" y1="13" x2="20" y2="13" stroke="var(--ink)" strokeWidth="1.5"/>
          </svg>
        </button>
      </header>
      {/* Mobile nav overlay */}
      <div id="mobile-nav" style={{
        display: "none", position: "fixed", inset: 0, zIndex: 200,
        background: "var(--ink)", flexDirection: "column",
        justifyContent: "center", padding: "var(--pad)",
      }}
        onClick={() => { const m = document.getElementById("mobile-nav"); if (m) m.style.display = "none"; }}
      >
        <button aria-label="Close menu" style={{
          position: "absolute", top: "1.5rem", right: "var(--pad)",
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "rgba(245,240,232,0.5)",
        }}>close</button>
        {[["work", "work"], ["about", "about"], ["contact", "contact"]].map(([label, id], i) => (
          <button key={label}
            onClick={() => {
              const m = document.getElementById("mobile-nav"); if (m) m.style.display = "none";
              const el = document.getElementById(id);
              if (!el) return;
              const y = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top: y, behavior: "smooth" });
            }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 15vw, 5rem)",
              lineHeight: 1, letterSpacing: "0.01em",
              color: "#F5F0E8", textDecoration: "none", background: "none", border: "none",
              display: "block", padding: "0.5rem 0", cursor: "pointer", textAlign: "left",
              opacity: 0, animation: `mobileNavIn 0.3s ease ${i * 60}ms forwards`,
            }}
          >{label.toUpperCase()}</button>
        ))}
        <style>{`
          @keyframes mobileNavIn {
            from { opacity: 0; transform: translateX(-12px); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>
      </div>

      {/* HERO
          Grid: 1fr 1fr 1fr
          Col1: bio + currently (top-aligned)
          Col2: numbers label + stats (top-aligned)
          Col3: quote BOTTOM-aligned, flush to section bottom border
      */}
      <section className="hero-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid var(--border)",
        padding: "3rem var(--pad)",
        alignItems: "stretch",
        paddingTop: "0",
        paddingBottom: "0",
      }}>
        <div style={{ padding: "3rem 3rem 3rem 0",}}>
          <Label>bio</Label>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.72, color: "rgba(10,10,10,0.72)", marginBottom: "2.5rem", textWrap: "pretty" }}>
            {data.heroBio}
          </p>
          <Label>currently</Label>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.6, color: "rgba(10,10,10,0.6)", textWrap: "pretty" }}>
            {data.heroCurrentRole}<br />{data.heroCurrentCompany}
          </p>
        </div>

        <div className="hero-col2" style={{ borderLeft: "1px solid var(--border)", padding: "3rem", }}>
          <Label>numbers</Label>
          {[
            { value: "11", label: "years building products" },
            { value: "9", label: "countries" },
            { value: "1M+", label: "end users on products I have contributed to" },
            { value: "32\u21921", label: "legacy tools into one workspace" },
          ].map(({ value, label }) => (
            <div key={value} style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 4.5vw, 5rem)", lineHeight: 0.88, letterSpacing: "0.02em", color: "var(--ink)" }}>{value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--muted)", marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Col 3: quote bottom-aligned */}
        <div className="hero-col3" style={{
          borderLeft: "1px solid var(--border)", padding: "3rem 0 3rem 3rem",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",          
        }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.1vw, 1rem)", lineHeight: 1.75, color: "rgba(10,10,10,0.5)", textWrap: "pretty" }}>
            {data.heroHeadline}
          </p>
        </div>
      </section>

      {/* WORK BLEED
          Same 1fr 1fr 1fr grid.
          Col3 borderLeft aligns exactly with hero col3 borderLeft.
          Col3: selected projects label + description, bottom-aligned.
      */}
      <div id="work" className="bleed-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid var(--border)",
        padding: "0 var(--pad)", overflow: "hidden",
      }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(5.5rem, 13vw, 15rem)",
          lineHeight: 0.86, letterSpacing: "0.01em", color: "var(--ink)", paddingBottom: "3rem", paddingTop: "3rem",paddingRight: "27.33rem",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          WORK
        </div>        
        <div className="bleed-col3" style={{
          borderLeft: "1px solid var(--border)", paddingLeft: "3rem",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "3rem",
          opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.2s", width: "22rem",
        }}>
          <Label>selected projects</Label>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--muted)", lineHeight: 1.65, textWrap: "pretty" }}>
            Product design across BSS/OSS, eCommerce, B2B and B2C. NDA-constrained where noted.
          </p>
        </div>
      </div>

      {/* WORK LIST */}
      <section style={{ padding: "0 var(--pad)", borderBottom: "1px solid var(--border)" }}>
        {data.workCards.filter(c => !c.hidden).map((card, i) => (
          <WorkItem key={card.id} card={card} i={i} />
        ))}
      </section>

      {/* ABOUT BLEED */}
      <div id="about" className="bleed-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid var(--border)",
        padding: "0 var(--pad)", overflow: "hidden", paddingTop: "3rem", paddingBottom: "3rem",
      }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(5.5rem, 13vw, 15rem)",
          lineHeight: 0.86, letterSpacing: "0.01em", color: "var(--ink)", paddingBottom: "0.06em",
        }}>
          ABOUT
        </div>
      </div>

      {/* ABOUT CONTENT */}
      <section className="about-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        padding: "4rem var(--pad)",
      }}>
        <div style={{ paddingRight: "3rem" }}>
          <Label>long bio</Label>
          {[data.aboutBio1, data.aboutBio2, data.aboutBio3].map((t, i) => (
            <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.78, color: "rgba(10,10,10,0.7)", marginBottom: "1.25rem", textWrap: "pretty" }}>{t}</p>
          ))}
          <div style={{ marginTop: "1.75rem" }}>
            <Label>beyond the work</Label>
            {[data.aboutBeyond1, data.aboutBeyond2, data.aboutBeyond3].filter(Boolean).map((t, i) => (
              <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.72, color: "rgba(10,10,10,0.55)", marginBottom: "1rem", textWrap: "pretty" }}>{t}</p>
            ))}
          </div>
        </div>

        <div className="about-col2" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "3rem", paddingRight: "3rem" }}>
          <Label>experience</Label>
          {data.experience.map((job, i) => (
            <div key={i} style={{ paddingBottom: "1.5rem", marginBottom: "1.5rem", borderBottom: i < data.experience.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px", color: "var(--ink)", marginBottom: "0.1rem" }}>{job.role}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--ink)", marginBottom: "0.15rem" }}>{job.company}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", color: "var(--faint)", marginBottom: "0.55rem" }}>{job.period}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.6, color: "rgba(10,10,10,0.55)", textWrap: "pretty" }}>{job.note}</p>
            </div>
          ))}
          <div style={{ marginTop: "0.5rem" }}>
            <Label>education</Label>
            {data.education.map((ed, i) => (
              <div key={i} style={{ marginBottom: "0.9rem" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px", color: "var(--ink)" }}>{ed.degree}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted)" }}>{ed.school}</div>
              </div>
            ))}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(10,10,10,0.32)", lineHeight: 1.65, marginTop: "1.5rem", textWrap: "pretty" }}>
              Company names and client details omitted per active NDAs.
            </p>
          </div>
        </div>

        <div className="about-col3" style={{ borderLeft: "1px solid var(--border)", paddingLeft: "3rem" }}>
          <img src="/photo.jpg" alt="Felipe Cruz" style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4", marginBottom: "2rem" }} />
          <Label>expertise</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {data.skills.map((s: string) => (
              <span key={s} style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(10,10,10,0.65)", lineHeight: 1.7 }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - flush to about, no top gap, no border between them */}
      <section id="contact" style={{ background: "var(--ink)" }}>
        <div className="contact-bleed" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0 var(--pad)", overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(5.5rem, 13vw, 15rem)",
            lineHeight: 0.86, letterSpacing: "0.01em", color: "#F5F0E8",
            paddingBottom: "3rem", marginTop: "-15px",
          }}>
            <a href={`mailto:${data.contactEmail}`} style={{
            transition: "opacity 0.15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >LET&apos;S<br />TALK</a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(245,240,232,0.1)", padding: "3rem var(--pad) 4rem", width: "15%", }}>
          <a href={`mailto:${data.contactEmail}`} style={{
            display: "block", fontFamily: "var(--font-body)", fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "#F5F0E8",
            textDecoration: "none", marginBottom: "0.75rem", transition: "opacity 0.15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.55"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >email me</a>
          {[[data.contactLinkedIn, "linkedin"], [data.contactIllustration, "illustration"]].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              display: "block", fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "16px",
              color: "rgba(245,240,232,0.45)", textDecoration: "none",
              marginBottom: "0.5rem", transition: "color 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F5F0E8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.45)"; }}
            >{label}</a>
          ))}
        </div>

        <div style={{ padding: "1.25rem var(--pad)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "rgba(245,240,232,0.25)" }}>
            Felipe Cruz &mdash; Product Designer
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "rgba(245,240,232,0.25)" }}>
            {year}
          </span>
        </div>
      </section>

    </main>
  );
}
