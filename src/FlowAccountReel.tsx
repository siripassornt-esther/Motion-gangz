/**
 * FlowAccountReel — 30-second Instagram Reel (1080×1920 @ 30 fps)
 *
 * Scene map:
 *  Scene 1  Hook          frames   0–149   (5 s)
 *  Scene 2  Intro         frames 150–299   (5 s)
 *  Scene 3  Features      frames 300–509   (7 s)
 *  Scene 4  Stats         frames 510–689   (6 s)
 *  Scene 5  CTA           frames 690–839   (5 s)
 *  Scene 6  Outro         frames 840–899   (2 s)
 *
 * Scenes are composited with a 15-frame cross-fade at each boundary.
 */
import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { Scene1Hook } from "./components/Scene1Hook";
import { Scene2Intro } from "./components/Scene2Intro";
import { Scene3Features } from "./components/Scene3Features";
import { Scene4Stats } from "./components/Scene4Stats";
import { Scene5CTA } from "./components/Scene5CTA";
import { Scene6Outro } from "./components/Scene6Outro";

const SCENES = [
  { Component: Scene1Hook,     start: 0,   end: 149 },
  { Component: Scene2Intro,    start: 150, end: 299 },
  { Component: Scene3Features, start: 300, end: 509 },
  { Component: Scene4Stats,    start: 510, end: 689 },
  { Component: Scene5CTA,      start: 690, end: 839 },
  { Component: Scene6Outro,    start: 840, end: 899 },
];

const FADE = 15; // cross-fade duration in frames

const sceneOpacity = (frame: number, start: number, end: number): number => {
  const fadeIn  = interpolate(frame, [start, start + FADE],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [end - FADE, end],      [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
};

export const FlowAccountReel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {SCENES.map(({ Component, start, end }) => {
        const visible = frame >= start - FADE && frame <= end + FADE;
        if (!visible) return null;
        const opacity = sceneOpacity(frame, start, end);
        return (
          <AbsoluteFill key={start} style={{ opacity }}>
            <Component startFrame={start} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
