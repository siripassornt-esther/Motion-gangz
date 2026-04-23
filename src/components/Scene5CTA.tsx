/**
 * Scene 5 — CALL TO ACTION  (frames 690–839, 5 s)
 * "ทดลองใช้ฟรี 30 วัน" — bright orange gradient, pulsing button, URL typed on.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand } from "../brand";
import { useTypewriter, useScalePop, usePulse, useSlideIn } from "../animations";

export const Scene5CTA: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const headline1 = useTypewriter("ทดลองใช้ฟรี", startFrame + 8, 2.0);
  const headline2 = useTypewriter("30 วัน!", startFrame + 32, 2.2);
  const subLine = useTypewriter("ไม่ต้องใช้บัตรเครดิต", startFrame + 52, 1.8);
  const url = useTypewriter("flowaccount.com", startFrame + 72, 1.5);

  const badge = useScalePop(15);
  const btnPulse = usePulse(60, 0.05, 1);
  const btnSlide = useSlideIn(60, "up", 40);

  // Confetti particles
  const confetti = [...Array(20)].map((_, i) => {
    const startX = 60 + (i * 53) % 960;
    const fallY = interpolate(local, [0, 150], [0, 400 + (i * 30) % 200], { extrapolateRight: "clamp" });
    const rot = interpolate(local, [0, 150], [0, (i % 2 === 0 ? 360 : -360)], { extrapolateRight: "clamp" });
    const colors = [brand.teal, brand.orange, brand.yellow, "#FF3B30", "#7B61FF"];
    return { startX, fallY, rot, color: colors[i % 5], size: 12 + (i * 7) % 20 };
  });

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: `linear-gradient(155deg, ${brand.orange} 0%, #FF3B30 40%, #C0392B 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      padding: "0 60px",
      boxSizing: "border-box",
    }}>
      {/* Confetti */}
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          left: c.startX,
          top: -20 + c.fallY,
          width: c.size,
          height: c.size,
          background: c.color,
          borderRadius: i % 3 === 0 ? "50%" : 3,
          transform: `rotate(${c.rot}deg)`,
          opacity: 0.8,
        }} />
      ))}

      {/* Starburst behind headline */}
      <div style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${local * 0.3}deg)`,
        border: "2px solid rgba(255,255,255,0.1)",
      }} />

      {/* Free badge */}
      <div style={{ marginBottom: 30, ...badge }}>
        <div style={{
          background: brand.yellow,
          borderRadius: "50%",
          width: 200,
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 12px 48px rgba(255,212,67,0.6)`,
          transform: `rotate(${Math.sin(local * 0.08) * 8}deg)`,
        }}>
          <span style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Segoe UI', sans-serif", color: brand.dark, lineHeight: 1 }}>FREE</span>
          <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", color: brand.dark }}>30 DAYS</span>
        </div>
      </div>

      {/* Headline */}
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <p style={{
          margin: 0,
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 104,
          fontWeight: 900,
          color: "#FFFFFF",
          lineHeight: 1.05,
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          minHeight: 115,
        }}>
          {headline1}
        </p>
        <p style={{
          margin: 0,
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 110,
          fontWeight: 900,
          color: brand.yellow,
          lineHeight: 1.05,
          textShadow: "0 4px 24px rgba(0,0,0,0.3)",
          minHeight: 120,
        }}>
          {headline2}
          <span style={{ opacity: (local % 22 < 11) ? 1 : 0, color: "#fff" }}>|</span>
        </p>

        <p style={{
          margin: "20px 0 0",
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 46,
          color: "rgba(255,255,255,0.85)",
          minHeight: 56,
          ...useSlideIn(52, "up", 30),
        }}>
          {subLine}
        </p>
      </div>

      {/* CTA Button */}
      <div style={{ marginTop: 60, zIndex: 2, ...btnSlide, ...btnPulse }}>
        <div style={{
          background: "#FFFFFF",
          borderRadius: 60,
          padding: "30px 70px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}>
          <p style={{
            margin: 0,
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: brand.orange,
          }}>
            สมัครฟรีเลย →
          </p>
        </div>
      </div>

      {/* URL */}
      <div style={{ marginTop: 40, zIndex: 2, ...useSlideIn(72, "up", 25) }}>
        <p style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 42,
          color: "rgba(255,255,255,0.75)",
          margin: 0,
          letterSpacing: 1,
          minHeight: 50,
        }}>
          🌐 {url}
          {url.length < 15 && <span style={{ opacity: (local % 20 < 10) ? 1 : 0 }}>|</span>}
        </p>
      </div>
    </div>
  );
};
