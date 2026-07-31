interface DragonMascotProps {
  className?: string;
  waving?: boolean;
}

/**
 * A cute, rounded "chibi" dragon face — friendlier and simpler than the
 * full-body DragonCharacter used in gameplay. Used for branding moments
 * like the title screen.
 */
export function DragonMascot({ className = "", waving = false }: DragonMascotProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} ${waving ? "animate-wiggle" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mascotBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      {/* Little wings peeking from behind */}
      <path
        d="M40 90 Q10 60 20 30 Q45 45 55 80 Z"
        fill="#22c55e"
        opacity="0.85"
      />
      <path
        d="M160 90 Q190 60 180 30 Q155 45 145 80 Z"
        fill="#22c55e"
        opacity="0.85"
      />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="62" ry="58" fill="url(#mascotBody)" />

      {/* Belly / snout patch */}
      <ellipse cx="100" cy="130" rx="38" ry="26" fill="#d9f7e6" />

      {/* Horns */}
      <path d="M62 58 L52 30 L70 52 Z" fill="#15803d" />
      <path d="M138 58 L148 30 L130 52 Z" fill="#15803d" />

      {/* Cheek spots */}
      <circle cx="52" cy="118" r="9" fill="#ff9fb2" opacity="0.7" />
      <circle cx="148" cy="118" r="9" fill="#ff9fb2" opacity="0.7" />

      {/* Big happy eyes */}
      <circle cx="76" cy="95" r="14" fill="white" />
      <circle cx="124" cy="95" r="14" fill="white" />
      <circle cx="79" cy="98" r="8" fill="#1a472a" />
      <circle cx="121" cy="98" r="8" fill="#1a472a" />
      <circle cx="82" cy="94" r="2.5" fill="white" />
      <circle cx="124" cy="94" r="2.5" fill="white" />

      {/* Nostrils */}
      <circle cx="92" cy="132" r="2.5" fill="#15803d" />
      <circle cx="108" cy="132" r="2.5" fill="#15803d" />

      {/* Smile */}
      <path
        d="M84 140 Q100 152 116 140"
        fill="none"
        stroke="#15803d"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Little waving arm */}
      <path
        d="M155 130 Q175 120 178 100"
        fill="none"
        stroke="#22c55e"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="178" cy="98" r="7" fill="#22c55e" />
    </svg>
  );
}
