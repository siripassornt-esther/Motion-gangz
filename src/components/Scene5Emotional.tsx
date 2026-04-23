/**
 * Scene 5 — EMOTIONAL  (frames 600–749 · 5 s)
 * "นักบัญชีและผู้ประกอบการ ทำงานร่วมกันได้ง่ายขึ้น"
 * Warm, uplifting tone shift — softer blue gradient, people icons, radiant glow.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand, fontThai, fontEnglish } from "../brand";
import { useTypewriter, useCursor, useFadeIn } from "../animations";

const PersonCard: React.FC<{
  emoji: string;
  role: string;
  color: string;
  delay: number;
  side: "left" | "right";
}> = ({ emoji, role, color, delay, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sc = spring({ frame: frame - delay, fps, config: { stiffness: 180, damping: 20 } });
  const x = interpolate(sc, [0, 1], [side === "left" ? -200 : 200, 0]);
  const op = interpolate(sc, [0, 0.35], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      transform: `translateX(${x}px)`, opacity: op,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 160, height: 160,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `3px solid ${color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 80,
        boxShadow: `0 8px 32px ${color}44`,
      }}>
        {emoji}
      </div>
      <div style={{
        fontFamily: fontThai, fontSize: 38, fontWeight: 700, color: color,
        textAlign: "center", lineHeight: 1.2,
      }}>
        {role}
      </div>
    </div>
  );
};

export const Scene5Emotional: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const sceneOp = interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Radiant background pulse
  const glow = 1 + Math.sin(local * 0.08) * 0.15;

  const heartP = spring({ frame: local - 45, fps, config: { stiffness: 300, damping: 14, mass: 0.7 } });
  const heartScale = heartP;
  const heartOp = interpolate(local - 45, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const line1 = useTypewriter("นักบัญชีและผู้ประกอบการ", startFrame + 55, 1.6);
  const line2 = useTypewriter("ทำงานร่วมกันได้ง่ายขึ้น", startFrame + 90, 1.6);
  const cursor = useCursor(18);

  const subFade = useFadeIn(startFrame + 110, 20);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `radial-gradient(ellipse at 50% 40%, ${brand.lightBlue}66 0%, ${brand.blue} 60%, #005A8E 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      padding: "60px 50px", boxSizing: "border-box",
      opacity: sceneOp,
    }}>
      {/* Soft radiant orb */}
      <div style={{
        position: "absolute",
        width: 700, height: 700,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,255,255,${0.07 * glow}) 0%, transparent 70%)`,
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* People with connecting line */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: 0, marginBottom: 60, width: "100%",
        justifyContent: "space-around",
      }}>
        <PersonCard emoji="👩‍💼" role={"นักบัญชี"} color={brand.lightBlue} delay={startFrame + 10} side="left" />

        {/* Heart + connecting line in the middle */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <div style={{
            transform: `scale(${heartScale})`, opacity: heartOp,
            fontSize: 64,
          }}>
            🤝
          </div>
          <div style={{
            width: 100, height: 3,
            background: `linear-gradient(90deg, ${brand.lightBlue}, ${brand.white}44, ${brand.green})`,
            borderRadius: 2,
            opacity: heartOp,
          }} />
        </div>

        <PersonCard emoji="👨‍💻" role={"ผู้ประกอบการ"} color={brand.green} delay={startFrame + 20} side="right" />
      </div>

      {/* Headline typed on */}
      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <div style={{
          fontFamily: fontThai, fontSize: 66, fontWeight: 900,
          color: brand.white, lineHeight: 1.2, minHeight: 78,
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          {line1}
        </div>
        <div style={{
          fontFamily: fontThai, fontSize: 66, fontWeight: 900,
          color: brand.yellow || "#FFD443",
          lineHeight: 1.2, minHeight: 78,
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          {line2}
          {line2.length < 22 && (
            <span style={{ opacity: cursor ? 1 : 0, color: brand.white }}>|</span>
          )}
        </div>
      </div>

      {/* Sub text */}
      <div style={{ marginTop: 40, textAlign: "center", ...subFade }}>
        <div style={{
          background: "rgba(255,255,255,0.12)",
          borderRadius: 60, padding: "18px 50px",
          border: "1.5px solid rgba(255,255,255,0.2)",
        }}>
          <span style={{
            fontFamily: fontThai, fontSize: 40, fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
          }}>
            ✨ ข้อมูลถูกต้อง · เร็วขึ้น · มั่นใจมากขึ้น
          </span>
        </div>
      </div>
    </div>
  );
};
