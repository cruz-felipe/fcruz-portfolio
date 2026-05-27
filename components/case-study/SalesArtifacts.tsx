export function HeuristicMatrixArtifact() {
  const issues = [
    {crit:9, effort:2},{crit:9, effort:3},{crit:8, effort:2},{crit:7, effort:4},
    {crit:8, effort:4},{crit:2, effort:5},{crit:3, effort:6},{crit:5, effort:2},
    {crit:10, effort:8},{crit:6, effort:2},{crit:7, effort:3},{crit:4, effort:5},
    {crit:5, effort:3},{crit:6, effort:1},{crit:7, effort:5},{crit:8, effort:3},
  ];
  const oX=80, oY=220, cW=580, cH=170;

  return (
    <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <rect x={oX} y={oY-(6/10)*cH} width={(4/10)*cW} height={(6/10)*cH} rx="2" fill="#f0f0ec"/>
      <text x={oX+10} y={oY-(6/10)*cH+16} fontFamily="var(--font-body)" fontSize="9" fill="#aaa">Ship first</text>
      {[2,4,6,8,10].map(v => (
        <g key={v}>
          <line x1={oX+(v/10)*cW} y1={oY-cH} x2={oX+(v/10)*cW} y2={oY} stroke="#e8e8e4" strokeWidth="1"/>
          <text x={oX+(v/10)*cW} y={oY+14} textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fill="#bbb">{v}</text>
          <line x1={oX} y1={oY-(v/10)*cH} x2={oX+cW} y2={oY-(v/10)*cH} stroke="#e8e8e4" strokeWidth="1"/>
          <text x={oX-8} y={oY-(v/10)*cH+4} textAnchor="end" fontFamily="var(--font-body)" fontSize="9" fill="#bbb">{v}</text>
        </g>
      ))}
      <line x1={oX} y1={oY-cH} x2={oX} y2={oY} stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1={oX} y1={oY} x2={oX+cW} y2={oY} stroke="#1a1a1a" strokeWidth="1.5"/>
      <text x={oX+cW/2} y={oY+28} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Engineering effort →</text>
      <text x="18" y={oY-cH/2} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" transform={`rotate(-90,18,${oY-cH/2})`}>↑ Criticality</text>
      {issues.map((issue, i) => {
        const cx = oX + (issue.effort/10)*cW;
        const cy = oY - (issue.crit/10)*cH;
        const hi = issue.crit >= 7 && issue.effort <= 4;
        return <circle key={i} cx={cx} cy={cy} r="7" fill={hi ? "var(--red)" : "#1a1a1a"}/>;
      })}
      <circle cx={oX+20} cy={oY+46} r="6" fill="var(--red)"/>
      <text x={oX+32} y={oY+51} fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">High priority</text>
      <circle cx={oX+130} cy={oY+46} r="6" fill="#1a1a1a"/>
      <text x={oX+142} y={oY+51} fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Lower priority</text>
    </svg>
  );
}

export function FlowCompressionArtifact() {
  return (
    <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">BEFORE: 7 TOOLS · 1 HOUR PER PROPOSAL</text>
      {["CRM","Catalog","Pricing","Approval","Contract","Schedule","Confirm"].map((s, i) => (
        <g key={i}>
          <rect x={20+i*110} y="24" width="100" height="36" rx="2" fill="#e8e8e4"/>
          <text x={20+i*110+50} y="46" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="#555">{s}</text>
          {i < 6 && <line x1={20+i*110+100} y1="42" x2={20+i*110+110} y2="42" stroke="#bbb" strokeWidth="1"/>}
        </g>
      ))}
      <text x="20" y="84" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">AFTER: 3-STEP EXPRESS FLOW · 15 MINUTES</text>
      {[
        {label:"Step 1", sub:"Client + product", fill:"var(--red)", h:80},
        {label:"Step 2", sub:"Pricing + approval", fill:"#1a1a1a", h:100},
        {label:"Step 3", sub:"Contract + install", fill:"#1a1a1a", h:120},
      ].map((step, i) => (
        <g key={i}>
          <rect x={20+i*240} y={210-step.h} width={220} height={step.h} rx={40} fill={step.fill}/>
          <text x={20+i*240+110} y={210-step.h/2-6} textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill="white">{step.label}</text>
          <text x={20+i*240+110} y={210-step.h/2+12} textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="rgba(255,255,255,0.7)">{step.sub}</text>
        </g>
      ))}
    </svg>
  );
}

export function ResearchMethodologyArtifact() {
  const methods = [
    {count:"37", label:"Interviews", sub:"Sales agents, leads,\nmanagers, new hires", finding:"System over-flexible"},
    {count:"25", label:"Usability tests", sub:"Task completion,\ntime-on-task, errors", finding:"Unused features cut"},
    {count:"20", label:"Shadow sessions", sub:"On floor, live\nproposal generation", finding:"Real vs assumed flow"},
  ];

  return (
    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="14" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">1-MONTH ON-SITE UX STUDY · SÃO PAULO</text>
      {methods.map((m, i) => {
        const x = 20 + i * 260;
        return (
          <g key={i}>
            <rect x={x} y="22" width="244" height="160" rx="3" fill={i===0 ? "#1a1a1a" : "#f5f5f2"}/>
            <text x={x+20} y="76" fontFamily="var(--font-display)" fontSize="44" fontWeight="800" fill={i===0 ? "var(--red)" : "#1a1a1a"}>{m.count}</text>
            <text x={x+20} y="96" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill={i===0 ? "white" : "#1a1a1a"}>{m.label}</text>
            <line x1={x+20} y1="106" x2={x+224} y2="106" stroke={i===0 ? "rgba(255,255,255,0.12)" : "#e0e0e0"} strokeWidth="1"/>
            {m.sub.split("\n").map((line, li) => (
              <text key={li} x={x+20} y={120+li*15} fontFamily="var(--font-body)" fontSize="11" fill={i===0 ? "rgba(255,255,255,0.5)" : "#888"}>{line}</text>
            ))}
            <rect x={x+12} y="158" width="220" height="20" rx="2" fill="var(--red)"/>
            <text x={x+122} y="172" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">{m.finding}</text>
          </g>
        );
      })}
    </svg>
  );
}
