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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onKnowMore}
      className="group relative min-h-[480px] w-full rounded-[2rem] overflow-hidden cursor-pointer"
      style={{
        boxShadow: `
          inset 0px 2px 4px rgba(255,255,255,0.1),
          inset 0px -2px 10px rgba(0,0,0,0.5),
          0px 20px 40px rgba(0,0,0,0.4)
        `,
        backgroundColor: "#0d0e15"
      }}
    >
      {/* Background Image (Reveals and scales on hover) */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ease-out ${
              isHovered ? "scale-105 opacity-80" : "scale-100 opacity-30"
            }`}
          />
          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
        </div>
      )}

      {/* Skeuomorphic Highlight (Top Edge) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
        
        {/* Floating Glassmorphic Panel */}
        <motion.div
          animate={{
            y: isHovered ? 0 : 20,
            backgroundColor: isHovered ? "rgba(20, 22, 35, 0.65)" : "rgba(20, 22, 35, 0.4)",
            backdropFilter: isHovered ? "blur(24px)" : "blur(12px)",
            borderColor: isHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative rounded-2xl border p-5 flex flex-col gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          {/* Top Info Row */}
          <div className="flex items-center justify-between">
            <span
              className="text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 shadow-inner"
              style={{ color: accentColor, border: `1px solid ${accentColor}40` }}
            >
              {tag}
            </span>
            <span className="text-[0.65rem] font-medium text-white/70">
              {metrics}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h3>

          {/* Hidden on default, revealed on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {desc}
                </p>

                {/* Deliverables Marquee / List */}
                <div className="flex flex-wrap gap-2">
                  {deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button (Skeuomorphic pill) */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.6,
            }}
            className="mt-2 self-start flex items-center justify-center w-10 h-10 rounded-full bg-black/50 border border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-110 hover:bg-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

