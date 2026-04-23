import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useSlideIn = (
  delay = 0,
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 80
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { stiffness: 180, damping: 22 } });
  const offset = interpolate(progress, [0, 1], [distance, 0]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  const transforms: Record<typeof direction, string> = {
    up: `translateY(${offset}px)`,
    down: `translateY(${-offset}px)`,
    left: `translateX(${offset}px)`,
    right: `translateX(${-offset}px)`,
  };
  return { transform: transforms[direction], opacity };
};

export const useFadeIn = (delay = 0, durationFrames = 20) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity };
};

export const useFadeOut = (startFrame: number, durationFrames = 15) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity };
};

export const useScalePop = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - delay, fps, config: { stiffness: 300, damping: 18, mass: 0.8 } });
  const opacity = interpolate(frame - delay, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return { transform: `scale(${scale})`, opacity };
};

export const usePulse = (delay = 0, amplitude = 0.04, speedMultiplier = 1) => {
  const frame = useCurrentFrame();
  const scale = 1 + Math.sin((frame - delay) * 0.15 * speedMultiplier) * amplitude;
  return { transform: `scale(${scale})` };
};

export const useCountUp = (target: number, startFrame: number, endFrame: number) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(progress * target);
};

// Typewriter: returns how many characters of `text` to show at `frame`
export const useTypewriter = (text: string, startFrame: number, charsPerFrame = 1.5) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
  return text.slice(0, chars);
};
