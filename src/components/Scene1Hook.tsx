/**
 * Scene 1 — HOOK  (frames 0–149, 5 s)
 * "คุณยังทำบัญชีด้วยมือ?"  typed on a bright yellow burst background.
 * Sub-text slides in, then a red X stamp pops to signal "there's a better way".
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand } from "../brand";
import { useTypewriter, useSlideIn, useFadeIn, useScalePop } from "../animations";

const BG_CIRCLES = [
  { cx: 200, cy: 300, r: 380, color: brand.yellow },
  { cx: 900, cy: 1700, r: 280, color: brand.orange },
  { cx: 1000, cy: 400, r: 180, color: brand.teal },
];

export const Scene1Hook: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  // Background scale-in
  const bgScale = spring({ frame: local, fps, config: { stiffness: 60, damping: 18 } });
  const bgOpacity = interpolate(local, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const line1 = useTypewriter("คุณยังทำบัญชี", startFrame + 10, 1.8);
  const line2 = useTypewriter("ด้วยมือ? ✋", startFrame + 35, 1.8);
  const sub = useSlideIn(40, "up", 60);
  const badge = useScalePop(70);

  // Shake on the "?" moment
  const shakeX = local >= 48 && local <= 58
    ? Math.sin((local - 48) * 2.5) * 6
    : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, ${brand.yellow} 0%, #FFB347 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative circles */}
      {BG_CIRCLES.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.cx - c.r,
            top: c.cy - c.r,
            width: c.r * 2,
            height: c.r * 2,
            borderRadius: "50%",
            background: c.color,
            opacity: bgOpacity * 0.18,
            transform: `scale(${bgScale})`,
          }}
        />
      ))}

      {/* Floating dots */}
      {[...Array(12)].map((_, i) => {
        const x = 80 + (i * 87) % 920;
        const y = 100 + (i * 143) % 1720;
        const size = 8 + (i * 13) % 24;
        const anim = interpolate(Math.sin((local * 0.05 + i * 0.9)), [-1, 1], [-8, 8]);
        return (
          <div key={i} style={{
            position: "absolute",
            left: x,
            top: y + anim,
            width: size,
            height: size,
            borderRadius: "50%",
            background: i % 2 === 0 ? brand.teal : brand.orange,
            opacity: 0.35,
          }} />
        );
      })}

      {/* Main text block */}
      <div
        style={{
          transform: `translateX(${shakeX}px)`,
          textAlign: "center",
          padding: "0 60px",
          zIndex: 2,
        }}
      >
        <div style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 108,
          fontWeight: 900,
          color: brand.dark,
          lineHeight: 1.1,
          letterSpacing: -2,
          minHeight: 120,
        }}>
          {line1}
          <span style={{ display: "block" }}>{line2}</span>
        </div>

        <div style={{ marginTop: 40, ...sub }}>
          <p style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: 52,
            color: brand.dark,
            opacity: 0.75,
            margin: 0,
            lineHeight: 1.35,
          }}>
            เสียเวลา · ยุ่งยาก · เหนื่อยใจ
          </p>
        </div>

        {/* Red X badge */}
        <div style={{ marginTop: 60, display: "flex", justifyContent: "center", ...badge }}>
          <div style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "#FF3B30",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 40px rgba(255,59,48,0.45)",
          }}>
            <span style={{ fontSize: 90, color: "#fff", lineHeight: 1 }}>✕</span>
          </div>
        </div>
      </div>
    </div>
  );
};
