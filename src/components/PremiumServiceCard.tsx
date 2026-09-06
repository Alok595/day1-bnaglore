"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumServiceCardProps {
  index: number;
  tag: string;
  title: string;
  desc: string;
  imageSrc?: string;
  deliverables: string[];
  metrics: string;
  accentColor: string;
  onKnowMore: () => void;
}

const INK_2 = "#101119";
const BONE = "#F3F1EA";
const MUTED = "rgba(243,241,234,0.6)";
const LINE = "rgba(255,255,255,0.08)";

/** A small signal node echoing the hero's network motif — the card's one signature detail. */
function SignalGlyph({ color, active }: { color: string; active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="2.6" fill={color} />
      <motion.circle
        cx="14" cy="14" r="2.6"
        stroke={color}
        strokeWidth="1"
        fill="none"
        animate={{ r: active ? [4, 12, 4] : 4, opacity: active ? [0.6, 0, 0.6] : 0.35 }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Bar-and-arrowhead that draws itself in on hover, instead of a rotating stock icon. */
function ArrowGlyph({ active }: { active: boolean }) {
  return (
    <svg width="30" height="16" viewBox="0 0 30 16" fill="none">
      <motion.path
        d="M1 8H23"
        stroke={BONE}
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0.55, opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.path
        d="M17 2L23 8L17 14"
        stroke={BONE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ x: active ? 4 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}

function DotGrid() {
  const id = React.useId();
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
      <defs>
        <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={BONE} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function PremiumServiceCard({
  index,
  tag,
  title,
  desc,
  imageSrc,
  deliverables,
  metrics,
  accentColor,
  onKnowMore,
}: PremiumServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const no = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onKnowMore}
      className="group relative min-h-[420px] w-full rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between p-6"
      style={{
        backgroundColor: INK_2,
        border: `1px solid ${isHovered ? `${accentColor}55` : LINE}`,
        boxShadow: isHovered ? `0 20px 45px rgba(0,0,0,0.45), 0 0 0 1px ${accentColor}22` : "0 10px 25px rgba(0,0,0,0.3)",
        transition: "border-color 400ms ease, box-shadow 400ms ease",
      }}
    >
      {/* Background: image if provided, otherwise a quiet dot grid so empty cards still feel intentional */}
      <div className="absolute inset-0 z-0">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? "scale-105 opacity-55" : "scale-100 opacity-25"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0F] via-[#0A0B0F]/70 to-transparent" />
          </>
        ) : (
          <DotGrid />
        )}
      </div>

      {/* Ghost index numeral */}
      <span
        aria-hidden
        className="absolute top-3 right-4 z-0 select-none pointer-events-none"
        style={{ fontSize: "5.5rem", fontWeight: 700, color: BONE, opacity: 0.05, lineHeight: 1 }}
      >
        {no}
      </span>

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SignalGlyph color={accentColor} active={isHovered} />
          <span style={{ color: accentColor, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.01em" }}>
            {tag}
          </span>
        </div>
        <span style={{ color: MUTED, fontSize: "0.72rem", fontVariantNumeric: "tabular-nums" }}>{metrics}</span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-col gap-3 mt-auto">
        <h3 style={{ color: BONE }} className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
          {title}
        </h3>

        <p style={{ color: MUTED }} className="text-sm leading-relaxed">
          {desc}
        </p>

        <AnimatePresence initial={false}>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3" style={{ borderTop: `1px solid ${LINE}` }}>
                {deliverables.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs" style={{ color: MUTED }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 pt-2" style={{ color: BONE }}>
          <span className="text-sm font-semibold">Explore service</span>
          <ArrowGlyph active={isHovered} />
        </div>
      </div>
    </motion.div>
  );
}