export function QuotaArchitectureArtifact() {
  const modules = [
    {title:"01 Quota management", items:["Client quota overview","Partner breakdown","Threshold alerts","Manual adjustments","Usage history"]},
    {title:"02 API usage", items:["Consumption dashboard","Rate limit status","Usage by product","Trend reporting","Export"]},
    {title:"03 Change requests", items:["New request form","Approval routing","Status tracking","Approval history","Audit log"]},
  ];
  return (
    <svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <rect x="0" y="0" width="800" height="28" rx="2" fill="#1a1a1a"/>
      <text x="400" y="18" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.55)" letterSpacing="0.5">SHARED NAVIGATION · ROLE-BASED ACCESS · CLIENT TOOL ECOSYSTEM</text>
      {modules.map((mod, mi) => {
        const x = mi * 268;
        return (
          <g key={mi}>
            <rect x={x} y="36" width="255" height="190" rx="3" fill={mi===0 ? "#1a1a1a" : "#f5f5f2"}/>
            <rect x={x} y="36" width="255" height="32" rx="3" fill={mi===0 ? "var(--red)" : "#1a1a1a"}/>
            <text x={x+14} y="57" fontFamily="var(--font-body)" fontSize="11" fontWeight="700" fill="white">{mod.title}</text>
            {mod.items.map((item, ii) => (
              <g key={ii}>
                <line x1={x+14} y1={78+ii*28} x2={x+241} y2={78+ii*28} stroke={mi===0 ? "rgba(255,255,255,0.08)" : "#e8e8e4"} strokeWidth="1"/>
                <text x={x+14} y={92+ii*28} fontFamily="var(--font-body)" fontSize="11" fill={mi===0 ? "rgba(255,255,255,0.7)" : "#555"}>{item}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function WorkshopMethodArtifact() {
  const steps = [
    {label:"Workshop session", sub:"Stakeholder input, clarification"},
    {label:"Concept sketch", sub:"Preliminary drafts for reaction"},
    {label:"Workshop review", sub:"Discuss on top of concepts", accent:true},
    {label:"Design output", sub:"Decisions locked, flags raised"},
    {label:"Next session", sub:"Updated scope, new constraints"},
  ];
  const spacing = 148, startX = 60;

  return (
    <svg viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <line x1={startX} y1="50" x2={startX+(steps.length-1)*spacing} y2="50" stroke="#d0d0d0" strokeWidth="1"/>
      {steps.map((step, i) => {
        const x = startX + i * spacing;
        return (
          <g key={i}>
            <circle cx={x} cy="50" r="28" fill={step.accent ? "var(--red)" : "#1a1a1a"}/>
            <text x={x} y="55" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="800" fill="white">{String(i+1).padStart(2,"0")}</text>
            <text x={x} y="96" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="var(--ink)">{step.label}</text>
            <text x={x} y="112" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">{step.sub.split(",")[0]}</text>
            <text x={x} y="126" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">{step.sub.split(",")[1]?.trim()}</text>
          </g>
        );
      })}
      <text x={startX} y="150" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Preliminary concepts as thinking tools, not proposals. Alignment dependencies flagged before committing.</text>
    </svg>
  );
}

export function StakeholderAlignmentArtifact() {
  // 6 groups arranged in two rows — client side left, internal side right
  // Each group shows: name, role in process, what they owned
  const clientGroups = [
    { name: "Client business", owns: "Requirements, acceptance", decision: "Scope sign-off" },
    { name: "Client product", owns: "Roadmap, priorities", decision: "Feature sequencing" },
    { name: "Client program mgmt", owns: "Timeline, dependencies", decision: "Release gates" },
  ];
  const internalGroups = [
    { name: "Internal business", owns: "Commercial constraints", decision: "Pricing rules" },
    { name: "Engineering", owns: "Feasibility, effort estimates", decision: "Tech approach" },
    { name: "QA", owns: "Test coverage, edge cases", decision: "Acceptance criteria" },
  ];

  const colW = 220, rowH = 72, gap = 12;
  const clientX = 20, internalX = 20 + colW + 60;
  const labelY = 42;

  return (
    <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Header labels */}
      <text x={clientX} y="16" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="var(--muted)" letterSpacing="1.5">CLIENT SIDE</text>
      <text x={internalX} y="16" fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="var(--muted)" letterSpacing="1.5">INTERNAL</text>

      {/* Center column — design (solo) */}
      <rect x="370" y="80" width="100" height="140" rx="3" fill="var(--red)"/>
      <text x="420" y="138" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="800" fill="white">Design</text>
      <text x="420" y="156" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.65)">Solo IC</text>
      <text x="420" y="172" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.65)">6 sessions</text>
      <text x="420" y="188" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.65)">13 flows</text>
      <text x="420" y="206" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.65)">3 modules</text>

      {/* Client groups */}
      {clientGroups.map((g, i) => {
        const y = 28 + i * (rowH + gap);
        return (
          <g key={i}>
            <rect x={clientX} y={y} width={colW} height={rowH} rx="3" fill="#f5f5f2"/>
            <text x={clientX + 14} y={y + 22} fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="#1a1a1a">{g.name}</text>
            <text x={clientX + 14} y={y + 38} fontFamily="var(--font-body)" fontSize="10" fill="#888">{g.owns}</text>
            <rect x={clientX + 12} y={y + 50} width={196} height="15" rx="2" fill="#e8e8e0"/>
            <text x={clientX + 110} y={y + 61} textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fontWeight="600" fill="#555">{g.decision}</text>
            {/* Connector to center */}
            <line x1={clientX + colW} y1={y + rowH/2} x2="370" y2={150} stroke="#d0d0cc" strokeWidth="1" strokeDasharray="3 3"/>
          </g>
        );
      })}

      {/* Internal groups */}
      {internalGroups.map((g, i) => {
        const y = 28 + i * (rowH + gap);
        return (
          <g key={i}>
            <rect x={internalX} y={y} width={colW} height={rowH} rx="3" fill="#1a1a1a"/>
            <text x={internalX + 14} y={y + 22} fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="white">{g.name}</text>
            <text x={internalX + 14} y={y + 38} fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.45)">{g.owns}</text>
            <rect x={internalX + 12} y={y + 50} width={196} height="15" rx="2" fill="rgba(255,255,255,0.08)"/>
            <text x={internalX + 110} y={y + 61} textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.55)">{g.decision}</text>
            {/* Connector from center */}
            <line x1="470" y1={150} x2={internalX} y2={y + rowH/2} stroke="#d0d0cc" strokeWidth="1" strokeDasharray="3 3"/>
          </g>
        );
      })}

      <text x="20" y="298" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Each group owned a decision category. Design was the only constant across all six. Misalignment between groups was the primary source of scope drift.</text>
    </svg>
  );
}

export function ApprovalFlowArtifact() {
  return (
    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="14" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">CHANGE REQUEST APPROVAL FLOW</text>
      {["Quota increase (standard)","Quota increase (above threshold)","API limit change (any value)"].map((req, i) => (
        <g key={i}>
          <rect x="20" y={22+i*46} width="210" height="36" rx="3" fill="#f5f5f2"/>
          <text x="32" y={22+i*46+21} fontFamily="var(--font-body)" fontSize="11" fill="#444">{req}</text>
          <line x1="230" y1={22+i*46+18} x2="258" y2={22+i*46+18} stroke="#ccc" strokeWidth="1"/>
        </g>
      ))}
      <rect x="258" y="68" width="96" height="60" rx="3" fill="#1a1a1a"/>
      <text x="306" y="95" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="var(--red)">Routing</text>
      <text x="306" y="111" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.5)">Type + value</text>
      {[
        {y:28, label:"Supervisor", sub:"Single approval", fill:"var(--red)"},
        {y:74, label:"Supervisor + Manager", sub:"Two-step", fill:"#1a1a1a"},
        {y:120, label:"Manager + Director", sub:"Two-step", fill:"#1a1a1a"},
      ].map((path, i) => (
        <g key={i}>
          <line x1="354" y1="98" x2="380" y2={path.y+18} stroke="#ccc" strokeWidth="1"/>
          <rect x="380" y={path.y} width="210" height="36" rx="3" fill={path.fill}/>
          <text x="394" y={path.y+15} fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">{path.label}</text>
          <text x="394" y={path.y+28} fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.6)">{path.sub}</text>
          <line x1="590" y1={path.y+18} x2="618" y2={path.y+18} stroke="#ccc" strokeWidth="1"/>
        </g>
      ))}
      <rect x="618" y="80" width="162" height="36" rx="18" fill="#e8e8e4"/>
      <text x="699" y="98" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="#333">Applied or rejected</text>
      <text x="699" y="111" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">Audit log updated</text>
      <text x="20" y="190" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Routing configurable to client sign-off structure. No system config change required per threshold update.</text>
    </svg>
  );
}

