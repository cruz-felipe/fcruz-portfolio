export function FlashcardFlowArtifact() {
  const steps = [
    { x: 0, title: "Select language", sub: "ES · RU · FR · IT" },
    { x: 200, title: "Select category", sub: "General, tech, travel..." },
    { x: 400, title: "Choose mode", sub: "Recognition or recall" },
    { x: 600, title: "Card drill", sub: "Flip or type to answer" },
    { x: 800, title: "Result", sub: "Correct, synonym, or wrong" },
  ];

  return (
    <svg viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="0" y="14" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1">CORE PRODUCT FLOW</text>

      {steps.map((step, i) => (
        <g key={i}>
          <rect x={step.x} y="24" width="175" height="70" rx="3"
            fill={i === 3 ? "var(--red)" : "none"}
            fillOpacity={i === 3 ? 0.05 : 1}
            stroke={i === 3 ? "var(--red)" : "var(--border)"}
            strokeWidth={i === 3 ? 1 : 0.5}
          />
          <text x={step.x + 87} y="55" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fontWeight="500" fill={i === 3 ? "var(--red)" : "var(--ink)"} fillOpacity="0.85">{step.title}</text>
          <text x={step.x + 87} y="72" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">{step.sub}</text>
          {i < steps.length - 1 && (
            <text x={step.x + 182} y="63" textAnchor="middle" fontFamily="var(--font-body)" fontSize="14" fill="var(--muted)">→</text>
          )}
        </g>
      ))}

      {/* AI tip layer */}
      <rect x="600" y="110" width="175" height="40" rx="2" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,2"/>
      <text x="687" y="126" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Claude API tip (opt-in)</text>
      <text x="687" y="141" textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fill="var(--muted)">Cultural note, usage context</text>
      <line x1="687" y1="94" x2="687" y2="110" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2"/>

      {/* Mode branch */}
      <text x="400" y="130" fontFamily="var(--font-body)" fontSize="9" fill="var(--muted)">Recognition: see word, flip to reveal</text>
      <text x="400" y="145" fontFamily="var(--font-body)" fontSize="9" fill="var(--muted)">Recall: see translation, type original</text>
    </svg>
  );
}

export function LanguageMatrixArtifact() {
  const languages = ["Spanish", "Russian", "French", "Italian"];
  const categories = ["Everyday", "Travel", "Food", "Work", "Tech", "Expressions"];
  const colW = 120;
  const rowH = 28;

  return (
    <svg viewBox="0 0 860 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="0" y="14" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1">LANGUAGE AND CATEGORY MATRIX</text>

      {/* Column headers */}
      {languages.map((lang, i) => (
        <text key={i} x={160 + i * colW + colW / 2} y="34" textAnchor="middle"
          fontFamily="var(--font-body)" fontSize="11" fontWeight="500" fill="var(--ink)" fillOpacity="0.8">{lang}</text>
      ))}

      {/* Row headers + cells */}
      {categories.map((cat, ri) => (
        <g key={ri}>
          <text x="0" y={52 + ri * rowH + 12} fontFamily="var(--font-body)" fontSize="11" fill="var(--muted)">{cat}</text>
          {languages.map((_, ci) => {
            const isTech = cat === "Tech";
            return (
              <g key={ci}>
                <rect x={160 + ci * colW + 10} y={52 + ri * rowH} width={colW - 20} height={rowH - 4} rx="2"
                  fill={isTech ? "var(--red)" : "var(--muted)"}
                  fillOpacity={isTech ? 0.08 : 0.06}
                  stroke={isTech ? "var(--red)" : "var(--border)"}
                  strokeWidth={isTech ? 0.5 : 0.5}
                />
                {isTech && (
                  <text x={160 + ci * colW + colW / 2} y={52 + ri * rowH + 15} textAnchor="middle"
                    fontFamily="var(--font-body)" fontSize="9" fill="var(--red)">custom built</text>
                )}
              </g>
            );
          })}
          <line x1="0" y1={52 + (ri + 1) * rowH - 2} x2="860" y2={52 + (ri + 1) * rowH - 2} stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2,4"/>
        </g>
      ))}

      <text x="0" y="230" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Tech category built specifically for work vocabulary — not available in standard language learning apps.</text>
    </svg>
  );
}

export function SynonymLayerArtifact() {
  return (
    <svg viewBox="0 0 860 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="0" y="14" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1">RECALL MODE: ANSWER VALIDATION LOGIC</text>

      {/* Card prompt */}
      <rect x="0" y="24" width="200" height="60" rx="3" fill="none" stroke="var(--border)" strokeWidth="0.5"/>
      <text x="100" y="50" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="var(--muted)">Translation shown</text>
      <text x="100" y="66" textAnchor="middle" fontFamily="var(--font-display)" fontSize="16" fontWeight="700" fill="var(--ink)">"Hello"</text>

      {/* Input */}
      <rect x="240" y="24" width="200" height="60" rx="3" fill="none" stroke="var(--red)" strokeWidth="0.5"/>
      <text x="340" y="50" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="var(--muted)">User types</text>
      <text x="340" y="66" textAnchor="middle" fontFamily="var(--font-display)" fontSize="16" fontWeight="700" fill="var(--ink)">"Oi"</text>

      <text x="212" y="58" fontFamily="var(--font-body)" fontSize="14" fill="var(--muted)">→</text>
      <text x="452" y="58" fontFamily="var(--font-body)" fontSize="14" fill="var(--muted)">→</text>

      {/* Decision */}
      <rect x="480" y="24" width="180" height="60" rx="3" fill="var(--red)" fillOpacity="0.05" stroke="var(--red)" strokeWidth="0.5"/>
      <text x="570" y="48" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" fill="var(--red)">Claude API check</text>
      <text x="570" y="64" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Exact match or synonym?</text>

      {/* Outcomes */}
      <line x1="570" y1="84" x2="570" y2="110" stroke="var(--border)" strokeWidth="0.5"/>

      {/* Branch left: exact */}
      <line x1="300" y1="110" x2="840" y2="110" stroke="var(--border)" strokeWidth="0.5"/>

      {[
        { x: 60, label: "Exact match", result: "Correct", color: "var(--muted)", note: '"Olá" → Olá' },
        { x: 340, label: "Valid synonym", result: "Accepted", color: "var(--muted)", note: '"Oi" accepted\nCanonical: Olá' },
        { x: 620, label: "Wrong", result: "Try again", color: "var(--red)", note: "Correct form shown" },
      ].map((outcome, i) => (
        <g key={i}>
          <line x1={outcome.x + 90} y1="110" x2={outcome.x + 90} y2="128" stroke="var(--border)" strokeWidth="0.5"/>
          <rect x={outcome.x} y="128" width="180" height="60" rx="2"
            fill="none" stroke={outcome.color} strokeWidth="0.5"
            fillOpacity={i === 1 ? 0.03 : 0}
          />
          <text x={outcome.x + 90} y="150" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="500" fill={outcome.color}>{outcome.result}</text>
          {outcome.note.split("\n").map((line, li) => (
            <text key={li} x={outcome.x + 90} y={165 + li * 14} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">{line}</text>
          ))}
        </g>
      ))}

      <text x="0" y="248" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)">Synonyms accepted with a note rather than marked wrong. Language is not word-for-word — the app should not be either.</text>
    </svg>
  );
}
