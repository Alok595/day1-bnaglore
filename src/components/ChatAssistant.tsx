"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

interface QuickReply {
  label: string;
  intentId: string;
  url?: string;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  html?: string;
  text?: string;
  time?: string;
  quickReplies?: QuickReply[];
}

interface ChatAssistantProps {
  onOpenContact: () => void;
  onNavigate?: (targetId: string) => void;
}

export interface ProjectInfo {
  no: string;
  name: string;
  url: string;
  category: string;
  tag: string;
  summary: string;
  result: string;
  accent: string;
  keywords: string[];
}

export const ALL_PROJECTS: ProjectInfo[] = [
  {
    no: "01",
    name: "Classic Tuff",
    url: "https://classictuff.in/",
    category: "Glass & Industrial Architecture",
    tag: "Next.js • 3D Product Catalog",
    summary: "High-performance enterprise showcase for architectural glass fabrication and industrial manufacturing.",
    result: "2.8x increase in qualified enterprise leads",
    accent: "#00f0ff",
    keywords: ["classic tuff", "glass", "tuff", "tuff glass", "architectural glass", "project 1", "project 01", "#1", "#01"],
  },
  {
    no: "02",
    name: "Aadhi Yoga",
    url: "https://aadhiyoga.in/",
    category: "Classical Wellness & Holistic Academy",
    tag: "Brand System • Booking Funnel",
    summary: "Digital sanctuary designed for seamless workshop discovery, holistic retreat enrollments, and booking.",
    result: "4.2x lift in workshop bookings",
    accent: "#10b981",
    keywords: ["aadhi yoga", "aadhi", "yoga", "wellness", "meditation", "project 2", "project 02", "#2", "#02"],
  },
  {
    no: "03",
    name: "Ikigyan",
    url: "https://ikigyan.com/",
    category: "EdTech & Interactive Learning Platform",
    tag: "LMS Platform • Streaming Architecture",
    summary: "Experiential knowledge network built with instant streaming architecture and interactive course discovery.",
    result: "99.8 performance score, sub-second load times",
    accent: "#a855f7",
    keywords: ["ikigyan", "edtech", "education", "lms", "learning", "courses", "project 3", "project 03", "#3", "#03"],
  },
  {
    no: "04",
    name: "Alfatech",
    url: "https://myalfatech.com/",
    category: "Engineering & Automation Systems",
    tag: "Industrial Portal • UI/UX",
    summary: "Industrial robotics, precision manufacturing, and automation consultation portal.",
    result: "Trusted portal for enterprise manufacturing clients",
    accent: "#38bdf8",
    keywords: ["alfatech", "automation", "engineering", "robotics", "project 4", "project 04", "#4", "#04"],
  },
  {
    no: "05",
    name: "Pebble Grey",
    url: "https://pebblegrey.in/",
    category: "Luxury Lifestyle & Interior Decor",
    tag: "Headless Commerce",
    summary: "Ultra-minimalist headless commerce experience engineered for premium home aesthetics and luxury decor.",
    result: "140% increase in average order value",
    accent: "#f43f5e",
    keywords: ["pebble grey", "pebble", "decor", "home decor", "luxury lifestyle", "project 5", "project 05", "#5", "#05"],
  },
  {
    no: "06",
    name: "ZMZ Events",
    url: "https://zmzevents.com",
    category: "Bespoke Luxury Event Production",
    tag: "High-Impact Media • Brand",
    summary: "Immersive celebration visualizer and production showcase for stadium concerts, galas, and lavish events.",
    result: "Production visuals delivered at stadium scale",
    accent: "#ec4899",
    keywords: ["zmz events", "zmz", "events", "concerts", "galas", "production", "project 6", "project 06", "#6", "#06"],
  },
  {
    no: "07",
    name: "Zenaum",
    url: "http://zenaum.in/",
    category: "Architecture & Spatial Engineering",
    tag: "Portfolio • Spatial Design",
    summary: "Architectural monograph and portfolio platform highlighting modern spatial luxury and design.",
    result: "Nominated for a regional design award",
    accent: "#eab308",
    keywords: ["zenaum", "spatial", "architectural monograph", "project 7", "project 07", "#7", "#07"],
  },
  {
    no: "08",
    name: "NE Native",
    url: "https://neinative.com/",
    category: "Authentic Regional Organic D2C",
    tag: "E-Commerce Marketplace",
    summary: "Direct-to-consumer sustainable marketplace celebrating authentic indigenous goods from Northeast India.",
    result: "50,000+ orders shipped nationwide",
    accent: "#22c55e",
    keywords: ["ne native", "native", "northeast", "indigenous", "organic d2c", "project 8", "project 08", "#8", "#08"],
  },
  {
    no: "09",
    name: "Tyohar Mart",
    url: "https://tyoharmart.com/",
    category: "Festive Marketplace & High-Volume Retail",
    tag: "High-Traffic E-Commerce",
    summary: "Sub-second checkout flow engineered for high-traffic festive seasons and peak shopping spikes.",
    result: "Zero downtime through peak festival traffic",
    accent: "#f97316",
    keywords: ["tyohar mart", "tyohar", "festival", "sweets", "festive marketplace", "project 9", "project 09", "#9", "#09"],
  },
  {
    no: "10",
    name: "Golden Eventz",
    url: "https://www.goldeneventz.co.in/",
    category: "Luxury Destination Weddings",
    tag: "Showcase • Lead Generation",
    summary: "Bespoke wedding production portfolio with integrated client concierge and lead engine.",
    result: "300+ weddings produced and documented",
    accent: "#fbbf24",
    keywords: ["golden eventz", "golden", "wedding", "destination weddings", "project 10", "#10"],
  },
  {
    no: "11",
    name: "Elite Property DXB",
    url: "https://elitepropertydxb.com/",
    category: "Dubai Ultra-Luxury Real Estate",
    tag: "Real Estate Portal • UAE",
    summary: "Prime Dubai waterfront villas and penthouse acquisition gateway for high-net-worth investors.",
    result: "AED 500M+ in active listings",
    accent: "#06b6d4",
    keywords: ["elite property dxb", "elite property", "dubai property", "dxb", "villas", "penthouses", "project 11", "#11"],
  },
  {
    no: "12",
    name: "The Capital Constructions",
    url: "https://thecapitalconstructions.com/",
    category: "Infrastructure & Commercial Buildings",
    tag: "Corporate Enterprise Web",
    summary: "Modern enterprise portal showcasing mega infrastructure projects, bridges, and high-rise developments.",
    result: "Portfolios delivered at mega-development scale",
    accent: "#6366f1",
    keywords: ["the capital constructions", "capital constructions", "constructions", "infrastructure", "project 12", "#12"],
  },
  {
    no: "13",
    name: "Homeland",
    url: "https://www.homeland.ae/",
    category: "UAE Property & Investment Advisory",
    tag: "Investment Discovery Platform",
    summary: "Investor-centric property discovery portal tailored for GCC high-net-worth buyers and overseas funds.",
    result: "Advisory platform trusted by GCC investors",
    accent: "#3b82f6",
    keywords: ["homeland", "homeland ae", "uae investment", "gcc property", "project 13", "#13"],
  },
  {
    no: "14",
    name: "Inland Indoors",
    url: "https://www.inlandindoors.com/",
    category: "Turnkey Interior Architecture",
    tag: "Architecture Portfolio",
    summary: "High-end residential styling and bespoke spatial design gallery for turnkey luxury spaces.",
    result: "A gallery of finished luxury interiors",
    accent: "#d946ef",
    keywords: ["inland indoors", "inland", "indoors", "turnkey interior", "interior architecture", "project 14", "#14"],
  },
  {
    no: "15",
    name: "RCIS",
    url: "https://rcis.in/",
    category: "Academic & Institutional Portal",
    tag: "Admissions • Education CMS",
    summary: "Comprehensive institutional portal powering dynamic admissions, student life, and campus governance.",
    result: "Serving an institution of 5,000+ students",
    accent: "#0ea5e9",
    keywords: ["rcis", "admissions", "school", "institution", "college", "project 15", "#15"],
  },
];

