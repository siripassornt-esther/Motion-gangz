/**
 * Scene 4 — FEATURES  (frames 360–599 · 8 s)
 * Three checklist items appear one by one with tick animation.
 * - OCR อ่านเอกสารได้แม่นยำ
 * - เก็บทุกบิลไว้ในที่เดียว
 * - ลงบัญชีอัตโนมัติ
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand, fontThai, fontEnglish } from "../brand";

interface CheckItem {
  icon: string;
  title: string;
  sub: string;
  accentColor: string;
  localDelay: number;
}

const ITEMS: CheckItem[] = [
  {
    icon: "🔍",
    title: "OCR อ่านเอกสารได้แม่นยำ",
    sub: "รองรับใบกำกับภาษี · ใบเสร็จ · ใบแจ้งหนี้",
    accentColor: brand.blue,
    localDelay: 15,
  },
  {
    icon: "🗄️",
    title: "เก็บทุกบิลไว้ในที่เดียว",
    sub: "ค้นหาง่าย · ไม่มีหาย · เข้าถึงได้ทุกที่",
    accentColor: "#7B61FF",
    localDelay: 80,
  },
  {
    icon: "⚡",
    title: "ลงบัญชีอัตโนมัติ",
    sub: "ข้อมูลไหลเข้า FlowAccount ทันที ไม่ต้องคีย์",
    accentColor: brand.green,
    localDelay: 145,
  },
];

// Animated checkmark circle: draws from 0% to 100% as a CSS clip
const Checkmark: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
  const size = 88;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (1 - Math.min(1, progress));

  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      position: "relative", display: "flex",
      alignItems: "center", justifyContent: "center",
    }}>
      <svg width={size} height={size} style={{ position: "absolute" }}>
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" stroke={`${color}22`} strokeWidth={5} />
        {/* Progress arc */}
        <circle cx={size/2} cy={size/2} r={r}
          fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
      {/* Tick appears when progress > 0.7 */}
      <span style={{
        fontSize: 38,
        opacity: interpolateOpacity(progress, 0.65, 0.9),
        transition: "opacity 0.1s",
      }}>✓</span>
    </div>
  );
};

function interpolateOpacity(p: number, lo: number, hi: number) {
  if (p < lo) return 0;
  if (p > hi) return 1;
  return (p - lo) / (hi - lo);
}

const CheckCard: React.FC<{ item: CheckItem; startFrame: number }> = ({ item, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const d = item.localDelay;

  // Slide-in
  const slideP = spring({ frame: local - d, fps, config: { stiffness: 150, damping: 22 } });
  const slideX = interpolate(slideP, [0, 1], [-400, 0]);
  const opacity = interpolate(local - d, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Checkmark draw progress
  const checkProgress = interpolate(local - d, [5, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text reveal after check starts
  const textOp = interpolate(local - d, [18, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textX = interpolate(local - d, [18, 36], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      transform: `translateX(${slideX}px)`, opacity,
      display: "flex", alignItems: "center", gap: 28,
      background: brand.white,
      borderRadius: 28,
      padding: "32px 36px",
      boxShadow: `0 6px 32px ${item.accentColor}18`,
      border: `2.5px solid ${item.accentColor}33`,
    }}>
      <Checkmark progress={checkProgress} color={item.accentColor} />
      <div style={{ transform: `translateX(${textX}px)`, opacity: textOp, flex: 1 }}>
        <div style={{
          fontFamily: fontThai, fontSize: 52, fontWeight: 800,
          color: brand.dark, lineHeight: 1.15,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </div>
        <div style={{
          fontFamily: fontThai, fontSize: 34, fontWeight: 400,
          color: "#666", marginTop: 8, lineHeight: 1.4,
        }}>
          {item.sub}
        </div>
      </div>
    </div>
  );
};

export const Scene4Features: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const sceneOp = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const hP = spring({ frame: local, fps, config: { stiffness: 120, damping: 20 } });
  const hY = interpolate(hP, [0, 1], [-60, 0]);
  const hOp = interpolate(hP, [0, 0.35], [0, 1], { extrapolateRight: "clamp" });

  // "Autokey AI" badge pop
  const badgeP = spring({ frame: local - 5, fps, config: { stiffness: 260, damping: 18 } });
  const badgeScale = badgeP;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(155deg, #EEF6FF 0%, #F0FAFF 60%, ${brand.lightBlue}22 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      padding: "60px 50px", boxSizing: "border-box",
      opacity: sceneOp,
    }}>
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: 14, height: "100%",
        background: `linear-gradient(180deg, ${brand.blue}, ${brand.lightBlue}, ${brand.green})`,
      }} />

      {/* Header */}
      <div style={{
        transform: `translateY(${hY}px)`, opacity: hOp,
        textAlign: "center", marginBottom: 52, width: "100%",
      }}>
        <div style={{
          transform: `scale(${badgeScale})`,
          display: "inline-flex", alignItems: "center", gap: 16,
          background: brand.blue,
          borderRadius: 60, padding: "16px 48px",
          boxShadow: `0 8px 32px ${brand.blue}44`,
        }}>
          <span style={{ fontFamily: fontEnglish, fontSize: 36, fontWeight: 900, color: brand.white }}>Autokey AI</span>
          <span style={{ fontFamily: fontThai, fontSize: 36, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>ทำให้คุณ...</span>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%", paddingLeft: 16 }}>
        {ITEMS.map((item) => (
          <CheckCard key={item.title} item={item} startFrame={startFrame} />
        ))}
      </div>

      {/* Bottom tagline */}
      {local >= 165 && (
        <div style={{
          marginTop: 44,
          opacity: interpolate(local, [165, 190], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(local, [165, 185], [20, 0], { extrapolateRight: "clamp" })}px)`,
          textAlign: "center",
        }}>
          <span style={{
            fontFamily: fontThai, fontSize: 42, fontWeight: 700,
            color: brand.blue,
          }}>
            ✦ ประหยัดเวลาได้หลายชั่วโมงต่อวัน ✦
          </span>
        </div>
      )}
    </div>
  );
};
