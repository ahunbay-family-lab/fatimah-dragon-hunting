import type { SceneBackgroundVariant } from "@/lib/game/types";

/** Draws whatever sits in front of the shared jungle backdrop for a given spot. */
export function SceneForeground({ variant }: { variant: SceneBackgroundVariant }) {
  switch (variant) {
    case "camp":
      return <CampForeground />;
    case "clearing":
      return <ClearingForeground />;
    case "riverbank":
      return <RiverbankForeground />;
    case "fernpath":
      return <FernpathForeground />;
    case "thicket":
      return <ThicketForeground />;
  }
}

function CampForeground() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* Tent */}
      <path d="M200 260 L160 205 L240 205 Z" fill="#f97316" />
      <path d="M200 260 L160 205 L180 205 Z" fill="#ea580c" />
      <rect x="192" y="235" width="16" height="25" fill="#7c2d12" />

      {/* Campfire */}
      <ellipse cx="130" cy="272" rx="26" ry="7" fill="#78350f" />
      <path d="M120 272 L128 250 L138 272 Z" fill="#92400e" />
      <path d="M112 272 L124 255 L132 272 Z" fill="#a16207" />
      <path d="M118 268 Q126 246 132 262 Q138 250 136 268" fill="#fb923c" />
      <path d="M120 264 Q126 250 130 260" fill="#fde047" />
    </svg>
  );
}

function ClearingForeground() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* Fork signpost */}
      <rect x="196" y="180" width="8" height="80" fill="#8b5a2b" />
      <path d="M196 195 L150 188 L150 205 L196 210 Z" fill="#d9a066" />
      <path d="M204 195 L250 188 L250 205 L204 210 Z" fill="#d9a066" />

      {/* Grass tufts */}
      {[70, 300, 340, 50].map((x) => (
        <path
          key={x}
          d={`M${x} 280 Q${x + 5} 260 ${x + 10} 280 Q${x + 15} 258 ${x + 20} 280`}
          fill="#40916c"
        />
      ))}

      {/* A little butterfly */}
      <g transform="translate(280 200)">
        <ellipse cx="-4" cy="0" rx="6" ry="4" fill="#f472b6" />
        <ellipse cx="4" cy="0" rx="6" ry="4" fill="#f9a8d4" />
      </g>
    </svg>
  );
}

function RiverbankForeground() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* River */}
      <path
        d="M0 240 Q100 220 160 245 Q220 270 280 240 Q340 215 400 235 L400 300 L0 300 Z"
        fill="#38bdf8"
      />
      <path
        d="M20 250 Q120 232 180 255 Q240 278 300 250"
        fill="none"
        stroke="#e0f2fe"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Log bridge */}
      <rect x="150" y="230" width="100" height="10" rx="4" fill="#92652b" />
      <line x1="150" y1="235" x2="250" y2="235" stroke="#6b4423" strokeWidth="1.5" />

      {/* Reeds */}
      {[40, 60, 320, 340].map((x) => (
        <path key={x} d={`M${x} 260 Q${x + 4} 230 ${x + 2} 210`} stroke="#166534" strokeWidth="3" fill="none" />
      ))}
    </svg>
  );
}

function FernFrond({ x, tilt, color }: { x: number; tilt: number; color: string }) {
  return (
    <g transform={`translate(${x} 300) rotate(${tilt})`}>
      <path d="M0 0 Q6 -90 -4 -190" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      {[30, 60, 90, 120, 150].map((h) => (
        <g key={h}>
          <path d={`M${-h * 0.02} ${-h} q-18 -8 -26 4`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M${-h * 0.02} ${-h} q18 -8 26 4`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function FernpathForeground() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <FernFrond x={40} tilt={8} color="#1b4332" />
      <FernFrond x={80} tilt={-4} color="#166534" />
      <FernFrond x={340} tilt={-8} color="#1b4332" />
      <FernFrond x={305} tilt={5} color="#166534" />

      {/* Dappled light spots */}
      {[
        { x: 150, y: 120, r: 14 },
        { x: 220, y: 150, r: 10 },
        { x: 190, y: 90, r: 8 },
      ].map((spot) => (
        <circle key={`${spot.x}-${spot.y}`} cx={spot.x} cy={spot.y} r={spot.r} fill="#fef9c3" opacity="0.25" />
      ))}
    </svg>
  );
}

function ThicketForeground() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* Dark overlay for a moodier, "something's watching" feel */}
      <rect x="0" y="0" width="400" height="300" fill="#03110a" opacity="0.35" />

      {/* Dense bushes */}
      <ellipse cx="80" cy="255" rx="60" ry="34" fill="#0f3d24" />
      <ellipse cx="320" cy="260" rx="66" ry="36" fill="#0f3d24" />
      <ellipse cx="200" cy="275" rx="70" ry="30" fill="#123f27" />

      {/* Curious glowing eyes peeking from the middle bush */}
      <ellipse cx="188" cy="255" rx="7" ry="5" fill="#fbbf24" />
      <ellipse cx="212" cy="255" rx="7" ry="5" fill="#fbbf24" />
      <ellipse cx="188" cy="255" rx="2.5" ry="5" fill="#1a1a1a" />
      <ellipse cx="212" cy="255" rx="2.5" ry="5" fill="#1a1a1a" />
    </svg>
  );
}
