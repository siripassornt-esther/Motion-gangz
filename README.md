# FlowAccount Instagram Reel — Remotion Project

30-second vertical Instagram Reel (1080 × 1920 @ 30 fps) built with **Remotion 4**.

## Quick Start

```bash
npm install
npm start          # Opens Remotion Studio at http://localhost:3000
```

## Render to MP4

```bash
npm run render     # Outputs out/FlowAccountReel.mp4  (H.264, CRF 18)
```

## Grab a Still

```bash
npm run still      # Saves out/preview.png at frame 0
```

## Project Structure

```
src/
  index.ts                 Remotion entry point
  Root.tsx                 Registers <FlowAccountReel> composition
  FlowAccountReel.tsx      Main composition — orchestrates all scenes
  animations.ts            Reusable animation hooks
  brand.ts                 Colour palette & font tokens
  components/
    Scene1Hook.tsx          00:00–00:05  Hook / problem statement
    Scene2Intro.tsx         00:05–00:10  FlowAccount solution intro
    Scene3Features.tsx      00:10–00:17  Three feature cards
    Scene4Stats.tsx         00:17–00:23  Social proof / counter stats
    Scene5CTA.tsx           00:23–00:28  Free trial call to action
    Scene6Outro.tsx         00:28–00:30  Brand lock-up outro
STORYBOARD.md              Full scene-by-scene script & visual notes
```

## Customising Content

| What to change | File |
|---|---|
| Colours | `src/brand.ts` |
| Scene text | Individual `src/components/Scene*.tsx` |
| Timing | `src/FlowAccountReel.tsx` — `SCENES` array |
| Animation feel | `src/animations.ts` — spring configs |
| Composition size / fps | `src/Root.tsx` |
