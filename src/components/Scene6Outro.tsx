/**
 * Scene 6 — OUTRO / BRAND LOCK  (frames 840–899, 2 s)
 * Full-screen teal with FlowAccount logo centre-staged.
 * Tagline fades in. Subtle ring pulse.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand } from "../brand";
import { useScalePop, useFadeIn } from "../animations";

export const Scene6Outro: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const logo = useScalePop(0);
  const tagFade = useFadeIn(startFrame + 20, 18);

  // Rings emanating out
  const rings = [0, 15, 30].map((d) => {
    const prog = interpolate(local - d, [0, 60], [0.3, 1.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const op = interpolate(local - d, [0, 60], [0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { scale: prog, opacity: op };
  });

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: `linear-gradient(160deg, ${brand.teal} 0%, ${brand.tealDark} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Emanating rings */}
      {rings.map((r, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.6)",
          transform: `scale(${r.scale})`,
          opacity: r.opacity,
        }} />
      ))}

      {/* Corner dots */}
      {[
        { x: 60, y: 120 }, { x: 980, y: 120 },
        { x: 60, y: 1780 }, { x: 980, y: 1780 },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: p.x,
          top: p.y,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
        }} />
      ))}

      {/* Logo */}
      <div style={{ zIndex: 2, textAlign: "center", ...logo }}>
        <div style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontWeight: 900,
          fontSize: 96,
          letterSpacing: -2,
          color: "#fff",
          textShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          <span style={{
            background: "#FFFFFF",
            color: brand.teal,
            borderRadius: 20,
            padding: "4px 24px",
          }}>Flow</span>
          <span style={{ color: "#FFFFFF" }}>Account</span>
        </div>

        {/* Tagline */}
        <div style={{ marginTop: 28, ...tagFade }}>
          <p style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: 50,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            letterSpacing: 1,
          }}>
            บัญชีง่าย · ธุรกิจโต · ไม่มีสะดุด
          </p>
        </div>

        {/* Stars */}
        <div style={{ marginTop: 32, fontSize: 52, letterSpacing: 8, ...useFadeIn(startFrame + 30, 15) }}>
          ⭐⭐⭐⭐⭐
        </div>
      </div>
    </div>
  );
};
