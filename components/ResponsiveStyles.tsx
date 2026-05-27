export default function ResponsiveStyles() {
  return (
    <style>{`
      /* ── Hero ── */
      .hero-bio { text-wrap: pretty; }

      /* ── Nav ── */
      .nav-hamburger { display: none !important; }
      .nav-desktop   { display: flex !important; }

      /* ── Work list hover ── */
      .work-list-item:hover {
        background: rgba(13,13,13,0.025);
        margin-left: calc(-1 * var(--pad));
        margin-right: calc(-1 * var(--pad));
        padding-left: var(--pad) !important;
        padding-right: var(--pad) !important;
      }

      /* ── Case study ── */
      .case-metrics   { grid-template-columns: repeat(3, 1fr) !important; }
      .case-context   { grid-template-columns: 1fr 1fr !important; }
      .case-hero-below { grid-template-columns: 1fr 320px !important; }

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

      /* ── About layout ── */
      .about-top    { display: grid; grid-template-columns: 240px 1fr; gap: 4rem; align-items: flex-start; }
      .about-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
      .experience-period { white-space: nowrap; }
      .experience-entry  { display: grid; grid-template-columns: 1fr auto; gap: 1rem; }

      /* ── Tablet 900px ── */
      @media (max-width: 900px) {
        :root { --pad: 2rem; }
        .about-top    { grid-template-columns: 180px 1fr; gap: 2.5rem; }
        .about-bottom { grid-template-columns: 1fr; gap: 2.5rem; }
        .case-context { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: 1fr 1fr !important; }
        .screen-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        .screen-gallery.count-1 { grid-template-columns: 1fr !important; max-width: 100%; }
        .screen-gallery.narrow  { grid-template-columns: repeat(2, 260px) !important; }
        .work-list-item { grid-template-columns: 36px 1fr 120px !important; }
        .work-list-item > span:nth-child(3) { display: none; }
      }

      /* ── Mobile 680px ── */
      @media (max-width: 680px) {
        :root { --pad: 1.25rem; }
        .nav-hamburger { display: block !important; }
        .nav-desktop   { display: none !important; }

        #hero-section { padding-top: calc(58px + 3rem) !important; padding-bottom: 0 !important; }
        .hero-sub {
          grid-template-columns: 1fr !important;
          gap: 0 !important;
        }
        .hero-sub > div:last-child { border-left: none !important; padding-left: 0 !important; border-top: 0.5px solid var(--border); }

        #work { padding: 3rem var(--pad) !important; }
        .featured-card-link { grid-template-columns: 1fr !important; min-height: auto !important; }
        .featured-card-link > div:last-child { display: none !important; }
        .featured-card-content { padding: 2rem 1.5rem !important; }
        .work-list-item { grid-template-columns: 36px 1fr !important; }
        .work-list-item > span:nth-child(3),
        .work-list-item > span:nth-child(4) { display: none !important; }

        .case-hero-inner { padding: calc(58px + 2.5rem) var(--pad) 2.5rem !important; }
        .case-hero-below { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .case-metrics { grid-template-columns: 1fr !important; }
        .metric-cell { border-right: none !important; border-bottom: 0.5px solid var(--border); }
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

        #about { padding: 3rem var(--pad) !important; }
        .about-top { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .about-photo-col > div { max-width: 100% !important; aspect-ratio: 4/3 !important; }
        .about-bottom { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .experience-entry { grid-template-columns: 1fr !important; gap: 0.25rem !important; }
        .experience-period { white-space: normal !important; font-size: 10px !important; }

        .footer-cta-row { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        .footer-cta-divider { display: none !important; }
        .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 0.5rem !important; padding: 1.25rem var(--pad) !important; }
      }

      @media (max-width: 480px) {
        .screen-gallery.narrow { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
