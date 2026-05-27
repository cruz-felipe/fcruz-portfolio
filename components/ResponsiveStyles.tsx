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

      /* ── Case study desktop ── */
      .case-metrics   { grid-template-columns: repeat(3, 1fr) !important; }
      .case-context   { grid-template-columns: 1fr 1fr !important; }
      .case-hero-below { grid-template-columns: 1fr 300px !important; }

      /* ── Artifact SVGs ── */
      .artifact-section svg { width: 100% !important; height: auto !important; }
      .artifact-scroll { min-width: 0; }

      /* ── Screen gallery ── */
      .screen-gallery             { grid-template-columns: repeat(3, 1fr) !important; width: 100%; }
      .screen-gallery.count-2     { grid-template-columns: repeat(2, 1fr) !important; }
      .screen-gallery.count-1     { grid-template-columns: 1fr !important; max-width: 760px; margin: 0 auto; }
      .screen-gallery.narrow      { grid-template-columns: repeat(3, 320px) !important; justify-content: center; }
      .screen-gallery.narrow.count-2 { grid-template-columns: repeat(2, 320px) !important; justify-content: center; }
      .screen-gallery.narrow.count-1 { grid-template-columns: 320px !important; justify-content: center; }

      /* ══════════════════════════════════════════
         TABLET — 960px
      ══════════════════════════════════════════ */
      @media (max-width: 960px) {
        :root { --pad: 2.5rem; }

        /* Homepage three-col -> two-col */
        /* Hero: col3 drops to below */
        .hero-grid { grid-template-columns: 1fr 1fr !important; }
        .hero-col3 { grid-column: 1 / -1 !important; border-left: none !important;
          border-top: 1px solid var(--border) !important; padding-left: 0 !important;
          padding-top: 2rem !important; }

        /* About: two-col, photo col goes last row */
        .about-grid { grid-template-columns: 1fr 1fr !important; }
        .about-col3 { grid-column: 1 / -1 !important; border-left: none !important;
          border-top: 1px solid var(--border) !important; padding-left: 0 !important;
          padding-top: 2rem !important;
          display: grid !important; grid-template-columns: 240px 1fr !important; gap: 2.5rem; }

        /* Bleed title: two-col */
        .bleed-grid { grid-template-columns: 1fr 1fr !important; }
        .bleed-col3 { display: none !important; }

        /* Contact */
        .contact-grid { grid-template-columns: 1fr 1fr !important; }
        .contact-col3 { display: none !important; }

        /* Case study */
        .case-context   { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: 1fr 1fr !important; }
        .screen-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        .screen-gallery.count-1 { grid-template-columns: 1fr !important; max-width: 100%; }
        .screen-gallery.narrow { grid-template-columns: repeat(2, 260px) !important; }
      }

      /* ══════════════════════════════════════════
         MOBILE — 640px
      ══════════════════════════════════════════ */
      @media (max-width: 640px) {
        :root { --pad: 1.25rem; }

        /* ── Homepage nav ── */
        .nav-links { display: none !important; }

        /* ── All three-col grids -> single col ── */
        /* Hero section */
        section[class*="hero-grid"],
        section[style*="grid-template-columns: 1fr 1fr 1fr"] {
          grid-template-columns: 1fr !important;
        }

        /* Hero col borders remove */
        .hero-col2, .hero-col3 {
          border-left: none !important; padding-left: 0 !important;
          border-top: 1px solid var(--border); padding-top: 2rem;
        }

        /* Work bleed title: stacked */
        .bleed-grid { grid-template-columns: 1fr !important; }
        .bleed-col2, .bleed-col3 {
          border-left: none !important; padding-left: 0 !important;
        }
        .bleed-col2 { display: none !important; }
        .bleed-col3 { display: none !important; }

        /* About grid */
        .about-grid { grid-template-columns: 1fr !important; }
        .about-col2, .about-col3 {
          border-left: none !important; padding-left: 0 !important;
          border-top: 1px solid var(--border); padding-top: 2rem;
        }
        .about-col3 { display: block !important; }
        .about-col3 img { aspect-ratio: 4/3 !important; }

        /* Contact */
        .contact-bleed { grid-template-columns: 1fr !important; }
        .contact-bleed > div { border-left: none !important; padding-left: 0 !important; }
        .contact-grid { grid-template-columns: 1fr !important; }
        .contact-grid > div { border-left: none !important; padding-left: 0 !important;
          padding-top: 1.5rem !important; }

        /* ── Case study ── */
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: 1fr 1fr !important; }
        .metric-cell { padding: 1.5rem var(--pad) !important; }
        .metric-cell + .metric-cell { border-left: none !important;
          border-top: 1px solid var(--border); }
        .case-context { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .case-section { padding: 2rem var(--pad) !important; }
        .context-section { padding: 2rem var(--pad) !important; }
        .cs-pullquote-section { padding: 2.5rem var(--pad) !important; }
        .screen-gallery-section { padding: 1.5rem var(--pad) !important; }
        .artifact-section { padding: 1.5rem var(--pad) !important; }
        .artifact-caption { flex-direction: column !important; gap: 0.5rem !important; }
        .screen-gallery, .screen-gallery.count-2 { grid-template-columns: 1fr !important; }
        .screen-gallery.narrow { grid-template-columns: repeat(2, 1fr) !important; }
        .screen-gallery.narrow.count-1 { grid-template-columns: 1fr !important; }
      }

      /* ── 440px ── */
      @media (max-width: 440px) {
        .case-metrics { grid-template-columns: 1fr !important; }
        .metric-cell + .metric-cell { border-top: 1px solid var(--border) !important; border-right: none !important; }
        .screen-gallery.narrow { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
