import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useSlideIn = (
  delay = 0,
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 70
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { stiffness: 180, damping: 22 } });
  const offset = interpolate(p, [0, 1], [distance, 0]);
  const opacity = interpolate(p, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const map: Record<typeof direction, string> = {
    up:    `translateY(${offset}px)`,
    down:  `translateY(${-offset}px)`,
    left:  `translateX(${offset}px)`,
    right: `translateX(${-offset}px)`,
  };
  return { transform: map[direction], opacity };
};

export const useFadeIn = (delay = 0, dur = 20) => {
  const frame = useCurrentFrame();
  return {
    opacity: interpolate(frame - delay, [0, dur], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  };
};

export const useScalePop = (delay = 0, stiffness = 300, damping = 18) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - delay, fps, config: { stiffness, damping, mass: 0.8 } });
  const opacity = interpolate(frame - delay, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { transform: `scale(${scale})`, opacity };
};

export const useCountUp = (target: number, startFrame: number, endFrame: number) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(p * target);
};

// Returns visible slice of text based on elapsed frames
export const useTypewriter = (text: string, startFrame: number, cps = 1.8) => {
  const frame = useCurrentFrame();
  const chars = Math.min(text.length, Math.floor(Math.max(0, frame - startFrame) * cps));
  return text.slice(0, chars);
};

export const usePulse = (delay = 0, amp = 0.04) => {
  const frame = useCurrentFrame();
  const scale = 1 + Math.sin((frame - delay) * 0.14) * amp;
  return { transform: `scale(${scale})` };
};

// Blinking cursor — true when cursor should be visible
export const useCursor = (blinkRate = 20) => {
  const frame = useCurrentFrame();
  return frame % blinkRate < blinkRate / 2;
};
