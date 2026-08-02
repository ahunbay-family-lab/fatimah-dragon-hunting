# Jungle Dragon Quest — Game Design & Build Plan

This is the single source of truth for the game we're building in this repo. If
you are an AI assistant (or a human!) picking this project back up in a new
session, **read this file before making changes** — it captures everything we
agreed on, plus exactly which phase we're on.

Built by a 10-year-old, with an AI teammate. Keep explanations simple, keep
wins frequent, keep it fun.

---

## The Pitch

A curious little girl explores a jungle, following clues (footprints,
rustling bushes, distant roars...) to track down dragons. When she finds one,
she sneaks close and gently touches its snout to become friends, then names
it. After befriending 5 dragons, she picks one to ride and heads to the
Dragon King's volcano, leaving the other 4 tied safely at camp. The King
assigns her one last challenge: track down a Mystery Dragon using trickier
clues. Deliver it, and she wins an award and unlocks the next (harder) level.

**Important twist:** the girl herself is never shown on screen. The camera is
first-person — the player *is* her — and the jungle scene itself changes as
she moves, rather than watching a character walk around a map.

There's a 30-minute timer per run. Run out of time and it's game over — but
points earned always add to a lifetime total, so every attempt is worth it.

---

## Target audience & tone

- Kids **12 and under**. Bright, cheerful, storybook-cartoon visuals — never
  scary. Dragons are friendly-looking (big eyes, curious expressions), even
  when "roaring" it should read as goofy, not threatening.
- Mistakes should feel fun, not punishing (wrong path = silly dead end +
  small time cost, not a failure state).
- Big, chunky, touch-friendly buttons (44px+ tall). Works on a tablet.

---

## Core mechanics

### 1. Navigation — first-person "spot to spot" exploration

No free-roam map, no visible character sprite. The world is a network of
**scenes** (a clearing, a riverbank, a hollow log...). Each scene shows:

- An illustrated background
- Short narration / clue text
- 2-3 choices to move to the next scene (big buttons **and** arrow-key
  support — Up/primary = forward, Left/Right = alternate paths)

Picking a choice swaps the scene, simulating "walking there."

### 2. Clue trails (the detective mechanic)

Each wild dragon has a **3-step clue trail** of increasing intensity:

1. **Faint sign** — vague direction (footprints, a broken branch)
2. **Medium sign** — narrows it down (rustling bush, distant roar)
3. **Strong sign** — you're right on top of it (heavy breathing, glowing
   eyes in the dark) → triggers the encounter

Each dragon gets a **distinct clue theme** so the 5 hunts feel different:

| Dragon | Clue theme |
|---|---|
| 1 | Footprints & broken branches (ground clues) |
| 2 | Rustling bushes & swaying leaves (movement clues) |
| 3 | Roars & growls (sound clues) |
| 4 | Shimmering scales / steam in the air (visual clues) |
| 5 | Scratch marks on trees (territorial clues) |

