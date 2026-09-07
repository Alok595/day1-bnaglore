"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ContactModal from "@/components/ContactModal";
import LeadPopup from "@/components/LeadPopup";
import FloatActions from "@/components/FloatActions";
import ChatAssistant from "@/components/ChatAssistant";
import Magnetic from "@/components/Magnetic";
import PremiumServiceCard from "@/components/PremiumServiceCard";
import PremiumWorkShowcase from "@/components/PremiumWorkShowcase";
import Hero from "@/components/Hero";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  const goToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header
        onOpenContact={() => setContactOpen(true)}
        onNavigate={goToSection}
      />

      <div className="relative w-full overflow-hidden" id="frame">
        {/* SCREEN 1: HERO */}
        <Hero
          onPrimaryCta={() => setContactOpen(true)}
          onSecondaryCta={() => goToSection("work")}
        />

        {/* SCREEN 2: SERVICES */}
        <section className="relative w-full min-h-screen py-32 flex items-center justify-center overflow-hidden" id="services">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-[80rem] px-4 sm:px-12 mx-auto"
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                Six disciplines. One team that owns the <i className="text-white/70">result</i>.
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                No handoffs between agencies — the same people design, ship, rank
                and market it.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              <PremiumServiceCard
                index={0}
                tag="Design"
                title="Web Design & Development"
                desc="Websites engineered to load fast, look sharp on every device and turn visitors into paying customers."
                imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                deliverables={["Next.js 15", "Conversion UI", "WebGL Motion"]}
                metrics="Sub-1s Load Time"
                accentColor="#00f0ff"
                onKnowMore={() => setContactOpen(true)}
              />
              <PremiumServiceCard
                index={1}
                tag="Engineering"
                title="Solution-Based Premium Software"
                desc="Custom software built around how your business actually works, not the other way around."
                imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                deliverables={["Custom CRM", "SaaS Platforms", "Workflow Automation"]}
                metrics="100% Bespoke Tech"
                accentColor="#a855f7"
                onKnowMore={() => setContactOpen(true)}
              />
              <PremiumServiceCard
                index={2}
                tag="Visibility"
                title="SEO & Organic Growth"
                desc="Get found by the customers who are already searching for exactly what you offer."
                imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                deliverables={["Technical SEO", "High-Intent Search", "Core Web Vitals"]}
                metrics="Top 3 Google Rank"
                accentColor="#10b981"
                onKnowMore={() => setContactOpen(true)}
              />
              <PremiumServiceCard
                index={3}
                tag="Growth"
                title="Performance Marketing"
                desc="Campaigns built to hit revenue targets, measured by ROI and not by vanity impressions."
                imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                deliverables={["Meta & Google Ads", "Funnel CRO", "Revenue Attribution"]}
                metrics="4.8x Avg ROAS"
                accentColor="#f43f5e"
                onKnowMore={() => setContactOpen(true)}
              />
              <PremiumServiceCard
                index={4}
                tag="Automation"
                title="AI Chatbot & Concierge"
                desc="Custom-trained chat assistants that answer FAQs instantly and capture leads around the clock."
                imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
                deliverables={["On-Site AI Bot", "Zero Latency", "FAQ Intelligence"]}
                metrics="24/7 Lead Capture"
                accentColor="#38bdf8"
                onKnowMore={() => setContactOpen(true)}
              />
              <PremiumServiceCard
                index={5}
                tag="Mobile"
                title="App Development"
                desc="Native and cross-platform apps built to the same standard as everything else we ship — fast, reliable, built to scale."
                imageSrc="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
                deliverables={["React Native", "Native Speed", "Cloud Backend"]}
                metrics="iOS & Android"
                accentColor="#ec4899"
                onKnowMore={() => setContactOpen(true)}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* SCREEN 3: WORK */}
        <section className="py-24 sm:py-36 relative" id="work">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="w-full max-w-7xl mx-auto px-4 sm:px-8"
          >
            <motion.div className="text-center mb-16 sm:mb-20" variants={fadeInUp}>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#00f0ff] block mb-4">
                Selected Work
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
                Real businesses, <i className="text-white/70">real results</i>.
              </h2>
              <p className="text-lg sm:text-xl font-medium text-white/90 mb-2">
                Fifteen engagements, one standard.
              </p>
              <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto">
                Every project below is live in production, built and shipped.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full relative z-10 pt-4">
              <PremiumWorkShowcase />
            </motion.div>
          </motion.div>
        </section>

        {/* SCREEN 4: VISION */}
        <section className="relative w-full min-h-screen py-32 flex items-center justify-center overflow-hidden" id="vision">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-[80rem] px-4 sm:px-12 mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24"
          >
            <motion.div className="lg:w-1/2" variants={fadeInUp}>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 block mb-6">The Studio Standard</span>
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
                Built for businesses tired of managing <i className="text-white/70">five vendors</i>.
              </h2>
              <p className="text-xl text-white/60 leading-relaxed max-w-md">
                Every engagement is designed around outcomes you can measure,
                not deliverables you can only screenshot.
              </p>
            </motion.div>

            <motion.div className="lg:w-1/2 flex flex-col gap-8" variants={fadeInUp}>
              <div className="flex gap-6 items-start">
                <span className="text-3xl font-bold text-white/20">01</span>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Full-stack delivery</h4>
                  <p className="text-white/60">One team designs, builds, ranks and markets your product, start to finish.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-3xl font-bold text-white/20">02</span>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Proven results</h4>
                  <p className="text-white/60">₹3 Cr+ in revenue generated for clients through our engagements to date.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-3xl font-bold text-white/20">03</span>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Honest timelines and pricing</h4>
                  <p className="text-white/60">No hidden costs and no scope surprises, guaranteed.</p>
                </div>
              </div>
              
              <button
                type="button"
                className="mt-8 self-start px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-colors"
                onClick={() => setContactOpen(true)}
              >
                Start Your Project
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* SCREEN 5: TEAM */}
        <section className="relative w-full py-32 flex items-center justify-center overflow-hidden" id="team">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-7xl px-4 sm:px-8 mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#00f0ff] block mb-4">
              Leadership &amp; Team
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-14 text-white tracking-tight">
              The minds behind <i className="text-white/70">the craft</i>.
            </motion.h2>

            <motion.div variants={fadeInUp} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Sunil Shetty */}
              <div
                className="group relative rounded-3xl bg-gradient-to-b from-[#14132b]/80 via-[#0e0d22]/90 to-[#0c0a1b]/95 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden text-left flex flex-col cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:-translate-y-1.5"
                onClick={() => setContactOpen(true)}
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Photo */}
                <div className="w-full aspect-[4/4.5] relative rounded-2xl overflow-hidden border border-white/15 shrink-0 shadow-lg mb-5">
                  <Image
                    src="/assets/1772094173539.jpg"
                    alt="Sunil Shetty"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1b]/90 via-[#0c0a1b]/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00f0ff] bg-[#0c0a1b]/90 border border-[#00f0ff]/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                      Founder &amp; Architect
                    </span>
                    <span className="text-[10px] font-sans text-white/60 bg-[#0c0a1b]/80 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                      He/Him
                    </span>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#00f0ff] transition-colors">
                      Sunil Shetty
                    </h3>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    Helping manufacturers and modern enterprises digitize operations end-to-end. Specialized in mission-critical architectures: <b>ERP • MES • QMS • WMS • CMMS</b>, bespoke cloud platforms, and conversion-engineered digital brand experiences.
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {["Manufacturing Software", "ERP • MES • QMS", "WMS • CMMS", "Digital Operations"].map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#1868e8] to-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
                    >
                      <span>Connect with Sunil</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Mahima Shetty */}
              <div
                className="group relative rounded-3xl bg-gradient-to-b from-[#14132b]/80 via-[#0e0d22]/90 to-[#0c0a1b]/95 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden text-left flex flex-col cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] hover:-translate-y-1.5"
                onClick={() => setContactOpen(true)}
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#ec4899]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Photo */}
                <div className="w-full aspect-[4/4.5] relative rounded-2xl overflow-hidden border border-white/15 shrink-0 shadow-lg mb-5">
                  <Image
                    src="/assets/mahima-shetty.jpeg"
                    alt="Mahima Shetty"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1b]/90 via-[#0c0a1b]/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ec4899] bg-[#0c0a1b]/90 border border-[#ec4899]/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                      Video Editor &amp; Filmmaker
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#00f0ff] bg-[#0c0a1b]/90 border border-[#00f0ff]/30 px-2 py-0.5 rounded-full backdrop-blur-md">
                      6 Yrs Exp
                    </span>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#ec4899] transition-colors">
                      Mahima Shetty
                    </h3>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    6 years of industry experience in filmmaking, cinematic editing, and high-impact visual storytelling. Crafting brand films, commercial reels, and creative video content engineered to capture attention and convert audiences.
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {["Film Making", "Video Editing", "Color Grading", "Post-Production", "Motion Storytelling"].map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#e11d48] to-[#ec4899] hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300"
                    >
                      <span>Connect with Mahima</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Sinchana Shetty */}
              <div
                className="group relative rounded-3xl bg-gradient-to-b from-[#14132b]/80 via-[#0e0d22]/90 to-[#0c0a1b]/95 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl overflow-hidden text-left flex flex-col cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:-translate-y-1.5"
                onClick={() => setContactOpen(true)}
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Photo */}
                <div className="w-full aspect-[4/4.5] relative rounded-2xl overflow-hidden border border-white/15 shrink-0 shadow-lg mb-5">
                  <Image
                    src="/assets/sinchana-shetty.jpeg"
                    alt="Sinchana Shetty"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1b]/90 via-[#0c0a1b]/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c084fc] bg-[#0c0a1b]/90 border border-[#c084fc]/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                      Creative Storyteller
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#f59e0b] bg-[#0c0a1b]/90 border border-[#f59e0b]/30 px-2 py-0.5 rounded-full backdrop-blur-md">
                      50+ Collabs
                    </span>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#c084fc] transition-colors">
                      Sinchana Shetty
                    </h3>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    The creative force behind our brand’s digital media. Having spearheaded 50+ successful brand collaborations, she bridges creative intuition with audience insight to produce scroll-stopping reels, campaign visuals, and impactful social content.
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {["Brand Collaborations", "Digital Media", "Creative Storytelling", "Social Campaigns", "Audience Growth"].map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#9333ea] to-[#c084fc] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all duration-300"
                    >
                      <span>Connect with Sinchana</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* SCREEN 6: FOOTER */}
        <section className="relative w-full min-h-[50vh] py-16 flex items-center justify-center overflow-hidden bg-[#080911] border-t border-white/5" id="contact">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-[80rem] px-4 sm:px-12 mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-center md:text-left mb-24">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 block mb-6">Email</span>
                <a href="mailto:hello@dayonebrand.com" className="text-xl md:text-2xl font-medium hover:text-[#00f0ff] transition-colors block mb-2">
                  hello@dayonebrand.com
                </a>
              </div>
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 block mb-6">Location</span>
                <p className="text-white/70 text-lg leading-relaxed">
                  Day One Studio<br />
                  Level 8, Nexus Tech Tower<br />
                  Bandra Kurla Complex, Mumbai 400051
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center mb-16">
              <div className="relative w-20 h-20 mb-6">
                <Image
                  src="/assets/d1-new-emblem.png"
                  alt="Day One Emblem"
                  fill
                  className="object-contain opacity-90"
                />
              </div>
              <span className="text-4xl font-extrabold tracking-tight mb-2">Day One</span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                Foundation First. Growth Follows.
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
              <span>© 2026 Day One. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
              </div>
            </motion.div>
          </motion.div>
        </section>
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

