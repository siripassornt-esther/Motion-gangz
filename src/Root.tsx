import React from "react";
import { Composition } from "remotion";
import { FlowAccountReel } from "./FlowAccountReel";
import { loadFont as loadPrompt } from "@remotion/google-fonts/Prompt";
import { loadFont as loadInter }  from "@remotion/google-fonts/Inter";

// Preload fonts so Remotion waits for them before rendering frames
loadPrompt("normal", { weights: ["400", "700", "900"], subsets: ["thai", "latin"] });
loadInter("normal",  { weights: ["400", "700", "900"], subsets: ["latin"] });

// 30 s × 30 fps = 900 frames  |  Instagram Reel: 1080 × 1920
export const Root: React.FC = () => (
  <Composition
    id="AutokeyReel"
    component={FlowAccountReel}
    durationInFrames={900}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{}}
  />
);
