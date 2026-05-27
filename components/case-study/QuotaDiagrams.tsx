export function QuotaUserFlowDiagram() {
  return (
    <svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">QUOTA MANAGEMENT: USER FLOW</text>

      {/* Two user types */}
      <rect x="20" y="28" width="110" height="36" rx="3" fill="#1a1a1a"/>
      <text x="75" y="50" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">Client agent</text>

      <rect x="20" y="74" width="110" height="36" rx="3" fill="#e8e8e4"/>
      <text x="75" y="96" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="#333">Partner agent</text>

      {/* Platform entry */}
      <line x1="130" y1="46" x2="170" y2="80" stroke="#ccc" strokeWidth="1"/>
      <line x1="130" y1="92" x2="170" y2="80" stroke="#ccc" strokeWidth="1"/>
      <rect x="170" y="58" width="100" height="44" rx="3" fill="var(--red)"/>
      <text x="220" y="77" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">Platform</text>
      <text x="220" y="92" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.7)">Unified entry</text>

      {/* Three modules */}
      {[
        {label:"Quota manager", sub:"View · Adjust · Alert", y:28},
        {label:"API usage", sub:"Monitor · Export", y:80},
        {label:"Change requests", sub:"Submit · Approve · Track", y:132},
      ].map((mod, i) => (
        <g key={i}>
          <line x1="270" y1="80" x2="320" y2={mod.y+18} stroke="#ccc" strokeWidth="1"/>
          <rect x="320" y={mod.y} width="180" height="36" rx="3" fill={i===0 ? "#1a1a1a" : "#f5f5f2"}/>
          <text x="410" y={mod.y+15} textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill={i===0 ? "white" : "#1a1a1a"}>{mod.label}</text>
          <text x="410" y={mod.y+28} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill={i===0 ? "rgba(255,255,255,0.6)" : "#888"}>{mod.sub}</text>
        </g>
      ))}

      {/* Approval route from change requests */}
      <line x1="500" y1="150" x2="540" y2="150" stroke="#ccc" strokeWidth="1"/>
      <rect x="540" y="130" width="110" height="40" rx="3" fill="#1a1a1a"/>
      <text x="595" y="148" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="var(--red)">Approval</text>
      <text x="595" y="162" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.55)">Multi-level</text>

      <line x1="650" y1="150" x2="680" y2="150" stroke="#ccc" strokeWidth="1"/>
      <rect x="680" y="130" width="100" height="40" rx="18" fill="#e8e8e4"/>
      <text x="730" y="148" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="#333">Applied</text>
      <text x="730" y="162" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">Audit logged</text>

      {/* Role note */}
      <rect x="20" y="190" width="760" height="40" rx="3" fill="#f5f5f2"/>
      <text x="400" y="207" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="#555">Solo designer. Greenfield from scratch.</text>
      <text x="400" y="222" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="#555">No prior product to reference. Visual language constrained to match client existing ecosystem.</text>
    </svg>
  );
}
