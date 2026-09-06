"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export interface ProjectItem {
  no: string;
  name: string;
  url: string;
  category: string;
  tag: string;
  highlight: string;
  result: string;
  accent: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    no: "01",
    name: "Classic Tuff",
    url: "https://classictuff.in/",
    category: "Glass & industrial architecture",
    tag: "Next.js • 3D product catalog",
    highlight: "High-performance enterprise showcase for architectural glass fabrication.",
    result: "2.8x increase in qualified enterprise leads",
    accent: "#00f0ff",
  },
  {
    no: "02",
    name: "Aadhi Yoga",
    url: "https://aadhiyoga.in/",
    category: "Classical wellness & holistic academy",
    tag: "Brand system • booking funnel",
    highlight: "Digital sanctuary designed for seamless workshop discovery and booking.",
    result: "4.2x lift in workshop bookings",
    accent: "#10b981",
  },
  {
    no: "03",
    name: "Ikigyan",
    url: "https://ikigyan.com/",
    category: "EdTech & interactive learning platform",
    tag: "LMS platform • streaming architecture",
    highlight: "Experiential knowledge network built with instant streaming architecture.",
    result: "99.8 performance score, sub-second load times",
    accent: "#a855f7",
  },
  {
    no: "04",
    name: "Alfatech",
    url: "https://myalfatech.com/",
    category: "Engineering & automation systems",
    tag: "Industrial portal • UI/UX",
    highlight: "Industrial robotics and precision manufacturing consultation hub.",
    result: "Trusted portal for enterprise manufacturing clients",
    accent: "#38bdf8",
  },
  {
    no: "05",
    name: "Pebble Grey",
    url: "https://pebblegrey.in/",
    category: "Luxury lifestyle & interior decor",
    tag: "Headless commerce",
    highlight: "Ultra-minimalist aesthetic store engineered for luxury home decor.",
    result: "140% increase in average order value",
    accent: "#f43f5e",
  },
  {
    no: "06",
    name: "ZMZ Events",
    url: "https://zmzevents.com",
    category: "Bespoke luxury event production",
    tag: "High-impact media • brand",
    highlight: "Immersive celebration visualizer for stadium concerts and lavish galas.",
    result: "Production visuals delivered at stadium scale",
    accent: "#ec4899",
  },
  {
    no: "07",
    name: "Zenaum",
    url: "http://zenaum.in/",
    category: "Architecture & spatial engineering",
    tag: "Portfolio • spatial design",
    highlight: "Architectural monograph platform highlighting modern spatial luxury.",
    result: "Nominated for a regional design award",
    accent: "#eab308",
  },
  {
    no: "08",
    name: "NE Native",
    url: "https://neinative.com/",
    category: "Authentic regional organic D2C",
    tag: "E-commerce marketplace",
    highlight: "Direct-to-consumer sustainable indigenous goods marketplace.",
    result: "50,000+ orders shipped nationwide",
    accent: "#22c55e",
  },
  {
    no: "09",
    name: "Tyohar Mart",
    url: "https://tyoharmart.com/",
    category: "Festive marketplace & high-volume retail",
    tag: "High-traffic e-commerce",
    highlight: "Sub-second checkout flow engineered for peak festival season spikes.",
    result: "Zero downtime through peak festival traffic",
    accent: "#f97316",
  },
  {
    no: "10",
    name: "Golden Eventz",
    url: "https://www.goldeneventz.co.in/",
    category: "Luxury destination weddings",
    tag: "Showcase • lead generation",
    highlight: "Bespoke wedding production portfolio with integrated client concierge.",
    result: "300+ weddings produced and documented",
    accent: "#fbbf24",
  },
  {
    no: "11",
    name: "Elite Property DXB",
    url: "https://elitepropertydxb.com/",
    category: "Dubai ultra-luxury real estate",
    tag: "Real estate portal • UAE",
    highlight: "Prime Dubai waterfront villas and penthouse acquisition gateway.",
    result: "AED 500M+ in active listings",
    accent: "#06b6d4",
  },
  {
    no: "12",
    name: "The Capital Constructions",
    url: "https://thecapitalconstructions.com/",
    category: "Infrastructure & commercial buildings",
    tag: "Corporate enterprise web",
    highlight: "Modern portal showcasing massive infrastructure and high-rise developments.",
    result: "Portfolios delivered at mega-development scale",
    accent: "#6366f1",
  },
  {
    no: "13",
    name: "Homeland",
    url: "https://www.homeland.ae/",
    category: "UAE property investment advisory",
    tag: "Investment discovery platform",
    highlight: "Investor-centric property discovery portal tailored for GCC high-net-worth buyers.",
    result: "Advisory platform trusted by GCC investors",
    accent: "#3b82f6",
  },
  {
    no: "14",
    name: "Inland Indoors",
    url: "https://www.inlandindoors.com/",
    category: "Turnkey interior architecture",
    tag: "Architecture portfolio",
    highlight: "High-end residential styling and bespoke spatial design gallery.",
    result: "A gallery of finished luxury interiors",
    accent: "#d946ef",
  },
  {
    no: "15",
    name: "RCIS",
    url: "https://rcis.in/",
    category: "Academic & institutional portal",
    tag: "Admissions • education CMS",
    highlight: "Comprehensive institutional portal powering dynamic admissions and student life.",
    result: "Serving an institution of 5,000+ students",
    accent: "#0ea5e9",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "realestate", label: "Real Estate & Architecture" },
  { id: "ecommerce", label: "E-Commerce & D2C" },
  { id: "tech", label: "Tech & Enterprise" },
  { id: "events", label: "Luxury & Lifestyle" },
];

function ExternalIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4L12 12M12 12V5M12 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectRow({
  project,
  isOpen,
  onToggle,
}: {
  project: ProjectItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 transition-colors duration-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer group hover:bg-white/[0.02] px-2 sm:px-4 rounded-xl transition-all duration-300"
      >
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <span
            className="font-mono text-sm sm:text-base font-bold tracking-wider tabular-nums transition-colors duration-300"
            style={{ color: isOpen ? (project.accent || "#00f0ff") : "rgba(255,255,255,0.4)" }}
          >
            {project.no}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-lg sm:text-2xl font-extrabold text-white group-hover:text-[#00f0ff] transition-colors duration-300">
              {project.name}
            </span>
            <span className="truncate text-xs sm:text-sm text-white/50 tracking-wide mt-0.5">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:border-white/30 group-hover:text-white transition-all duration-300"
            style={{
              borderColor: isOpen ? (project.accent || "#00f0ff") : undefined,
              color: isOpen ? (project.accent || "#00f0ff") : undefined,
            }}
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-light leading-none"
            >
              +
            </motion.span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2 px-2 sm:pl-16 sm:pr-4 flex flex-col gap-6">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl">
                {project.highlight}
              </p>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                  {project.tag}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-3 border-t border-white/5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
                    Key Result
                  </p>
                  <p
                    className="text-base sm:text-xl font-bold tracking-tight"
                    style={{ color: project.accent || "#00f0ff" }}
                  >
                    {project.result}
                  </p>
                </div>

                <Magnetic strength={0.2}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-white/10 to-white/5 hover:from-[#00f0ff]/20 hover:to-[#7672ff]/20 border border-white/20 hover:border-[#00f0ff]/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 self-start sm:self-auto"
                  >
                    <span>Visit Live Site</span>
                    <ExternalIcon />
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PremiumWorkShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedNo, setExpandedNo] = useState<string | null>("01");

  const filterByCategory = (id: string) =>
    PROJECTS.filter((p) => {
      if (id === "all") return true;
      if (id === "realestate") return ["11", "12", "13", "14", "07", "01"].includes(p.no);
      if (id === "ecommerce") return ["05", "08", "09"].includes(p.no);
      if (id === "tech") return ["03", "04", "15"].includes(p.no);
      if (id === "events") return ["02", "06", "10"].includes(p.no);
      return true;
    });

  const filteredProjects = filterByCategory(activeCategory);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    const first = filterByCategory(id)[0];
    setExpandedNo(first ? first.no : null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-[#14132b]/80 via-[#0e0d22]/90 to-[#0c0a1b]/95 border border-white/10 backdrop-blur-2xl shadow-2xl p-6 sm:p-12 overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7672ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8 sm:gap-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap border-b border-white/10 pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-white bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="active-work-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f0ff]/10 to-[#7672ff]/10 -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {filteredProjects.map((project) => (
            <ProjectRow
              key={project.no}
              project={project}
              isOpen={expandedNo === project.no}
              onToggle={() => setExpandedNo(expandedNo === project.no ? null : project.no)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}