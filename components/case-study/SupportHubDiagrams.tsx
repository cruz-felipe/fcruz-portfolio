export function AIArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">AI WORKSPACE ARCHITECTURE</text>

      {/* Data sources column */}
      <text x="20" y="36" fontFamily="var(--font-body)" fontSize="9" fill="var(--muted)" letterSpacing="1">DATA LAYER</text>
      {["Billing history","Interaction log","Technical DB","Plan registry","Ticket system"].map((src, i) => (
        <g key={i}>
          <rect x="20" y={44+i*34} width="130" height="26" rx="2" fill="#e8e8e4"/>
          <text x="85" y={44+i*34+16} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#444">{src}</text>
          <path d={`M150 ${44+i*34+13} C180 ${44+i*34+13} 200 140 220 140`} stroke="#ccc" strokeWidth="1" fill="none"/>
        </g>
      ))}

      {/* AI core */}
      <rect x="220" y="106" width="120" height="68" rx="4" fill="#1a1a1a"/>
      <text x="280" y="136" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="800" fill="var(--red)">AI</text>
      <text x="280" y="152" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.6)">Orchestration</text>
      <text x="280" y="165" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.6)">Real-time</text>

      {/* Output layers */}
      <text x="380" y="36" fontFamily="var(--font-body)" fontSize="9" fill="var(--muted)" letterSpacing="1">AGENT INTERFACE</text>
      {[
        {label:"Auto-ID panel", sub:"Customer context on connect", fill:"var(--red)"},
        {label:"Context script", sub:"Data surfaced mid-call", fill:"#1a1a1a"},
        {label:"Live resolution", sub:"Answer in session", fill:"#1a1a1a"},
      ].map((out, i) => (
        <g key={i}>
          <path d={`M340 140 C360 140 370 ${44+i*58+22} 380 ${44+i*58+22}`} stroke="#ccc" strokeWidth="1" fill="none"/>
          <rect x="380" y={44+i*58} width="220" height="44" rx="3" fill={out.fill}/>
          <text x="394" y={44+i*58+17} fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="white">{out.label}</text>
          <text x="394" y={44+i*58+32} fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.6)">{out.sub}</text>
        </g>
      ))}

      {/* Agent */}
      <rect x="646" y="118" width="134" height="44" rx="3" fill="#f5f5f2"/>
      <text x="713" y="136" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="#1a1a1a">Agent</text>
      <text x="713" y="152" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">Customer focus</text>
      <line x1="600" y1="140" x2="646" y2="140" stroke="#ccc" strokeWidth="1"/>

      {/* Key insight */}
      <rect x="20" y="226" width="760" height="24" rx="3" fill="#1a1a1a"/>
      <text x="400" y="242" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" fill="rgba(255,255,255,0.7)">Data retrieval moves from agent to system. AHT: 10 min → 3 min. Onboarding: 3 days → half a day.</text>
    </svg>
  );
}
