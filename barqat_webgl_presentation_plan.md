# Barqat B2B2C Interactive WebGL Presentation — Implementation Plan

**Locked decisions:** React Three Fiber (R3F) + drei + GSAP · Speechmatics Urdu TTS (pre-generated, cached audio files per beat) · Two user-provided demo videos embedded as modal overlays.

---

## 0. Architecture Summary

- **Two layers, always rendered together:**
  - **WebGL layer** (R3F Canvas): the map — shop, 4 spokes, 1km circle, 12 distributor nodes, routes, particles, camera.
  - **DOM overlay layer** (absolutely positioned React components on top of the Canvas): nav bar + Play button, checklists, labels ("Replenished ✓"), video modal, subtitles, criteria call-outs.
- **One "Scene Script" (JSON/TS array)** drives both layers. A `Director` component walks the script against an `<audio>` element's `currentTime`. Every visual/UI change is just `if (audio.currentTime >= beat.startTime) applyBeat(beat)`.
- **Audio-as-clock**: the Urdu VO audio track is the single source of truth for timing. No separate "wait N seconds" logic anywhere — this keeps visuals perfectly lip/beat-synced even if playback stutters or the user scrubs.
- **State machine**: `idle → playing → paused → beatComplete → sceneComplete`. The Play button in the nav bar starts `idle → playing` at t=0 and is the *only* thing that starts playback (per your spec).

---

## 1. Scene & Asset Inventory

| Asset | Notes |
|---|---|
| Shop node (retail shop icon/simple 3D mesh) | Center of map, color: Primary Green `#00B14F` |
| 12 distributor/warehouse nodes | Ringed around shop at varying distances; each gets an id, label, color-coded by FMCG category if useful |
| Route lines/curves (node → shop) | Bezier curves; animated "flow" particles along them for the replenishment beat |
| 4 spokes + 1km labels | Matches your sketch — N/S/E/W lines with "1km" labels |
| 1km radius circle (B2C coverage) | Thin outline, Maize Yellow `#FFD166` accent, fills in with light green wash when "active" |
| 50km expansion field | Multiple 1km circles appearing across a wider common-route network as camera zooms out |
| "Selected based on P1" arrow + label | Curved annotation arrow, matches your sketch, appears during shop-selection beat |
| Rider icon | For fleetless B2C delivery animation — moves shop→customer point |
| Checklist icon (unchecked/checked states) | Charcoal `#1F2933` text, Primary Green check |
| Barqat logo | Final "Thank You" beat |
| Nav bar + Play button | Fixed top, White `#FFFFFF` bg, Border Gray `#E5E7EB` bottom border |
| Video modal frame | Rounded panel, Light Gray `#F3F4F6` backdrop, Charcoal close icon |

**Color usage rule of thumb:** Primary Green = active/positive states (replenished, checked, selected route). Maize Yellow = attention/annotation (radius boundaries, "selected" arrows, highlights). Charcoal = all body/label text. Gray/Border Gray = inactive nodes, dividers, unselected routes.

---

## 2. Full Storyboard

Each row = one **beat**. `id` is stable so the JSON script and VO audio filenames match 1:1 (`beat_03.mp3`, etc.). Duration is a placeholder — set once real VO audio is recorded/generated (Speechmatics TTS) and you know actual clip lengths.

