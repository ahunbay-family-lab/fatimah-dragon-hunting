"use client";

/**
 * Pre-redesign prototype, kept around for reference while we rebuild the
 * game phase by phase per docs/game-design.md. The final design has no
 * visible girl sprite and uses scene-to-scene navigation instead of
 * free-roam movement, so this file is not wired into the app right now —
 * expect it to be refactored/replaced as later phases land.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dragon, DragonColor, GamePhase, Position } from "@/lib/game/types";
import {
  DRAGON_PALETTE,
  MAX_DRAGON_COUNT,
  MYSTERY_CLUES,
  STORY,
  TARGET_DRAGON_COUNT,
  WILD_DRAGON_COLORS,
} from "@/lib/game/data";
import {
  DragonCharacter,
  GirlCharacter,
  JungleBackground,
} from "./Characters";

const NEAR_DRAGON_DISTANCE = 24;
const TOUCH_DRAGON_DISTANCE = 10;
const CLUE_REACH_DISTANCE = 14;
const GIRL_START: Position = { x: 18, y: 68 };
const MOVE_SPEED = 2.2;
const CREEP_SPEED = 1.1;
const FLY_SPEED = 2.8;

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function distance(a: Position, b: Position) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function randomDragonSpot(): Position {
  return {
    x: 58 + Math.random() * 30,
    y: 22 + Math.random() * 30,
  };
}

function randomClueSpot(): Position {
  return {
    x: 20 + Math.random() * 60,
    y: 18 + Math.random() * 45,
  };
}

function moveToward(from: Position, to: Position, amount: number): Position {
  const dist = distance(from, to);
  if (dist <= amount || dist === 0) return { ...to };
  const ratio = amount / dist;
  return {
    x: from.x + (to.x - from.x) * ratio,
    y: from.y + (to.y - from.y) * ratio,
  };
}

function clampPosition(pos: Position): Position {
  return {
    x: Math.max(6, Math.min(94, pos.x)),
    y: Math.max(18, Math.min(88, pos.y)),
  };
}

function applyArrowDelta(pos: Position, keys: Set<string>, speed: number): Position {
  let { x, y } = pos;
  if (keys.has("ArrowUp")) y -= speed;
  if (keys.has("ArrowDown")) y += speed;
  if (keys.has("ArrowLeft")) x -= speed;
  if (keys.has("ArrowRight")) x += speed;
  return clampPosition({ x, y });
}

export function DragonHuntGame() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [activeDragonId, setActiveDragonId] = useState<string | null>(null);
  const [pendingDragon, setPendingDragon] = useState<{
    color: DragonColor;
    id: string;
  } | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [message, setMessage] = useState(STORY.intro);
  const [girlPos, setGirlPos] = useState<Position>(GIRL_START);
  const [wildDragonPos, setWildDragonPos] = useState<Position | null>(null);
  const [clueMarkerPos, setClueMarkerPos] = useState<Position | null>(null);
  const [alertLevel, setAlertLevel] = useState(0);
  const [touchZone] = useState(50);
  const [touchIndicator, setTouchIndicator] = useState(0);
  const [trustLevel, setTrustLevel] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);

  const keysRef = useRef<Set<string>>(new Set());
  const touchInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchDirectionRef = useRef(1);
  const touchIndicatorRef = useRef(0);
  const clueReachedRef = useRef(false);
  const phaseRef = useRef(phase);
  const girlPosRef = useRef(girlPos);
  const wildDragonPosRef = useRef(wildDragonPos);
  const clueMarkerPosRef = useRef(clueMarkerPos);
  const clueIndexRef = useRef(clueIndex);

  const activeDragon = dragons.find((d) => d.id === activeDragonId) ?? null;

  useEffect(() => {
    phaseRef.current = phase;
    girlPosRef.current = girlPos;
    wildDragonPosRef.current = wildDragonPos;
    clueMarkerPosRef.current = clueMarkerPos;
    clueIndexRef.current = clueIndex;
  }, [phase, girlPos, wildDragonPos, clueMarkerPos, clueIndex]);

  const clearTouchTimer = useCallback(() => {
    if (touchInterval.current) clearInterval(touchInterval.current);
    touchInterval.current = null;
  }, []);

  useEffect(() => () => clearTouchTimer(), [clearTouchTimer]);

  const spawnWildDragon = useCallback(() => {
    const taken = new Set(dragons.map((d) => d.color));
    const available = WILD_DRAGON_COLORS.filter((c) => !taken.has(c));
    const color =
      available[Math.floor(Math.random() * available.length)] ?? "emerald";
    setPendingDragon({ color, id: uid() });
    setWildDragonPos(randomDragonSpot());
  }, [dragons]);

  const startExploring = () => {
    clearTouchTimer();
    setPhase("exploring");
    setMessage(STORY.exploring);
    setGirlPos(GIRL_START);
    setAlertLevel(0);
    setTrustLevel(0);
    spawnWildDragon();
  };

  const startTouchGame = useCallback(() => {
    setTouchIndicator(0);
    touchDirectionRef.current = 1;
    setTrustLevel(0);
    touchInterval.current = setInterval(() => {
      setTouchIndicator((pos) => {
        const speed = 3;
        let next = pos + speed * touchDirectionRef.current;
        if (next >= 100) {
          touchDirectionRef.current = -1;
          next = 100;
        } else if (next <= 0) {
          touchDirectionRef.current = 1;
          next = 0;
        }
        touchIndicatorRef.current = next;
        return next;
      });
    }, 40);
  }, []);

  const gentleTouch = useCallback(() => {
    if (phaseRef.current !== "touching") return;
    const inZone = Math.abs(touchIndicatorRef.current - touchZone) < 12;
    if (inZone) {
      setTrustLevel((m) => {
        const next = m + 20;
        if (next >= 100) {
          clearTouchTimer();
          setPhase("naming");
          setMessage(STORY.naming);
          setNameInput("");
        }
        return Math.min(100, next);
      });
    } else {
      setAlertLevel((a) => Math.min(100, a + 15));
      setTrustLevel((m) => Math.max(0, m - 8));
    }
  }, [clearTouchTimer, touchZone]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
        keysRef.current.add(e.key);
      }
      if (e.key === " " && phaseRef.current === "touching") {
        e.preventDefault();
        gentleTouch();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [gentleTouch]);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const keys = keysRef.current;
      const currentPhase = phaseRef.current;
      const hasMovementKeys =
        keys.has("ArrowUp") ||
        keys.has("ArrowDown") ||
        keys.has("ArrowLeft") ||
        keys.has("ArrowRight");

      if (hasMovementKeys) {
        if (
          currentPhase === "exploring" ||
          currentPhase === "mysteryHunt" ||
          (currentPhase === "firstRide" && activeDragonId)
        ) {
          const speed =
            currentPhase === "mysteryHunt" || currentPhase === "firstRide"
              ? FLY_SPEED
              : MOVE_SPEED;
          setGirlPos((pos) => clampPosition(applyArrowDelta(pos, keys, speed)));
        }

        if (currentPhase === "creeping" && wildDragonPosRef.current) {
          if (keys.has("ArrowUp")) {
            setGirlPos((pos) => {
              const next = moveToward(pos, wildDragonPosRef.current!, CREEP_SPEED);
              setAlertLevel((a) => Math.max(0, Math.min(100, a - 1)));
              return next;
            });
          } else if (
            keys.has("ArrowDown") ||
            keys.has("ArrowLeft") ||
            keys.has("ArrowRight")
          ) {
            setAlertLevel((a) => Math.min(100, a + 2));
          }
        }
      }

      if (currentPhase === "creeping" && !hasMovementKeys) {
        setAlertLevel((a) => Math.max(0, a - 0.5));
      }

      if (currentPhase === "exploring" && wildDragonPosRef.current) {
        const dist = distance(girlPosRef.current, wildDragonPosRef.current);
        if (dist <= NEAR_DRAGON_DISTANCE) {
          phaseRef.current = "creeping";
          setPhase("creeping");
          setMessage(STORY.creeping);
          setAlertLevel(15);
        }
      }

      if (currentPhase === "creeping" && wildDragonPosRef.current) {
        const dist = distance(girlPosRef.current, wildDragonPosRef.current);
        if (dist <= TOUCH_DRAGON_DISTANCE) {
          phaseRef.current = "touching";
          clearTouchTimer();
          setPhase("touching");
          setMessage(STORY.touching);
          setTrustLevel(0);
          startTouchGame();
        }
      }

      if (currentPhase === "mysteryHunt" && clueMarkerPosRef.current) {
        const dist = distance(girlPosRef.current, clueMarkerPosRef.current);
        if (dist <= CLUE_REACH_DISTANCE && !clueReachedRef.current) {
          clueReachedRef.current = true;
          if (clueIndexRef.current < MYSTERY_CLUES.length - 1) {
            const nextClue = clueIndexRef.current + 1;
            clueIndexRef.current = nextClue;
            setClueIndex(nextClue);
            setMessage(MYSTERY_CLUES[nextClue].text);
            setClueMarkerPos(randomClueSpot());
          } else {
            phaseRef.current = "mysteryFound";
            setPhase("mysteryFound");
            setMessage(STORY.mysteryFound);
            setClueMarkerPos(null);
          }
        } else if (dist > CLUE_REACH_DISTANCE + 4) {
          clueReachedRef.current = false;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeDragonId, clearTouchTimer, startTouchGame]);

  const confirmName = () => {
    if (!pendingDragon || !nameInput.trim()) return;
    const newDragon: Dragon = {
      id: pendingDragon.id,
      name: nameInput.trim(),
      color: pendingDragon.color,
      atSanctuary: false,
    };
    const updated = [...dragons, newDragon];
    setDragons(updated);
    setActiveDragonId(newDragon.id);
    setWildDragonPos(null);

    if (updated.length === 1) {
      setPhase("firstRide");
      setMessage(STORY.firstRide);
    } else if (updated.length >= TARGET_DRAGON_COUNT) {
      setPhase("collectionComplete");
      setMessage(STORY.collectionComplete);
    } else {
      setPhase("chooseRide");
      setMessage(STORY.chooseRide);
    }
  };

  const chooseActiveDragon = (id: string) => {
    setActiveDragonId(id);
    setDragons((prev) =>
      prev.map((d) => ({
        ...d,
        atSanctuary: d.id !== id,
      })),
    );
    setPhase("sanctuary");
    setMessage(STORY.sanctuary);
    setGirlPos({ x: 30, y: 72 });
  };

  const continueAfterSanctuary = () => {
    if (dragons.length >= TARGET_DRAGON_COUNT) {
      setPhase("collectionComplete");
      setMessage(STORY.collectionComplete);
    } else {
      startExploring();
    }
  };

  const continueAfterFirstRide = () => {
    if (dragons.length >= TARGET_DRAGON_COUNT) {
      setPhase("collectionComplete");
      setMessage(STORY.collectionComplete);
    } else {
      startExploring();
    }
  };

  const selectFavorite = (id: string) => {
    setActiveDragonId(id);
    setPhase("dragonKing");
    setMessage(STORY.dragonKing);
    setGirlPos({ x: 45, y: 55 });
  };

  const beginMysteryHunt = () => {
    clueReachedRef.current = false;
    setClueIndex(0);
    setPhase("mysteryHunt");
    setMessage(MYSTERY_CLUES[0].text);
    setClueMarkerPos(randomClueSpot());
    setGirlPos({ x: 20, y: 60 });
  };

  const bringToKing = () => {
    setPhase("ending");
    setMessage(STORY.ending);
    setTimeout(() => setShowGift(true), 800);
  };

  const resetGame = () => {
    clearTouchTimer();
    keysRef.current.clear();
    setPhase("intro");
    setDragons([]);
    setActiveDragonId(null);
    setPendingDragon(null);
    setNameInput("");
    setMessage(STORY.intro);
    setGirlPos(GIRL_START);
    setWildDragonPos(null);
    setClueMarkerPos(null);
    setAlertLevel(0);
    setTrustLevel(0);
    setClueIndex(0);
    setShowGift(false);
  };

  const isFlying =
    phase === "firstRide" ||
    phase === "dragonKing" ||
    phase === "mysteryHunt" ||
    phase === "mysteryFound" ||
    phase === "ending" ||
    phase === "collectionComplete";

  const bgVariant =
    phase === "sanctuary"
      ? "sanctuary"
      : phase === "dragonKing" || phase === "ending"
        ? "king"
        : isFlying
          ? "sky"
          : "ground";

  const showGirlOnMap =
    phase !== "chooseRide" && phase !== "naming" && phase !== "ending";

  const dragonDistance =
    wildDragonPos && (phase === "exploring" || phase === "creeping" || phase === "touching")
      ? distance(girlPos, wildDragonPos)
      : null;

  const creepProgress =
    dragonDistance !== null
      ? Math.max(0, Math.min(100, ((NEAR_DRAGON_DISTANCE - dragonDistance) / NEAR_DRAGON_DISTANCE) * 100))
      : 0;

  return (
    <div className="relative mx-auto flex min-h-[640px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border-4 border-emerald-900/30 shadow-2xl">
      <div className="relative h-[460px] w-full overflow-hidden">
        <JungleBackground variant={bgVariant} />

        {/* Clue marker */}
        {phase === "mysteryHunt" && clueMarkerPos && (
          <MapEntity pos={clueMarkerPos} className="z-20">
            <div className="flex flex-col items-center">
              <span className="animate-pulse text-4xl">✨</span>
              <span className="rounded-full bg-violet-600/90 px-2 py-0.5 text-xs font-bold text-white">
                Clue
              </span>
            </div>
          </MapEntity>
        )}

        {/* Dragon King */}
        {phase === "dragonKing" && (
          <MapEntity pos={{ x: 50, y: 12 }} className="z-20">
            <DragonCharacter color="amber" size="king" flying className="drop-shadow-2xl" />
            <p className="text-center text-sm font-bold text-amber-200 drop-shadow">Dragon King</p>
          </MapEntity>
        )}

        {/* Mystery dragon */}
        {(phase === "mysteryFound" || (phase === "ending" && showGift)) && (
          <MapEntity pos={{ x: 72, y: 28 }} className="z-20">
            <DragonCharacter color="mystery" size="lg" flying />
          </MapEntity>
        )}

        {phase === "ending" && showGift && (
          <MapEntity pos={{ x: 50, y: 20 }} className="z-30">
            <span className="animate-gift-bounce text-6xl">👑</span>
          </MapEntity>
        )}

        {/* Wild dragon — visible while searching */}
        {wildDragonPos && pendingDragon && (
          <MapEntity pos={wildDragonPos} className="z-10">
            <DragonCharacter
              color={pendingDragon.color}
              size="lg"
              flying={phase === "exploring"}
              facing="left"
            />
            {phase === "touching" && (
              <div className="absolute right-0 top-6 h-5 w-5 animate-pulse rounded-full bg-pink-300 ring-2 ring-pink-400" />
            )}
            <p className="text-center text-xs font-bold text-white drop-shadow">
              Wild Dragon
            </p>
          </MapEntity>
        )}

        {/* Sanctuary dragons */}
        {phase === "sanctuary" &&
          dragons
            .filter((d) => d.atSanctuary)
            .map((d, i) => (
              <MapEntity
                key={d.id}
                pos={{ x: 22 + i * 18, y: 58 }}
                className="z-10"
              >
                <DragonCharacter color={d.color} size="md" />
                <p className="text-center text-xs font-bold text-white drop-shadow">{d.name}</p>
              </MapEntity>
            ))}

        {/* Befriended dragons riding with girl */}
        {isFlying && activeDragon && showGirlOnMap && (
          <MapEntity pos={girlPos} className="z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex flex-col items-center">
              <DragonCharacter
                color={activeDragon.color}
                size="lg"
                flying
                className="-mb-4"
              />
              <GirlCharacter riding size="sm" className="relative z-10" />
            </div>
          </MapEntity>
        )}

        {/* Girl on foot */}
        {showGirlOnMap && !isFlying && (
          <MapEntity pos={girlPos} className="z-20 -translate-x-1/2 -translate-y-full">
            <GirlCharacter
              creeping={phase === "creeping"}
              size="lg"
            />
          </MapEntity>
        )}

        {/* Intro preview */}
        {phase === "intro" && (
          <MapEntity pos={{ x: 50, y: 55 }} className="z-20 -translate-x-1/2 -translate-y-full">
            <GirlCharacter size="lg" />
          </MapEntity>
        )}

        {phase === "intro" && (
          <MapEntity pos={{ x: 72, y: 35 }} className="z-10">
            <DragonCharacter color="emerald" size="lg" flying />
          </MapEntity>
        )}

        {phase === "creeping" && alertLevel > 60 && (
          <div className="absolute inset-0 z-30 flex items-start justify-center pt-6">
            <span className="animate-pulse rounded-full bg-red-500/80 px-4 py-1 text-sm font-bold text-white">
              Shhh! Move slowly with the UP arrow!
            </span>
          </div>
        )}

        {/* Arrow key hint overlay */}
        {["exploring", "creeping", "mysteryHunt", "firstRide"].includes(phase) && (
          <div className="absolute bottom-3 left-3 z-30 rounded-xl bg-black/50 px-3 py-2 text-xs text-white backdrop-blur-sm">
            <p className="font-bold">Arrow keys</p>
            <p className="text-white/80">↑ ↓ ← → to move</p>
            {phase === "touching" && <p className="text-pink-200">SPACE to touch snout</p>}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 bg-gradient-to-b from-emerald-950 to-emerald-900 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-extrabold text-emerald-100 sm:text-xl">
            Jungle Dragon Quest
          </h1>
          <span className="rounded-full bg-emerald-800 px-3 py-1 text-sm">
            Dragons: {dragons.length}/{MAX_DRAGON_COUNT}
          </span>
        </div>

        <p className="min-h-[3rem] text-sm leading-relaxed text-emerald-100/90 sm:text-base">
          {message}
        </p>

        {dragons.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dragons.map((d) => (
              <span
                key={d.id}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: DRAGON_PALETTE[d.color].body,
                  boxShadow:
                    d.id === activeDragonId
                      ? `0 0 8px ${DRAGON_PALETTE[d.color].glow}`
                      : undefined,
                }}
              >
                {d.name}
                {d.atSanctuary ? " (sanctuary)" : " (riding)"}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3">
          {phase === "intro" && (
            <ActionButton onClick={startExploring}>Begin Adventure</ActionButton>
          )}

          {phase === "exploring" && (
            <p className="text-sm text-emerald-300">
              Walk toward the dragon on the map using your arrow keys.
            </p>
          )}

          {phase === "creeping" && (
            <>
              <ProgressBar label="How close you are" value={creepProgress} color="teal" />
              <ProgressBar label="Dragon alert" value={alertLevel} color="red" />
            </>
          )}

          {phase === "touching" && (
            <div className="w-full space-y-2">
              <p className="text-xs text-emerald-300">
                Press SPACE when the pink marker is in the green zone!
              </p>
              <TouchMeter value={touchIndicator} zone={touchZone} />
              <ProgressBar label="Trust" value={trustLevel} color="pink" />
              <ActionButton onClick={gentleTouch}>Gently Touch Snout (Space)</ActionButton>
            </div>
          )}

          {phase === "naming" && pendingDragon && (
            <div className="flex w-full flex-wrap items-center gap-3">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Name your dragon..."
                maxLength={20}
                className="rounded-xl border-2 border-emerald-600 bg-emerald-950 px-4 py-2 text-white placeholder:text-emerald-600 focus:border-amber-400 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && confirmName()}
              />
              <ActionButton onClick={confirmName} disabled={!nameInput.trim()}>
                Name Dragon
              </ActionButton>
            </div>
          )}

          {phase === "firstRide" && (
            <ActionButton onClick={continueAfterFirstRide}>Fly On!</ActionButton>
          )}

          {phase === "chooseRide" && (
            <div className="flex w-full flex-wrap gap-2">
              {dragons.map((d) => (
                <ActionButton key={d.id} onClick={() => chooseActiveDragon(d.id)}>
                  Ride {d.name}
                </ActionButton>
              ))}
            </div>
          )}

          {phase === "sanctuary" && (
            <ActionButton onClick={continueAfterSanctuary}>Find More Dragons</ActionButton>
          )}

          {phase === "collectionComplete" && (
            <div className="flex w-full flex-wrap gap-2">
              {dragons.map((d) => (
                <ActionButton
                  key={d.id}
                  onClick={() => selectFavorite(d.id)}
                  variant="gold"
                >
                  Favorite: {d.name}
                </ActionButton>
              ))}
            </div>
          )}

          {phase === "dragonKing" && (
            <ActionButton onClick={beginMysteryHunt} variant="gold">
              Accept Mystery Hunt
            </ActionButton>
          )}

          {phase === "mysteryHunt" && (
            <p className="w-full text-xs text-violet-300">
              Hint: {MYSTERY_CLUES[clueIndex].hint} — Clue {clueIndex + 1} of{" "}
              {MYSTERY_CLUES.length}
            </p>
          )}

          {phase === "mysteryFound" && (
            <ActionButton onClick={bringToKing} variant="gold">
              Bring to Dragon King
            </ActionButton>
          )}

          {phase === "ending" && (
            <div className="flex w-full flex-col items-center gap-3">
              <p className="text-center text-lg font-bold text-amber-300">
                You received the Crown of Dragon Friends!
              </p>
              <p className="text-center text-2xl font-extrabold tracking-widest text-amber-200">
                THE END
              </p>
              <ActionButton onClick={resetGame}>Play Again</ActionButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MapEntity({
  pos,
  children,
  className = "",
}: {
  pos: Position;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      {children}
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "gold";
}) {
  const base =
    variant === "gold"
      ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-emerald-950 hover:from-amber-400 hover:to-yellow-300"
      : "bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:from-emerald-400 hover:to-teal-300";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${base}`}
    >
      {children}
    </button>
  );
}

function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "emerald" | "teal" | "red" | "pink" | "violet";
}) {
  const colors = {
    emerald: "bg-emerald-400",
    teal: "bg-teal-400",
    red: "bg-red-400",
    pink: "bg-pink-400",
    violet: "bg-violet-400",
  };

  return (
    <div className="w-full min-w-[140px] flex-1">
      <div className="mb-1 flex justify-between text-xs text-emerald-300">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-emerald-950">
        <div
          className={`h-full rounded-full transition-all duration-150 ${colors[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function TouchMeter({ value, zone }: { value: number; zone: number }) {
  return (
    <div className="relative h-8 overflow-hidden rounded-full bg-emerald-950">
      <div
        className="absolute top-0 h-full w-[24%] rounded-full bg-green-400/40"
        style={{ left: `${zone - 12}%` }}
      />
      <div
        className="absolute top-1 h-6 w-3 rounded-full bg-pink-400 shadow-lg transition-all duration-200"
        style={{ left: `${value}%` }}
      />
    </div>
  );
}
