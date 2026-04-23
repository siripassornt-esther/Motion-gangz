/**
 * Scene 2 — PAIN  (frames 90–239 · 5 s)
 * "บิลหาย · คีย์พลาด · ทำงานซ้ำซ้อน"
 * Each word pops in one by one, frustrated vibe — dark overlay on blue.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand, fontThai } from "../brand";

interface PainItem {
  emoji: string;
  thai: string;
  sub: string;
  color: string;
  localDelay: number;
}

const PAINS: PainItem[] = [
  { emoji: "📂",  thai: "บิลหาย",        sub: "หาเอกสารไม่เจอ ทำงานล่าช้า",     color: "#FF6B6B", localDelay: 15 },
  { emoji: "⌨️", thai: "คีย์พลาด",      sub: "ข้อมูลผิดพลาด ต้องแก้ซ้ำซาก",    color: "#FFB347", localDelay: 65 },
  { emoji: "🔁",  thai: "ทำงานซ้ำซ้อน", sub: "เสียเวลา เสียพลังงานทุกวัน",      color: "#FF5F5F", localDelay: 115 },
];

const PainCard: React.FC<{ item: PainItem; startFrame: number }> = ({ item, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const d = item.localDelay;

  const scale = spring({ frame: local - d, fps, config: { stiffness: 280, damping: 16, mass: 0.9 } });
  const opacity = interpolate(local - d, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Shake every card slightly after pop
  const shakePhase = local - d;
  const shakeX =
    shakePhase >= 0 && shakePhase <= 10
      ? Math.sin(shakePhase * 4) * 8 * interpolate(shakePhase, [0, 10], [1, 0])
      : 0;

  return (
    <div style={{
      transform: `scale(${scale}) translateX(${shakeX}px)`,
      opacity,
      background: "rgba(255,255,255,0.06)",
      border: `2px solid ${item.color}66`,
      borderRadius: 28,
      padding: "38px 44px",
      display: "flex",
      alignItems: "center",
      gap: 30,
      backdropFilter: "blur(4px)",
      boxShadow: `0 8px 40px ${item.color}22`,
    }}>
      <div style={{ fontSize: 68, flexShrink: 0, lineHeight: 1 }}>{item.emoji}</div>
      <div>
        <div style={{
          fontFamily: fontThai, fontSize: 68, fontWeight: 900,
          color: item.color, lineHeight: 1,
          textShadow: `0 0 24px ${item.color}88`,
        }}>
          {item.thai}
        </div>
        <div style={{
          fontFamily: fontThai, fontSize: 36, fontWeight: 400,
          color: "rgba(255,255,255,0.7)", marginTop: 8, lineHeight: 1.3,
        }}>
          {item.sub}
        </div>
      </div>
    </div>
  );
};

export const Scene2Pain: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  // Overall fade in
  const sceneOp = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Header
  const { fps } = useVideoConfig();
  const hP = spring({ frame: local, fps, config: { stiffness: 130, damping: 20 } });
  const hY = interpolate(hP, [0, 1], [-50, 0]);
  const hOp = interpolate(hP, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(180deg, ${brand.dark} 0%, #0D2A40 60%, #0D1520 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      padding: "60px 50px", boxSizing: "border-box",
      opacity: sceneOp,
    }}>
      {/* Red vignette glow at edges */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(255,59,48,0.12) 100%)",
        pointerEvents: "none",
      }} />

      {/* Header label */}
      <div style={{
        transform: `translateY(${hY}px)`, opacity: hOp,
        textAlign: "center", marginBottom: 60, width: "100%",
      }}>
        <div style={{
          display: "inline-block",
          background: `${brand.red}33`,
          border: `2px solid ${brand.red}55`,
          borderRadius: 60, padding: "16px 48px",
        }}>
          <span style={{
            fontFamily: fontThai, fontSize: 44, fontWeight: 700,
            color: brand.red, letterSpacing: 1,
          }}>
            ปัญหาที่เจอทุกวัน...
          </span>
        </div>
      </div>

      {/* Pain cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
        {PAINS.map((p) => (
          <PainCard key={p.thai} item={p} startFrame={startFrame} />
        ))}
      </div>

      {/* Ellipsis dots pulsing at the end */}
      {local >= 135 && (
        <div style={{
          marginTop: 50,
          fontFamily: fontThai, fontSize: 72,
          color: "rgba(255,255,255,0.4)",
          opacity: interpolate(local, [135, 148], [0, 1], { extrapolateRight: "clamp" }),
          letterSpacing: 8,
        }}>
          ...
        </div>
      )}
    </div>
  );
};
