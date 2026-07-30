import type { DragonColor } from "@/lib/game/types";
import { DRAGON_PALETTE } from "@/lib/game/data";

interface GirlCharacterProps {
  className?: string;
  creeping?: boolean;
  riding?: boolean;
  size?: "sm" | "md" | "lg";
}

export function GirlCharacter({
  className = "",
  creeping = false,
  riding = false,
  size = "md",
}: GirlCharacterProps) {
  const sizeClass =
    size === "sm" ? "h-24 w-16" : size === "lg" ? "h-44 w-28" : "h-36 w-24";

  return (
    <svg
      viewBox="0 0 80 120"
      className={`${sizeClass} ${className} ${creeping ? "animate-creep" : riding ? "animate-ride-bob" : ""}`}
      aria-hidden="true"
    >
      {/* Ponytail */}
      <ellipse cx="52" cy="18" rx="8" ry="14" fill="#5c3d2e" />
      <path
        d="M48 12 Q58 8 56 28 Q54 38 50 42"
        fill="none"
        stroke="#5c3d2e"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Head */}
      <circle cx="40" cy="22" r="14" fill="#f5c9a8" />
      {/* Hair front */}
      <path d="M26 20 Q40 8 54 20 Q50 14 40 12 Q30 14 26 20" fill="#5c3d2e" />
      {/* Eyes */}
      <circle cx="35" cy="22" r="2" fill="#1a1a2e" />
      <circle cx="45" cy="22" r="2" fill="#1a1a2e" />
      <circle cx="36" cy="21" r="0.8" fill="white" />
      <circle cx="46" cy="21" r="0.8" fill="white" />
      {/* Smile */}
      <path
        d="M34 28 Q40 32 46 28"
        fill="none"
        stroke="#c97b63"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* T-shirt */}
      <path d="M28 36 L24 50 L56 50 L52 36 Z" fill="#3b82f6" />
      <path d="M28 36 L32 44 L48 44 L52 36" fill="#2563eb" />
      {/* Arms */}
      <path
        d="M24 50 L18 62"
        stroke="#f5c9a8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M56 50 L62 62"
        stroke="#f5c9a8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Jeans */}
      <path d="M30 50 L28 78 L38 78 L40 58 L42 78 L52 78 L50 50 Z" fill="#1e3a5f" />
      <line x1="40" y1="58" x2="40" y2="78" stroke="#152a45" strokeWidth="1" />
      {/* Legs */}
      <rect x="28" y="78" width="10" height="18" rx="3" fill="#1e3a5f" />
      <rect x="42" y="78" width="10" height="18" rx="3" fill="#1e3a5f" />
      {/* Shoes */}
      <ellipse cx="33" cy="98" rx="7" ry="4" fill="#374151" />
      <ellipse cx="47" cy="98" rx="7" ry="4" fill="#374151" />
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
      ? "h-16 w-28"
      : size === "lg"
        ? "h-28 w-44"
        : size === "king"
          ? "h-52 w-80"
          : "h-24 w-36";
  const flip = facing === "left" ? "scale-x-[-1]" : "";

  return (
    <svg
      viewBox="0 0 160 100"
      className={`${sizeClass} ${flip} ${className} ${flying ? "animate-dragon-fly" : ""}`}
      aria-hidden="true"
    >
      {/* Tail */}
      <path
        d="M20 55 Q5 45 8 30 Q12 20 22 35"
        fill="none"
        stroke={palette.body}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Back wing */}
      <path
        d="M55 30 Q30 10 20 25 Q35 35 50 40"
        fill={palette.wing}
        opacity="0.8"
      />
      {/* Body */}
      <ellipse cx="70" cy="55" rx="35" ry="22" fill={palette.body} />
      <ellipse cx="70" cy="58" rx="28" ry="14" fill={palette.belly} />
      {/* Front wing */}
      <path
        d="M65 35 Q45 5 30 20 Q50 30 68 42"
        fill={palette.wing}
      />
      {/* Neck */}
      <path
        d="M95 48 Q110 35 118 30"
        fill="none"
        stroke={palette.body}
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* Head */}
      <ellipse cx="125" cy="28" rx="18" ry="14" fill={palette.body} />
      {/* Snout */}
      <ellipse cx="142" cy="32" rx="12" ry="8" fill={palette.belly} />
      <circle cx="148" cy="30" r="2" fill="#1a1a2e" />
      {/* Eye */}
      <circle cx="130" cy="24" r="4" fill="white" />
      <circle cx="131" cy="24" r="2" fill="#1a1a2e" />
      {/* Horn */}
      <path d="M120 16 L118 8 L126 14" fill={palette.glow} />
      {/* Legs (when perched) */}
      {!flying && (
        <>
          <path
            d="M58 72 L55 85"
            stroke={palette.body}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M78 72 L81 85"
            stroke={palette.body}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

interface JungleBackgroundProps {
  variant?: "ground" | "sky" | "sanctuary" | "king";
}

export function JungleBackground({ variant = "ground" }: JungleBackgroundProps) {
  if (variant === "sky") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200">
        <div className="absolute -left-10 top-16 h-24 w-48 rounded-full bg-white/70 blur-sm" />
        <div className="absolute right-10 top-8 h-16 w-36 rounded-full bg-white/60 blur-sm" />
        <div className="absolute left-1/3 top-32 h-20 w-56 rounded-full bg-white/50 blur-sm" />
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-emerald-600/40 to-transparent" />
      </div>
    );
  }

  if (variant === "sanctuary") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-800">
        <div className="absolute bottom-0 h-1/3 w-full bg-emerald-900/50" />
        {/* Pond */}
        <div className="absolute bottom-[18%] left-1/2 h-20 w-60 -translate-x-1/2 rounded-[50%] bg-sky-400/60" />
        {/* Food bowls */}
        <div className="absolute bottom-[22%] left-[30%] h-6 w-10 rounded-full bg-amber-600/80" />
        <div className="absolute bottom-[22%] right-[30%] h-6 w-10 rounded-full bg-amber-600/80" />
        {/* Fruit */}
        <span className="absolute bottom-[26%] left-[28%] text-lg">🍎</span>
        <span className="absolute bottom-[26%] left-[32%] text-lg">🐟</span>
        <span className="absolute bottom-[26%] right-[28%] text-lg">🍌</span>
        <JungleTrees />
      </div>
    );
  }

  if (variant === "king") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-800 to-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(250,204,21,0.25),transparent_60%)]" />
        <JungleTrees dimmed />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-teal-400 via-emerald-500 to-emerald-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <JungleTrees />
      <div className="absolute bottom-0 h-24 w-full bg-emerald-900/60" />
      {/* Vines */}
      <div className="absolute left-4 top-0 h-40 w-2 rounded-full bg-lime-700/60" />
      <div className="absolute right-8 top-0 h-56 w-2 rounded-full bg-lime-700/60" />
    </div>
  );
}

function JungleTrees({ dimmed = false }: { dimmed?: boolean }) {
  const treeColor = dimmed ? "bg-emerald-950/60" : "bg-emerald-900/70";
  const leafColor = dimmed ? "bg-emerald-800/50" : "bg-emerald-700/80";

  return (
    <>
      {[8, 22, 38, 55, 72, 88].map((left, i) => (
        <div
          key={left}
          className="absolute bottom-16"
          style={{ left: `${left}%`, opacity: 0.5 + (i % 3) * 0.15 }}
        >
          <div className={`mx-auto h-20 w-3 ${treeColor}`} />
          <div
            className={`-mt-16 h-16 w-20 rounded-full ${leafColor}`}
            style={{ marginLeft: -34 }}
          />
        </div>
      ))}
    </>
  );
}
