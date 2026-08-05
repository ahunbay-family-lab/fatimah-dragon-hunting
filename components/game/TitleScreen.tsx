"use client";

import { useEffect } from "react";
import { SITE_NAME } from "@/lib/constants";
import { DragonMascot } from "./DragonMascot";
import { JungleTitleArt } from "./JungleTitleArt";

const START_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

interface TitleScreenProps {
  onBegin: () => void;
}

/** The very first screen the player sees: logo, jungle art, and a way in. */
export function TitleScreen({ onBegin }: TitleScreenProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!START_KEYS.has(event.key)) return;
      event.preventDefault();
      onBegin();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBegin]);

  return (
    <div className="relative mx-auto flex min-h-[640px] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-3xl border-4 border-emerald-900/30 shadow-2xl">
      <JungleTitleArt />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-10 text-center">
        <DragonMascot waving className="h-36 w-36 drop-shadow-xl" />

        <div>
          <h1 className="text-4xl font-extrabold text-emerald-950 drop-shadow-sm sm:text-6xl">
            {SITE_NAME}
          </h1>
          <p className="mt-3 text-lg font-semibold text-emerald-950/80 sm:text-xl">
            Follow the clues. Find the dragons. Become their friend!
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onBegin}
            className="min-h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 text-xl font-extrabold text-emerald-950 shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
          >
            🌿 Begin Adventure 🌿
          </button>

          <p className="rounded-full bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-50 backdrop-blur-sm sm:text-sm">
            Click the button, or press any arrow key (↑ ↓ ← →) to begin.
          </p>
        </div>
      </div>

      <p className="relative z-10 pb-4 text-xs font-medium text-emerald-950/60">
        Built step by step — Phase 2 of 10 complete ✅
      </p>
    </div>
  );
}
