import { SITE_NAME } from "@/lib/constants";
import { DragonMascot } from "./DragonMascot";
import { JungleTitleArt } from "./JungleTitleArt";

interface TitleScreenProps {
  onBegin: () => void;
}

/** The very first screen the player sees: logo, jungle art, and a way in. */
export function TitleScreen({ onBegin }: TitleScreenProps) {
  return (
    <div className="relative mx-auto flex min-h-[640px] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-3xl border-4 border-emerald-900/30 shadow-2xl">
      <JungleTitleArt />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center">
        <DragonMascot waving className="h-40 w-40 drop-shadow-xl" />

        <div>
          <h1 className="text-4xl font-extrabold text-emerald-950 drop-shadow-sm sm:text-6xl">
            {SITE_NAME}
          </h1>
          <p className="mt-3 text-lg font-semibold text-emerald-950/80 sm:text-xl">
            Follow the clues. Find the dragons. Become their friend!
          </p>
        </div>

        <button
          type="button"
          onClick={onBegin}
          className="min-h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 text-xl font-extrabold text-emerald-950 shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
        >
          🌿 Begin Adventure 🌿
        </button>
      </div>

      <p className="relative z-10 pb-4 text-xs font-medium text-emerald-950/60">
        Built step by step — Phase 2 of 10 complete ✅
      </p>
    </div>
  );
}
