"use client";

import { useState } from "react";
import { ExplorationScreen } from "./scenes/ExplorationScreen";
import { TitleScreen } from "./TitleScreen";

type TopLevelScreen = "title" | "exploring";

/** Root component: decides whether we're looking at the title screen or the jungle. */
export function JungleDragonQuest() {
  const [screen, setScreen] = useState<TopLevelScreen>("title");

  if (screen === "exploring") {
    return <ExplorationScreen onExit={() => setScreen("title")} />;
  }

  return <TitleScreen onBegin={() => setScreen("exploring")} />;
}