Wrong choices lead to a **friendly dead end** (funny flavor text, e.g. "just
a sleepy frog"), a small time penalty, then loop back — never a hard fail.

The **Mystery Dragon** (assigned by the Dragon King) gets a longer, trickier
**4-5 step trail** with rarer clue types (ash footprints, a shadow at the
crater's edge, shimmering mist) to make it feel climactic.

### 3. Befriending mini-game

Two-step encounter, reframed first-person (dragon fills the screen, no girl
sprite):

1. **Sneak phase** — an alertness meter; approach carefully or the dragon
   gets spooked and you back off and re-approach.
2. **Touch phase** — a timing mini-game: a marker moves back and forth, tap
   at the right moment to gently touch the snout, building trust over a few
   good hits.

Once trust maxes out → **naming screen** (text input, she names her new
friend).

### 4. Camp / basecamp

A cozy screen showing all befriended dragons resting together (with their
names). Appears between hunts. After the 5th dragon, it becomes the
**choose-your-mount** screen — pick one dragon to ride to the volcano; the
other 4 are shown tied up safely at camp.

### 5. Dragon King & Mystery Dragon quest

Arriving at the volcano triggers a short King dialogue (skippable on
replay), then he assigns the Mystery Dragon hunt (see clue trails above).
Delivering the Mystery Dragon triggers the **Award ceremony** — the win
screen (crown, confetti, celebration).

### 6. Timer & lose condition

A visible **30-minute countdown** starts the moment "Begin Adventure" is
clicked, and runs continuously regardless of what phase of the hunt you're
in. Hitting zero at any point → friendly **"Time's Up!"** results screen
(not scary — shows what was accomplished). Delivering the Mystery Dragon
before time runs out → win screen.

### 7. Scoring & meta-progression

Two separate concepts:

- **Session score** — points earned this run only.
- **Lifetime score** — session score is always added to a persistent total
  (stored in the browser via `localStorage`), **whether you win or lose**.
  Shown on the title screen so replay always feels rewarding.

| Event | Points |
|---|---|
| Discover a clue (any step) | 5 |
| Correct path choice | 5 |
| Befriend + name a dragon | 50 |
| Complete all 5 wild dragons | 100 (bonus) |
| Find & deliver the Mystery Dragon | 150 |
| Receive the King's Award (win the run) | 200 + time bonus |

### 8. Levels

Winning a run unlocks the next level (saved in `localStorage`). Later levels
scale difficulty via: more dragons required, shorter/tighter timers,
trickier clue trails with more dead ends, new dragon colors/themes, and
eventually new twists (weather, rival explorers, etc.).

**Scope for v0: Level 1 only.** Level 2+ content is designed later, once
Level 1 is fully playable and fun. The data model should leave room for a
`level` field, but we are not building Level 2 content yet.

### Controls

- **Primary: click / tap** (mobile-friendly, matches "no visible character").
- **Also supported: arrow keys** (Up = forward/primary choice, Left/Right =
  alternate choices) as a bonus input method.

### Art direction

**Bright, storybook-cartoon illustration style** — not photorealistic.
Flat/vector shapes, bold saturated colors, soft rounded edges, expressive
friendly dragon faces with big eyes. Chunky rounded UI, friendly font, lots
of whitespace. Celebratory feedback (sparkles/confetti) on success, gentle
bounce-back on mistakes.

We draw scenes and characters as **hand-coded SVG/CSS** (like the existing
`DragonCharacter` component) rather than AI-generated raster images. This
keeps everything editable — a 10-year-old can open the file and tweak a
color or shape and immediately see the result, which fits the "teach as you
go" mission of this project far better than opaque image files.

---

## Existing code (pre-redesign prototype)

`components/game/DragonHuntGame.tsx`, `Characters.tsx`, and `lib/game/*`
contain an earlier prototype built before this design was finalized. It has
a visible walking girl sprite and free-roam arrow-key movement on a 2D map —
**this does not match the final design** (girl should never be visible;
movement should be scene-to-scene, not free-roam). Reusable pieces (the
`DragonCharacter` SVG art style, the sneak/touch-snout mini-game concept, the
naming flow, the sanctuary idea, the Dragon King mystery hunt structure) will
be adapted into the new phased build rather than thrown away. Expect this
file to be significantly refactored/replaced across the phases below.

---

## Phased build plan

Each phase ends with something visually fun to click through and show off —
no "invisible plumbing only" phases. Build and review one phase at a time.

- [x] **Phase 1 — Title Screen & Jungle Look** 🌴
      Illustrated cartoon jungle title screen, logo, dragon mascot, "Begin
      Adventure" button. Zero game logic — pure visual foundation.
- [x] **Phase 2 — Walk Through the Jungle** 🥾
      First-person scene navigation shell (click + arrow keys), 2-3 connected
      placeholder scenes proving the "jungle changes as you walk" trick works.
- [ ] **Phase 3 — Follow the Clues** 🐾
      Full clue trail for the first wild dragon (footprints → rustling →
      close), ending in the dragon's first on-screen reveal.
- [ ] **Phase 4 — Make Friends With Your First Dragon** 🐉💛
      Sneak-closer + gentle-touch-snout mini-game with juicy feedback, then
      the naming screen.
- [ ] **Phase 5 — Collect All 5 Dragon Friends + Camp** 🏕️
      Generalize the hunt loop to all 5 dragon themes; build the camp scene.
- [ ] **Phase 6 — Fly to the Dragon King** 🌋👑
      Choose-your-mount screen, journey transition, volcano scene, King
      reveal and dialogue.
- [ ] **Phase 7 — The Mystery Dragon Quest & Victory** ✨🏆
      Longer mystery clue trail, Mystery Dragon reveal, delivery, Award
      ceremony/win screen.
- [ ] **Phase 8 — Beat the Clock** ⏳
      30-minute countdown HUD with visual drama as time runs low, friendly
      "Time's Up!" results screen.
- [ ] **Phase 9 — Score, Sparkles & Trophies** 🌟
      Point events wired to the table above, floating "+10" feedback,
      lifetime score persisted via `localStorage` and shown on the title
      screen.
- [ ] **Phase 10 — Final Polish & Playtest Party** 🎉
      Smooth transitions, mobile/tablet check, full family playtest of both
      win and lose paths, `npm run lint` + `npm run build` clean, README
      updated.

**v0 = Phases 1-10 complete, Level 1 only.** Level 2+ difficulty scaling is
future work, designed after v0 is played and enjoyed.

Update the checkboxes above as phases are completed so any new session can
see progress at a glance.
