import type { SceneBackgroundVariant } from "@/lib/game/types";
import { Fireflies } from "../Fireflies";
import { JungleBackdrop } from "../JungleBackdrop";
import { SceneForeground } from "./SceneForeground";

interface SceneBackgroundProps {
  variant: SceneBackgroundVariant;
}

/** The shared sky/hills plus whatever foreground art matches this scene. */
export function SceneBackground({ variant }: SceneBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <JungleBackdrop gradientId={`scene-sky-${variant}`} />
      <SceneForeground variant={variant} />
      <Fireflies />
    </div>
  );
}