| # | id | Scene | Visual action | On-screen text | VO line (Urdu — draft, to refine) |
|---|---|---|---|---|---|
| 1 | intro | Nav bar visible, empty canvas | Barqat logo fades in, Play button pulses | "Barqat: B2B2C Execution Plan" | (silent / ambient) |
| 2 | shop_appear | Centralized shop appears | Shop node scales in at center, 2 criteria points slide in beside it | "Shop Selection Criteria" | Intro line framing the two criteria |
| 3 | criteria_1 | Area & early adopters | Camera pushes in slightly; radius ghost-circle pulses once | "1. Area potential for future B2C delivery + Early Adopters" | Explains why area/adopter profile matters |
| 4 | criteria_2 | Common distributor routes | All 12 distributor routes fade in gray, then one route highlights Primary Green with the "Selected based on P1" arrow | "2. Common Distributor Route Analysis" | Explains route-commonality logic, "no extra delivery cost" |
| 5 | tech_transition | Cut to tech stack panel | Overlay panel slides up over map (map dims to 30% opacity behind) | "Technology Integration" | Intro to WhatsApp gateway concept |
| 6 | tech_benefits | WhatsApp gateway benefits | 4 benefit cards stagger in | Ease of Use / Urdu Voice Note / No Retailer Education / Frictionless Onboarding | Explains each benefit briefly |
| 7 | video_1_trigger | Demo video 1 prompt | Video thumbnail + Play button appears | "Watch: WhatsApp Order Demo" | Short lead-in line, then **pause main timeline** |
| 8 | video_2_trigger | Demo video 2 prompt | Second thumbnail + Play button | "Watch: AI Gateway Benefits" | Short lead-in line, then **pause main timeline** |
| 9 | return_main | Return to shop view | Tech panel slides away, map returns to full opacity | — | "Let's return to execution" |
| 10 | checklist_1 | Checklist reveal | Two checklist items check in sequence (Shop setup ✓, Tech stack ✓) | ☑ Shop setup complete / ☑ Tech Stack integrated | Confirms readiness to execute |
| 11 | replenish_routing | 12-node goods routing | Camera pulls back to show all 12 nodes; particles flow from each along their route to shop simultaneously | (node labels appear) | Explains multi-distributor consolidated delivery |
| 12 | replenished | Shop replenished | Green check + "Replenished" label pops on shop node | ✓ Replenished | Wraps up B2B execution |
| 13 | b2b_to_b2c | Transition | Shop zooms/settles; title card "Fleetless B2C Barqat Plan" | "Fleetless B2C Barqat Plan" | Transition VO line |
| 14 | radius_reveal | 1km radius draws | Circle draws outward from shop, fills light Maize wash | "1 Shop = 1km Coverage" | Explains radius coverage concept |
| 15a | fleetless_intro | Rider appears | Rider icon appears at radius edge, no fleet iconography | — | "Barqat owns no delivery vehicles" |
| 15b | fleetless_rider_register | Rider registers & moves in | Rider gets "registered" badge, moves toward shop | — | Independent, self-owned-vehicle riders register with Barqat |
| 15c | fleetless_lock_and_fill | Lock order + fill basket | Order-lock icon on rider, then basket-fill animation at shop | — | Rider locks the incoming order, fills basket at shop |
| 15d | fleetless_deliver | Deliver to customer | Rider moves from shop to destination pin inside radius | Destination pin | Delivers to customer's exact location — payoff beat |
| 16 | lean_strategy | Cost framing | Text overlay only, map dimmed | "Lean Execution: Reduced Cost, Well-Served Customers" | States lean strategy line |
| 17 | tech_ops_team | Merged team statement | Icon pair (tech + ops) merge into one badge near shop | "Merged Tech + Ops: Real-Time Fixes" | Explains dedicated monitoring team |
| 18 | validation | Validation statement | Checklist-style tick on "Model Validated" | "Idea Validated Before Expansion" | Wrap-up validation line |
| 19 | expansion_zoom | Expansion visual | Camera zooms out; additional common-route nodes get selected one by one, each drawing its own 1km circle, up to a 50km field | (running count "X shops live") | Explains scaling logic across common routes |
| 20 | expansion_checklist | Full coverage confirmed | All circles turn solid green, master checklist overlay ticks all items | ☑ All areas covered | Final confirmation line |
| 21 | thank_you | Closing | Map fades, Barqat logo scales in center | "Thank You" | Closing line |

