import React from "react";
import { Composition } from "remotion";
import { FlowAccountReel } from "./FlowAccountReel";

// 30s × 30fps = 900 frames  |  Instagram Reel: 1080×1920
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="FlowAccountReel"
        component={FlowAccountReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
