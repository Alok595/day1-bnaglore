"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Magnetic from "@/components/Magnetic";

const INK = "#0c0a1b";
const BONE = "#fcfeea";
const MUTED = "rgba(167, 168, 207, 0.75)";
const ACCENT = "#00f0ff";
const ACCENT_PURPLE = "#7672ff";
const LINE = "rgba(255, 255, 255, 0.1)";

/** Network nodes + edges, drawn in a 1000x600 canvas and scaled to fill */
const NODES: [number, number][] = [
  [80, 120], [220, 60], [340, 180], [180, 260],
  [520, 90], [640, 200], [760, 110], [880, 220],
  [60, 400], [260, 460], [460, 420], [700, 480],
  [900, 400], [960, 150],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [4, 5], [5, 6], [6, 7],
  [4, 13], [8, 9], [9, 10], [10, 11], [11, 12], [7, 12], [2, 10], [5, 10],
];
const FEATURED = [4, 10, 7];

export interface HeroProps {
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrainOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: "overlay", opacity: 0.04 }}>
      <filter id="hero-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
  );
}

function NetworkLayer() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={NODES[a][0]} y1={NODES[a][1]}
          x2={NODES[b][0]} y2={NODES[b][1]}
          stroke={LINE}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.15 + i * 0.04, ease: "easeInOut" }}
        />
      ))}

      {NODES.map(([x, y], i) => {
        const featured = FEATURED.includes(i);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={featured ? 4 : 2.2} fill={featured ? ACCENT : "rgba(255,255,255,0.3)"} />
            {featured && (
              <motion.circle
                cx={x} cy={y} r={4}
                stroke={ACCENT}
                strokeWidth="1"
                fill="none"
                animate={{ r: [4, 18, 4], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function GridLayer() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
      <defs>
        <pattern id="herodotgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill={BONE} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#herodotgrid)" />
    </svg>
  );
}

function GeoShapes() {
  return (
    <>
      <motion.svg
        className="absolute -top-10 right-[8%] w-40 h-40 sm:w-56 sm:h-56 pointer-events-none"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.35 }}
      >
        <rect x="20" y="20" width="160" height="160" rx="12" stroke={ACCENT} strokeWidth="1" strokeDasharray="6 6" fill="none" />
      </motion.svg>
      <motion.svg
        className="absolute bottom-[6%] left-[6%] w-32 h-32 sm:w-44 sm:h-44 pointer-events-none"
        viewBox="0 0 200 200"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.35 }}
      >
        <circle cx="100" cy="100" r="90" stroke={ACCENT_PURPLE} strokeWidth="1" fill="none" strokeDasharray="4 8" />
      </motion.svg>
    </>
  );
}

/** Animated glowing underline stroke placed beneath "compounds." */
function Underline() {
  return (
    <svg
      viewBox="0 0 160 14"
      className="absolute left-0 -bottom-2 w-full h-3.5 pointer-events-none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 9 C 30 4, 60 12, 90 6 S 140 3, 158 8"
        stroke={ACCENT}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function Hero({ onPrimaryCta, onSecondaryCta }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 20, mass: 0.6 });

  const gridX = useTransform(sx, [0, 1], [-8, 8]);
  const gridY = useTransform(sy, [0, 1], [-8, 8]);
  const netX = useTransform(sx, [0, 1], [-22, 22]);
  const netY = useTransform(sy, [0, 1], [-22, 22]);
  const geoX = useTransform(sx, [0, 1], [16, -16]);
  const geoY = useTransform(sy, [0, 1], [16, -16]);

  const spotlight = useTransform([sx, sy], (latest) => {
    const [x, y] = latest as number[];
    return `radial-gradient(650px circle at ${x * 100}% ${y * 100}%, rgba(0, 240, 255, 0.14), rgba(118, 114, 255, 0.08) 40%, transparent 70%)`;
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-36 pb-20 overflow-hidden"
      style={{ backgroundColor: INK }}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: gridX, y: gridY }}>
        <GridLayer />
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: netX, y: netY }}>
        <NetworkLayer />
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: geoX, y: geoY }}>
        <GeoShapes />
      </motion.div>
      <GrainOverlay />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Eyebrow Badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#00f0ff]/30 backdrop-blur-md text-xs font-semibold text-[#00f0ff] mb-8 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span>Full-Stack Digital Studio &amp; Growth Partner</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.14]"
          style={{ color: BONE }}
        >
          Design that <span className="text-[#00f0ff]">performs</span>.
          <br className="hidden sm:inline" /> Software that <span className="text-[#a855f7]">scales</span>.
          <br className="hidden sm:inline" /> Marketing that{" "}
          <span className="relative inline-block text-white">
            compounds
            <Underline />
          </span>
          .
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed font-normal"
          style={{ color: MUTED }}
        >
          Day One is the single team behind your website, your software, and your growth marketing —
          one studio, one point of accountability, <span className="text-white font-semibold">results you can measure.</span>
        </motion.p>

        {/* Milestone Callout */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-[#00f0ff]/25 backdrop-blur-md text-xs sm:text-sm text-gray-200 mt-7 shadow-[0_0_25px_rgba(0,240,255,0.12)] hover:border-[#00f0ff]/40 transition-colors"
        >
          <span className="flex items-center gap-2 font-bold text-[#00f0ff]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span>300+ Clients</span>
          </span>
          <span className="text-white/25 hidden sm:inline">•</span>
          <span className="text-gray-300 font-medium">
            <span className="text-[#10b981] font-bold">₹3 Cr+</span> Revenue Generated in Performance Marketing
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8"
        >
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={onPrimaryCta}
              className="px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-[#1868e8] via-[#00f0ff] to-[#00f0ff] text-[#0c0a1b] font-sans transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] cursor-pointer shadow-lg shadow-[#00f0ff]/20"
            >
              Get a Free Consultation ↗
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={onSecondaryCta}
              className="group px-8 py-4 rounded-full font-bold text-sm bg-white/[0.04] text-white border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer inline-flex items-center gap-2 backdrop-blur-md"
            >
              <span>View Our Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ChevronIcon />
              </span>
            </button>
          </Magnetic>
        </motion.div>

        {/* Proof Bar */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-8 w-full max-w-4xl mx-auto border-t border-white/10"
        >
          {[
            { value: "300+", label: "Clients Scaled", color: "#00f0ff" },
            { value: "₹3 Cr+", label: "Performance Marketing Revenue", color: "#10b981" },
            { value: "15+", label: "Live Productions", color: "#a855f7" },
            { value: "99.8%", label: "Lighthouse Standard", color: "#38bdf8" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-3 sm:px-4 text-center ${
                i % 2 === 1 ? "border-l border-white/10" : ""
              } ${i > 0 ? "md:border-l md:border-white/10" : ""}`}
            >
              <span style={{ color: stat.color, fontVariantNumeric: "tabular-nums" }} className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                {stat.value}
              </span>
              <span style={{ color: MUTED }} className="text-[0.72rem] sm:text-xs mt-1.5 font-medium leading-tight max-w-[160px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
