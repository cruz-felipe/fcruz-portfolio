export default function ResponsiveStyles() {
  return (
    <style>{`
      /* ── Case study ── */
      .case-metrics   { grid-template-columns: repeat(3, 1fr) !important; }
      .case-context   { grid-template-columns: 1fr 1fr !important; }
      .case-hero-below { grid-template-columns: 1fr 320px !important; }
      .artifact-section svg { width: 100% !important; height: auto !important; }
      .artifact-scroll { min-width: 0; }
      .screen-gallery             { grid-template-columns: repeat(3, 1fr) !important; width: 100%; }
      .screen-gallery.count-2     { grid-template-columns: repeat(2, 1fr) !important; }
      .screen-gallery.count-1     { grid-template-columns: 1fr !important; max-width: 760px; margin: 0 auto; }
      .screen-gallery.narrow      { grid-template-columns: repeat(3, 320px) !important; justify-content: center; }
      .screen-gallery.narrow.count-2 { grid-template-columns: repeat(2, 320px) !important; justify-content: center; }
      .screen-gallery.narrow.count-1 { grid-template-columns: 320px !important; justify-content: center; }

      /* ── Tablet 900px ── */
      @media (max-width: 900px) {
        :root { --pad: 2rem; }
        .case-context { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: 1fr 1fr !important; }
        .screen-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        .screen-gallery.count-1 { grid-template-columns: 1fr !important; max-width: 100%; }
        .screen-gallery.narrow  { grid-template-columns: repeat(2, 260px) !important; }
      }

      /* ── Mobile 680px ── */
      @media (max-width: 680px) {
        :root { --pad: 1.25rem; }

        /* Homepage grid columns collapse */
        header { grid-template-columns: 1fr !important; }
        header > div:nth-child(2) { display: none; }
        header > div:nth-child(3) { justify-content: flex-start !important; margin-top: 1rem; }

        /* Hero three-col -> single */
        section[style*="grid-template-columns: 1fr 1fr 1fr"] {
          grid-template-columns: 1fr !important;
        }

        /* Case study mobile */
        .case-hero-inner { padding: calc(58px + 2.5rem) var(--pad) 2.5rem !important; }
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: 1fr !important; }
        .metric-cell { border-right: none !important; border-bottom: 0.5px solid rgba(10,10,10,0.12); }
        .metric-cell:last-child { border-bottom: none; }
        .case-section { padding: 2.5rem var(--pad) !important; }
        .context-section { padding: 2.5rem var(--pad) !important; }
        .metrics-section { padding: 0 !important; }
        .cs-pullquote-section { padding: 3rem var(--pad) !important; }
        .screen-gallery-section { padding: 2rem var(--pad) !important; }
        .artifact-section { padding: 2rem var(--pad) !important; }
        .artifact-caption { flex-direction: column !important; gap: 0.5rem !important; }
        .screen-gallery, .screen-gallery.count-2 { grid-template-columns: 1fr !important; }
        .screen-gallery.narrow { grid-template-columns: repeat(2, 1fr) !important; justify-content: stretch !important; }
        .screen-gallery.narrow.count-1 { grid-template-columns: 1fr !important; }
      }

      @media (max-width: 480px) {
        .screen-gallery.narrow { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
