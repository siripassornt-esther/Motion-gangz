/**
 * Scene 3 — SOLUTION REVEAL  (frames 240–359 · 4 s)
 * "เพียงสแกนบิลด้วย AI Autokey"
 * Phone scanning a document — CSS scan-line animation, typed-on headline.
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { brand, fontThai, fontEnglish } from "../brand";
import { useTypewriter, useCursor, useScalePop } from "../animations";

// Phone frame with a document inside + animated scan line
const ScanPhone: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();
  // Phone slides up from below
  const phoneP = spring({ frame: localFrame, fps, config: { stiffness: 100, damping: 20 } });
  const phoneY = interpolate(phoneP, [0, 1], [600, 0]);
  const phoneOp = interpolate(phoneP, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  // Scan line sweeps from top to bottom of document, looping
  const scanProgress = ((localFrame * 1.8) % 100) / 100;
  const scanY = interpolate(scanProgress, [0, 1], [0, 280]);

  // Corner brackets animate in
  const cornersOp = interpolate(localFrame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // OCR dots appearing along scan path
  const dotCount = Math.min(8, Math.floor(localFrame / 8));

  return (
    <div style={{
      transform: `translateY(${phoneY}px)`,
      opacity: phoneOp,
      position: "relative",
    }}>
      {/* Phone body */}
      <div style={{
        width: 340, height: 600,
        background: brand.dark,
        borderRadius: 44,
        padding: "28px 20px",
        boxSizing: "border-box",
        boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.1)`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Phone notch */}
        <div style={{
          width: 100, height: 18, background: brand.dark,
          borderRadius: 10, margin: "0 auto 16px",
          position: "relative", zIndex: 5,
        }} />

        {/* Document area */}
        <div style={{
          background: "#F8F9FA",
          borderRadius: 16,
          height: 420,
          position: "relative",
          overflow: "hidden",
          padding: 16,
        }}>
          {/* Document lines */}
          {[0,1,2,3,4,5,6,7].map((i) => (
            <div key={i} style={{
              height: 10, borderRadius: 5,
              background: i === 0 ? "#CBD5E1" : "#E2E8F0",
              marginBottom: 14,
              width: i === 0 ? "70%" : i % 3 === 0 ? "55%" : "90%",
            }} />
          ))}

          {/* Scanning line */}
          <div style={{
            position: "absolute",
            left: 0, right: 0,
            top: scanY,
            height: 3,
            background: `linear-gradient(90deg, transparent 0%, ${brand.blue} 20%, ${brand.lightBlue} 50%, ${brand.blue} 80%, transparent 100%)`,
            boxShadow: `0 0 12px ${brand.lightBlue}`,
          }} />

          {/* Glow above scan line */}
          <div style={{
            position: "absolute",
            left: 0, right: 0,
            top: scanY - 20,
            height: 24,
            background: `linear-gradient(180deg, transparent, ${brand.lightBlue}22, transparent)`,
          }} />

          {/* Corner brackets */}
          {[
            { top: 0, left: 0,   bTop: 3, bLeft: 3, bRight: 0, bBottom: 0 },
            { top: 0, right: 0,  bTop: 3, bRight: 3, bLeft: 0, bBottom: 0 },
            { bottom: 0, left: 0,  bBottom: 3, bLeft: 3, bTop: 0, bRight: 0 },
            { bottom: 0, right: 0, bBottom: 3, bRight: 3, bTop: 0, bLeft: 0 },
          ].map((corner, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 28, height: 28, opacity: cornersOp,
              ...Object.fromEntries(
                Object.entries(corner).filter(([k]) => !k.startsWith("b")).map(([k,v]) => [k, v])
              ),
              borderTopWidth: corner.bTop, borderLeftWidth: corner.bLeft,
              borderRightWidth: corner.bRight, borderBottomWidth: corner.bBottom,
              borderTopColor: corner.bTop ? brand.lightBlue : "transparent",
              borderLeftColor: corner.bLeft ? brand.lightBlue : "transparent",
              borderRightColor: corner.bRight ? brand.lightBlue : "transparent",
              borderBottomColor: corner.bBottom ? brand.lightBlue : "transparent",
              borderStyle: "solid",
            }} />
          ))}

          {/* OCR detected text badges */}
          {[...Array(dotCount)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: 10 + (i * 37) % 260,
              top: 20 + (i * 53) % 350,
              background: `${brand.blue}22`,
              border: `1px solid ${brand.blue}66`,
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 10,
              fontFamily: fontEnglish,
              color: brand.blue,
              whiteSpace: "nowrap",
            }}>
              {["inv", "date", "total", "tax", "฿ 4,200", "vendor", "TH001", "VAT"][i % 8]}
            </div>
          ))}
        </div>
      </div>

      {/* AI badge floating beside phone */}
      <div style={{
        position: "absolute",
        right: -80, top: 80,
        opacity: interpolate(localFrame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `scale(${interpolate(localFrame, [20, 35], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
      }}>
        <div style={{
          background: brand.blue,
          borderRadius: 20,
          padding: "14px 22px",
          textAlign: "center",
          boxShadow: `0 8px 28px ${brand.blue}66`,
        }}>
          <div style={{ fontFamily: fontEnglish, fontSize: 28, fontWeight: 900, color: brand.white }}>AI</div>
          <div style={{ fontFamily: fontThai, fontSize: 18, color: "rgba(255,255,255,0.8)" }}>OCR</div>
        </div>
        <div style={{
          width: 0, height: 0,
          borderTop: "12px solid transparent",
          borderBottom: "12px solid transparent",
          borderRight: `16px solid ${brand.blue}`,
          position: "absolute", left: -16, top: 20,
        }} />
      </div>
    </div>
  );
};

