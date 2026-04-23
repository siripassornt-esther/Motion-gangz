/**
 * Scene 6 — CTA  (frames 750–899 · 5 s)
 * "ทดลองใช้ฟรี 30 วัน" — clean white BG, FlowAccount logo + Autokey badge,
 * green CTA button, energetic spring-in elements.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { brand, fontThai, fontEnglish } from "../brand";
import { useScalePop, usePulse, useSlideIn, useFadeIn } from "../animations";

const AutokeyBadge: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10,
    background: brand.blue,
    borderRadius: 60, padding: "12px 32px",
    boxShadow: `0 6px 24px ${brand.blue}55`,
    ...style,
  }}>
    <span style={{ fontSize: 28 }}>🤖</span>
    <span style={{ fontFamily: fontEnglish, fontSize: 36, fontWeight: 900, color: brand.white }}>Autokey AI</span>
    <span style={{
      background: "rgba(255,255,255,0.25)",
      borderRadius: 20, padding: "3px 12px",
      fontFamily: fontEnglish, fontSize: 22, fontWeight: 700, color: brand.white,
    }}>NEW</span>
  </div>
);

export const Scene6CTA: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const sceneOp = interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Logo slides down from top
  const logoP = spring({ frame: local, fps, config: { stiffness: 120, damping: 20 } });
  const logoY = interpolate(logoP, [0, 1], [-120, 0]);
  const logoOp = interpolate(logoP, [0, 0.35], [0, 1], { extrapolateRight: "clamp" });

  const badge = useScalePop(18);
  const headlineSlide = useSlideIn(28, "up", 60);
  const subSlide = useSlideIn(40, "up", 50);
  const btnPulse = usePulse(60, 0.04);
  const btnSlide = useSlideIn(52, "up", 40);
  const notesFade = useFadeIn(startFrame + 80, 20);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: brand.white,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      padding: "60px 60px", boxSizing: "border-box",
      opacity: sceneOp,
    }}>
      {/* Subtle blue gradient at top and bottom */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 300,
        background: `linear-gradient(180deg, ${brand.blue}0A 0%, transparent 100%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: `linear-gradient(0deg, ${brand.green}0A 0%, transparent 100%)`,
        pointerEvents: "none",
      }} />

      {/* FlowAccount logo (real PNG) */}
      <div style={{
        transform: `translateY(${logoY}px)`, opacity: logoOp,
        marginBottom: 32,
      }}>
        <img
          src={staticFile("logo.png")}
          style={{ width: 320, height: "auto", objectFit: "contain" }}
          alt="FlowAccount"
        />
      </div>

      {/* Autokey badge */}
      <div style={{ marginBottom: 48, ...badge }}>
        <AutokeyBadge />
      </div>

      {/* Divider */}
      <div style={{
        width: 120, height: 4,
        background: `linear-gradient(90deg, ${brand.blue}, ${brand.lightBlue})`,
        borderRadius: 2, marginBottom: 48,
        opacity: interpolate(local, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }} />

      {/* Headline */}
      <div style={{ textAlign: "center", ...headlineSlide, marginBottom: 12 }}>
        <div style={{
          fontFamily: fontThai, fontSize: 76, fontWeight: 900,
          color: brand.dark, lineHeight: 1.1,
        }}>
          ทดลองใช้ฟรี
        </div>
        <div style={{
          fontFamily: fontThai, fontSize: 96, fontWeight: 900,
          color: brand.blue, lineHeight: 1.0,
          textShadow: `0 4px 20px ${brand.blue}44`,
        }}>
          30 วัน
        </div>
      </div>

      {/* Sub */}
      <div style={{ textAlign: "center", marginBottom: 56, ...subSlide }}>
        <div style={{
          fontFamily: fontThai, fontSize: 42, fontWeight: 500,
          color: "#666", lineHeight: 1.4,
        }}>
          ไม่ต้องใช้บัตรเครดิต · ยกเลิกได้ทุกเมื่อ
        </div>
      </div>

      {/* Green CTA button */}
      <div style={{ ...btnSlide, ...btnPulse, width: "100%" }}>
        <div style={{
          background: `linear-gradient(135deg, ${brand.green} 0%, ${brand.greenDark} 100%)`,
          borderRadius: 28,
          padding: "36px 60px",
          textAlign: "center",
          boxShadow: `0 12px 40px ${brand.green}55`,
          width: "100%",
          boxSizing: "border-box",
        }}>
          <div style={{
            fontFamily: fontThai, fontSize: 58, fontWeight: 900,
            color: brand.white, lineHeight: 1,
          }}>
            เริ่มต้นฟรีเลย →
          </div>
          <div style={{
            fontFamily: fontEnglish, fontSize: 34, fontWeight: 600,
            color: "rgba(255,255,255,0.85)", marginTop: 8,
          }}>
            flowaccount.com
          </div>
        </div>
      </div>

      {/* Fine print */}
      <div style={{ marginTop: 40, textAlign: "center", ...notesFade }}>
        <div style={{
          fontFamily: fontThai, fontSize: 32, color: "#AAA", lineHeight: 1.5,
        }}>
          ⭐⭐⭐⭐⭐  ·  ความพึงพอใจ 99%  ·  30,000+ ธุรกิจ
        </div>
      </div>
    </div>
  );
};
