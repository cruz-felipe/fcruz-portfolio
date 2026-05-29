export default function ResponsiveStyles() {
  return (
    <style>{`
      /* ── Reveal ── */
      .reveal {
        opacity: 0; transform: translateY(10px);
        transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal.visible { opacity: 1; transform: none; }
      @media (prefers-reduced-motion: reduce) {
        .reveal { opacity: 1; transform: none; transition: none; }
      }

      /* ── Case study desktop defaults ── */
      .case-metrics   { grid-template-columns: repeat(3, 1fr); }
      .case-context   { grid-template-columns: 1fr 1fr; gap: 4rem; }
      .case-hero-below { grid-template-columns: 1fr 300px; gap: 4rem; }

      /* ── Artifact SVGs ── */
      .artifact-section svg { width: 100% !important; height: auto !important; }
      .artifact-scroll { min-width: 0; overflow-x: auto; }

      /* ── Screen gallery desktop ── */
      .screen-gallery             { grid-template-columns: repeat(3, 1fr); width: 100%; }
      .screen-gallery.count-2     { grid-template-columns: repeat(2, 1fr); }
      .screen-gallery.count-1     { grid-template-columns: 1fr; max-width: 760px; margin: 0 auto; }
      .screen-gallery.narrow      { grid-template-columns: repeat(3, 320px); justify-content: center; }
      .screen-gallery.narrow.count-2 { grid-template-columns: repeat(2, 320px); justify-content: center; }
      .screen-gallery.narrow.count-1 { grid-template-columns: 320px; justify-content: center; }

      /* ── Work item: contain ghost number ── */
      .work-item { overflow: hidden; position: relative; }

      /* ══════════════════════════════════════════
         TABLET — 900px
      ══════════════════════════════════════════ */
      @media (max-width: 900px) {
        :root { --pad: 2rem; }

        /* Hero: col1+col2 side by side, col3 full width below */
        .hero-grid { grid-template-columns: 1fr 1fr !important; }
        .hero-col2 { padding-right: 0 !important; }
        .hero-col3 {
          grid-column: 1 / -1 !important;
          border-left: none !important; border-top: 1px solid var(--border) !important;
          padding-left: 0 !important; padding-top: 1.5rem !important;
          justify-content: flex-start !important;
        }

        /* Bleed titles: WORK/ABOUT span full width, hide empty col2, col3 stays */
        .bleed-grid { grid-template-columns: 1fr 1fr !important; }
        .bleed-col2 { display: none !important; }
        .bleed-col3 { border-left: 1px solid var(--border) !important; }

        /* About: col1+col2 side by side, col3 photo+skills full width below */
        .about-grid { grid-template-columns: 1fr 1fr !important; }
        .about-col3 {
          grid-column: 1 / -1 !important;
          border-left: none !important; border-top: 1px solid var(--border) !important;
          padding-left: 0 !important; padding-top: 2rem !important;
          display: grid !important; grid-template-columns: 220px 1fr !important;
          gap: 2.5rem !important; align-items: start !important;
        }
        .about-col3 img { aspect-ratio: 3/4 !important; }

        /* Case study */
        .case-context   { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: repeat(2, 1fr) !important; }
        .screen-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        .screen-gallery.narrow { grid-template-columns: repeat(2, 240px) !important; }
      }

      /* ══════════════════════════════════════════
         MOBILE — 640px
      ══════════════════════════════════════════ */
      @media (max-width: 640px) {
        :root { --pad: 1.25rem; }

        /* ── Nav: hide links, show hamburger ── */
        .nav-links { display: none !important; }
        .nav-hamburger { display: flex !important; }

        /* ── Hero: single column ── */
        .hero-grid {
          grid-template-columns: 1fr !important;
          padding: 2rem var(--pad) !important;
        }
        .hero-col2 {
          border-left: none !important; padding-left: 0 !important;
          border-top: 1px solid var(--border) !important; padding-top: 2rem !important;
          padding-right: 0 !important;
          display: none !important;
        }
        .hero-col3 {
          border-left: none !important; padding-left: 0 !important;
          border-top: 1px solid var(--border) !important; padding-top: 1.5rem !important;
          justify-content: flex-start !important;
        }

        /* ── WORK bleed: full width, hide cols 2+3 ── */
        .bleed-grid { grid-template-columns: 1fr !important; }
        .bleed-col2 { display: none !important; }
        .bleed-col3 { display: none !important; }

        /* ── Work items: tighter padding ── */
        .work-item { padding-top: 2rem !important; padding-bottom: 2rem !important; }

        /* ── About: single column ── */
        .about-grid {
          grid-template-columns: 1fr !important;
          padding: 2.5rem var(--pad) !important;
        }
        .about-col2 {
          border-left: none !important; padding-left: 0 !important;
          padding-right: 0 !important;
          border-top: 1px solid var(--border) !important; padding-top: 2rem !important;
        }
        .about-col3 {
          border-left: none !important; padding-left: 0 !important;
          border-top: 1px solid var(--border) !important; padding-top: 2rem !important;
          display: block !important;
        }
        .about-col3 img { aspect-ratio: 4/3 !important; width: 100% !important; }

        /* ── Contact bleed ── */
        .contact-bleed { grid-template-columns: 1fr !important; }
        .contact-bleed > div:not(:first-child) { display: none !important; }
        #getintouch { margin-top: -5px !important; }
        #emailme { width: 100% !important; }

        /* ── Case study nav ── */
        .case-nav {
          grid-template-columns: 1fr auto !important;
        }
        .case-nav-middle { display: none !important; }

        /* ── Case study content ── */
        .case-hero-below { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .case-metrics { grid-template-columns: 1fr 1fr !important; }
        .metric-cell {
          padding-left: var(--pad) !important; padding-right: var(--pad) !important;
          padding-top: 1.5rem !important; padding-bottom: 1.5rem !important;
        }
        .metric-cell:nth-child(odd) { border-right: 1px solid var(--border) !important; }
        .metric-cell:nth-child(even) { border-right: none !important; }
        .case-context { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .case-section { padding: 2rem var(--pad) !important; }
        .context-section { padding: 2rem var(--pad) !important; }
        .cs-pullquote-section { padding: 2.5rem var(--pad) !important; }
        .screen-gallery-section { padding: 1.5rem var(--pad) !important; }
        .artifact-section { padding: 1.5rem var(--pad) !important; }
        .artifact-caption { flex-direction: column !important; gap: 0.5rem !important; }
        .screen-gallery,
        .screen-gallery.count-2 { grid-template-columns: 1fr !important; }
        .screen-gallery.narrow,
        .screen-gallery.narrow.count-2 { grid-template-columns: 1fr !important; }
      }


        /* ── Case hero title ── */
        .case-hero-title { line-height: 1 !important; margin-bottom: 1.5rem !important; }
        /* ── Pullquote block ── */
        .case-pullquote-block { padding-top: 2rem !important; padding-bottom: 2rem !important; }
        .case-pullquote-block blockquote { font-size: 1.35rem !important; }
        /* ── More work rows: 48px tap target ── */
        .more-work-row { min-height: 48px !important; align-items: center !important; padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
        /* ── Artifact scroll ── */
        .artifact-scroll { padding-bottom: 0.5rem !important; }
        /* ── Body text mobile ── */
        .cs-body { font-size: 16px !important; }
        .cs-lead { font-size: 1rem !important; }
        /* ── Ghost number: contain overflow ── */
        .work-item { overflow: hidden !important; }
        /* ── Work item arrow: visible on touch ── */
        .wi-arrow { opacity: 0.35 !important; }
        /* ── Case hero: less top padding on mobile ── */
        .case-hero-inner { padding-top: calc(60px + 2rem) !important; }
        /* ── More work titles: min size on narrow ── */
        .more-work-title { font-size: 1.4rem !important; }
      }

      /* ── 420px ── */
      @media (max-width: 420px) {
        :root { --pad: 1rem; }
        .case-metrics { grid-template-columns: 1fr !important; }
        .metric-cell { border-right: none !important; }
        .metric-cell + .metric-cell { border-top: 1px solid var(--border) !important; }
      }
    `}</style>
  );
}
