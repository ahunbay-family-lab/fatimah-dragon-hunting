const FIREFLIES = [
  { left: "12%", top: "20%", delay: "0s" },
  { left: "85%", top: "15%", delay: "0.8s" },
  { left: "22%", top: "55%", delay: "1.6s" },
  { left: "70%", top: "40%", delay: "2.2s" },
  { left: "45%", top: "65%", delay: "0.4s" },
  { left: "92%", top: "60%", delay: "1.1s" },
];

/**
 * Hand-drawn cartoon jungle scene for the title screen: warm sky, layered
 * hills, a winding trail, and a pair of curious eyes hiding in the bushes.
 * Everything is plain SVG/CSS on purpose (not an image file) so it stays
 * easy to open up and tweak — change a color, see what happens!
 */
export function JungleTitleArt() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="60%" stopColor="#ffe8a3" />
            <stop offset="100%" stopColor="#ffd166" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="400" height="300" fill="url(#sky)" />

        {/* Sun with a soft glow */}
        <circle cx="325" cy="55" r="46" fill="#fff3bf" opacity="0.5" />
        <circle cx="325" cy="55" r="30" fill="#ffd60a" />

        {/* Far hills */}
        <path
          d="M0 175 Q60 140 130 168 Q210 190 280 155 Q340 130 400 165 L400 300 L0 300 Z"
          fill="#74c69d"
        />
        {/* Mid hills */}
        <path
          d="M0 205 Q80 165 160 195 Q230 215 300 180 Q350 160 400 190 L400 300 L0 300 Z"
          fill="#40916c"
        />
        {/* Near hills */}
        <path
          d="M0 240 Q90 200 190 230 Q260 250 330 215 Q365 200 400 220 L400 300 L0 300 Z"
          fill="#1b4332"
        />

        {/* Winding dirt trail */}
        <path
          d="M170 300 Q160 260 190 235 Q220 210 205 180 Q195 155 215 130"
          fill="none"
          stroke="#d9a066"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M170 300 Q160 260 190 235 Q220 210 205 180 Q195 155 215 130"
          fill="none"
          stroke="#b5793c"
          strokeWidth="22"
          strokeDasharray="3 10"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Bush hiding a curious dragon — a little Easter egg hint */}
        <ellipse cx="88" cy="255" rx="42" ry="26" fill="#2d6a3e" />
        <ellipse cx="130" cy="262" rx="26" ry="18" fill="#1b4332" />
        <ellipse cx="98" cy="238" rx="9" ry="6" fill="white" />
        <ellipse cx="118" cy="238" rx="9" ry="6" fill="white" />
        <ellipse cx="100" cy="240" rx="4" ry="6" fill="#fbbf24" />
        <ellipse cx="120" cy="240" rx="4" ry="6" fill="#fbbf24" />

        {/* Little flowers along the path */}
        {[
          { x: 245, y: 205, c: "#f472b6" },
          { x: 260, y: 245, c: "#fca5a5" },
          { x: 150, y: 200, c: "#fde047" },
        ].map((f) => (
          <g key={`${f.x}-${f.y}`}>
            <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 12} stroke="#166534" strokeWidth="2" />
            <circle cx={f.x} cy={f.y} r="5" fill={f.c} />
          </g>
        ))}
      </svg>

      {/* Foreground ferns to frame the bottom of the scene */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 800 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 90 L0 55 Q20 30 32 58 Q42 20 54 55 Q64 38 76 58 L86 90" fill="#14532d" />
        <path d="M60 90 L54 48 Q70 25 82 52 Q92 30 104 58 L114 90" fill="#166534" />
        <path d="M690 90 L696 50 Q712 28 724 54 Q734 32 746 58 L756 90" fill="#14532d" />
        <path d="M740 90 L746 44 Q762 22 774 50 Q784 28 796 55 L800 90" fill="#166534" />
      </svg>

      {/* Twinkling fireflies */}
      {FIREFLIES.map((fly, i) => (
        <span
          key={i}
          className="animate-firefly absolute h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_8px_3px_rgba(253,224,71,0.7)]"
          style={{ left: fly.left, top: fly.top, animationDelay: fly.delay }}
        />
      ))}
    </div>
  );
}