export default function ChatAssistant({
  onOpenContact,
  onNavigate,
}: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTime, setCurrentTime] = useState("");

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetedRef = useRef(false);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  const mainMenu = (): QuickReply[] => [
    { label: "Manufacturing Software (ERP/MES)", intentId: "manufacturing" },
    { label: "Our 6 Core Disciplines", intentId: "services" },
    { label: "Selected Work (15 Live Projects)", intentId: "work" },
    { label: "Founder: Sunil Shetty", intentId: "team" },
    { label: "Pricing & Quotes", intentId: "pricing" },
    { label: "Get in Touch", intentId: "contact" },
  ];

  // Comprehensive Knowledge Graph Intents
  const intents = useMemo(
    () => [
      {
        id: "greeting",
        keywords: [
          "hi",
          "hello",
          "hey",
          "yo",
          "sup",
          "good morning",
          "good afternoon",
          "good evening",
          "greetings",
          "start",
          "help",
        ],
        reply: () => ({
          html:
            "<b>Welcome to Day One Studio!</b><br/><br/>" +
            "I'm your intelligent on-site assistant, running 100% offline with complete knowledge of our <b>15 live client projects</b>, <b>manufacturing software suites (ERP/MES)</b>, <b>6 core disciplines</b>, and founder <b>Sunil Shetty</b>.<br/><br/>" +
            "What would you like to explore?",
          quickReplies: mainMenu(),
        }),
      },
      {
        id: "about_company",
        keywords: [
          "what is day one",
          "about day one",
          "who is day one",
          "day one brand",
          "zero to one brand",
          "tagline",
          "motto",
          "foundation first",
          "growth follows",
          "about you",
          "company background",
          "studio standard",
        ],
        reply: () => ({
          html:
            "<b>Day One — Foundation First. Growth Follows.</b><br/><br/>" +
            "We are a bespoke creative engineering &amp; digital growth studio based in <b>BKC, Mumbai</b>.<br/><br/>" +
            "Founded by <b>Sunil Shetty</b>, we build for businesses tired of managing 5 separate agencies. One dedicated team owns your entire product — from <b>Manufacturing Software (ERP • MES • QMS)</b> to <b>Ultra-Fast Web Platforms</b>, <b>Mobile Apps</b>, and <b>High-ROI Performance Marketing</b>.",
          quickReplies: [
            { label: "Manufacturing Software", intentId: "manufacturing" },
            { label: "See 15 Live Projects", intentId: "work" },
            { label: "Meet Sunil Shetty", intentId: "team" },
            { label: "Start a Project", intentId: "contact" },
          ],
        }),
      },
      {
        id: "manufacturing",
        keywords: [
          "manufacturing",
          "manufacturing software",
          "erp",
          "mes",
          "qms",
          "wms",
          "cmms",
          "factory",
          "plant",
          "operations",
          "digitize operations",
          "industrial software",
          "shop floor",
          "inventory software",
        ],
        reply: () => ({
          html:
            "<b>Custom Manufacturing Software &amp; Digital Operations:</b><br/>" +
            "Led by <b>Sunil Shetty</b>, we engineer mission-critical systems for modern manufacturing enterprises:<ul>" +
            "<li><b>• ERP:</b> Centralized multi-plant inventory, procurement, and financial control.</li>" +
            "<li><b>• MES:</b> Real-time shop-floor control, machine telemetry &amp; OEE optimization.</li>" +
            "<li><b>• QMS:</b> In-line quality inspection, defect logging, and automated ISO auditing.</li>" +
            "<li><b>• WMS:</b> Barcode/RFID tracking, automated bin location &amp; dispatch.</li>" +
            "<li><b>• CMMS:</b> Machine downtime alerts &amp; preventative maintenance scheduling.</li>" +
            "</ul>100% custom-tailored with zero per-seat monthly license bloat.",
          quickReplies: [
            { label: "Discuss Manufacturing Tech", intentId: "contact" },
            { label: "Meet Sunil Shetty", intentId: "team" },
            { label: "Explore Our 15 Projects", intentId: "work" },
          ],
        }),
      },
      {
        id: "services",
        keywords: [
          "service",
          "services",
          "what do you do",
          "what do you offer",
          "disciplines",
          "offerings",
          "capabilities",
          "what can you build",
          "solutions",
        ],
        reply: () => ({
          html:
            "<b>Six Disciplines. One Accountable Team:</b><ul>" +
            "<li><b>1. Web Design &amp; Development:</b> Sub-1s load times, Next.js 15, high-converting UI.</li>" +
            "<li><b>2. Solution-Based Premium Software:</b> ERP, MES, custom CRMs, client portals.</li>" +
            "<li><b>3. SEO &amp; Organic Growth:</b> Deep technical SEO, Core Web Vitals, Top 3 Google rank.</li>" +
            "<li><b>4. Performance Marketing:</b> Paid acquisition measured by revenue, averaging 4.8x ROAS.</li>" +
            "<li><b>5. Custom AI Chatbots:</b> Zero-latency, on-site intelligent assistants capturing leads 24/7.</li>" +
            "<li><b>6. Mobile App Development:</b> Scalable iOS &amp; Android native/cross-platform apps.</li>" +
            "</ul>",
          quickReplies: [
            { label: "Web Development", intentId: "webdesign" },
            { label: "Manufacturing ERP/MES", intentId: "manufacturing" },
            { label: "SEO & Growth", intentId: "seo" },
            { label: "Performance Marketing", intentId: "marketing" },
            { label: "See 15 Live Sites", intentId: "work" },
            { label: "Get a Proposal", intentId: "pricing" },
          ],
        }),
      },
      {
        id: "webdesign",
        keywords: [
          "website",
          "web design",
          "web development",
          "landing page",
          "redesign",
          "frontend",
          "ui ux",
          "nextjs",
          "react",
          "speed",
        ],
        reply: () => ({
          html:
            "<b>Web Design &amp; Engineering:</b><br/>" +
            "We build bespoke web platforms engineered to load in <b>under 1 second</b>, look stunning across every device, and turn visitors into customers. Built with Next.js 15, TypeScript, and fluid micro-animations.",
          quickReplies: [
            { label: "See Our 15 Projects", intentId: "work" },
            { label: "How fast is turnaround?", intentId: "process" },
            { label: "Start Website Project", intentId: "contact" },
          ],
        }),
      },
      {
        id: "software",
        keywords: [
          "software",
          "saas",
          "custom software",
          "internal tool",
          "crm",
          "dashboard",
          "portal",
          "backend",
          "database",
          "api",
        ],
        reply: () => ({
          html:
            "<b>Solution-Based Premium Software:</b><br/>" +
            "We build tailor-made CRMs, manufacturing ERP/MES modules, executive dashboards, and automated internal platforms engineered around your exact operations.",
          quickReplies: [
            { label: "Manufacturing ERP/MES", intentId: "manufacturing" },
            { label: "Talk to Founder Sunil", intentId: "team" },
            { label: "Get a Custom Quote", intentId: "contact" },
          ],
        }),
      },
      {
        id: "seo",
        keywords: [
          "seo",
          "search engine",
          "google ranking",
          "rank on google",
          "organic traffic",
          "keywords",
          "google search",
          "serp",
        ],
        reply: () => ({
          html:
            "<b>Technical SEO &amp; Organic Growth:</b><br/>" +
            "We optimize site speed, semantic architecture, structured schema, and high-intent keyword ranking so customers actively searching for your services find you on Google.",
          quickReplies: [
            { label: "Performance Marketing", intentId: "marketing" },
            { label: "Request an SEO Audit", intentId: "contact" },
          ],
        }),
      },
      {
        id: "marketing",
        keywords: [
          "marketing",
          "ads",
          "advertising",
          "social media",
          "campaign",
          "roas",
          "roi",
          "performance marketing",
          "google ads",
          "meta ads",
          "leads",
        ],
        reply: () => ({
          html:
            "<b>Performance Marketing:</b><br/>" +
            "We focus purely on customer acquisition and revenue attribution, delivering an <b>average 4.8x ROAS</b> across Meta, Google Ads, and B2B LinkedIn campaigns.",
          quickReplies: [
            { label: "See Revenue Track Record", intentId: "vision" },
            { label: "Launch Paid Campaign", intentId: "contact" },
          ],
        }),
      },
      {
        id: "ai_chatbot_service",
        keywords: [
          "chatbot",
          "ai bot",
          "ai assistant",
          "chat assistant",
          "virtual assistant",
          "bot for website",
        ],
        reply: () => ({
          html:
            "<b>Custom AI Chatbots &amp; Concierges:</b><br/>" +
            "This assistant is a live demonstration! We deploy zero-latency, private chat agents trained on your business catalog and FAQs to capture leads 24/7.",
          quickReplies: [
            { label: "Get an AI bot for my site", intentId: "contact" },
            { label: "Explore Other Services", intentId: "services" },
          ],
        }),
      },
      {
        id: "app_development",
        keywords: [
          "app development",
          "mobile app",
          "mobile apps",
          "ios app",
          "android app",
          "react native",
          "flutter",
        ],
        reply: () => ({
          html:
            "<b>Mobile App Development:</b><br/>" +
            "We craft native &amp; cross-platform iOS and Android apps with fluid animations, offline caching, push notifications, and resilient cloud backends.",
          quickReplies: [
            { label: "Discuss App Specs", intentId: "contact" },
            { label: "Meet Founder", intentId: "team" },
          ],
        }),
      },
      {
        id: "work",
        keywords: [
          "work",
          "portfolio",
          "projects",
          "project",
          "about project",
          "about projects",
          "clients",
          "examples",
          "case studies",
          "past work",
          "show work",
          "list projects",
          "websites you built",
          "15 projects",
          "selected work",
        ],
        reply: () => ({
          html:
            "<b>15 Engagements. One Standard. Every project is live in production:</b><br/><br/>" +
            "<b>🏢 Real Estate &amp; Architecture:</b><br/>" +
            "• <b>Elite Property DXB</b> (<a href='https://elitepropertydxb.com/' target='_blank'>elitepropertydxb.com</a>) — AED 500M+ active listings<br/>" +
            "• <b>Homeland</b> (<a href='https://www.homeland.ae/' target='_blank'>homeland.ae</a>) — UAE Property &amp; Investment portal<br/>" +
            "• <b>The Capital Constructions</b> (<a href='https://thecapitalconstructions.com/' target='_blank'>thecapitalconstructions.com</a>) — Mega-infrastructure web portal<br/>" +
            "• <b>Zenaum</b> (<a href='http://zenaum.in/' target='_blank'>zenaum.in</a>) — Architecture &amp; spatial design monograph<br/>" +
            "• <b>Inland Indoors</b> (<a href='https://www.inlandindoors.com/' target='_blank'>inlandindoors.com</a>) — Turnkey luxury interior architecture<br/>" +
            "• <b>Classic Tuff</b> (<a href='https://classictuff.in/' target='_blank'>classictuff.in</a>) — Glass &amp; industrial architecture<br/><br/>" +
            "<b>🛍️ E-Commerce &amp; D2C:</b><br/>" +
            "• <b>NE Native</b> (<a href='https://neinative.com/' target='_blank'>neinative.com</a>) — 50,000+ orders shipped<br/>" +
            "• <b>Tyohar Mart</b> (<a href='https://tyoharmart.com/' target='_blank'>tyoharmart.com</a>) — Zero downtime festival shopping<br/>" +
            "• <b>Pebble Grey</b> (<a href='https://pebblegrey.in/' target='_blank'>pebblegrey.in</a>) — 140% boost in average order value<br/><br/>" +
            "<b>⚡ Tech, Enterprise &amp; Education:</b><br/>" +
            "• <b>Alfatech</b> (<a href='https://myalfatech.com/' target='_blank'>myalfatech.com</a>) — Industrial robotics &amp; automation<br/>" +
            "• <b>Ikigyan</b> (<a href='https://ikigyan.com/' target='_blank'>ikigyan.com</a>) — Sub-second interactive LMS platform<br/>" +
            "• <b>RCIS</b> (<a href='https://rcis.in/' target='_blank'>rcis.in</a>) — Educational institution of 5,000+ students<br/><br/>" +
            "<b>✨ Luxury, Events &amp; Wellness:</b><br/>" +
            "• <b>ZMZ Events</b> (<a href='https://zmzevents.com' target='_blank'>zmzevents.com</a>) — Stadium-scale concert productions<br/>" +
            "• <b>Golden Eventz</b> (<a href='https://www.goldeneventz.co.in/' target='_blank'>goldeneventz.co.in</a>) — 300+ documented weddings<br/>" +
            "• <b>Aadhi Yoga</b> (<a href='https://aadhiyoga.in/' target='_blank'>aadhiyoga.in</a>) — 4.2x lift in workshop bookings",
          quickReplies: [
            { label: "Real Estate & Architecture", intentId: "work_realestate" },
            { label: "E-Commerce & D2C", intentId: "work_ecommerce" },
            { label: "Jump to Interactive Showcase", intentId: "__goto_work" },
            { label: "Start Your Project", intentId: "contact" },
          ],
        }),
      },
      {
        id: "work_realestate",
        keywords: [
          "real estate",
          "property",
          "real estate projects",
          "construction projects",
          "architecture projects",
          "property websites",
          "real estate work",
        ],
        reply: () => ({
          html:
            "<b>Our Real Estate, Construction &amp; Architecture Work:</b><ul>" +
            "<li><b>• Elite Property DXB</b> (<a href='https://elitepropertydxb.com/' target='_blank'>elitepropertydxb.com</a>) — <i>Dubai Ultra-Luxury Real Estate</i> (AED 500M+ in active listings).</li>" +
            "<li><b>• Homeland</b> (<a href='https://www.homeland.ae/' target='_blank'>homeland.ae</a>) — <i>UAE Property &amp; Investment Advisory</i> (Advisory platform trusted by GCC investors).</li>" +
            "<li><b>• The Capital Constructions</b> (<a href='https://thecapitalconstructions.com/' target='_blank'>thecapitalconstructions.com</a>) — <i>Infrastructure &amp; Commercial Buildings</i> (Portfolios delivered at mega-development scale).</li>" +
            "<li><b>• Zenaum</b> (<a href='http://zenaum.in/' target='_blank'>zenaum.in</a>) — <i>Architecture &amp; Spatial Engineering</i> (Nominated for regional design award).</li>" +
            "<li><b>• Inland Indoors</b> (<a href='https://www.inlandindoors.com/' target='_blank'>inlandindoors.com</a>) — <i>Turnkey Interior Architecture</i> (A gallery of finished luxury interiors).</li>" +
            "<li><b>• Classic Tuff</b> (<a href='https://classictuff.in/' target='_blank'>classictuff.in</a>) — <i>Glass &amp; Industrial Architecture</i> (2.8x lift in enterprise inquiries).</li>" +
            "</ul>",
          quickReplies: [
            { label: "View in Live Showcase", intentId: "__goto_work" },
            { label: "Build a Real Estate Portal", intentId: "contact" },
            { label: "See All 15 Projects", intentId: "work" },
          ],
        }),
      },
      {
        id: "work_ecommerce",
        keywords: [
          "ecommerce",
          "e-commerce",
          "shop",
          "store",
          "d2c",
          "ecommerce projects",
          "online store",
        ],
        reply: () => ({
          html:
            "<b>Our E-Commerce &amp; D2C Work:</b><ul>" +
            "<li><b>• NE Native</b> (<a href='https://neinative.com/' target='_blank'>neinative.com</a>) — <i>Authentic Regional Organic D2C</i> (50,000+ orders shipped nationwide).</li>" +
            "<li><b>• Tyohar Mart</b> (<a href='https://tyoharmart.com/' target='_blank'>tyoharmart.com</a>) — <i>Festive Marketplace &amp; High-Volume Retail</i> (Zero downtime through peak festival spikes).</li>" +
            "<li><b>• Pebble Grey</b> (<a href='https://pebblegrey.in/' target='_blank'>pebblegrey.in</a>) — <i>Luxury Lifestyle &amp; Interior Decor</i> (140% boost in average order value).</li>" +
            "</ul>",
          quickReplies: [
            { label: "Build an E-Commerce Platform", intentId: "contact" },
            { label: "See All 15 Projects", intentId: "work" },
          ],
        }),
      },
      {
        id: "team",
        keywords: [
          "team",
          "who works",
          "founder",
          "founders",
          "ceo",
          "leadership",
          "employees",
          "staff",
          "people",
          "sunil",
          "sunil shetty",
          "zero to one",
          "who is founder",
        ],
        reply: () => ({
          html:
            "<b>Leadership at Day One:</b><br/><br/>" +
            "<b>Sunil Shetty (He/Him)</b> — <i>Founder &amp; Systems Architect</i><br/>" +
            "Building <b>ZERO TO ONE BRAND</b>. Sunil leads technical strategy, bespoke enterprise architectures, and manufacturing software systems (<b>ERP • MES • QMS • WMS • CMMS</b>).<br/><br/>" +
            "You collaborate directly with the founder — zero junior handoffs or misaligned communication.",
          quickReplies: [
            { label: "Message Sunil on WhatsApp", intentId: "contact" },
            { label: "Jump to Leadership Section", intentId: "__goto_team" },
            { label: "Manufacturing Software", intentId: "manufacturing" },
          ],
        }),
      },
      {
        id: "vision",
        keywords: [
          "why day one",
          "why choose you",
          "results",
          "standards",
          "principles",
          "stats",
          "revenue",
          "track record",
          "differentiator",
          "philosophy",
        ],
        reply: () => ({
          html:
            "<b>The Studio Standard — Why Brands Partner with Day One:</b><ul>" +
            "<li><b>1. Full-Stack Accountability:</b> One team designs, builds, ranks, and markets your product.</li>" +
            "<li><b>2. Proven Business Results:</b> <b>₹3 Cr+</b> in client revenue generated.</li>" +
            "<li><b>3. Direct Founder Ownership:</b> Work directly with Sunil Shetty and senior engineers.</li>" +
            "<li><b>4. 100% Bespoke Code:</b> Zero bloated templates, built for sub-second performance.</li>" +
            "<li><b>5. Honest Timelines &amp; Pricing:</b> Fixed milestone quotes with zero scope surprises.</li>" +
            "</ul>",
          quickReplies: [
            { label: "See Our 15 Projects", intentId: "work" },
            { label: "Book a Strategy Call", intentId: "contact" },
          ],
        }),
      },
      {
        id: "pricing",
        keywords: [
          "price",
          "pricing",
          "cost",
          "how much",
          "budget",
          "quote",
          "charges",
          "rate",
          "fees",
          "proposal",
          "estimate",
        ],
        reply: () => ({
          html:
            "<b>Transparent, Milestone-Based Pricing:</b><br/><br/>" +
            "We structure all engagements with <b>fixed milestone payments</b> — no surprise hourly overages. High-converting landing pages, custom SaaS applications, mobile apps, and manufacturing ERP suites have clear upfront milestones.<br/><br/>" +
            "Book a quick 10-minute discovery call with <b>Sunil Shetty</b> for a tailored scope and instant proposal.",
          quickReplies: [
            { label: "Get a Fixed Quote", intentId: "contact" },
            { label: "Explore Our Work", intentId: "work" },
          ],
        }),
      },
      {
        id: "process",
        keywords: [
          "process",
          "how does it work",
          "how do you work",
          "timeline",
          "how long",
          "turnaround",
          "approach",
          "methodology",
          "steps",
          "duration",
        ],
        reply: () => ({
          html:
            "<b>Our 5-Step Delivery Lifecycle:</b><ul>" +
            "<li><b>1. Discovery &amp; Scope:</b> Deep dive into requirements, architecture, and revenue targets.</li>" +
            "<li><b>2. UI/UX Prototype:</b> High-fidelity design prototypes engineered for high conversion.</li>" +
            "<li><b>3. Full-Stack Development:</b> Next.js 15, backend APIs, and rigorous QA benchmarks.</li>" +
            "<li><b>4. Launch &amp; SEO Wiring:</b> Zero-downtime deployment with Core Web Vitals optimization.</li>" +
            "<li><b>5. Growth &amp; Scaling:</b> Ongoing performance campaigns, feature iterations, and analytics.</li>" +
            "</ul><b>Timelines:</b> High-converting websites: ~1–2 weeks; Custom Software &amp; Apps: ~4–8 weeks.",
          quickReplies: [
            { label: "Start Your Project", intentId: "contact" },
            { label: "Meet Founder", intentId: "team" },
          ],
        }),
      },
      {
        id: "location",
        keywords: [
          "location",
          "address",
          "based in",
          "office",
          "where are you",
          "city",
          "mumbai",
          "bkc",
          "nexus tech tower",
          "where is office",
        ],
        reply: () => ({
          html:
            "<b>Studio Headquarters:</b><br/><br/>" +
            "<b>Day One Studio</b><br/>" +
            "Level 8, Nexus Tech Tower<br/>" +
            "Bandra Kurla Complex (BKC), Mumbai 400051, India.<br/><br/>" +
            "We serve clients locally in Mumbai, across India, and globally across UAE/Dubai and North America.",
          quickReplies: [
            { label: "Connect with Studio", intentId: "contact" },
            { label: "Our Services", intentId: "services" },
          ],
        }),
      },
      {
        id: "contact",
        keywords: [
          "contact",
          "call",
          "phone",
          "whatsapp",
          "email",
          "reach",
          "talk to",
          "speak to",
          "get in touch",
          "consultation",
          "hire",
          "book",
          "meeting",
        ],
        reply: () => {
          onOpenContact();
          return {
            html:
              "<b>Let's build something exceptional together!</b><br/><br/>" +
              "I've opened our <b>Direct Contact Card</b> on your screen. You can WhatsApp founder <b>Sunil Shetty</b> directly, or reach our studio inbox:<ul>" +
              "<li><a href='mailto:hello@dayonebrand.com'>hello@dayonebrand.com</a></li>" +
              "<li><a href='mailto:contact@dayonebrand.com'>contact@dayonebrand.com</a></li>" +
              "</ul>",
            quickReplies: [
              { label: "Explore Our Work", intentId: "work" },
              { label: "Check Services", intentId: "services" },
            ],
          };
        },
      },
      {
        id: "tech_stack",
        keywords: [
          "tech stack",
          "technology",
          "frameworks",
          "languages",
          "code",
          "nextjs",
          "react",
          "typescript",
          "node",
          "python",
          "tailwind",
          "hosting",
          "vercel",
          "database",
        ],
        reply: () => ({
          html:
            "<b>Our Modern Engineering Stack:</b><ul>" +
            "<li><b>• Frontend:</b> Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Canvas WebGL.</li>" +
            "<li><b>• Backend &amp; APIs:</b> Node.js, Python, PostgreSQL, Redis, REST &amp; GraphQL.</li>" +
            "<li><b>• Mobile:</b> React Native, Flutter, iOS &amp; Android native tooling.</li>" +
            "<li><b>• Cloud &amp; Edge:</b> Vercel Edge, AWS, Cloudflare, Docker.</li>" +
            "<li><b>• Manufacturing Tech:</b> Custom ERP/MES architectures, IoT/PLC telemetry, automated reporting.</li>" +
            "</ul>",
          quickReplies: [
            { label: "Manufacturing Software", intentId: "manufacturing" },
            { label: "Discuss Architecture", intentId: "contact" },
          ],
        }),
      },
      {
        id: "privacy_terms",
        keywords: [
          "privacy",
          "terms",
          "policy",
          "data",
          "legal",
          "confidentiality",
          "nda",
          "security",
        ],
        reply: () => ({
          html:
            "<b>Privacy, NDA &amp; IP Protection:</b><br/>" +
            "We adhere to strict confidentiality. All client agreements include full NDA protection, and 100% of the code, designs, and intellectual property remain solely yours upon delivery.<br/><br/>" +
            "View our <a href='/privacy-policy'>Privacy Policy</a> &amp; <a href='/terms-conditions'>Terms &amp; Conditions</a>.",
          quickReplies: [
            { label: "Back to Services", intentId: "services" },
            { label: "Get in Touch", intentId: "contact" },
          ],
        }),
      },
      {
        id: "thanks",
        keywords: [
          "thank",
          "thanks",
          "thx",
          "appreciate",
          "cool",
          "great",
          "awesome",
          "nice",
          "perfect",
          "good bot",
        ],
        reply: () => ({
          html: "You're very welcome! Is there anything else regarding our manufacturing suites, services, live projects, or founder Sunil Shetty I can assist with?",
          quickReplies: [
            { label: "Start a Conversation", intentId: "contact" },
            { label: "I'm all set, thanks!", intentId: "bye" },
          ],
        }),
      },
      {
        id: "bye",
        keywords: ["bye", "goodbye", "see you", "that's all", "nothing else", "no thanks", "exit", "close"],
        reply: () => ({
          html: "Thank you for visiting Day One! We're always here if you need to build or scale your digital operations. Have a great day!",
          quickReplies: [],
        }),
      },
    ],
    [onOpenContact]
  );

  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const keywordMatches = (lower: string, keyword: string) => {
    return new RegExp("(?:^|\\W)" + escapeRegex(keyword) + "(?:$|\\W)", "i").test(lower);
  };

  // Match specific individual project by name or number
  const matchSpecificProject = (lower: string) => {
    for (const p of ALL_PROJECTS) {
      if (
        p.keywords.some((kw) => keywordMatches(lower, kw)) ||
        lower.includes(p.name.toLowerCase()) ||
        lower === p.no ||
        lower === `project ${parseInt(p.no, 10)}`
      ) {
        return p;
      }
    }
    return null;
  };

  const matchIntent = (text: string) => {
    const lower = text.toLowerCase().trim();

    // Check individual project match first
    const matchedProject = matchSpecificProject(lower);
    if (matchedProject) {
      return {
        id: `project_${matchedProject.no}`,
        reply: () => ({
          html:
            `<b>Project #${matchedProject.no}: ${matchedProject.name}</b><br/>` +
            `<b>Category:</b> ${matchedProject.category}<br/>` +
            `<b>Tech &amp; Deliverables:</b> ${matchedProject.tag}<br/>` +
            `<p style="margin: 0.4rem 0;">${matchedProject.summary}</p>` +
            `<b>Key Result:</b> <span style="color: #00f0ff; font-weight: bold;">${matchedProject.result}</span><br/>` +
            `<b>Live URL:</b> <a href="${matchedProject.url}" target="_blank" rel="noopener noreferrer">${matchedProject.url}</a>`,
          quickReplies: [
            { label: "See all 15 projects", intentId: "work" },
            { label: "Start similar project", intentId: "contact" },
          ],
        }),
      };
    }

    // Score based matching across predefined intents
    let bestIntent: (typeof intents)[0] | null = null;
    let highestScore = 0;

    for (const intent of intents) {
      let score = 0;
      for (const kw of intent.keywords) {
        if (keywordMatches(lower, kw)) {
          score += kw.split(" ").length * 3; // multi-word matches carry higher weight
        } else if (lower.includes(kw)) {
          score += 1.5;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestIntent = intent;
      }
    }

    if (highestScore > 0 && bestIntent) {
      return bestIntent;
    }

    return null;
  };

  const findIntentById = (id: string) => {
    return intents.find((item) => item.id === id) || null;
  };

  const handleUserTurn = (displayText: string, forcedIntentId?: string) => {
    // remove previous quick replies
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, quickReplies: undefined }))
    );

    const currentTimeStr = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: displayText,
      time: currentTimeStr,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Handle in-page scrolling navigation hooks
    if (forcedIntentId === "__goto_work") {
      if (onNavigate) onNavigate("work");
      else {
        const el = document.getElementById("work");
        el?.scrollIntoView({ behavior: "smooth" });
      }
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            html: "Navigated you to the <b>Selected Work</b> section! Click any project to see its key results and live site link.",
            quickReplies: [
              { label: "Real Estate Work", intentId: "work_realestate" },
              { label: "E-Commerce Work", intentId: "work_ecommerce" },
              { label: "Manufacturing Tech", intentId: "manufacturing" },
              { label: "Contact Sunil Shetty", intentId: "contact" },
            ],
          },
        ]);
      }, 1900);
      return;
    }

    if (forcedIntentId === "__goto_team") {
      if (onNavigate) onNavigate("team");
      else {
        const el = document.getElementById("team");
        el?.scrollIntoView({ behavior: "smooth" });
      }
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            html: "Here is our <b>Leadership</b> section — meet founder <b>Sunil Shetty</b> (Building ZERO TO ONE BRAND).",
            quickReplies: [
              { label: "Message Sunil on WhatsApp", intentId: "contact" },
              { label: "Our 6 Disciplines", intentId: "services" },
            ],
          },
        ]);
      }, 1900);
      return;
    }

    // Realistic 2-Second Thinking Simulation
    setIsTyping(true);
    const thinkingDelay = 1900 + Math.random() * 250; // ~2.0 seconds

    setTimeout(() => {
      setIsTyping(false);
      const intent = forcedIntentId
        ? findIntentById(forcedIntentId)
        : matchIntent(displayText);

      const result = intent
        ? intent.reply()
        : {
            html:
              "I have complete knowledge on <b>Day One</b>, our founder <b>Sunil Shetty</b>, <b>manufacturing ERP/MES platforms</b>, <b>6 core disciplines</b>, and all <b>15 live client projects</b>.<br/><br/>" +
              "Could you clarify what you'd like to know, or pick a topic below?",
            quickReplies: mainMenu(),
          };

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        html: result.html,
        quickReplies: result.quickReplies || undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, thinkingDelay);
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setHasSeen(true);
      if (!greetedRef.current) {
        greetedRef.current = true;
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            {
              id: "greet",
              sender: "bot",
              time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
              html:
                "Hi there! I'm the <b>Day One Studio Assistant</b> — running 100% on-site with full details on our manufacturing software, 6 core disciplines, 15 live client projects, and founder Sunil Shetty.<br/><br/>" +
                "How can I assist your business today?",
              quickReplies: mainMenu(),
            },
          ]);
        }, 1800);
      }
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      setIsOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;
    setInputText("");
    handleUserTurn(text);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[400]">
        <Magnetic strength={0.25}>
          <button
            type="button"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#1868e8] via-[#38bdf8] to-[#00f0ff] text-white flex items-center justify-center cursor-pointer border border-white/20 shadow-[0_8px_30px_rgba(0,240,255,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]"
            onClick={handleToggle}
            aria-label="Open chat assistant"
            aria-expanded={isOpen}
            aria-controls="chatInterface"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12.5C4 7.80558 7.94903 4 12.8 4C17.651 4 21.6 7.80558 21.6 12.5C21.6 17.1944 17.651 21 12.8 21C11.2678 21 9.82814 20.626 8.57324 19.9666L4.4 21L5.53892 17.3768C4.57706 16.1706 4 14.3945 4 12.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="12.5" r="1" fill="currentColor" />
              <circle cx="12.8" cy="12.5" r="1" fill="currentColor" />
              <circle cx="16.6" cy="12.5" r="1" fill="currentColor" />
            </svg>
            {!hasSeen && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-md animate-pulse">
                1
              </span>
            )}
          </button>
        </Magnetic>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#0c0a1b]/80 backdrop-blur-md z-[450] transition-opacity duration-400 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Window Panel */}
      <div
        className={`fixed bottom-[5.5rem] right-4 sm:right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-7.5rem)] bg-[#0e0d22]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_1rem_3rem_rgba(0,0,0,0.8)] flex flex-col z-[500] transition-all duration-400 overflow-hidden origin-bottom-right ${
          isOpen ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "translate-y-4 scale-95 opacity-0 pointer-events-none"
        }`}
        id="chatInterface"
        role="region"
        aria-label="Chat with Day One"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#14132b]/90">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full border border-[#00f0ff]/30 overflow-hidden flex-shrink-0 bg-[#0c0a1b] p-1.5 flex items-center justify-center">
              <Image
                src="/assets/day1-emblem-dark.png"
                alt="Day One"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00f0ff] rounded-full border-2 border-[#14132b]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-[0.95rem] tracking-tight">Day One AI</span>
                <span className="text-[9px] font-mono font-bold text-[#00f0ff] bg-[#00f0ff]/10 px-1.5 py-0.2 rounded border border-[#00f0ff]/30">LIVE</span>
              </div>
              <div className="flex items-center gap-1.5 text-[0.65rem] text-white/50 uppercase tracking-wider font-semibold mt-0.5">
                Official Studio Assistant
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-transparent border-none text-white/50 cursor-pointer p-1.5 rounded-full transition-colors duration-300 hover:bg-white/10 hover:text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message Log */}
        <div
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
          ref={chatBodyRef}
        >
          <div className="text-center text-[0.68rem] text-white/40 uppercase tracking-widest my-1">
            Zero Latency • Local Knowledge Engine
          </div>

          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              <div className={`flex flex-col gap-1.5 ${msg.sender === "bot" ? "items-start" : "items-end"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-[0.84rem] leading-relaxed shadow-sm max-w-[88%] ${
                    msg.sender === "bot"
                      ? "bg-[#14133b] text-[#fcfeea] rounded-tl-sm border border-white/10"
                      : "bg-gradient-to-r from-[#1868e8] to-[#00f0ff] text-white rounded-tr-sm font-medium"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: msg.html || msg.text || "" }} />
                </div>
                <span className="text-[0.6rem] text-white/40 px-1">
                  {msg.time || currentTime}
                </span>
              </div>

              {msg.quickReplies && msg.quickReplies.length > 0 && (
                <div className="flex flex-col gap-1.5 w-full max-w-[88%] pt-1">
                  {msg.quickReplies.map((r, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="self-start text-left bg-white/[0.03] border border-[#00f0ff]/30 text-[#00f0ff] text-[0.74rem] font-medium px-3.5 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                      onClick={() => handleUserTurn(r.label, r.intentId)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Thinking Indicator (2-Second Realistic State) */}
          {isTyping && (
            <div className="self-start flex flex-col gap-1.5">
              <div className="bg-[#14133b] px-4 py-2.5 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-2 h-10 shadow-sm">
                <span className="text-[0.72rem] text-white/60 font-medium mr-1">Day One is thinking</span>
                <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0c0a1b]/90 backdrop-blur-md border-t border-white/10 flex flex-col gap-2">
          <form className="flex items-center gap-2" autoComplete="off" onSubmit={handleFormSubmit}>
            <button
              type="button"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 cursor-pointer transition-colors duration-300 hover:bg-white/10 hover:text-white shrink-0"
              aria-label="Direct WhatsApp"
              title="Open Contact Card"
              onClick={onOpenContact}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                id="chatInput"
                ref={inputRef}
                placeholder="Ask about ERP, websites, Sunil Shetty…"
                aria-label="Type your message"
                maxLength={300}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-9 bg-[#14133b] border border-white/10 rounded-full px-4 text-white text-[0.84rem] outline-none transition-colors duration-300 focus:border-[#00f0ff] placeholder:text-white/40"
              />
            </div>

            <button
              type="submit"
              className={`flex items-center justify-center w-9 h-9 rounded-full border-none cursor-pointer transition-transform duration-300 shrink-0 ${
                inputText.trim() ? "bg-gradient-to-r from-[#1868e8] to-[#00f0ff] text-white hover:scale-105 shadow-md shadow-[#00f0ff]/30" : "bg-[#14133b] text-white/40 hover:text-white"
              }`}
              aria-label="Send message"
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 10L17.5 2.5L11.5 17.5L9.16667 11.25L2.5 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9.16667 11.25L14 6.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          <div className="w-[30%] h-[3px] bg-white/20 rounded-full mx-auto mt-0.5" />
        </div>
      </div>
    </>
  );
}
