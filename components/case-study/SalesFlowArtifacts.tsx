// B2B Sales — User flow and architecture diagrams

export function SalesUserFlowArtifact() {
  // Before vs after user flow — 7 steps vs 3 steps
  return (
    <svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">PROPOSAL GENERATION: USER FLOW BEFORE AND AFTER</text>

      {/* Before flow */}
      <text x="20" y="36" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="var(--muted)">BEFORE · 7 tools · ~60 min</text>
      {[
        {label:"Open CRM", icon:"→"},
        {label:"Search catalog", icon:"→"},
        {label:"Build pricing", icon:"→"},
        {label:"Email approval", icon:"→"},
        {label:"Generate contract", icon:"→"},
        {label:"Schedule install", icon:"→"},
        {label:"Send confirm", icon:""},
      ].map((step, i) => {
        const x = 20 + i * 110;
        return (
          <g key={i}>
            <rect x={x} y="44" width="100" height="40" rx="2" fill="#e8e8e4"/>
            <text x={x+50} y="68" textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fill="#555">{step.label}</text>
            {i < 6 && (
              <>
                <rect x={x+100} y="58" width="10" height="12" rx="0" fill="#bbb"/>
                <text x={x+104} y="68" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#999">→</text>
              </>
            )}
          </g>
        );
      })}

      {/* Annotation */}
      <rect x="20" y="92" width="760" height="22" rx="2" fill="#f5f5f2"/>
      <text x="400" y="106" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">Manual data re-entry at every step · Email chains for approvals · No tracking · 37 interviews confirmed this</text>

      {/* After flow */}
      <text x="20" y="136" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="var(--muted)">AFTER · 1 unified tool · ~15 min</text>
      {[
        {label:"Select client\n+ product", fill:"var(--red)"},
        {label:"Pricing auto-calculated\nApproval automated", fill:"#1a1a1a"},
        {label:"Contract generated\nInstall scheduled", fill:"#1a1a1a"},
      ].map((step, i) => {
        const x = 20 + i * 260;
        return (
          <g key={i}>
            <rect x={x} y="144" width="244" height="60" rx="4" fill={step.fill}/>
            <text x={x+122} y="167" textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill="white">{`Step ${i+1}`}</text>
            {step.label.split("\n").map((line, li) => (
              <text key={li} x={x+122} y={183+li*14} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.65)">{line}</text>
            ))}
            {i < 2 && (
              <text x={x+248} y="178" textAnchor="middle" fontFamily="var(--font-body)" fontSize="16" fill="#bbb">→</text>
            )}
          </g>
        );
      })}

      <text x="20" y="224" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">75% faster quote generation. Manager approval automated. Installation tracking built into flow. Rebrand drove team adoption.</text>
    </svg>
  );
}

export function SalesResearchFlowArtifact() {
  // Heuristic matrix reuse existing
  return null;
}
