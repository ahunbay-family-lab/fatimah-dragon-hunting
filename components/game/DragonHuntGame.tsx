"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dragon, DragonColor, GamePhase } from "@/lib/game/types";
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

function uid() {
  return Math.random().toString(36).slice(2, 9);
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
  const [creepProgress, setCreepProgress] = useState(0);
  const [alertLevel, setAlertLevel] = useState(0);
  const [touchZone] = useState(50);
  const [touchIndicator, setTouchIndicator] = useState(0);
  const [trustLevel, setTrustLevel] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [searchProgress, setSearchProgress] = useState(0);
  const [showGift, setShowGift] = useState(false);

  const creepInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeDragon = dragons.find((d) => d.id === activeDragonId) ?? null;
  const usedColors = new Set(dragons.map((d) => d.color));

  const clearTimers = useCallback(() => {
    if (creepInterval.current) clearInterval(creepInterval.current);
    if (touchInterval.current) clearInterval(touchInterval.current);
    if (searchInterval.current) clearInterval(searchInterval.current);
    creepInterval.current = null;
    touchInterval.current = null;
    searchInterval.current = null;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const startExploring = () => {
    clearTimers();
    setPhase("exploring");
    setMessage(STORY.exploring);
    setSearchProgress(0);
    setCreepProgress(0);
    setAlertLevel(0);
    setTrustLevel(0);
    setPendingDragon(null);
  };

  const beginSearch = () => {
    if (searchInterval.current) return;
    searchInterval.current = setInterval(() => {
      setSearchProgress((p) => {
        const next = p + 2;
        if (next >= 100) {
          clearTimers();
          const available = WILD_DRAGON_COLORS.filter((c) => !usedColors.has(c));
          const color =
            available[Math.floor(Math.random() * available.length)] ?? "emerald";
          const id = uid();
          setPendingDragon({ color, id });
          setPhase("creeping");
          setMessage(STORY.creeping);
          setCreepProgress(0);
          setAlertLevel(20);
          return 100;
        }
        return next;
      });
    }, 80);
  };

  const stopSearch = () => {
    if (searchInterval.current) {
      clearInterval(searchInterval.current);
      searchInterval.current = null;
    }
  };

  const startCreeping = () => {
    if (creepInterval.current) return;
    creepInterval.current = setInterval(() => {
      setCreepProgress((p) => {
        const next = Math.min(100, p + 1.5);
        if (next >= 100) {
          clearTimers();
          setPhase("touching");
          setMessage(STORY.touching);
          setTrustLevel(0);
          startTouchGame();
          return 100;
        }
        return next;
      });
      setAlertLevel((a) => {
        const spike = Math.random() < 0.08 ? 25 : -3;
        return Math.max(0, Math.min(100, a + spike));
      });
    }, 60);
  };

  const stopCreeping = () => {
    if (creepInterval.current) {
      clearInterval(creepInterval.current);
      creepInterval.current = null;
    }
  };

  const touchDirectionRef = useRef(1);

  const startTouchGame = () => {
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
        return next;
      });
    }, 40);
  };

  const gentleTouch = () => {
    const inZone = Math.abs(touchIndicator - touchZone) < 12;
    if (inZone) {
      setTrustLevel((m) => {
        const next = m + 20;
        if (next >= 100) {
          clearTimers();
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
  };

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
  };

  const beginMysteryHunt = () => {
    setClueIndex(0);
    setPhase("mysteryHunt");
    setMessage(MYSTERY_CLUES[0].text);
    setSearchProgress(0);
  };

  const followClue = () => {
    if (searchInterval.current) return;
    searchInterval.current = setInterval(() => {
      setSearchProgress((p) => {
        const next = p + 3;
        if (next >= 100) {
          clearTimers();
          setSearchProgress(0);
          if (clueIndex < MYSTERY_CLUES.length - 1) {
            const nextClue = clueIndex + 1;
            setClueIndex(nextClue);
            setMessage(MYSTERY_CLUES[nextClue].text);
          } else {
            setPhase("mysteryFound");
            setMessage(STORY.mysteryFound);
          }
          return 0;
        }
        return next;
      });
    }, 70);
  };

  const stopFollowClue = () => {
    if (searchInterval.current) {
      clearInterval(searchInterval.current);
      searchInterval.current = null;
    }
  };

  const bringToKing = () => {
    setPhase("ending");
    setMessage(STORY.ending);
    setTimeout(() => setShowGift(true), 800);
  };

  const resetGame = () => {
    clearTimers();
    setPhase("intro");
    setDragons([]);
    setActiveDragonId(null);
    setPendingDragon(null);
    setNameInput("");
    setMessage(STORY.intro);
    setCreepProgress(0);
    setAlertLevel(0);
    setTrustLevel(0);
    setClueIndex(0);
    setSearchProgress(0);
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

  return (
    <div className="relative mx-auto flex min-h-[640px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border-4 border-emerald-900/30 shadow-2xl">
      {/* Game viewport */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <JungleBackground variant={bgVariant} />

        {/* Scene characters */}
        <div className="relative z-10 flex h-full items-end justify-center pb-8">
          {phase === "dragonKing" && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <DragonCharacter color="amber" size="king" flying className="drop-shadow-2xl" />
              <p className="mt-2 text-center text-sm font-bold text-amber-200 drop-shadow">
                Dragon King
              </p>
            </div>
          )}

          {phase === "mysteryFound" && (
            <div className="absolute top-16 right-[20%]">
              <DragonCharacter color="mystery" size="md" flying />
            </div>
          )}

          {phase === "ending" && showGift && (
            <div className="absolute top-12 animate-gift-bounce text-6xl">👑</div>
          )}

          {/* Wild dragon during creep/touch */}
          {(phase === "creeping" || phase === "touching") && pendingDragon && (
            <div
              className="absolute transition-all duration-300"
              style={{ right: `${20 - creepProgress * 0.12}%`, bottom: "18%" }}
            >
              <DragonCharacter
                color={pendingDragon.color}
                size="lg"
                facing="left"
              />
              {phase === "touching" && (
                <div className="absolute -right-2 top-8 h-4 w-4 animate-pulse rounded-full bg-pink-300 ring-2 ring-pink-400" />
              )}
            </div>
          )}

          {/* Girl */}
          <div
            className="absolute transition-all duration-500"
            style={{
              left:
                phase === "creeping" || phase === "touching"
                  ? `${15 + creepProgress * 0.35}%`
                  : "45%",
              bottom: isFlying ? "35%" : "12%",
            }}
          >
            {isFlying && activeDragon ? (
              <div className="relative">
                <DragonCharacter
                  color={activeDragon.color}
                  size="lg"
                  flying
                  className="absolute -top-16 -left-8"
                />
                <GirlCharacter riding size="sm" className="relative z-10 ml-8" />
              </div>
            ) : (
              <GirlCharacter
                creeping={phase === "creeping"}
                size="md"
              />
            )}
          </div>

          {/* Sanctuary dragons */}
          {phase === "sanctuary" && (
            <div className="absolute bottom-[20%] flex gap-6">
              {dragons
                .filter((d) => d.atSanctuary)
                .map((d) => (
                  <div key={d.id} className="text-center">
                    <DragonCharacter color={d.color} size="sm" />
                    <p className="text-xs font-semibold text-white drop-shadow">
                      {d.name}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Alert overlay */}
        {phase === "creeping" && alertLevel > 60 && (
          <div className="absolute inset-0 z-20 flex items-start justify-center pt-6">
            <span className="animate-pulse rounded-full bg-red-500/80 px-4 py-1 text-sm font-bold text-white">
              Shhh! The dragon is getting nervous!
            </span>
          </div>
        )}
      </div>

      {/* HUD */}
      <div className="flex flex-1 flex-col gap-4 bg-gradient-to-b from-emerald-950 to-emerald-900 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-extrabold text-emerald-100 sm:text-xl">
            Jungle Dragon Quest
          </h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-emerald-800 px-3 py-1">
              Dragons: {dragons.length}/{MAX_DRAGON_COUNT}
            </span>
          </div>
        </div>

        <p className="min-h-[3rem] text-sm leading-relaxed text-emerald-100/90 sm:text-base">
          {message}
        </p>

        {/* Dragon roster */}
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

        {/* Phase controls */}
        <div className="mt-auto flex flex-wrap gap-3">
          {phase === "intro" && (
            <ActionButton onClick={startExploring}>Begin Adventure</ActionButton>
          )}

          {phase === "exploring" && (
            <>
              <HoldButton onHold={beginSearch} onRelease={stopSearch}>
                Search Jungle
              </HoldButton>
              <ProgressBar label="Searching" value={searchProgress} color="emerald" />
            </>
          )}

          {phase === "creeping" && (
            <>
              <HoldButton onHold={startCreeping} onRelease={stopCreeping}>
                Creep Forward
              </HoldButton>
              <ProgressBar label="Distance" value={creepProgress} color="teal" />
              <ProgressBar label="Alert" value={alertLevel} color="red" />
            </>
          )}

          {phase === "touching" && (
            <>
              <ActionButton onClick={gentleTouch}>Gently Touch Snout</ActionButton>
              <div className="w-full space-y-2">
                <p className="text-xs text-emerald-300">
                  Tap when the marker is in the green zone!
                </p>
                <TouchMeter value={touchIndicator} zone={touchZone} />
                <ProgressBar label="Trust" value={trustLevel} color="pink" />
              </div>
            </>
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
            <ActionButton onClick={continueAfterFirstRide}>
              Fly On!
            </ActionButton>
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
            <ActionButton onClick={continueAfterSanctuary}>
              Find More Dragons
            </ActionButton>
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
            <>
              <HoldButton onHold={followClue} onRelease={stopFollowClue}>
                Follow Clue
              </HoldButton>
              <ProgressBar label="Searching" value={searchProgress} color="violet" />
              <p className="w-full text-xs text-violet-300">
                Hint: {MYSTERY_CLUES[clueIndex].hint}
              </p>
              <p className="text-xs text-emerald-400">
                Clue {clueIndex + 1} of {MYSTERY_CLUES.length}
              </p>
            </>
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

function HoldButton({
  children,
  onHold,
  onRelease,
}: {
  children: React.ReactNode;
  onHold: () => void;
  onRelease: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={onHold}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={onHold}
      onTouchEnd={onRelease}
      className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition active:scale-95"
    >
      {children} (hold)
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
