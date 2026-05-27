export function VocabularyArchDiagram() {
  return (
    <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <text x="20" y="16" fontFamily="var(--font-body)" fontSize="10" fill="var(--muted)" letterSpacing="1.5">APP ARCHITECTURE AND LEARNING FLOW</text>

      {/* User */}
      <rect x="20" y="60" width="80" height="80" rx="40" fill="#1a1a1a"/>
      <text x="60" y="97" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">User</text>
      <text x="60" y="112" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.55)">PT-BR native</text>

      {/* Language select */}
      <line x1="100" y1="100" x2="140" y2="100" stroke="#ccc" strokeWidth="1"/>
      <rect x="140" y="72" width="120" height="56" rx="3" fill="var(--red)"/>
      <text x="200" y="96" textAnchor="middle" fontFamily="var(--font-body)" fontSize="12" fontWeight="600" fill="white">Select language</text>
      <text x="200" y="112" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.7)">ES · RU · FR · IT</text>

      {/* Mode split */}
      <line x1="260" y1="100" x2="300" y2="70" stroke="#ccc" strokeWidth="1"/>
      <line x1="260" y1="100" x2="300" y2="130" stroke="#ccc" strokeWidth="1"/>

      {/* Recognition mode */}
      <rect x="300" y="44" width="140" height="52" rx="3" fill="#1a1a1a"/>
      <text x="370" y="66" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">Recognition</text>
      <text x="370" y="82" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.55)">See word, flip to reveal</text>

      {/* Recall mode */}
      <rect x="300" y="104" width="140" height="52" rx="3" fill="#1a1a1a"/>
      <text x="370" y="126" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">Recall</text>
      <text x="370" y="142" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.55)">See translation, type original</text>

      {/* Result handling */}
      <line x1="440" y1="70" x2="480" y2="100" stroke="#ccc" strokeWidth="1"/>
      <line x1="440" y1="130" x2="480" y2="100" stroke="#ccc" strokeWidth="1"/>
      <rect x="480" y="72" width="110" height="56" rx="3" fill="#f5f5f2"/>
      <text x="535" y="94" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="#1a1a1a">Result</text>
      <text x="535" y="109" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">Correct · Synonym · Wrong</text>

      {/* Claude API */}
      <line x1="535" y1="128" x2="535" y2="150" stroke="#ccc" strokeWidth="1" strokeDasharray="3,2"/>
      <rect x="460" y="150" width="150" height="44" rx="3" fill="var(--red)"/>
      <text x="535" y="169" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="white">Claude API</text>
      <text x="535" y="184" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="rgba(255,255,255,0.7)">Synonym validation · Tips</text>

      {/* Tech category note */}
      <rect x="660" y="60" width="120" height="80" rx="3" fill="#e8e8e4"/>
      <text x="720" y="84" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="#333">Tech category</text>
      <text x="720" y="100" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">Custom-built for</text>
      <text x="720" y="114" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="#888">work vocabulary</text>
      <text x="720" y="128" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--red)">ES · RU · FR · IT</text>
    </svg>
  );
}
