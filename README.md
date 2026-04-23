# Autokey AI — Instagram Reel (FlowAccount)

30-second vertical Instagram Reel · **1080 × 1920** · **30 fps** · built with **Remotion 4**

Product: **Autokey AI** — OCR auto-scan feature by FlowAccount  
Brand: Blue `#0082C8` / Light Blue `#00B4D8` · Fonts: Prompt (Thai) + Inter (English)

---

## Quick Start

```bash
npm install
npm start          # Remotion Studio  →  http://localhost:3000
```

## Render

```bash
npm run render     # → out/AutokeyReel.mp4  (H.264, CRF 18)
npm run still      # → out/preview.png  (frame 0)
```

## Scene Map

| # | Scene | Frames | Time | Storyboard |
|---|---|---|---|---|
| 1 | **Hook** | 0–89 | 0–3 s | "2025 แล้ว ยังพิมพ์เองอยู่?" — typed-on with red highlight |
| 2 | **Pain** | 90–239 | 3–8 s | บิลหาย · คีย์พลาด · ทำงานซ้ำซ้อน — pop-in one by one |
| 3 | **Solution** | 240–359 | 8–12 s | Phone scanning doc with AI scan-line, typed-on "เพียงสแกนบิลด้วย AI Autokey" |
| 4 | **Features** | 360–599 | 12–20 s | Checklist: OCR · เก็บบิล · ลงบัญชีอัตโนมัติ — tick draw animation |
| 5 | **Emotional** | 600–749 | 20–25 s | Accountant + business owner handshake, warm uplifting copy |
| 6 | **CTA** | 750–899 | 25–30 s | White BG, real logo, Autokey badge, green "เริ่มต้นฟรีเลย →" button |

## Project Structure

```
public/
  logo.png                 FlowAccount logo (served by Remotion)
src/
  index.ts                 Remotion entry point
  Root.tsx                 Font loading + composition registration
  FlowAccountReel.tsx      Master composition — scene orchestration & cross-fades
  animations.ts            Reusable hooks: spring slide, typewriter, scale-pop, pulse…
  brand.ts                 Colour tokens + font family strings
  components/
    Scene1Hook.tsx
    Scene2Pain.tsx
    Scene3Solution.tsx
    Scene4Features.tsx
    Scene5Emotional.tsx
    Scene6CTA.tsx
brand.md                   Brand guide (source of truth)
storyboard.md              Scene-by-scene script (source of truth)
```
