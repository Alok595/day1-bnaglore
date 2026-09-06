"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, input, textarea, .service-card, .team-card, .work-row, [role='button']");
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Glow / Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          backgroundColor: isHovered
            ? "rgba(0, 240, 255, 0.14)"
            : "rgba(24, 104, 232, 0.08)",
          borderColor: isHovered
            ? "rgba(0, 240, 255, 0.65)"
            : "rgba(167, 168, 207, 0.35)",
          borderWidth: isHovered ? 1.5 : 1,
          scale: isClicking ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-cyan-400"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          scale: isClicking ? 1.4 : 1,
          backgroundColor: isHovered ? "#00f0ff" : "#ffffff",
          boxShadow: isHovered
            ? "0 0 10px rgba(0, 240, 255, 0.8)"
            : "0 0 6px rgba(255, 255, 255, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
