"use client";

interface ScreenProps {
  src: string;
  caption: string;
}

export function ScreenGallery({ screens, narrow }: { screens: ScreenProps[]; narrow?: boolean }) {
  const countClass = screens.length === 1 ? "count-1" : screens.length === 2 ? "count-2" : "";
  const narrowClass = narrow ? "narrow" : "";

  return (
    <div
      className={`screen-gallery ${countClass} ${narrowClass}`}
      style={{ display: "grid", gap: "2rem", alignItems: "start", justifyContent: "center" }}
    >
      {screens.map((screen, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", borderRadius: "4px", overflow: "hidden" }}>
            <img
              src={screen.src}
              alt={screen.caption}
              loading="lazy"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "12px",
            color: "var(--muted)", lineHeight: 1.55,
            marginTop: "0.75rem", textAlign: "center",
          }}>
            {screen.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
