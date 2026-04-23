/**
 * Scene 3 — FEATURE HIGHLIGHTS  (frames 300–509, 7 s)
 * Three feature cards slide in one-by-one with typed-on labels.
 * Background: white with teal strip on left edge.
 */
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { useTypewriter } from "../animations";

interface Feature {
  icon: string;
  title: string;
  desc: string;
  color: string;
  delay: number;
}

const FEATURES: Feature[] = [
  { icon: "📄", title: "ออกใบแจ้งหนี้", desc: "ใน 3 คลิก — ส่ง PDF ทันที", color: brand.teal, delay: 0 },
  { icon: "💸", title: "บันทึกค่าใช้จ่าย", desc: "ถ่ายรูปใบเสร็จ → บันทึกอัตโนมัติ", color: brand.orange, delay: 55 },
  { icon: "📊", title: "รายงานภาษี", desc: "ภ.พ.30 ครบ พร้อมยื่นสรรพากร", color: "#7B61FF", delay: 110 },
];

const FeatureCard: React.FC<{ feature: Feature; startFrame: number }> = ({ feature, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const cardDelay = feature.delay;

  const slideX = interpolate(
    spring({ frame: local - cardDelay, fps, config: { stiffness: 160, damping: 22 } }),
    [0, 1], [-360, 0]
  );
  const opacity = interpolate(local - cardDelay, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const title = useTypewriter(feature.title, startFrame + cardDelay + 8, 2.0);
  const desc = useTypewriter(feature.desc, startFrame + cardDelay + 22, 1.8);

  return (
    <div style={{
      transform: `translateX(${slideX}px)`,
      opacity,
      display: "flex",
      alignItems: "center",
      gap: 30,
      background: "#FFFFFF",
      borderRadius: 28,
      padding: "36px 44px",
      boxShadow: `0 8px 36px ${feature.color}22`,
      border: `3px solid ${feature.color}33`,
      width: "100%",
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: 24,
        background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}44)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 54,
        flexShrink: 0,
        border: `2px solid ${feature.color}55`,
      }}>
        {feature.icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 52,
          fontWeight: 800,
          color: feature.color,
          minHeight: 62,
        }}>
          {title}
          {title.length < feature.title.length && (
            <span style={{ opacity: (frame % 20 < 10) ? 1 : 0 }}>|</span>
          )}
        </p>
        <p style={{
          margin: "8px 0 0",
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 36,
          color: "#555",
          minHeight: 44,
          lineHeight: 1.3,
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export const Scene3Features: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const headerText = useTypewriter("ทำได้ทุกอย่าง", startFrame, 2.2);
  const headerSub = useTypewriter("ในที่เดียว ⚡", startFrame + 30, 2.2);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: brand.grey,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "60px 50px",
      boxSizing: "border-box",
    }}>
      {/* Teal left bar */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 18,
        height: "100%",
        background: `linear-gradient(180deg, ${brand.teal}, ${brand.orange})`,
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: 60,
        width: "100%",
      }}>
        <p style={{
          margin: 0,
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 80,
          fontWeight: 900,
          color: brand.dark,
          lineHeight: 1.1,
          minHeight: 95,
        }}>
          {headerText}
        </p>
        <p style={{
          margin: "8px 0 0",
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 80,
          fontWeight: 900,
          color: brand.teal,
          lineHeight: 1.1,
          minHeight: 95,
        }}>
          {headerSub}
        </p>
      </div>

      {/* Feature cards */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        width: "100%",
        paddingLeft: 30,
      }}>
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} startFrame={startFrame} />
        ))}
      </div>
    </div>
  );
};
