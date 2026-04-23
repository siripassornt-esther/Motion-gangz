/**
 * AutokeyReel — 30-second Instagram Reel (1080×1920 @ 30 fps)
 *
 * Scene map (exact from storyboard.md):
 *   Scene 1  Hook        frames   0–89    (0–3 s)
 *   Scene 2  Pain        frames  90–239   (3–8 s)
 *   Scene 3  Solution    frames 240–359   (8–12 s)
 *   Scene 4  Features    frames 360–599   (12–20 s)
 *   Scene 5  Emotional   frames 600–749   (20–25 s)
 *   Scene 6  CTA         frames 750–899   (25–30 s)
 */
import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { Scene1Hook }      from "./components/Scene1Hook";
import { Scene2Pain }      from "./components/Scene2Pain";
import { Scene3Solution }  from "./components/Scene3Solution";
import { Scene4Features }  from "./components/Scene4Features";
import { Scene5Emotional } from "./components/Scene5Emotional";
import { Scene6CTA }       from "./components/Scene6CTA";

const SCENES = [
  { Component: Scene1Hook,      start: 0,   end: 89  },
  { Component: Scene2Pain,      start: 90,  end: 239 },
  { Component: Scene3Solution,  start: 240, end: 359 },
  { Component: Scene4Features,  start: 360, end: 599 },
  { Component: Scene5Emotional, start: 600, end: 749 },
  { Component: Scene6CTA,       start: 750, end: 899 },
] as const;

const FADE = 10; // cross-fade frames at each boundary

const sceneOpacity = (frame: number, start: number, end: number) =>
  Math.min(
    interpolate(frame, [start, start + FADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [end - FADE, end],     [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

export const FlowAccountReel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {SCENES.map(({ Component, start, end }) => {
        if (frame < start - FADE || frame > end + FADE) return null;
        return (
          <AbsoluteFill key={start} style={{ opacity: sceneOpacity(frame, start, end) }}>
            <Component startFrame={start} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