export const Scene3Solution: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const sceneOp = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const headline = useTypewriter("เพียงสแกนบิลด้วย", startFrame + 22, 1.9);
  const headline2 = useTypewriter("AI Autokey", startFrame + 46, 1.9);
  const cursor = useCursor(18);

  const subP = spring({ frame: local - 65, fps, config: { stiffness: 140, damping: 20 } });
  const subY = interpolate(subP, [0, 1], [40, 0]);
  const subOp = interpolate(subP, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(180deg, ${brand.white} 0%, ${brand.grey} 60%, ${brand.lightBlue}22 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      padding: "60px 50px", boxSizing: "border-box",
      opacity: sceneOp,
    }}>
      {/* Top label */}
      <div style={{
        marginBottom: 50,
        opacity: interpolate(local, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        <div style={{
          background: `${brand.blue}18`,
          border: `2px solid ${brand.blue}44`,
          borderRadius: 60, padding: "14px 44px",
        }}>
          <span style={{
            fontFamily: fontThai, fontSize: 40, fontWeight: 700, color: brand.blue,
          }}>
            วิธีแก้ปัญหา ✨
          </span>
        </div>
      </div>

      {/* Phone mockup */}
      <ScanPhone localFrame={local} />

      {/* Headline typed on */}
      <div style={{ marginTop: 60, textAlign: "center" }}>
        <div style={{
          fontFamily: fontThai, fontSize: 72, fontWeight: 900,
          color: brand.dark, lineHeight: 1.15, minHeight: 84,
        }}>
          {headline}
        </div>
        <div style={{
          fontFamily: fontEnglish, fontSize: 84, fontWeight: 900,
          color: brand.blue, lineHeight: 1.1, minHeight: 96,
          textShadow: `0 4px 24px ${brand.blue}55`,
        }}>
          {headline2}
          {headline2.length < 10 && (
            <span style={{ opacity: cursor ? 1 : 0, color: brand.lightBlue }}>|</span>
          )}
        </div>

        <div style={{
          transform: `translateY(${subY}px)`, opacity: subOp,
          fontFamily: fontThai, fontSize: 40, fontWeight: 400,
          color: "#666", marginTop: 16, lineHeight: 1.4,
        }}>
          แค่ถ่ายรูป · AI อ่านให้เอง · บันทึกทันที
        </div>
      </div>
    </div>
  );
};
