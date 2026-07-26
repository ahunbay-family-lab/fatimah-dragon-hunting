import type { DragonColor, MysteryClue } from "./types";

export const TARGET_DRAGON_COUNT = 5;
export const MAX_DRAGON_COUNT = 6;

export const DRAGON_PALETTE: Record<
  DragonColor,
  { body: string; wing: string; belly: string; glow: string; label: string }
> = {
  emerald: {
    body: "#2d8a4e",
    wing: "#1e6b3a",
    belly: "#7dd3a0",
    glow: "#4ade80",
    label: "Emerald",
  },
  sapphire: {
    body: "#2563eb",
    wing: "#1d4ed8",
    belly: "#93c5fd",
    glow: "#60a5fa",
    label: "Sapphire",
  },
  ruby: {
    body: "#dc2626",
    wing: "#b91c1c",
    belly: "#fca5a5",
    glow: "#f87171",
    label: "Ruby",
  },
  amber: {
    body: "#d97706",
    wing: "#b45309",
    belly: "#fcd34d",
    glow: "#fbbf24",
    label: "Amber",
  },
  violet: {
    body: "#7c3aed",
    wing: "#6d28d9",
    belly: "#c4b5fd",
    glow: "#a78bfa",
    label: "Violet",
  },
  mystery: {
    body: "#0f766e",
    wing: "#115e59",
    belly: "#99f6e4",
    glow: "#2dd4bf",
    label: "Mystery",
  },
};

export const WILD_DRAGON_COLORS: DragonColor[] = [
  "emerald",
  "sapphire",
  "ruby",
  "amber",
  "violet",
];

export const MYSTERY_CLUES: MysteryClue[] = [
  {
    id: 1,
    text: "The Dragon King whispers: follow the river that sings at dawn.",
    hint: "Head toward the sparkling waterfall in the east.",
  },
  {
    id: 2,
    text: "Ancient vines point toward a cave hidden behind rainbow mist.",
    hint: "Soar above the canopy where the mist shimmers purple.",
  },
  {
    id: 3,
    text: "A soft chime echoes from the Heartstone Grove.",
    hint: "Land near the glowing crystal clearing deep in the jungle.",
  },
];

export const STORY = {
  intro:
    "Deep in the emerald jungle, a brave girl with a ponytail searches for legendary flying dragons. Creep close, touch their snouts gently, earn their trust, and ride the skies!",
  exploring: "Search the jungle canopy for a flying dragon resting among the trees…",
  creeping:
    "A dragon is nearby! Creep forward slowly — don't startle it!",
  touching:
    "You're close! Gently touch the dragon's snout when the heart glows soft green.",
  naming: "The dragon likes you! Give your new friend a name.",
  firstRide: "Your dragon spreads its wings! Soar through the jungle sky!",
  chooseRide:
    "Which dragon will you ride? Leave the others at the Dragon Sanctuary with food and fresh water.",
  sanctuary:
    "Your dragons rest safely at the sanctuary — plenty of fruit, fish, and cool spring water.",
  collectionComplete:
    "You've befriended enough dragons! Choose your favorite and fly to meet the Dragon King.",
  dragonKing:
    "The Dragon King rises from the clouds — enormous and wise. He grants you a mystery dragon hunt!",
  mysteryHunt:
    "Follow the clues while riding your dragon to find the legendary Mystery Dragon.",
  mysteryFound:
    "You found the Mystery Dragon! Bring it to the Dragon King.",
  ending:
    "The Dragon King gifts you the Crown of Dragon Friends — THE END!",
};
