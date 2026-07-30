import type { DragonColor, MysteryClue } from "./types";

export const TARGET_DRAGON_COUNT = 5;
export const MAX_DRAGON_COUNT = 6;

export const DRAGON_PALETTE: Record<
  DragonColor,
  {
    body: string;
    bodyDark: string;
    wing: string;
    wingDark: string;
    belly: string;
    bellyDark: string;
    stripe: string;
    glow: string;
    label: string;
  }
> = {
  emerald: {
    body: "#2d6a3e",
    bodyDark: "#1b4332",
    wing: "#3d5c2e",
    wingDark: "#2d4a22",
    belly: "#d4e7c5",
    bellyDark: "#a8c686",
    stripe: "#1a3d28",
    glow: "#4ade80",
    label: "Emerald",
  },
  sapphire: {
    body: "#2e5e8a",
    bodyDark: "#1a3a5c",
    wing: "#2a4060",
    wingDark: "#1a2840",
    belly: "#c5dff0",
    bellyDark: "#8bb8d4",
    stripe: "#142840",
    glow: "#60a5fa",
    label: "Sapphire",
  },
  ruby: {
    body: "#c1440e",
    bodyDark: "#8b2500",
    wing: "#5c3d2e",
    wingDark: "#3d2817",
    belly: "#f5e6c8",
    bellyDark: "#d4b896",
    stripe: "#4a2010",
    glow: "#f87171",
    label: "Ruby",
  },
  amber: {
    body: "#d4622a",
    bodyDark: "#a04020",
    wing: "#6b4423",
    wingDark: "#4a2e18",
    belly: "#fae8c8",
    bellyDark: "#d4b88a",
    stripe: "#5c3018",
    glow: "#fbbf24",
    label: "Amber",
  },
  violet: {
    body: "#6b3fa0",
    bodyDark: "#4a2870",
    wing: "#4a3060",
    wingDark: "#301840",
    belly: "#e8d4f0",
    bellyDark: "#c4a0d4",
    stripe: "#301050",
    glow: "#a78bfa",
    label: "Violet",
  },
  mystery: {
    body: "#1a6b6b",
    bodyDark: "#0d4040",
    wing: "#2a5050",
    wingDark: "#1a3838",
    belly: "#c8f0e8",
    bellyDark: "#8ad4c4",
    stripe: "#0a3030",
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
    "Deep in a lush, living jungle, a brave explorer with a red ponytail searches for legendary striped dragons. Creep close, touch their snouts gently, earn their trust, and ride the skies!",
  exploring:
    "Use the arrow keys to walk through the jungle. Walk toward the dragon you see on the map!",
  creeping:
    "You're close! Press the UP arrow to creep toward the dragon slowly — don't startle it!",
  touching:
    "Press SPACE when the pink marker is in the green zone to gently touch the dragon's snout.",
  naming: "The dragon likes you! Give your new friend a name.",
  firstRide: "Your dragon spreads its mighty wings! Soar through the jungle sky!",
  chooseRide:
    "Which dragon will you ride? Leave the others at the Dragon Sanctuary with food and fresh water.",
  sanctuary:
    "Your dragons rest safely at the sanctuary — plenty of fruit, fish, and cool spring water.",
  collectionComplete:
    "You've befriended enough dragons! Choose your favorite and fly to meet the Dragon King.",
  dragonKing:
    "The Dragon King rises from the ancient ruins — enormous and wise. He grants you a mystery dragon hunt!",
  mysteryHunt:
    "Use the arrow keys to fly toward each clue marker in the sky.",
  mysteryFound:
    "You found the Mystery Dragon! Bring it to the Dragon King.",
  ending:
    "The Dragon King gifts you the Crown of Dragon Friends — THE END!",
};
