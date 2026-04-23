/**
 * Scene 1 — HOOK  (frames 0–89 · 3 s)
 * "2025 แล้ว ยังพิมพ์เองอยู่?"
 * Bright blue bg. Line 1 types on normally, line 2 types on with red highlight box.
 */
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { brand, fontThai } from "../brand";
import { useTypewriter, useCursor } from "../animations";

// Floating digit decoration
const FloatDigit: React.FC<{ x: number; y: number; val: string; delay: number }> = ({ x, y, val, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = interpolate(
    spring({ frame: frame - delay, fps, config: { stiffness: 120, damping: 18 } }),
    [0, 1], [0, 0.18]
  );
  const drift = Math.sin((frame + delay * 7) * 0.04) * 14;
  return (
    <div style={{
      position: "absolute", left: x, top: y + drift,
      fontFamily: fontThai, fontSize: 64, fontWeight: 900,
      color: brand.white, opacity: op, userSelect: "none",
    }}>{val}</div>
  );
};

export const Scene1Hook: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  // Full scene fade in
  const sceneOp = interpolate(local, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // Line 1: "2025 แล้ว" — types on starting at local 5
  const line1 = useTypewriter("2025 แล้ว", startFrame + 5, 2.2);

  // Line 2: "ยังพิมพ์เองอยู่?" — types on starting at local 20
  const line2 = useTypewriter("ยังพิมพ์เองอยู่?", startFrame + 20, 1.8);
  const cursor = useCursor(18);

  // Red highlight behind line 2 — expands as text types on
  const hlWidth = interpolate(
    line2.length, [0, 16], [0, 880],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const hlOp = interpolate(local, [20, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Sub-text slide up after line 2 finishes
  const subP = spring({ frame: local - 52, fps, config: { stiffness: 160, damping: 22 } });
  const subY = interpolate(subP, [0, 1], [50, 0]);
  const subOp = interpolate(subP, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  // Energetic shake on the "?" reveal
  const shakeX = local >= 38 && local <= 46
    ? Math.sin((local - 38) * 3) * 7 * interpolate(local, [38, 46], [1, 0])
    : 0;

  const floatItems = [
    { x: 40,  y: 200,  val: "📑", delay: 2  },
    { x: 870, y: 350,  val: "⌨️", delay: 8  },
    { x: 60,  y: 1500, val: "🗂️", delay: 5  },
    { x: 860, y: 1400, val: "📋", delay: 12 },
    { x: 450, y: 120,  val: "✍️", delay: 6  },
  ];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(160deg, ${brand.blue} 0%, ${brand.lightBlue} 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      opacity: sceneOp,
    }}>
      {/* Decorative floaters */}
      {floatItems.map((f, i) => <FloatDigit key={i} {...f} />)}

      {/* Grid lines (subtle) */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: 0, top: (i + 1) * (1920 / 7),
          width: "100%", height: 1,
          background: "rgba(255,255,255,0.07)",
        }} />
      ))}

      {/* Text block */}
      <div style={{
        transform: `translateX(${shakeX}px)`,
        padding: "0 60px", textAlign: "center", zIndex: 2,
      }}>
        {/* Line 1 */}
        <div style={{
          fontFamily: fontThai, fontSize: 112, fontWeight: 900,
          color: brand.white, lineHeight: 1.1,
          letterSpacing: -1, minHeight: 125,
          textShadow: "0 4px 24px rgba(0,0,0,0.25)",
        }}>
          {line1}
        </div>

        {/* Line 2 with red highlight */}
        <div style={{ position: "relative", marginTop: 12, display: "inline-block" }}>
          {/* Red highlight bar */}
          <div style={{
            position: "absolute",
            left: "50%", transform: "translateX(-50%)",
            top: "50%", marginTop: -52,
            width: hlWidth, height: 110,
            background: brand.red,
            borderRadius: 16,
            opacity: hlOp,
            transition: "width 0.05s",
            zIndex: 0,
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            fontFamily: fontThai, fontSize: 112, fontWeight: 900,
            color: brand.white, lineHeight: 1.1,
            letterSpacing: -1, minHeight: 125,
            textShadow: "0 4px 24px rgba(0,0,0,0.35)",
            whiteSpace: "nowrap",
          }}>
            {line2}
            {line2.length < 16 && (
              <span style={{ opacity: cursor ? 1 : 0, color: "rgba(255,255,255,0.9)" }}>|</span>
            )}
          </div>
        </div>

        {/* Sub-text */}
        <div style={{
          transform: `translateY(${subY}px)`,
          opacity: subOp,
          marginTop: 48,
        }}>
          <div style={{
            fontFamily: fontThai, fontSize: 50, fontWeight: 600,
            color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
          }}>
            ยังคีย์ข้อมูลด้วยมือทุกวันอยู่ไหม?
          </div>
        </div>
      </div>
    </div>
  );
};
