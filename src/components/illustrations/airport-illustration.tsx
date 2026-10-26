import React from "react";

const BG = "#DC143C";
const ACCENT = "#A10E2B";

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 20 Q -2 10 10 10 Q 14 0 28 2 Q 38 -8 52 2 Q 62 0 66 10 Q 80 10 80 20 Z" fill={BG} />;
}

function JetFlying({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M 50 14 L 28 36 L 42 36 L 72 14" fill={BG} />

      <path d="M 0 0 L 80 0 Q 98 2 102 8 Q 98 14 80 16 L 14 16 Q 4 10 0 0 Z" fill={BG} />

      <path d="M 6 2 L -6 -22 L 8 -22 L 28 2" fill={ACCENT} />

      <rect x="52" y="17" width="18" height="7" rx="3.5" fill={BG} />
    </g>
  );
}

export function AirportIllustration() {
  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 1440 210"
        preserveAspectRatio="xMidYMax meet"
        className="
          block
          h-auto
          w-full
          max-h-30
          sm:max-h-37.5
          lg:max-h-none
        "
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* CLOUD */}
        <Cloud x={650} y={24} s={1.1} />

        <Cloud x={880} y={50} s={0.9} />

        {/* CLOUD TAMBAHAN HANYA DESKTOP */}
        <g className="hidden lg:block">
          <Cloud x={30} y={50} />

          <Cloud x={1320} y={64} />
        </g>

        {/* PESAWAT UTAMA */}
        <JetFlying transform="translate(430 40) rotate(-10) scale(0.95)" />

        {/* PESAWAT TAMBAHAN DESKTOP */}
        <g className="hidden lg:block">
          <JetFlying transform="translate(1190 28) rotate(-10) scale(0.7)" />
        </g>

        {/* TERMINAL BANDARA */}
        <g>
          <path d="M 320 190 L 320 150 Q 560 90 800 150 L 800 190" fill={BG} />

          <path d="M 320 162 Q 560 104 800 162" />

          <path d="M 320 168 L 800 168" />

          {Array.from({ length: 16 }, (_, i) => {
            const x = 350 + i * 28;

            return <line key={x} x1={x} y1={168} x2={x} y2={190} />;
          })}

          <path d="M 540 190 L 540 174 L 580 174 L 580 190 M 560 174 L 560 190" fill={BG} />
        </g>

        {/* JALUR PESAWAT */}
        <g>
          <path d="M 800 152 L 960 150 L 960 166 L 800 168 Z" fill={BG} />

          <path d="M 870 167 L 870 190" />
        </g>

        {/* PESAWAT DARAT */}
        <g>
          <path d="M 1020 162 L 1075 186 L 1100 186 L 1090 162 Z" fill={BG} />

          <rect x="1030" y="168" width="32" height="14" rx="7" fill={BG} />

          <path d="M 1135 138 L 1178 92 L 1198 92 L 1190 138 Z" fill={ACCENT} />

          <path d="M 1000 138 Q 945 140 932 156 Q 945 172 1000 172 L 1140 172 Q 1170 160 1185 138 Z" fill={BG} />
        </g>

        {/* GEDUNG TAMBAHAN DESKTOP */}
        <g className="hidden lg:block">
          <path d="M 1250 190 L 1250 150 Q 1250 118 1325 118 Q 1400 118 1400 150 L 1400 190" fill={BG} />

          <path
            d="
            M 1285 190 
            L 1285 150 
            L 1365 150 
            L 1365 190 
            M 1305 150 L 1305 190 
            M 1325 150 L 1325 190 
            M 1345 150 L 1345 190
            "
          />
        </g>

        {/* LANDASAN */}

        <path d="M -50 190 L 1500 190" />

        <path d="M -50 202 L 1500 202" strokeDasharray="28 18" />
      </svg>
    </div>
  );
}
