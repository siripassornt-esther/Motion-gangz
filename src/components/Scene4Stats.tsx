/**
 * Scene 4 — SOCIAL PROOF / STATS  (frames 510–689, 6 s)
 * Animated counter "30,000+" businesses trust FlowAccount.
 * Dark teal background, large glowing numbers, star ratings.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand } from "../brand";
import { useCountUp, useSlideIn, useFadeIn } from "../animations";

const STATS = [
  { value: 30000, suffix: "+", label: "ธุรกิจที่ไว้ใจ", icon: "🏢", delay: 10 },
  { value: 99, suffix: "%", label: "พึงพอใจในการใช้งาน", icon: "⭐", delay: 40 },
  { value: 5, suffix: " ล้าน+", label: "เอกสารที่ออกแล้ว", icon: "📄", delay: 70 },
];

const StatItem: React.FC<{
  stat: (typeof STATS)[0];
  startFrame: number;
}> = ({ stat, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const slideY = interpolate(
    spring({ frame: local - stat.delay, fps, config: { stiffness: 140, damping: 20 } }),
    [0, 1], [60, 0]
  );
  const opacity = interpolate(local - stat.delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const count = useCountUp(
    stat.value,
    startFrame + stat.delay,
    startFrame + stat.delay + 50
  );

  const formatted =
    stat.value >= 1000
      ? (count / 1000).toFixed(count < stat.value ? 1 : 0) + "K"
      : String(count);

  return (
    <div style={{
      transform: `translateY(${slideY}px)`,
      opacity,
      background: "rgba(255,255,255,0.08)",
      borderRadius: 32,
      padding: "44px 40px",
      border: "2px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 64, marginBottom: 8 }}>{stat.icon}</div>
      <div style={{
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: 96,
        fontWeight: 900,
        color: "#FFFFFF",
        lineHeight: 1,
        textShadow: `0 0 40px ${brand.teal}88`,
        letterSpacing: -2,
      }}>
        {formatted}{stat.suffix}
      </div>
      <div style={{
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: 38,
        color: "rgba(255,255,255,0.75)",
        marginTop: 12,
        lineHeight: 1.3,
      }}>
        {stat.label}
      </div>
    </div>
  );
};

export const Scene4Stats: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const header = useFadeIn(startFrame, 20);
  const headSlide = useSlideIn(0, "up", 50);

  // Animated background gradient shift
  const gradAngle = interpolate(local, [0, 180], [135, 195], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: `linear-gradient(${gradAngle}deg, ${brand.dark} 0%, #0D4F45 50%, ${brand.tealDark} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 50px",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Glowing orbs */}
      {[{ x: 100, y: 400, r: 300 }, { x: 800, y: 1400, r: 250 }].map((o, i) => (
        <div key={i} style={{
          position: "absolute",
          left: o.x - o.r,
          top: o.y - o.r,
          width: o.r * 2,
          height: o.r * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.teal}33 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 70, ...header, ...headSlide }}>
        <p style={{
          margin: 0,
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 56,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}>
          ตัวเลขที่พิสูจน์ตัวเอง
        </p>
        <p style={{
          margin: "12px 0 0",
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 84,
          fontWeight: 900,
          color: brand.yellow,
          lineHeight: 1.1,
          textShadow: "0 4px 24px rgba(255,212,67,0.5)",
        }}>
          FlowAccount
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        width: "100%",
      }}>
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} startFrame={startFrame} />
        ))}
      </div>
    </div>
  );
};