export function KeyboardNavArtifact() {
  // Shows the keyboard interaction model for the quota management list + approval flow
  // Focus order, keyboard shortcuts, skip nav, ARIA roles
  const flows = [
    {
      label: "List view",
      interactions: [
        { key: "Tab", action: "Move focus through quota rows" },
        { key: "Enter / Space", action: "Open detail drawer for focused row" },
        { key: "Escape", action: "Close drawer, return focus to row" },
        { key: "Arrow ↑↓", action: "Navigate rows without Tab cycling" },
      ],
    },
    {
      label: "Approval workflow",
      interactions: [
        { key: "Tab", action: "Move through approver fields in order" },
        { key: "Enter", action: "Submit approval or rejection" },
        { key: "Escape", action: "Cancel, confirm intent before closing" },
        { key: "Shift+Tab", action: "Reverse through fields" },
      ],
    },
    {
      label: "Create quota form",
      interactions: [
        { key: "Tab", action: "Field-by-field, preview updates live" },
        { key: "Enter (on select)", action: "Open dropdown, confirm selection" },
        { key: "Escape", action: "Close dropdown without committing" },
        { key: "Ctrl+Enter", action: "Submit form from any field" },
      ],
    },
  ];

  const colW = 240;
  const rowH = 28;
  const headerH = 30;
  const gapX = 16;
  const startX = 20;
  const startY = 36;

  return (
    <svg viewBox="0 0 800 290" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">KEYBOARD INTERACTION MODEL — QUOTA MANAGEMENT</text>

      {flows.map((flow, fi) => {
        const x = startX + fi * (colW + gapX);
        const bodyH = flow.interactions.length * rowH;
        const totalH = headerH + bodyH;

        return (
          <g key={fi}>
            {/* Header */}
            <rect x={x} y={startY} width={colW} height={headerH} rx="3" fill={fi === 0 ? "var(--red)" : "#1a1a1a"} />
            <text x={x + 14} y={startY + 20} fontFamily="var(--font-body)" fontSize="11" fontWeight="700" fill="white">{flow.label}</text>

            {/* Body */}
            <rect x={x} y={startY + headerH} width={colW} height={bodyH} rx="0" fill="#f5f5f2" />
            <rect x={x} y={startY + headerH + bodyH - 3} width={colW} height={3} rx="0" fill={fi === 0 ? "var(--red)" : "#1a1a1a"} opacity="0.15" />

            {flow.interactions.map((item, ii) => {
              const iy = startY + headerH + ii * rowH;
              return (
                <g key={ii}>
                  {ii > 0 && <line x1={x} y1={iy} x2={x + colW} y2={iy} stroke="#e0e0da" strokeWidth="1" />}
                  {/* Key badge */}
                  <rect x={x + 10} y={iy + 7} width={72} height={14} rx="2" fill="#1a1a1a" />
                  <text x={x + 46} y={iy + 18} textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="9" fontWeight="600" fill="white">{item.key}</text>
                  {/* Action */}
                  <text x={x + 90} y={iy + 18} fontFamily="var(--font-body)" fontSize="10" fill="#555">{item.action}</text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Focus state spec strip */}
      <rect x="20" y="230" width="760" height="44" rx="3" fill="#1a1a1a" />
      <text x="36" y="248" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">Focus state spec</text>
      <text x="36" y="264" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.55)">2px solid outline · 2px offset · matches brand red (#C42B2B) · border-radius inherits component · never hidden or suppressed</text>
      <rect x="700" y="238" width="60" height="24" rx="3" fill="transparent" stroke="#C42B2B" strokeWidth="2" />
      <text x="730" y="254" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="white">focused</text>

      <text x="20" y="285" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">All interactive elements reachable by keyboard. Focus order follows visual reading order. No keyboard traps. Escape always provides a safe exit.</text>
    </svg>
  );
}
