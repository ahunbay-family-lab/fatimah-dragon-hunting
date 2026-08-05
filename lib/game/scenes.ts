import type { Scene, SceneChoice, SceneDirection, SceneId } from "./types";

/**
 * Phase 2 placeholder exploration map. No dragons yet — this is just a
 * small loop of jungle spots to prove that clicking (or pressing arrow
 * keys) actually walks you somewhere new and swaps the scenery.
 *
 * Real clue trails and dragons get added on top of this same system in
 * Phase 3, so keep new scenes small and connected to this graph rather
 * than replacing it.
 */
export const START_SCENE_ID: SceneId = "camp";

export const EXPLORATION_SCENES: Record<SceneId, Scene> = {
  camp: {
    id: "camp",
    background: "camp",
    narration:
      "You wake up at your camp on the edge of the jungle. Sunlight streams through the leaves. Time to explore!",
    choices: [
      { direction: "forward", label: "Head into the jungle", targetSceneId: "clearing" },
    ],
  },
  clearing: {
    id: "clearing",
    background: "clearing",
    narration:
      "A sunny clearing opens up. Two trails lead onward — one hugs a bubbling stream, the other winds past giant ferns.",
    choices: [
      { direction: "left", label: "Follow the stream", targetSceneId: "riverbank" },
      { direction: "right", label: "Wander the fern path", targetSceneId: "fernpath" },
      { direction: "back", label: "Back to camp", targetSceneId: "camp" },
    ],
  },
  riverbank: {
    id: "riverbank",
    background: "riverbank",
    narration:
      "The stream chatters over smooth stones. A narrow log bridge leads deeper into the jungle.",
    choices: [
      { direction: "forward", label: "Cross the log bridge", targetSceneId: "thicket" },
      { direction: "back", label: "Back to the clearing", targetSceneId: "clearing" },
    ],
  },
  fernpath: {
    id: "fernpath",
    background: "fernpath",
    narration:
      "Giant ferns tower overhead, dappling the ground in green light. The path narrows ahead.",
    choices: [
      { direction: "forward", label: "Push through the ferns", targetSceneId: "thicket" },
      { direction: "back", label: "Back to the clearing", targetSceneId: "clearing" },
    ],
  },
  thicket: {
    id: "thicket",
    background: "thicket",
    narration:
      "The path opens into a shadowy thicket. Something about this spot feels... watched. (Real dragon clues arrive in Phase 3!)",
    choices: [
      { direction: "back", label: "Back to the clearing", targetSceneId: "clearing" },
    ],
  },
};

export function getScene(id: SceneId): Scene {
  const scene = EXPLORATION_SCENES[id];
  if (!scene) {
    throw new Error(`Unknown jungle scene id: "${id}"`);
  }
  return scene;
}

export function findChoice(
  scene: Scene,
  direction: SceneDirection,
): SceneChoice | undefined {
  return scene.choices.find((choice) => choice.direction === direction);
}

/**
 * Checks the scene graph for authoring mistakes: choices pointing at a
 * scene id that doesn't exist, and scenes nobody can ever reach. Runs once
 * below so a typo in the data gets caught immediately instead of silently
 * breaking navigation deep into a playtest.
 */
export function validateSceneGraph(
  scenes: Record<SceneId, Scene>,
  startId: SceneId,
): string[] {
  const errors: string[] = [];
  const ids = new Set(Object.keys(scenes));

  if (!ids.has(startId)) {
    errors.push(`Start scene "${startId}" does not exist.`);
  }

  for (const scene of Object.values(scenes)) {
    for (const choice of scene.choices) {
      if (!ids.has(choice.targetSceneId)) {
        errors.push(
          `Scene "${scene.id}" has a "${choice.direction}" choice pointing to missing scene "${choice.targetSceneId}".`,
        );
      }
    }
  }

  const reachable = new Set<SceneId>();
  const queue: SceneId[] = ids.has(startId) ? [startId] : [];
  while (queue.length > 0) {
    const id = queue.pop();
    if (!id || reachable.has(id) || !ids.has(id)) continue;
    reachable.add(id);
    for (const choice of scenes[id].choices) {
      queue.push(choice.targetSceneId);
    }
  }
  for (const id of ids) {
    if (!reachable.has(id)) {
      errors.push(`Scene "${id}" is unreachable from the start scene "${startId}".`);
    }
  }

  return errors;
}

const graphErrors = validateSceneGraph(EXPLORATION_SCENES, START_SCENE_ID);
if (graphErrors.length > 0) {
  throw new Error(`Jungle scene graph is broken:\n${graphErrors.join("\n")}`);
}
