export type GamePhase =
  | "intro"
  | "exploring"
  | "creeping"
  | "touching"
  | "naming"
  | "firstRide"
  | "chooseRide"
  | "sanctuary"
  | "collectionComplete"
  | "dragonKing"
  | "mysteryHunt"
  | "mysteryFound"
  | "ending";

export type DragonColor =
  | "emerald"
  | "sapphire"
  | "ruby"
  | "amber"
  | "violet"
  | "mystery";

export interface Position {
  x: number;
  y: number;
}

export interface Dragon {
  id: string;
  name: string;
  color: DragonColor;
  atSanctuary: boolean;
}

export interface MysteryClue {
  id: number;
  text: string;
  hint: string;
}

/** One "spot" the player can walk to. Matches the id keys in EXPLORATION_SCENES. */
export type SceneId = string;

/**
 * Which key/button moves you there. Mirrors arrow keys so the same choice
 * always has the same control no matter which scene you're in.
 */
export type SceneDirection = "forward" | "left" | "right" | "back";

export type SceneBackgroundVariant =
  | "camp"
  | "clearing"
  | "riverbank"
  | "fernpath"
  | "thicket";

export interface SceneChoice {
  direction: SceneDirection;
  /** What the button says, e.g. "Follow the bubbling stream". */
  label: string;
  targetSceneId: SceneId;
}

export interface Scene {
  id: SceneId;
  background: SceneBackgroundVariant;
  /** Short flavor text describing what the player sees/hears here. */
  narration: string;
  choices: SceneChoice[];
}
