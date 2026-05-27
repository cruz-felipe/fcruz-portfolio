export function PageReductionArtifact() {
  return (
    <svg viewBox="0 0 800 140" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">DOCUMENT SCOPE: BEFORE AND AFTER</text>
      <rect x="20" y="26" width="760" height="38" rx="3" fill="#e8e8e4"/>
      <text x="36" y="49" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill="#555">Before: 160 pages</text>
      <rect x="20" y="72" width="213" height="38" rx="3" fill="var(--red)"/>
      <text x="36" y="95" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill="white">After: 45 pages</text>
      <rect x="600" y="60" width="180" height="58" rx="3" fill="#1a1a1a"/>
      <text x="690" y="91" textAnchor="middle" fontFamily="var(--font-display)" fontSize="26" fontWeight="800" fill="var(--red)">72%</text>
      <text x="690" y="108" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="rgba(255,255,255,0.6)">page reduction</text>
    </svg>
  );
}

export function SectionAuditArtifact() {
  const sections = [
    {name:"Device installation sequence", usage:"High", redundancy:"Low", vocab:"Rewritten", action:"Keep"},
    {name:"Network configuration tables", usage:"High", redundancy:"Medium", vocab:"Rewritten", action:"Keep"},
    {name:"Engineer sign-off fields", usage:"None", redundancy:"High", vocab:"N/A", action:"Remove"},
    {name:"System validation checksums", usage:"None", redundancy:"High", vocab:"N/A", action:"Remove"},
    {name:"Device ID cross-reference", usage:"High", redundancy:"High", vocab:"Simplified", action:"Consolidate"},
    {name:"Installation prerequisites", usage:"High", redundancy:"Low", vocab:"Rewritten", action:"Keep"},
    {name:"OSS system status codes", usage:"None", redundancy:"High", vocab:"N/A", action:"Remove"},
  ];
  const aF = (a: string) => a === "Remove" ? "var(--red)" : a === "Consolidate" ? "#1a1a1a" : "#e8e8e4";
  const aT = (a: string) => a === "Keep" ? "#555" : "white";

  return (
    <svg viewBox="0 0 800 210" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <rect x="0" y="0" width="800" height="28" rx="2" fill="#1a1a1a"/>
      {[["Section",10],["Field usage",240],["Redundancy",330],["Vocabulary",430],["Decision",520]].map(([l,x]) => (
        <text key={String(l)} x={Number(x)} y="18" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.6)" letterSpacing="0.5">{String(l)}</text>
      ))}
      {sections.map((s, i) => {
        const y = 32 + i*24;
        return (
          <g key={i}>
            <rect x="0" y={y} width="800" height="24" fill={i%2===0 ? "white" : "#fafaf8"}/>
            <text x="10" y={y+15} fontFamily="var(--font-body)" fontSize="11" fill="#333">{s.name}</text>
            <rect x="240" y={y+3} width="68" height="18" rx="9" fill={s.usage==="High" ? "#1a1a1a" : "#e8e8e4"}/>
            <text x="274" y={y+15} textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fontWeight="600" fill={s.usage==="High" ? "white" : "#888"}>{s.usage}</text>
            <rect x="330" y={y+3} width="78" height="18" rx="9" fill={s.redundancy==="High" ? "var(--red)" : s.redundancy==="Medium" ? "#888" : "#e8e8e4"}/>
            <text x="369" y={y+15} textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fontWeight="600" fill={s.redundancy==="Low" ? "#888" : "white"}>{s.redundancy}</text>
            <text x="430" y={y+15} fontFamily="var(--font-body)" fontSize="11" fill="#888">{s.vocab}</text>
            <rect x="520" y={y+3} width="80" height="18" rx="9" fill={aF(s.action)}/>
            <text x="560" y={y+15} textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fontWeight="600" fill={aT(s.action)}>{s.action}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function WorkOrderArtifact() {
  const before = [
    {label:"System header", removed:false},{label:"OSS checksums", removed:true},
    {label:"Device ID ref A", removed:true},{label:"Network config", removed:false},
    {label:"Device ID ref B", removed:true},{label:"Installation seq.", removed:false},
    {label:"Sign-off fields", removed:true},{label:"Status codes", removed:true},
    {label:"Prerequisites", removed:false},{label:"Device ID ref C", removed:true},
  ];
  const after = ["Field header","Prerequisites","Device ID","Installation","Network config"];

  return (
    <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="14" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">DOCUMENT STRUCTURE: BEFORE AND AFTER</text>
      <text x="20" y="32" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Before · engineer-ordered · 10 sections</text>
      {before.map((s, i) => {
        const col = Math.floor(i/5), row = i%5;
        const x = 20 + col*200, y = 38 + row*28;
        return (
          <g key={i}>
            <rect x={x} y={y} width="188" height="22" rx="2" fill={s.removed ? "#e8e8e4" : "#1a1a1a"}/>
            <text x={x+8} y={y+14} fontFamily="var(--font-body)" fontSize="10" fontWeight={s.removed ? "400" : "500"} fill={s.removed ? "#bbb" : "white"}>{s.label}</text>
            {s.removed && <line x1={x+6} y1={y+11} x2={x+90} y2={y+11} stroke="#bbb" strokeWidth="1"/>}
          </g>
        );
      })}
      <rect x="427" y="94" width="36" height="36" rx="18" fill="var(--red)"/>
      <text x="445" y="116" textAnchor="middle" fontFamily="var(--font-body)" fontSize="16" fill="white">→</text>
      <text x="478" y="32" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">After · task-ordered · 5 sections</text>
      {after.map((s, i) => (
        <g key={i}>
          <rect x="478" y={38+i*28} width="300" height="22" rx="11" fill={i===0 ? "var(--red)" : "#1a1a1a"}/>
          <text x="628" y={38+i*28+14} textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" fill="white">{s}</text>
        </g>
      ))}
    </svg>
  );
}
