"use client";

import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";
import { DragonMascot } from "./DragonMascot";
import { JungleTitleArt } from "./JungleTitleArt";

/**
 * Phase 1: the title screen. No gameplay yet — this phase is purely about
 * getting the look and feel right before we build any game logic.
 */
export function TitleScreen() {
  const [showComingSoon, setShowComingSoon] = useState(false);

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
          onClick={() => setShowComingSoon(true)}
          className="min-h-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 text-xl font-extrabold text-emerald-950 shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
        >
          🌿 Begin Adventure 🌿
        </button>

        {showComingSoon && (
          <p className="animate-pop max-w-sm rounded-2xl bg-emerald-950/80 px-5 py-3 text-sm font-medium text-amber-200 backdrop-blur-sm sm:text-base">
            🚧 The jungle trail is still being cleared! Real exploring arrives
            in Phase 2. 🚧
          </p>
        )}
      </div>

      <p className="relative z-10 pb-4 text-xs font-medium text-emerald-950/60">
        Built step by step — Phase 1 of 10 complete ✅
      </p>
    </div>
  );
}
