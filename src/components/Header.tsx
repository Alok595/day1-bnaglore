"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onOpenContact: () => void;
  onNavigate?: (targetId: string) => void;
}

export default function Header({ onOpenContact, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
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
    <>
      <header className="header">
        <div className="header-inner">
          <button
            type="button"
            className={`menu-btn ${isMenuOpen ? "is-open" : ""}`}
            id="menuBtn"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-btn-text">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
            <span className="menu-btn-icon" aria-hidden="true">
              <span className="menu-btn-bar" />
              <span className="menu-btn-bar" />
            </span>
          </button>

          <a
            href="#hero"
            className="logo group"
            aria-label="Day One"
            onClick={(e) => handleNavClick(e, "hero")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "3.25rem",
                height: "3.25rem",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className="group-hover:scale-105"
            >
              <Image
                src="/assets/day1-emblem-dark.png"
                alt="Day One Logo"
                width={52}
                height={52}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
                priority
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "0.125rem",
                }}
              >
                Day One
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "0.5rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255, 255, 255, 0.6)",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                FOUNDATION FIRST. GROWTH FOLLOWS.
              </span>
            </div>
          </a>

          <div className="header-nav">
            <button
              type="button"
              className="btn btn--cyan btn--xs"
              onClick={onOpenContact}
            >
              Get in touch
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`menu-overlay ${isMenuOpen ? "open" : ""}`}
        id="menuOverlay"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-center mb-4">
          <div style={{ position: "relative", width: "3.75rem", height: "3.75rem", flexShrink: 0 }}>
            <Image
              src="/assets/day1-emblem-dark.png"
              alt="Day One Logo"
              width={60}
              height={60}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "0.875rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "1.5rem",
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1,
                marginBottom: "0.15rem",
              }}
            >
              Day One
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "rgba(255, 255, 255, 0.6)",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              FOUNDATION FIRST. GROWTH FOLLOWS.
            </span>
          </div>
        </div>

        <ul className="menu-list">
          <li>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, "work")}
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#vision"
              onClick={(e) => handleNavClick(e, "vision")}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="menu-footer">
          <span>© 2026 Day One. All rights reserved.</span>
          <div className="menu-footer-links">
            <Link href="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" onClick={() => setIsMenuOpen(false)}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