*(This table is the thing to iterate on with your team before locking VO scripts — durations and exact Urdu phrasing should be finalized here first, since everything downstream keys off beat IDs and timing.)*

---

## 3. Scene Script Schema

```ts
type Beat = {
  id: string;                    // stable, matches VO filename beat_<id>.mp3
  startTime: number;             // seconds, derived from cumulative VO durations
  duration: number;              // seconds
  camera?: { position: [number,number,number]; lookAt: [number,number,number]; };
  visualAction?: {
    type: "highlightRoute" | "revealNodes" | "drawCircle" | "flowParticles"
        | "moveRider" | "showLogo" | "dimMap" | "restoreMap";
    payload?: Record<string, any>; // e.g. { nodeIds: [...] } or { radiusKm: 1 }
  };
  overlay?: {
    component: "CriteriaCallout" | "BenefitCards" | "Checklist"
             | "VideoTrigger" | "TitleCard" | "SubtitleBar";
    props?: Record<string, any>;
  };
  voiceover: { file: string; subtitleUrdu: string; subtitleEnglish?: string; };
  pausesTimeline?: boolean;      // true for video_1_trigger / video_2_trigger
};
```

A single `scenes/barqat-b2b2c.ts` file exports `Beat[]`. The `Director` component is generic — it never hardcodes beat logic, only interprets `visualAction.type` and `overlay.component` via a lookup table. This is what makes later edits (re-timing, re-wording, re-ordering) a data change.

---

## 4. Interaction & Nav Spec

