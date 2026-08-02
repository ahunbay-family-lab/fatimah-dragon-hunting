"use client";

import { useCallback, useEffect, useState } from "react";
import type { SceneDirection } from "@/lib/game/types";
import { findChoice, getScene, START_SCENE_ID } from "@/lib/game/scenes";
import { SceneBackground } from "./SceneBackground";

const ARROW_KEY_TO_DIRECTION: Record<string, SceneDirection> = {
  ArrowUp: "forward",
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowDown: "back",
};

const DIRECTION_ARROW: Record<SceneDirection, string> = {
  forward: "⬆️",
  left: "⬅️",
  right: "➡️",
  back: "↩️",
};

interface ExplorationScreenProps {
  onExit: () => void;
}

/**
 * Phase 2: walk between jungle scenes by clicking a choice or pressing the
 * matching arrow key. No dragons or clues yet — this phase is just about
 * proving the "the jungle changes as you move" trick feels good to use.
 */
export function ExplorationScreen({ onExit }: ExplorationScreenProps) {
  const [sceneId, setSceneId] = useState(START_SCENE_ID);
  const [stepsWalked, setStepsWalked] = useState(0);
  const scene = getScene(sceneId);

  const goTo = useCallback(
    (direction: SceneDirection) => {
      const choice = findChoice(scene, direction);
      if (!choice) return;
      setSceneId(choice.targetSceneId);
      setStepsWalked((n) => n + 1);
    },
    [scene],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const direction = ARROW_KEY_TO_DIRECTION[event.key];
      if (!direction) return;
      event.preventDefault();
      goTo(direction);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  return (
    <div className="relative mx-auto flex min-h-[640px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border-4 border-emerald-900/30 shadow-2xl">
      <div className="relative h-[420px] w-full overflow-hidden">
        <div key={sceneId} className="animate-scene-fade-in absolute inset-0">
          <SceneBackground variant={scene.background} />
        </div>

        <button
          type="button"
          onClick={onExit}
          className="absolute right-3 top-3 z-10 min-h-11 rounded-full bg-black/40 px-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          ← Title
        </button>

        <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          Steps walked: {stepsWalked}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 bg-gradient-to-b from-emerald-950 to-emerald-900 p-5 text-white">
        <p key={`${sceneId}-narration`} className="animate-pop min-h-[3rem] text-sm leading-relaxed text-emerald-100/90 sm:text-base">
          {scene.narration}
        </p>

        <div className="mt-auto flex flex-wrap gap-3">
          {scene.choices.map((choice) => (
            <button
              key={choice.direction}
              type="button"
              onClick={() => goTo(choice.direction)}
              className="min-h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:from-emerald-400 hover:to-teal-300 active:scale-95 sm:text-base"
            >
              {DIRECTION_ARROW[choice.direction]} {choice.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-emerald-300/70">
          Click a choice, or use the arrow keys (↑ ↓ ← →) to move.
        </p>
      </div>
    </div>
  );
}
