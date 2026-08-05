interface JungleBackdropProps {
  /** Makes the SVG gradient id unique so multiple backdrops on one page never clash. */
  gradientId: string;
}

/**
 * Shared warm sky + layered hills used behind every jungle scene, so the
 * whole game has one consistent look. Individual scenes draw their own
 * foreground details (a campfire, a river, ferns...) on top of this.
 */
export function JungleBackdrop({ gradientId }: JungleBackdropProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="60%" stopColor="#ffe8a3" />
          <stop offset="100%" stopColor="#ffd166" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="300" fill={`url(#${gradientId})`} />

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
    </svg>
  );
}
