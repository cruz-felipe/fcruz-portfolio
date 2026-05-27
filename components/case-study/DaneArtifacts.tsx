export function TokenArchitectureArtifact() {
  return (
    <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="18" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">BEFORE</text>
      {[
        [20,28,90,28,"Button v1"],[120,28,90,28,"Button v2"],[220,28,80,28,"Button v3"],
        [20,66,120,28,"Modal (local)"],[150,66,100,28,"Card"],
        [20,104,110,28,"Icon set A"],[140,104,100,28,"Icon set B"],
        [20,142,140,28,"Colors A"],[170,142,110,28,"Colors B"],
      ].map(([x,y,w,h,label], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="2" fill="#e8e8e4"/>
          <text x={Number(x)+Number(w)/2} y={Number(y)+18} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#666">{String(label)}</text>
        </g>
      ))}
      <line x1="330" y1="10" x2="330" y2="290" stroke="#d0d0d0" strokeWidth="1"/>
      <text x="350" y="18" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">AFTER</text>
      {[
        {y:28, w:420, label:"01  Primitive tokens", sub:"color · spacing · radius · type", red:true},
        {y:88, w:380, label:"02  Semantic tokens", sub:"surface · text · border · action", red:false},
        {y:148, w:340, label:"03  Components", sub:"Button · Input · Card · Modal", red:false},
        {y:208, w:420, label:"04  Composed patterns", sub:"Sandbox · Master promoted", red:false},
      ].map((row, i) => (
        <g key={i}>
          <rect x="350" y={row.y} width={row.w} height="48" rx="3" fill={row.red ? "var(--red)" : "#1a1a1a"}/>
          <text x="366" y={row.y+20} fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="white">{row.label}</text>
          <text x="366" y={row.y+36} fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.6)">{row.sub}</text>
          {i < 3 && <line x1="560" y1={row.y+48} x2="560" y2={row.y+88} stroke="#d0d0d0" strokeWidth="1"/>}
        </g>
      ))}
      <rect x="400" y="268" width="270" height="26" rx="13" fill="var(--red)"/>
      <text x="535" y="284" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" fill="white">Code Connect: Figma ↔ MUI</text>
    </svg>
  );
}

export function SandboxWorkflowArtifact() {
  const steps = [
    {n:"01", label:"New feature", sub:"Roadmap input"},
    {n:"02", label:"Sandbox build", sub:"Designer solves locally"},
    {n:"03", label:"Reuse check", sub:"UX lead evaluates"},
    {n:"04", label:"Decision", sub:"Promote or keep local", accent:true},
    {n:"05", label:"Master library", sub:"Documented, governed"},
  ];
  const spacing = 150;
  const startX = 60;

  return (
    <svg viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <line x1={startX} y1="50" x2={startX + (steps.length-1)*spacing} y2="50" stroke="#d0d0d0" strokeWidth="1"/>
      {steps.map((step, i) => {
        const x = startX + i * spacing;
        return (
          <g key={i}>
            <circle cx={x} cy="50" r="28" fill={step.accent ? "var(--red)" : "#1a1a1a"}/>
            <text x={x} y="55" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="800" fill="white">{step.n}</text>
            <text x={x} y="96" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="var(--ink)">{step.label}</text>
            <text x={x} y="112" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">{step.sub}</text>
          </g>
        );
      })}
      <text x={startX} y="148" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Engineering not involved in governance. Component promotion is a design decision.</text>
    </svg>
  );
}

export function VelocityDeltaArtifact() {
  // Y axis: days. Max = 3 days. Each bar height = (days / 3) * chartH
  const bars = [
    {label:"Plan mgmt", before:2.5, after:0.8},
    {label:"Billing widget", before:2.2, after:0.7},
    {label:"Settings", before:1.8, after:0.6},
  ];
  const chartH = 120, maxDays = 3, baseY = 200, chartX = 240;

  return (
    <svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">FEATURE DELIVERY TIME: BEFORE AND AFTER</text>
      <rect x="20" y="28" width="195" height="110" rx="4" fill="#1a1a1a"/>
      <text x="38" y="80" fontFamily="var(--font-display)" fontSize="40" fontWeight="800" fill="var(--red)">50%</text>
      <text x="38" y="102" fontFamily="var(--font-body)" fontSize="13" fontWeight="500" fill="white">faster handoff</text>
      <text x="38" y="120" fontFamily="var(--font-body)" fontSize="11" fill="rgba(255,255,255,0.5)">2 weeks → 1 week</text>

      {/* Y axis */}
      <line x1={chartX} y1={baseY - chartH} x2={chartX} y2={baseY} stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1={chartX} y1={baseY} x2="785" y2={baseY} stroke="#1a1a1a" strokeWidth="1.5"/>
      {[0,1,2,3].map(v => {
        const y = baseY - (v/maxDays)*chartH;
        return (
          <g key={v}>
            <line x1={chartX-4} y1={y} x2="785" y2={y} stroke="#e8e8e4" strokeWidth="1"/>
            <text x={chartX-8} y={y+4} textAnchor="end" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">{v}d</text>
          </g>
        );
      })}

      {bars.map((bar, i) => {
        const x = chartX + 20 + i * 175;
        const bH = (bar.before / maxDays) * chartH;
        const aH = (bar.after / maxDays) * chartH;
        return (
          <g key={i}>
            <rect x={x} y={baseY-bH} width={62} height={bH} rx="3" fill="#d0d0d0"/>
            <rect x={x+70} y={baseY-aH} width={62} height={aH} rx="3" fill="var(--red)"/>
            <text x={x+67} y={baseY+16} textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="var(--muted)">{bar.label}</text>
          </g>
        );
      })}

      <rect x={chartX+20} y="228" width="12" height="8" rx="1" fill="#d0d0d0"/>
      <text x={chartX+38} y="236" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Before restructure</text>
      <rect x={chartX+160} y="228" width="12" height="8" rx="1" fill="var(--red)"/>
      <text x={chartX+178} y="236" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">After restructure</text>
    </svg>
  );
}
