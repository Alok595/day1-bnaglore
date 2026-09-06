"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";

interface HeaderProps {
  onOpenContact: () => void;
  onNavigate?: (targetId: string) => void;
}

const NAV_LINKS = [
  { label: "Services", targetId: "services" },
  { label: "Work", targetId: "work" },
  { label: "Vision", targetId: "vision" },
  { label: "Team", targetId: "team" },
  { label: "Contact", targetId: "contact" },
];

export default function Header({ onOpenContact, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }

    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300">
      <div
        className={`w-full max-w-7xl mx-auto rounded-full border transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
          isScrolled
            ? "bg-[#0c0a1b]/85 backdrop-blur-2xl border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            : "bg-[#0c0a1b]/60 backdrop-blur-xl border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Brand Logo Lockup */}
        <Link
          href="/"
          className="group flex items-center gap-3 no-underline focus:outline-none"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] border border-white/10 p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#00f0ff]/40">
            <Image
              src="/assets/day1-emblem-dark.png"
              alt="Day One"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight leading-none group-hover:text-[#00f0ff] transition-colors">
                Day One
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                STUDIO
              </span>
            </div>
            <span className="text-[9px] font-sans tracking-[0.18em] text-white/50 uppercase leading-tight mt-0.5 hidden xs:block">
              Foundation First
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-2 py-1 shadow-inner">
          {NAV_LINKS.map((item) => {
            const isHovered = activeHover === item.targetId;
            return (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                onMouseEnter={() => setActiveHover(item.targetId)}
                onMouseLeave={() => setActiveHover(null)}
                className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-200"
              >
                <span className="relative z-10">{item.label}</span>
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Magnetic strength={0.25}>
            <button
              type="button"
              className="inline-flex items-center justify-center font-sans text-xs font-bold uppercase tracking-wider rounded-full h-9 sm:h-10 px-5 sm:px-6 bg-gradient-to-r from-[#1868e8] to-[#00f0ff] text-white border border-white/20 shadow-[0_4px_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer"
              onClick={onOpenContact}
            >
              Get In Touch
            </button>
          </Magnetic>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <motion.span
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }}
              className="w-4 h-[1.5px] bg-white block rounded-full"
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="w-4 h-[1.5px] bg-white block rounded-full"
            />
            <motion.span
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -5 : 0 }}
              className="w-4 h-[1.5px] bg-white block rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden w-full max-w-7xl mx-auto mt-2 rounded-3xl bg-[#0e0d22]/95 backdrop-blur-2xl border border-white/15 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((item, idx) => (
                <a
                  key={item.targetId}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item.targetId)}
                  className="flex items-center justify-between py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all text-base font-semibold group"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#00f0ff] opacity-60 group-hover:opacity-100">
                      0{idx + 1}
                    </span>
                    {item.label}
                  </span>
                  <span className="text-white/30 group-hover:text-[#00f0ff] transition-colors">
                    →
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 rounded-full text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#1868e8] to-[#00f0ff] shadow-lg shadow-[#00f0ff]/20"
              >
                Start Your Project
              </button>

              <div className="flex items-center justify-between text-xs text-white/40 px-2">
                <span>© 2026 Day One</span>
                <div className="flex gap-4">
                  <Link
                    href="/privacy-policy"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms-conditions"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
