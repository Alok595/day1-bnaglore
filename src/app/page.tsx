"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import ContactModal from "@/components/ContactModal";
import LeadPopup from "@/components/LeadPopup";
import FloatActions from "@/components/FloatActions";
import ChatAssistant from "@/components/ChatAssistant";

const SCREENS = [
  { id: "hero", weight: 1.1 },
  { id: "services", weight: 1.0 },
  { id: "work", weight: 1.7 },
  { id: "vision", weight: 1.1 },
  { id: "team", weight: 1.8 },
  { id: "contact", weight: 1.0 },
];

const WORK_PROJECTS = [
  { no: "01", name: "Classic Tuff", url: "https://classictuff.in/" },
  { no: "02", name: "Aadhi Yoga", url: "https://aadhiyoga.in/" },
  { no: "03", name: "Ikigyan", url: "https://ikigyan.com/" },
  { no: "04", name: "Alfatech", url: "https://myalfatech.com/" },
  { no: "05", name: "Pebble Grey", url: "https://pebblegrey.in/" },
  { no: "06", name: "ZMZ Events", url: "https://zmzevents.com" },
  { no: "07", name: "Zenaum", url: "http://zenaum.in/" },
  { no: "08", name: "NE Native", url: "https://neinative.com/" },
  { no: "09", name: "Tyohar Mart", url: "https://tyoharmart.com/" },
  { no: "10", name: "Golden Eventz", url: "https://www.goldeneventz.co.in/" },
  { no: "11", name: "Elite Property DXB", url: "https://elitepropertydxb.com/" },
  { no: "12", name: "The Capital Constructions", url: "https://thecapitalconstructions.com/" },
  { no: "13", name: "Homeland", url: "https://www.homeland.ae/" },
  { no: "14", name: "Inland Indoors", url: "https://www.inlandindoors.com/" },
  { no: "15", name: "RCIS", url: "https://rcis.in/" },
];

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const orbRef = useRef<HTMLDivElement>(null);
  const orbScaleRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const standardListRef = useRef<HTMLUListElement>(null);

  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const isDesktopRef = useRef(false);

  // Navigate on desktop virtual-scroll engine or mobile native scroll
  const goToSection = useCallback((id: string) => {
    if (isDesktopRef.current) {
      const idx = SCREENS.findIndex((s) => s.id === id);
      if (idx === -1) return;
      const vh = window.innerHeight;
      const unit = vh * 1.4;
      let acc = 0;
      for (let i = 0; i < idx; i++) {
        acc += SCREENS[i].weight * unit;
      }
      const rangeLen = SCREENS[idx].weight * unit;
      const landing = acc + rangeLen * 0.32;
      scrollTargetRef.current = landing;
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const checkDesktop = () => window.matchMedia("(min-width: 800px)").matches;
    isDesktopRef.current = checkDesktop();

    if (!isDesktopRef.current) {
      // Mobile native reveal logic
      document.querySelectorAll(".screen").forEach((s) => s.classList.add("is-active"));
      let revealEls = Array.from(
        document.querySelectorAll(
          ".hl, .fade-block, .standard-item, .work-row, .team-card, .service-card"
        )
      );

      const revealVisible = () => {
        if (!revealEls.length) return;
        const vh = window.innerHeight;
        revealEls = revealEls.filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > 0) {
            el.classList.add("in-view");
            return false;
          }
          return true;
        });
      };

      window.addEventListener("scroll", revealVisible, { passive: true });
      window.addEventListener("resize", revealVisible);
      const poll = setInterval(revealVisible, 800);
      revealVisible();

      return () => {
        window.removeEventListener("scroll", revealVisible);
        window.removeEventListener("resize", revealVisible);
        clearInterval(poll);
      };
    }

    // Desktop Engine Setup
    let vh = window.innerHeight;
    let unit = vh * 1.4;
    let ranges: [number, number][] = [];

    const buildRanges = () => {
      let acc = 0;
      ranges = SCREENS.map((s) => {
        const start = acc;
        const end = acc + s.weight * unit;
        acc = end;
        return [start, end];
      });
    };
    buildRanges();
    let maxScroll = ranges[ranges.length - 1][1];

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const findScrollableAncestor = (
      node: HTMLElement | null,
      dir: number
    ): HTMLElement | null => {
      while (node && node !== document.body && node !== document.documentElement) {
        if (node.nodeType === 1) {
          const style = window.getComputedStyle(node);
          const canScrollY =
            (style.overflowY === "auto" || style.overflowY === "scroll") &&
            node.scrollHeight > node.clientHeight;
          if (canScrollY) {
            const hasRoom =
              dir > 0
                ? node.scrollTop < node.scrollHeight - node.clientHeight - 1
                : dir < 0
                ? node.scrollTop > 1
                : true;
            if (hasRoom) return node;
          }
        }
        node = node.parentElement;
      }
      return null;
    };

    const handleWheel = (e: WheelEvent) => {
      if (findScrollableAncestor(e.target as HTMLElement, e.deltaY)) return;
      e.preventDefault();
      const raw = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const d = clamp(raw, -100, 100);
      scrollTargetRef.current = clamp(scrollTargetRef.current + d, 0, maxScroll);
    };

    let touchStartY: number | null = null;
    let touchLastY: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null || touchLastY === null) return;
      const y = e.touches[0].clientY;
      const dy = touchLastY - y;
      touchLastY = y;
      if (findScrollableAncestor(e.target as HTMLElement, dy)) return;
      scrollTargetRef.current = clamp(
        scrollTargetRef.current + dy * 2.2,
        0,
        maxScroll
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        scrollTargetRef.current = clamp(
          scrollTargetRef.current + vh * 0.8,
          0,
          maxScroll
        );
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        scrollTargetRef.current = clamp(
          scrollTargetRef.current - vh * 0.8,
          0,
          maxScroll
        );
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      orbRef.current.style.transform = `rotateY(${nx * 14}deg) rotateX(${
        -ny * 14
      }deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      if (orbRef.current) orbRef.current.style.transform = "";
    };

    const handleResize = () => {
      isDesktopRef.current = checkDesktop();
      vh = window.innerHeight;
      unit = vh * 1.4;
      buildRanges();
      maxScroll = ranges[ranges.length - 1][1];
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Frame animation loop
    let lastTime: number | null = null;
    let animId: number;

    const screenElements = SCREENS.map((s) => document.getElementById(s.id));
    const standardItems = standardListRef.current
      ? Array.from(standardListRef.current.querySelectorAll(".standard-item"))
      : [];

    const render = (now: number) => {
      if (!isDesktopRef.current) return;

      const dt = lastTime == null ? 16.67 : Math.min(now - lastTime, 48);
      lastTime = now;
      const ease = 1 - Math.pow(1 - 0.16, dt / 16.67);

      scrollCurrentRef.current +=
        (scrollTargetRef.current - scrollCurrentRef.current) * ease;
      if (Math.abs(scrollTargetRef.current - scrollCurrentRef.current) < 0.05) {
        scrollCurrentRef.current = scrollTargetRef.current;
      }

      const cur = scrollCurrentRef.current;
      let newActive = 0;
      let bestOpacity = -1;

      screenElements.forEach((screen, i) => {
        if (!screen) return;
        const range = ranges[i];
        if (!range) return;
        const s = range[0],
          e = range[1],
          L = e - s;
        const fadeFrac = i === 0 ? 0.68 : i === 1 ? 0.45 : 0.22;
        const fadeLen = L * fadeFrac;
        const isLast = i === SCREENS.length - 1;

        let op: number;
        if (cur <= s - fadeLen || (!isLast && cur >= e)) {
          op = 0;
        } else if (cur <= s) {
          op = (cur - (s - fadeLen)) / fadeLen;
        } else if (isLast || cur < e - fadeLen) {
          op = 1;
        } else {
          op = (e - cur) / fadeLen;
        }
        op = clamp(op, 0, 1);

        screen.style.opacity = op.toString();
        screen.style.transform = `translateY(${(1 - op) * 18}px)`;

        if (op > 0.5 && !screen.classList.contains("is-active")) {
          screen.classList.add("is-active");
        } else if (op <= 0.5 && screen.classList.contains("is-active")) {
          screen.classList.remove("is-active");
        }

        if (op > bestOpacity) {
          bestOpacity = op;
          newActive = i;
        }
      });

      setActiveIndex(newActive);

      // Hero orb zoom
      if (orbScaleRef.current && ranges[0]) {
        const heroL = ranges[0][1] - ranges[0][0];
        const heroP = clamp(cur / heroL, 0, 1);
        const zoomP = clamp(heroP / 0.32, 0, 1);
        const scale = 1 + Math.pow(zoomP, 1.6) * 9;
        orbScaleRef.current.style.transform = `scale(${scale})`;

        const textOp = 1 - clamp(zoomP / 0.55, 0, 1);
        if (heroInnerRef.current) {
          heroInnerRef.current.style.opacity = textOp.toString();
        }
      }

      // Standard items reveal in Vision
      if (standardItems.length && ranges[3]) {
        const vsRange = ranges[3];
        const vsL = vsRange[1] - vsRange[0];
        const vsLocal = clamp((cur - vsRange[0]) / vsL, 0, 1);
        const introFrac = 0.02;
        const listEnd = 0.24;
        const segLen = (listEnd - introFrac) / standardItems.length;

        standardItems.forEach((item, idx) => {
          const segStart = introFrac + idx * segLen;
          const p = clamp((vsLocal - segStart) / segLen, 0, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const el = item as HTMLElement;
          el.style.opacity = eased.toString();
          el.style.transform = `translateY(${(1 - eased) * 16}px)`;
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <Header
        onOpenContact={() => setContactOpen(true)}
        onNavigate={goToSection}
      />

      <div className="frame" id="frame">
        {/* SCREEN 1: HERO */}
        <section
          className="screen screen--hero is-active"
          data-screen
          data-weight="1.1"
          id="hero"
        >
          <div className="ambient-bubble ambient-bubble--1" />
          <div className="ambient-bubble ambient-bubble--2" />
          <div className="ambient-bubble ambient-bubble--3" />

          <div className="orb-scale" id="orbScale" ref={orbScaleRef}>
            <div className="orb-wrap" id="orbWrap">
              <div className="orb" id="orb" ref={orbRef} />
            </div>
          </div>

          <div className="screen-inner" ref={heroInnerRef}>
            <h1 className="ts-1 split-lines">
              <span className="hl">
                Design that <i>performs</i>.
              </span>
              <span className="hl">
                Software that <i>scales</i>.
              </span>
              <span className="hl">
                Marketing that <i>compounds</i>.
              </span>
            </h1>
            <div className="hero-buttons fade-block">
              <button
                type="button"
                className="btn btn--cream btn--md"
                onClick={() => setContactOpen(true)}
              >
                <span>Get a Free Consultation</span>
              </button>
              <button
                type="button"
                className="btn btn--outlined btn--md"
                onClick={() => goToSection("work")}
              >
                <span>View Our Work</span>
              </button>
            </div>
            <p className="ts-p hero-copy fade-block">
              Day One is the single team behind your website, your software
              and your growth marketing. One studio, one point of
              accountability,{" "}
              <span className="hero-copy-strong">results you can measure.</span>
            </p>
          </div>
        </section>

        {/* SCREEN 2: SERVICES */}
        <section
          className="screen screen--services"
          data-screen
          data-weight="1"
          id="services"
        >
          <div className="screen-inner services-layout-v2">
            <div className="services-heading-row">
              <h2 className="discipline-heading split-lines">
                <span className="hl">
                  Six disciplines. One team that owns the <i>result</i>.
                </span>
              </h2>
              <p className="ts-p-sm discipline-intro fade-block">
                No handoffs between agencies — the same people design, ship, rank
                and market it.
              </p>
            </div>

            <div className="services-grid" id="stackWrap">
              <article className="service-card fade-block">
                <div className="service-card-top">
                  <span className="stack-tag">Design</span>
                </div>
                <h3 className="service-title">Web Design &amp; Development</h3>
                <p className="service-desc">
                  Websites engineered to load fast, look sharp on every device
                  and turn visitors into paying customers.
                </p>
                <button
                  type="button"
                  className="service-more"
                  onClick={() => setContactOpen(true)}
                >
                  Know more →
                </button>
                <div className="service-media">
                  <Image
                    src="/assets/website.webp"
                    alt="Web design and development"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              </article>

              <article className="service-card fade-block">
                <div className="service-card-top">
                  <span className="stack-tag">Engineering</span>
                </div>
                <h3 className="service-title">
                  Solution-Based Premium Software
                </h3>
                <p className="service-desc">
                  Custom software built around how your business actually
                  works, not the other way around.
                </p>
                <button
                  type="button"
                  className="service-more"
                  onClick={() => setContactOpen(true)}
                >
                  Know more →
                </button>
                <div className="service-media">
                  <Image
                    src="/assets/sotware.webp"
                    alt="Solution-based software"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              </article>

              <article className="service-card fade-block">
                <div className="service-card-top">
                  <span className="stack-tag">Visibility</span>
                </div>
                <h3 className="service-title">SEO</h3>
                <p className="service-desc">
                  Get found by the customers who are already searching for
                  exactly what you offer.
                </p>
                <button
                  type="button"
                  className="service-more"
                  onClick={() => setContactOpen(true)}
                >
                  Know more →
                </button>
                <div className="service-media">
                  <Image
                    src="/assets/sep.webp"
                    alt="SEO"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              </article>

              <article className="service-card fade-block">
                <div className="service-card-top">
                  <span className="stack-tag">Growth</span>
                </div>
                <h3 className="service-title">Performance Marketing</h3>
                <p className="service-desc">
                  Campaigns built to hit revenue targets, measured by ROI and not
                  by impressions.
                </p>
                <button
                  type="button"
                  className="service-more"
                  onClick={() => setContactOpen(true)}
                >
                  Know more →
                </button>
                <div className="service-media">
                  <Image
                    src="/assets/performance marketing.webp"
                    alt="Performance marketing"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              </article>

              <article className="service-card fade-block">
                <div className="service-card-top">
                  <span className="stack-tag">Automation</span>
                </div>
                <h3 className="service-title">AI Chatbot</h3>
                <p className="service-desc">
                  Custom-trained chat assistants that answer FAQs instantly and
                  capture leads around the clock — like the one on this site.
                </p>
                <button
                  type="button"
                  className="service-more"
                  onClick={() => setContactOpen(true)}
                >
                  Know more →
                </button>
                <div className="service-media" />
              </article>

              <article className="service-card fade-block">
                <div className="service-card-top">
                  <span className="stack-tag">Mobile</span>
                </div>
                <h3 className="service-title">App Development</h3>
                <p className="service-desc">
                  Native and cross-platform apps built to the same standard as
                  everything else we ship — fast, reliable, built to scale.
                </p>
                <button
                  type="button"
                  className="service-more"
                  onClick={() => setContactOpen(true)}
                >
                  Know more →
                </button>
                <div className="service-media" />
              </article>
            </div>
          </div>
        </section>

        {/* SCREEN 3: WORK */}
        <section
          className="screen screen--work"
          data-screen
          data-weight="1.7"
          id="work"
        >
          <div className="screen-inner work-inner">
            <div className="work-heading fade-block">
              <span className="ts-eyebrown">Selected Work</span>
              <h2 className="work-title">
                Real businesses, <i>real results</i>.
              </h2>
            </div>

            <div className="work-list">
              {WORK_PROJECTS.map((project) => (
                <a
                  key={project.no}
                  className="work-row fade-block"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="work-row-no">{project.no}</span>
                  <span className="work-row-name">{project.name}</span>
                  <svg
                    className="work-row-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4L12 12M12 12V5M12 12H5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SCREEN 4: VISION */}
        <section
          className="screen screen--vision"
          data-screen
          data-weight="1.1"
          id="vision"
        >
          <div className="screen-inner split">
            <div className="vision-main">
              <span className="ts-eyebrown fade-block">The Studio Standard</span>
              <h2 className="ts-1 ts-1--left split-lines">
                <span className="hl">Built for</span>
                <span className="hl">businesses tired</span>
                <span className="hl">of managing</span>
                <span className="hl">
                  <i>five vendors</i>.
                </span>
              </h2>
              <p className="ts-p-sm fade-block">
                Every engagement is designed around outcomes you can measure,
                not deliverables you can only screenshot.
              </p>
            </div>

            <div className="vision-side">
              <ul className="standard-list" ref={standardListRef}>
                <li className="standard-item">
                  <span className="standard-no">01</span>
                  <div>
                    <h4 className="standard-title">Full-stack delivery</h4>
                    <p className="standard-desc">
                      One team designs, builds, ranks and markets your product,
                      start to finish.
                    </p>
                  </div>
                </li>
                <li className="standard-item">
                  <span className="standard-no">02</span>
                  <div>
                    <h4 className="standard-title">Proven results</h4>
                    <p className="standard-desc">
                      ₹3 Cr+ in revenue generated for clients through our
                      engagements to date.
                    </p>
                  </div>
                </li>
                <li className="standard-item">
                  <span className="standard-no">03</span>
                  <div>
                    <h4 className="standard-title">
                      A dedicated point of contact
                    </h4>
                    <p className="standard-desc">
                      You always know exactly who owns your project.
                    </p>
                  </div>
                </li>
                <li className="standard-item">
                  <span className="standard-no">04</span>
                  <div>
                    <h4 className="standard-title">Built for growth</h4>
                    <p className="standard-desc">
                      Every solution is engineered to scale as your business
                      does.
                    </p>
                  </div>
                </li>
                <li className="standard-item">
                  <span className="standard-no">05</span>
                  <div>
                    <h4 className="standard-title">
                      Honest timelines and pricing
                    </h4>
                    <p className="standard-desc">
                      No hidden costs and no scope surprises, guaranteed.
                    </p>
                  </div>
                </li>
              </ul>
              <button
                type="button"
                className="btn btn--outlined btn--md fade-block start-project-btn"
                onClick={() => setContactOpen(true)}
              >
                Start Your Project
              </button>
            </div>
          </div>
        </section>

        {/* SCREEN 5: TEAM */}
        <section
          className="screen screen--team"
          data-screen
          data-weight="1.8"
          id="team"
        >
          <div className="screen-inner">
            <span className="ts-eyebrown team-eyebrow fade-block">Leadership</span>
            <h2 className="discipline-heading fade-block">
              The team behind the work.
            </h2>

            <div className="team-grid !grid-cols-2 !max-w-2xl mx-auto">
              <div
                className="team-card fade-block"
                onClick={() => setContactOpen(true)}
              >
                <div className="team-photo-wrap">
                  <Image
                    src="/assets/alex-morgan.jpg"
                    alt="Alex Morgan"
                    width={400}
                    height={400}
                    className="team-photo"
                  />
                </div>
                <div className="team-card-overlay">
                  <span className="team-role">Founder &amp; Engineering Lead</span>
                  <h3 className="team-name">Alex Morgan</h3>
                  <p className="team-bio">
                    Directs product architecture, custom software development,
                    and technical strategy for all client engagements.
                  </p>
                  <div className="team-card-buttons">
                    <span className="team-card-link">Message on WhatsApp &rarr;</span>
                  </div>
                </div>
              </div>

              <div
                className="team-card fade-block"
                onClick={() => setContactOpen(true)}
              >
                <div className="team-photo-wrap">
                  <Image
                    src="/assets/sarah-chen.jpg"
                    alt="Sarah Chen"
                    width={400}
                    height={400}
                    className="team-photo"
                  />
                </div>
                <div className="team-card-overlay">
                  <span className="team-role">Co-Founder &amp; Design Director</span>
                  <h3 className="team-name">Sarah Chen</h3>
                  <p className="team-bio">
                    Leads creative direction, brand systems, and UI/UX
                    engineering from initial concept to high-converting launch.
                  </p>
                  <div className="team-card-buttons">
                    <span className="team-card-link">Message on WhatsApp &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCREEN 6: FOOTER & CONTACT */}
        <footer
          className="screen screen--footer"
          data-screen
          data-weight="1"
          id="contact"
        >
          <div className="screen-inner">
            <div className="footer-grid !grid-cols-2 !max-w-2xl">
              <div className="footer-block fade-block">
                <span className="ts-eyebrown">Email</span>
                <a
                  href="mailto:hello@dayonebrand.com"
                  className="ts-p footer-email"
                >
                  hello@dayonebrand.com
                </a>
                <a
                  href="mailto:contact@dayonebrand.com"
                  className="ts-p footer-email"
                >
                  contact@dayonebrand.com
                </a>
              </div>

              <div className="footer-block fade-block">
                <span className="ts-eyebrown">Location</span>
                <a href="#" className="ts-p footer-address">
                  <svg
                    className="footer-address-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18s6-5.5 6-10.2A6 6 0 0 0 4 7.8C4 12.5 10 18 10 18Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="10"
                      cy="7.8"
                      r="2.1"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                  <span>
                    Day One Studio
                    <br />
                    Level 8, Nexus Tech Tower
                    <br />
                    Bandra Kurla Complex, Mumbai 400051
                  </span>
                </a>
              </div>
              </div>

              <div className="flex items-center justify-center mt-10 mb-4 fade-block">
                <div style={{ position: "relative", width: "4rem", height: "4rem", flexShrink: 0 }}>
                  <Image
                    src="/assets/day1-emblem-dark.png"
                    alt="Day One Emblem"
                    width={64}
                    height={64}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    loading="lazy"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: "1.75rem",
                      letterSpacing: "-0.02em",
                      color: "#fff",
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Day One
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "0.65rem",
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

              <div className="footer-bottom fade-block">
                <span>
                  © 2026 Day One. All rights reserved. Designed and Developed by Day One.
                </span>
                <div className="menu-footer-links">
                  <a href="/privacy-policy">Privacy Policy</a>
                  <a href="/terms-conditions">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Progress Dots */}
        <div className="progress-dots" id="progressDots">
          {SCREENS.map((s, idx) => (
            <div
              key={s.id}
              className={`dot ${idx === activeIndex ? "is-active" : ""}`}
              onClick={() => goToSection(s.id)}
            />
          ))}
        </div>

        <FloatActions onOpenContact={() => setContactOpen(true)} />
        <ChatAssistant
          onOpenContact={() => setContactOpen(true)}
          onNavigate={goToSection}
        />
        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
        <LeadPopup />
      </>
    );
  }
