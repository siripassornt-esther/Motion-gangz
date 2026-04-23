/**
 * Scene 2 — SOLUTION INTRO  (frames 150–299, 5 s)
 * FlowAccount logo + tagline "บัญชีออนไลน์ที่ใช้งานง่าย"
 * White background, teal splash, logo pops in, tagline types on.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand } from "../brand";
import { useTypewriter, useSlideIn, useScalePop } from "../animations";

const FlowLogo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    fontFamily: "'Segoe UI', sans-serif",
    fontWeight: 900,
    fontSize: 90,
    letterSpacing: -3,
    display: "flex",
    alignItems: "center",
    gap: 12,
    ...style,
  }}>
    <span style={{
      background: `linear-gradient(135deg, ${brand.teal}, ${brand.tealDark})`,
      borderRadius: 24,
      color: "#fff",
      padding: "8px 28px",
      boxShadow: "0 8px 32px rgba(0,194,168,0.4)",
    }}>Flow</span>
    <span style={{ color: brand.dark }}>Account</span>
  </div>
);

export const Scene2Intro: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  // Teal wave sweep from bottom
  const waveY = interpolate(
    spring({ frame: local, fps, config: { stiffness: 50, damping: 20 } }),
    [0, 1], [1920, 0]
  );

  const logo = useScalePop(20);
  const tagline = useTypewriter("บัญชีออนไลน์ที่ใช้งานง่าย", startFrame + 35, 1.6);
  const sub = useSlideIn(55, "up", 50);

  // Sparkle particles
  const sparkles = [
    { x: 180, y: 700, delay: 25 },
    { x: 880, y: 820, delay: 35 },
    { x: 540, y: 520, delay: 45 },
    { x: 760, y: 1200, delay: 30 },
    { x: 140, y: 1100, delay: 40 },
  ];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#FFFFFF",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Teal wave sweeping in from bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: `${Math.max(0, 1920 - waveY)}px`,
        background: `linear-gradient(180deg, ${brand.teal}22 0%, ${brand.teal}44 100%)`,
        borderRadius: "60% 60% 0 0 / 20% 20% 0 0",
      }} />

      {/* Sparkles */}
      {sparkles.map((s, i) => {
        const scl = spring({ frame: local - s.delay, fps, config: { stiffness: 400, damping: 12 } });
        const op = interpolate(local - s.delay, [0, 8, 20, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 40,
            height: 40,
            transform: `scale(${scl}) rotate(45deg)`,
            opacity: op,
            fontSize: 36,
          }}>✦</div>
        );
      })}

      {/* Logo */}
      <div style={{ marginBottom: 48, ...logo }}>
        <FlowLogo />
      </div>

      {/* Tagline typed-on */}
      <div style={{ textAlign: "center", padding: "0 60px", minHeight: 130 }}>
        <p style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 68,
          fontWeight: 800,
          color: brand.dark,
          margin: 0,
          lineHeight: 1.2,
        }}>
          {tagline}
          <span style={{ opacity: (local % 25 < 13) ? 1 : 0, color: brand.teal }}>|</span>
        </p>
      </div>

      {/* Sub */}
      <div style={{ marginTop: 36, textAlign: "center", padding: "0 80px", ...sub }}>
        <p style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 44,
          color: "#666",
          margin: 0,
          lineHeight: 1.4,
        }}>
          โปรแกรมบัญชีที่ SME ไทยไว้ใจ
        </p>
      </div>

      {/* Arrow pointing down */}
      <div style={{
        marginTop: 80,
        fontSize: 70,
        ...useSlideIn(65, "up", 40),
        animation: "none",
      }}>
        ↓
      </div>
    </div>
  );
};