- **Play button (nav bar):** only playback trigger. On click: `audioRef.current.play()`, director starts walking beats from `startTime = 0`.
- **Video modals (beats 7, 8):** clicking the in-scene "Play" thumbnail pauses the main VO audio (`pausesTimeline: true` beats), opens a modal `<video>` with your provided file, and on video end (or close) resumes the main audio from where it left off.
- **Checklist reveal:** driven purely by beat `overlay.component: "Checklist"` entries; each item transitions unchecked → checked with a short GSAP scale/opacity pop, staggered ~300ms apart if multiple items in one beat.
- **12 distributor nodes — data shape:**
  ```ts
  type DistributorNode = {
    id: string;
    label: string;
    position: [number, number, number]; // scene-space, laid out procedurally around shop
    routeSelected: boolean; // true for the "common route" node highlighted in beat 4
  };
  ```
  For now these can be arbitrary evenly-spaced positions around the shop (your sketch isn't geographically literal) — real distributor coordinates aren't needed unless you want the map to mimic actual Mansehra/local geography later.
- **Expansion beats (19–20):** reuse the same `DistributorNode`/circle-drawing logic from beats 4/14, just triggered repeatedly with a wider camera framing — no new visual system needed, which keeps the build simpler.

---

## 5. Build Milestones — Ready-to-Use Implementation Prompts

Use these **in order**, each as a fresh prompt to your coding agent (Claude Code or similar). Each assumes the previous milestone's output exists in the repo.

### M1 — Project scaffold + static map
> Set up a Vite + React + TypeScript project with @react-three/fiber, @react-three/drei, and gsap installed. Create a full-screen Canvas with a fixed nav bar overlay (white background, bottom border #E5E7EB) containing a Barqat logo placeholder (left) and a circular Play button (right). In the 3D scene, render a static top-down-ish camera view of: a central shop mesh (green box, label "Retail Shop"), 4 spokes extending N/S/E/W with "1km" text labels (use drei's `Text`), and a faint circle outline at 1km radius. Use the palette: primary green #00B14F, maize yellow #FFD166, charcoal #1F2933, light gray #F3F4F6, border gray #E5E7EB. No animation yet — just get the static composition matching this layout right.

### M2 — Scene Script engine + Director
> Add a `scenes/barqat-b2b2c.ts` file exporting a `Beat[]` array typed per the schema [paste schema from Section 3]. Build a `Director` component that takes an `<audio>` ref and the beat array, and on every `timeupdate` event finds the current beat (by startTime) and calls registered handlers for `visualAction.type` and `overlay.component`. For now, populate the array with 3–4 placeholder beats (silent/short dummy mp3s) covering: shop_appear, criteria_1, criteria_2. Wire the nav bar Play button to start the audio element and thus the Director. Log each beat transition to console so we can verify sync before building real visuals per-beat.

### M3 — 12-node network + route highlight + replenishment particles
> Add 12 `DistributorNode` objects arranged around the shop (per the schema in Section 4). Implement `visualAction.type: "revealNodes"` (fade nodes in with staggered delay), `"highlightRoute"` (turn one node's connecting line + the "Selected based on P1" curved arrow annotation to primary green while others stay border-gray), and `"flowParticles"` (small particle sprites traveling along all 12 route curves toward the shop simultaneously, using GSAP or R3F's `useFrame`). Add the "Replenished ✓" DOM label that pops in over the shop node when triggered.

### M4 — Overlay components: criteria callouts, benefit cards, checklist
> Build the DOM overlay components referenced in the schema: `CriteriaCallout` (text card with a pointer line to a map location), `BenefitCards` (4-card staggered-entrance grid for the WhatsApp gateway benefits), and `Checklist` (list of items that animate from unchecked to checked with green check icon + strike-through-free label). These should be pure presentational components driven by props from the Director, positioned via CSS over the Canvas, respecting the palette (charcoal text, light gray card backgrounds, primary green checks).

### M5 — Video modal system
> Build a `VideoModal` component: full-screen dimmed backdrop, centered rounded video panel, close (X) button. Wire it so that any beat with `pausesTimeline: true` and `overlay.component: "VideoTrigger"` shows an in-scene thumbnail + play icon; clicking it pauses the main VO `<audio>`, opens the modal playing the provided video file, and on video-end or manual close, closes the modal and resumes the main audio from its paused position. Use the two provided video files as placeholders in `/public/videos/`.

### M6 — B2C radius, fleetless rider animation, expansion zoom
> Implement `"drawCircle"` (animated radius draw-out with light maize fill) for the 1km B2C coverage beat. Add a rider icon mesh whose animation is split across four beats (`fleetless_intro`, `fleetless_rider_register`, `fleetless_lock_and_fill`, `fleetless_deliver`) rather than one continuous sequence — each beat handler drives exactly one visual step: appear at radius edge → registered badge + move to shop → lock icon + basket-fill → move to destination pin inside the radius. Driving it as four discrete beats (each with its own short VO clip) keeps word-to-animation sync exact instead of relying on mid-clip timestamp offsets. For the expansion beats, reuse the node/circle system from M3/this milestone to procedurally reveal additional shop+radius clusters as the camera pulls back to a wide framing, finishing with all circles solid green and a full-coverage checklist overlay.

### M7 — VO integration (Speechmatics) + polish
> Replace placeholder audio with real Speechmatics-generated Urdu TTS files per beat (script text finalized from Section 2's storyboard table). Recompute each beat's `startTime`/`duration` from actual audio file lengths (a small build script reading audio metadata is fine). Add subtitle bar overlay showing `voiceover.subtitleUrdu` synced to playback. Final visual QA pass against the color palette and timing; add a scrub/skip-beat control for rehearsal purposes (not required for the live exec presentation, just useful for your team while testing).

---

## Open items before you start recording VO / finalizing beats

- **Exact Urdu script per beat** — the lines above are placeholders/glosses; these need to be written out in full Urdu before Speechmatics generation, since beat timing depends on final audio length.
- **Real vs. illustrative geography** — confirm the 12 distributor nodes and expansion nodes are illustrative (not tied to real Mansehra coordinates) — this doc assumes illustrative.
- **Presentation runtime target** — worth deciding an approximate total minutes for the full B2B2C arc, since it affects how much detail each beat's VO can carry in front of executives.
