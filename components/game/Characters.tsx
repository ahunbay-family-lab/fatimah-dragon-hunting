import Image from "next/image";
import type { DragonColor } from "@/lib/game/types";
import { DRAGON_PALETTE } from "@/lib/game/data";

interface GirlCharacterProps {
  className?: string;
  creeping?: boolean;
  riding?: boolean;
  size?: "sm" | "md" | "lg";
}

/** April O'Neil inspired adventurer — red ponytail, yellow top, jeans */
export function GirlCharacter({
  className = "",
  creeping = false,
  riding = false,
  size = "md",
}: GirlCharacterProps) {
  const sizeClass =
    size === "sm" ? "h-28 w-20" : size === "lg" ? "h-52 w-36" : "h-44 w-28";

  return (
    <svg
      viewBox="0 0 90 130"
      className={`${sizeClass} ${className} drop-shadow-lg ${creeping ? "animate-creep" : riding ? "animate-ride-bob" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e85d04" />
          <stop offset="100%" stopColor="#9d0208" />
        </linearGradient>
        <linearGradient id="yellowTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd60a" />
          <stop offset="100%" stopColor="#f4a100" />
        </linearGradient>
      </defs>

      {/* Ponytail */}
      <path
        d="M58 14 Q72 10 70 32 Q66 48 58 56 Q54 42 56 28 Q58 18 58 14"
        fill="url(#hairGrad)"
      />
      <ellipse cx="62" cy="20" rx="7" ry="12" fill="url(#hairGrad)" />

      {/* Head */}
      <ellipse cx="42" cy="24" rx="15" ry="16" fill="#f4c4a0" />

      {/* Hair bangs */}
      <path
        d="M27 22 Q42 10 57 22 Q54 16 42 14 Q30 16 27 22"
        fill="url(#hairGrad)"
      />

      {/* Eyes */}
      <ellipse cx="36" cy="24" rx="2.5" ry="3" fill="white" />
      <ellipse cx="48" cy="24" rx="2.5" ry="3" fill="white" />
      <circle cx="36.5" cy="24.5" r="1.8" fill="#1a472a" />
      <circle cx="48.5" cy="24.5" r="1.8" fill="#1a472a" />
      <circle cx="37" cy="23.5" r="0.7" fill="white" />
      <circle cx="49" cy="23.5" r="0.7" fill="white" />

      {/* Smile */}
      <path
        d="M35 31 Q42 35 49 31"
        fill="none"
        stroke="#c97b63"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Yellow tank top (April style) */}
      <path d="M30 40 L26 56 L58 56 L54 40 Z" fill="url(#yellowTop)" />
      <path d="M34 40 L38 48 L46 48 L50 40" fill="#f4a100" opacity="0.5" />
      {/* White undershirt collar peek */}
      <path d="M36 40 L42 44 L48 40" fill="none" stroke="white" strokeWidth="1.5" />

      {/* Camera on strap */}
      <rect x="52" y="46" width="10" height="7" rx="1.5" fill="#374151" />
      <circle cx="57" cy="49.5" r="2" fill="#6b7280" />
      <path
        d="M57 46 L57 42 Q57 38 52 38"
        fill="none"
        stroke="#4b5563"
        strokeWidth="1.5"
      />

      {/* Arms */}
      <path
        d="M26 56 L20 68"
        stroke="#f4c4a0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M58 56 L64 68"
        stroke="#f4c4a0"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Blue jeans */}
      <path d="M32 56 L30 84 L40 84 L42 64 L44 84 L54 84 L52 56 Z" fill="#1d4e89" />
      <line x1="42" y1="64" x2="42" y2="84" stroke="#163d6e" strokeWidth="1" />

      {/* Legs */}
      <rect x="30" y="84" width="10" height="20" rx="3" fill="#1d4e89" />
      <rect x="44" y="84" width="10" height="20" rx="3" fill="#1d4e89" />

      {/* White sneakers */}
      <ellipse cx="35" cy="106" rx="8" ry="4" fill="#f8fafc" />
      <ellipse cx="49" cy="106" rx="8" ry="4" fill="#f8fafc" />
      <ellipse cx="35" cy="106" rx="6" ry="2.5" fill="#e2e8f0" />
      <ellipse cx="49" cy="106" rx="6" ry="2.5" fill="#e2e8f0" />
    </svg>
  );
}

interface DragonCharacterProps {
  color: DragonColor;
  className?: string;
  flying?: boolean;
  size?: "sm" | "md" | "lg" | "king";
  facing?: "left" | "right";
}

/** Quadrupedal striped dragon inspired by classic fantasy dragon design */
export function DragonCharacter({
  color,
  className = "",
  flying = false,
  size = "md",
  facing = "right",
}: DragonCharacterProps) {
  const palette = DRAGON_PALETTE[color];
  const sizeClass =
    size === "sm"
      ? "h-20 w-36"
      : size === "lg"
        ? "h-36 w-64"
        : size === "king"
          ? "h-56 w-[28rem]"
          : "h-28 w-48";
  const flip = facing === "left" ? "scale-x-[-1]" : "";

  return (
    <svg
      viewBox="0 0 240 140"
      className={`${sizeClass} ${flip} ${className} ${flying ? "animate-dragon-fly" : ""} drop-shadow-xl`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`body-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.body} />
          <stop offset="100%" stopColor={palette.bodyDark} />
        </linearGradient>
        <linearGradient id={`belly-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.belly} />
          <stop offset="100%" stopColor={palette.bellyDark} />
        </linearGradient>
      </defs>

      {/* Tail */}
      <path
        d="M18 88 Q8 78 6 62 Q4 48 14 52 Q22 56 28 68 Q34 78 38 86"
        fill={`url(#body-${color})`}
        stroke={palette.stripe}
        strokeWidth="0.5"
      />
      {/* Tail stripes */}
      <path d="M12 70 L22 72 M10 58 L20 60" stroke={palette.stripe} strokeWidth="2.5" strokeLinecap="round" />

      {/* Back leg */}
      <path d="M72 98 L68 118 L76 118 L80 98" fill={`url(#body-${color})`} />
      <path d="M66 118 L72 122 L82 122 L78 118" fill={palette.stripe} />
      <path d="M68 120 L70 124 M74 120 L76 124 M80 120 L82 124" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Back wing */}
      <path
        d="M88 42 Q60 8 28 22 Q42 38 62 48 Q78 52 88 46"
        fill={palette.wing}
        opacity="0.85"
      />
      <path d="M36 28 L58 42 M44 22 L66 38 M52 18 L74 32" stroke={palette.wingDark} strokeWidth="1" opacity="0.6" />

      {/* Body */}
      <ellipse cx="108" cy="78" rx="48" ry="28" fill={`url(#body-${color})`} />
      {/* Tiger stripes on body */}
      <path d="M78 68 L82 88 M88 64 L92 90 M98 62 L100 92 M112 62 L112 92 M124 64 L122 90 M136 68 L130 88 M146 72 L138 86" stroke={palette.stripe} strokeWidth="3" strokeLinecap="round" />

      {/* Plated belly */}
      <ellipse cx="108" cy="84" rx="36" ry="16" fill={`url(#belly-${color})`} />
      <path d="M78 82 L138 82 M80 88 L136 88 M84 92 L132 92" stroke={palette.bellyDark} strokeWidth="0.8" opacity="0.5" />

      {/* Front wing */}
      <path
        d="M100 48 Q72 12 42 28 Q64 42 88 52 Q98 54 104 50"
        fill={palette.wing}
      />
      <path d="M50 30 L72 44 M58 24 L80 38 M66 20 L88 34" stroke={palette.wingDark} strokeWidth="1" opacity="0.6" />

      {/* Dorsal spikes */}
      <path d="M62 58 L60 48 L64 56 M78 52 L76 40 L80 50 M94 50 L92 36 L96 48 M110 50 L108 34 L112 48 M126 54 L124 40 L128 52 M140 60 L138 48 L142 58 M152 68 L150 58 L154 66" fill={palette.stripe} />

      {/* Neck */}
      <path
        d="M140 68 Q158 52 168 42"
        fill="none"
        stroke={`url(#body-${color})`}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d="M148 58 L150 48 L154 56" fill={palette.stripe} />

      {/* Head */}
      <path d="M162 38 Q178 28 196 32 Q208 36 210 44 Q212 52 204 56 Q192 60 176 54 Q164 50 160 44 Z" fill={`url(#body-${color})`} />

      {/* Head horns/frills */}
      <path d="M168 30 L164 18 L172 28" fill={palette.stripe} />
      <path d="M180 26 L178 14 L184 24" fill={palette.stripe} />
      <path d="M192 28 L192 16 L196 26" fill={palette.stripe} />
      <path d="M202 34 L206 24 L204 36" fill={palette.stripe} />

      {/* Snout */}
      <path d="M200 44 Q218 42 224 48 Q226 52 220 54 Q210 56 202 52 Z" fill={`url(#belly-${color})`} />
      {/* Teeth */}
      <path d="M208 50 L210 54 L212 50 M214 50 L216 54 L218 50" fill="white" stroke="#ddd" strokeWidth="0.3" />
      <circle cx="222" cy="46" r="2" fill="#1a1a1a" />

      {/* Eye */}
      <circle cx="188" cy="40" r="5" fill="#fbbf24" />
      <ellipse cx="189" cy="40" rx="2" ry="3" fill="#1a1a1a" />
      <circle cx="190" cy="38.5" r="1" fill="white" />

      {/* Front legs */}
      {!flying && (
        <>
          <path d="M118 100 L114 118 L124 118 L128 100" fill={`url(#body-${color})`} />
          <path d="M112 118 L118 122 L128 122 L124 118" fill={palette.stripe} />
          <path d="M114 120 L116 124 M120 120 L122 124 M126 120 L128 124" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {/* Flying tucked legs */}
      {flying && (
        <>
          <path d="M118 96 L112 106 L120 104 Z" fill={`url(#body-${color})`} opacity="0.9" />
          <path d="M72 94 L66 104 L74 102 Z" fill={`url(#body-${color})`} opacity="0.9" />
        </>
      )}
    </svg>
  );
}

interface JungleBackgroundProps {
  variant?: "ground" | "sky" | "sanctuary" | "king";
}

const BG_IMAGES: Record<string, string> = {
  ground: "/backgrounds/jungle-ground.png",
  sky: "/backgrounds/jungle-sky.png",
  sanctuary: "/backgrounds/jungle-sanctuary.png",
  king: "/backgrounds/jungle-king.png",
};

export function JungleBackground({ variant = "ground" }: JungleBackgroundProps) {
  const src = BG_IMAGES[variant] ?? BG_IMAGES.ground;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* High-resolution photo background */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      {/* Light rays overlay for ground/sanctuary */}
      {(variant === "ground" || variant === "sanctuary") && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(255,220,100,0.15),transparent_55%)]" />
      )}
      {variant === "sky" && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-transparent to-emerald-900/30" />
      )}
      {variant === "king" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(250,204,21,0.2),transparent_60%)]" />
      )}
      {/* Foreground fern/frond hints at bottom */}
      {variant === "ground" && <ForegroundFerns />}
    </div>
  );
}

function ForegroundFerns() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full opacity-70"
      viewBox="0 0 800 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 80 L0 50 Q20 30 30 55 Q40 20 50 50 Q60 35 70 55 L80 80" fill="#14532d" />
      <path d="M60 80 L55 45 Q70 25 80 50 Q90 30 100 55 L110 80" fill="#166534" />
      <path d="M700 80 L705 48 Q720 28 730 52 Q740 32 750 55 L760 80" fill="#14532d" />
      <path d="M740 80 L745 42 Q760 22 770 48 Q780 28 790 52 L800 80" fill="#166534" />
    </svg>
  );
}
