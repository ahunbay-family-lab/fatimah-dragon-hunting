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
