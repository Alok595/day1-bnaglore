"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

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
  quickReplies?: QuickReply[];
}

interface ChatAssistantProps {
  onOpenContact: () => void;
  onNavigate?: (targetId: string) => void;
}

interface ProjectInfo {
  no: string;
  name: string;
  url: string;
  category: string;
  summary: string;
  keywords: string[];
}

const ALL_PROJECTS: ProjectInfo[] = [
  {
    no: "01",
    name: "Classic Tuff",
    url: "https://classictuff.in/",
    category: "Industrial & Manufacturing",
    summary: "High-performance website and digital brand presence for a premier toughened glass manufacturer.",
    keywords: ["classic tuff", "glass", "manufacturing", "industrial", "tuff glass"],
  },
  {
    no: "02",
    name: "Aadhi Yoga",
    url: "https://aadhiyoga.in/",
    category: "Health & Wellness",
    summary: "Serene, conversion-focused digital sanctuary for a classical yoga and holistic wellness academy.",
    keywords: ["aadhi yoga", "yoga", "wellness", "fitness", "meditation", "health"],
  },
  {
    no: "03",
    name: "Ikigyan",
    url: "https://ikigyan.com/",
    category: "EdTech & Learning",
    summary: "Modern interactive learning and experiential education platform designed for seamless discovery.",
    keywords: ["ikigyan", "edtech", "education", "learning", "courses", "student"],
  },
  {
    no: "04",
    name: "Alfatech",
    url: "https://myalfatech.com/",
    category: "Engineering & Automation",
    summary: "Robust digital presence and solutions portal for advanced engineering and automation services.",
    keywords: ["alfatech", "automation", "engineering", "tech solutions", "hardware"],
  },
  {
    no: "05",
    name: "Pebble Grey",
    url: "https://pebblegrey.in/",
    category: "Luxury Lifestyle & Decor",
    summary: "Sleek, minimalist e-commerce and catalog experience crafted for luxury home aesthetics and décor.",
    keywords: ["pebble grey", "decor", "home decor", "lifestyle", "interior product"],
  },
  {
    no: "06",
    name: "ZMZ Events",
    url: "https://zmzevents.com",
    category: "Events & Entertainment",
    summary: "High-impact visual showcase for bespoke luxury event management, concerts, and brand experiences.",
    keywords: ["zmz events", "events", "event management", "parties", "concerts"],
  },
  {
    no: "07",
    name: "Zenaum",
    url: "http://zenaum.in/",
    category: "Architecture & Design",
    summary: "Architectural portfolio platform highlighting contemporary spatial design and structural innovation.",
    keywords: ["zenaum", "architecture", "interior design", "structures", "building design"],
  },
  {
    no: "08",
    name: "NE Native",
    url: "https://neinative.com/",
    category: "Regional Organic E-Commerce",
    summary: "Direct-to-consumer e-commerce marketplace celebrating authentic, indigenous products from Northeast India.",
    keywords: ["ne native", "northeast", "indigenous", "organic", "d2c", "ecommerce"],
  },
  {
    no: "09",
    name: "Tyohar Mart",
    url: "https://tyoharmart.com/",
    category: "Festive E-Commerce Marketplace",
    summary: "Scalable festive celebration marketplace engineered for rapid checkout and high-volume seasonal spikes.",
    keywords: ["tyohar mart", "tyohar", "festival", "sweets", "gifts", "ecommerce", "shopping"],
  },
  {
    no: "10",
    name: "Golden Eventz",
    url: "https://www.goldeneventz.co.in/",
    category: "Wedding & Celebration Productions",
    summary: "Elegant portfolio website for premier destination weddings and lavish celebratory productions.",
    keywords: ["golden eventz", "wedding", "marriage", "celebration", "destination wedding"],
  },
  {
    no: "11",
    name: "Elite Property DXB",
    url: "https://elitepropertydxb.com/",
    category: "Dubai Real Estate",
    summary: "Ultra-luxury property portal showcasing prime real estate listings, penthouses, and villas in Dubai.",
    keywords: ["elite property dxb", "elite property", "dubai", "dxb", "real estate", "property dubai"],
  },
  {
    no: "12",
    name: "The Capital Constructions",
    url: "https://thecapitalconstructions.com/",
    category: "Construction & Infrastructure",
    summary: "Corporate web portal for a premier infrastructure and commercial construction enterprise.",
    keywords: ["capital constructions", "construction", "infrastructure", "builders", "contractor"],
  },
  {
    no: "13",
    name: "Homeland",
    url: "https://www.homeland.ae/",
    category: "UAE Property & Investments",
    summary: "Comprehensive property discovery and investment advisory portal for the UAE real estate market.",
    keywords: ["homeland", "homeland ae", "uae property", "dubai real estate", "invest uae"],
  },
  {
    no: "14",
    name: "Inland Indoors",
    url: "https://www.inlandindoors.com/",
    category: "Turnkey Interior Architecture",
    summary: "Portfolio and client consultation platform for bespoke residential and commercial interior spaces.",
    keywords: ["inland indoors", "interior", "interior design", "decor", "home interiors"],
  },
  {
    no: "15",
    name: "RCIS",
    url: "https://rcis.in/",
    category: "Institutional & Education",
    summary: "Dynamic institutional portal facilitating admissions, academic programs, and campus communications.",
    keywords: ["rcis", "school", "college", "institute", "education", "academy"],
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

  const mainMenu = (): QuickReply[] => [
    { label: "Our Services (6)", intentId: "services" },
    { label: "Selected Work (15)", intentId: "work" },
    { label: "Leadership Team", intentId: "team" },
    { label: "Why Day One?", intentId: "vision" },
    { label: "Pricing & Quotes", intentId: "pricing" },
    { label: "Get in Touch", intentId: "contact" },
  ];

  // Offline Knowledge Intents Engine
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
            "<b>Welcome to Day One!</b><br/>" +
            "I'm your on-site assistant, running 100% offline right in your browser. " +
            "I know everything about our <b>6 core disciplines</b>, <b>15+ live projects</b>, <b>founding team</b>, <b>pricing</b>, and <b>BKC Mumbai studio</b>.<br/><br/>" +
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
            "We are a full-service creative engineering & digital growth studio based in <b>Bandra Kurla Complex (BKC), Mumbai</b>.<br/><br/>" +
            "We were built specifically for businesses tired of managing five separate agencies. One dedicated, accountable team handles everything: <b>Design, Custom Software, SEO, Marketing, AI Bots, and Mobile Apps</b>.",
          quickReplies: [
            { label: "Explore Services", intentId: "services" },
            { label: "See Our 15 Projects", intentId: "work" },
            { label: "Meet the Team", intentId: "team" },
            { label: "Start a Project", intentId: "contact" },
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
            "We specialize across <b>6 core disciplines</b> under one single roof:<ul>" +
            "<li><b>1. Web Design &amp; Development</b> — Ultra-fast, sharp Next.js sites engineered for high conversion.</li>" +
            "<li><b>2. Solution-Based Premium Software</b> — Custom CRMs, dashboards, and internal workflow automations.</li>" +
            "<li><b>3. SEO &amp; Organic Growth</b> — Technical and on-page optimization so customers find you on Google.</li>" +
            "<li><b>4. Performance Marketing</b> — High-ROI paid ad funnels measured by revenue, not vanity impressions.</li>" +
            "<li><b>5. Custom AI Chatbots</b> — Offline/online intelligent bots (like me!) capturing leads 24/7.</li>" +
            "<li><b>6. Mobile App Development</b> — Native and cross-platform apps built for scalability.</li>" +
            "</ul>No messy agency handoffs — one team owns your entire product.",
          quickReplies: [
            { label: "Web Development", intentId: "webdesign" },
            { label: "Custom Software", intentId: "software" },
            { label: "AI Chatbots", intentId: "ai_chatbot_service" },
            { label: "Mobile Apps", intentId: "app_development" },
            { label: "SEO & Growth", intentId: "seo" },
            { label: "Performance Marketing", intentId: "marketing" },
            { label: "Get a Quote", intentId: "pricing" },
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
            "We craft bespoke web experiences that combine state-of-the-art visuals with lightning-fast performance. " +
            "Every site is engineered with modern frameworks (React, Next.js, TypeScript), smooth micro-animations, and conversion-focused architecture to turn visitors into clients.",
          quickReplies: [
            { label: "See Our Work", intentId: "work" },
            { label: "How much for a site?", intentId: "pricing" },
            { label: "Discuss Your Website", intentId: "contact" },
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
            "Off-the-shelf software rarely fits bespoke business processes. We build tailor-made platforms, internal tools, customer portals, automated billing systems, and custom CRMs that mirror how your business actually runs.",
          quickReplies: [
            { label: "Meet Engineering Lead", intentId: "team" },
            { label: "Discuss Requirements", intentId: "contact" },
            { label: "Other Services", intentId: "services" },
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
            "<b>Search Engine Optimization (SEO):</b><br/>" +
            "Our SEO engagements cover deep technical audits, lightning-fast Core Web Vitals, semantic schema, and high-intent keyword positioning. We get you ranked where customers are actively searching to buy.",
          quickReplies: [
            { label: "Performance Marketing", intentId: "marketing" },
            { label: "Book an Audit Call", intentId: "contact" },
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
          "roi",
          "performance marketing",
          "google ads",
          "meta ads",
          "facebook ads",
          "instagram ads",
          "leads",
          "lead generation",
        ],
        reply: () => ({
          html:
            "<b>Performance Marketing:</b><br/>" +
            "We don't care about vanity likes or impressions — we build customer acquisition funnels measured strictly by <b>ROAS (Return on Ad Spend)</b> and revenue. We handle creatives, ad copy, targeting, and post-click conversion rate optimization.",
          quickReplies: [
            { label: "See Revenue Track Record", intentId: "vision" },
            { label: "Start a Campaign", intentId: "contact" },
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
          "chat widget",
          "offline bot",
        ],
        reply: () => ({
          html:
            "<b>Custom AI Chatbots &amp; Assistants:</b><br/>" +
            "The assistant you're chatting with right now is a live demonstration! We build lightweight, privacy-focused, zero-latency chatbots trained on your company's exact catalog, FAQs, and services to capture leads 24/7.",
          quickReplies: [
            { label: "Get a bot for my site", intentId: "contact" },
            { label: "See other services", intentId: "services" },
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
          "ios apps",
          "android app",
          "android apps",
          "ios and android",
          "build an app",
          "build apps",
          "flutter",
          "react native",
        ],
        reply: () => ({
          html:
            "<b>Mobile App Development:</b><br/>" +
            "We engineer iOS &amp; Android native and cross-platform mobile apps with fluid animations, offline caching, push notifications, and resilient cloud backend architectures.",
          quickReplies: [
            { label: "Talk to Engineering Lead", intentId: "team" },
            { label: "Get an App Quote", intentId: "contact" },
          ],
        }),
      },
      {
        id: "work",
        keywords: [
          "work",
          "portfolio",
          "projects",
          "clients",
          "examples",
          "case stud",
          "past work",
          "show work",
          "list projects",
          "websites you built",
        ],
        reply: () => ({
          html:
            "<b>We have shipped 15+ live projects across diverse industries:</b><ul>" +
            ALL_PROJECTS.slice(0, 8)
              .map(
                (p) =>
                  `<li><b>${p.name}</b> (${p.category}) — <a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.url.replace("https://", "").replace("http://", "").replace(/\/$/, "")}</a></li>`
              )
              .join("") +
            "</ul>...plus <b>Golden Eventz</b>, <b>Elite Property DXB</b>, <b>The Capital Constructions</b>, <b>Homeland</b>, <b>Inland Indoors</b>, &amp; <b>RCIS</b>!",
          quickReplies: [
            { label: "Real Estate Projects", intentId: "work_realestate" },
            { label: "E-Commerce Projects", intentId: "work_ecommerce" },
            { label: "Events & Luxury", intentId: "work_events" },
            { label: "Jump to Work Section", intentId: "__goto_work" },
            { label: "Start Your Project", intentId: "contact" },
          ],
        }),
      },
      {
        id: "work_realestate",
        keywords: [
          "real estate",
          "property",
          "construction",
          "dubai property",
          "homeland",
          "elite property",
          "capital constructions",
          "inland indoors",
        ],
        reply: () => ({
          html:
            "<b>Our Real Estate, Property &amp; Construction Work:</b><ul>" +
            "<li><b>Homeland</b> (<a href='https://www.homeland.ae/' target='_blank'>homeland.ae</a>) — UAE Property &amp; Investments portal.</li>" +
            "<li><b>Elite Property DXB</b> (<a href='https://elitepropertydxb.com/' target='_blank'>elitepropertydxb.com</a>) — Luxury Dubai property showcase.</li>" +
            "<li><b>The Capital Constructions</b> (<a href='https://thecapitalconstructions.com/' target='_blank'>thecapitalconstructions.com</a>) — Infrastructure enterprise portal.</li>" +
            "<li><b>Inland Indoors</b> (<a href='https://www.inlandindoors.com/' target='_blank'>inlandindoors.com</a>) — Turnkey interior architecture.</li>" +
            "</ul>",
          quickReplies: [
            { label: "View on Website", intentId: "__goto_work" },
            { label: "Discuss a Property Portal", intentId: "contact" },
          ],
        }),
      },
      {
        id: "work_ecommerce",
        keywords: ["ecommerce", "e-commerce", "shop", "store", "d2c", "products", "mart", "ne native", "tyohar mart", "pebble grey"],
        reply: () => ({
          html:
            "<b>Our E-Commerce &amp; D2C Work:</b><ul>" +
            "<li><b>NE Native</b> (<a href='https://neinative.com/' target='_blank'>neinative.com</a>) — Authentic Northeast organic e-commerce.</li>" +
            "<li><b>Tyohar Mart</b> (<a href='https://tyoharmart.com/' target='_blank'>tyoharmart.com</a>) — Festive celebrations &amp; gifting marketplace.</li>" +
            "<li><b>Pebble Grey</b> (<a href='https://pebblegrey.in/' target='_blank'>pebblegrey.in</a>) — Luxury home decor &amp; lifestyle.</li>" +
            "</ul>",
          quickReplies: [
            { label: "Build an E-Commerce Site", intentId: "contact" },
            { label: "All 15 Projects", intentId: "work" },
          ],
        }),
      },
      {
        id: "work_events",
        keywords: ["events", "wedding", "zmz", "golden eventz", "celebrations", "destination wedding"],
        reply: () => ({
          html:
            "<b>Our Events &amp; Entertainment Work:</b><ul>" +
            "<li><b>Golden Eventz</b> (<a href='https://www.goldeneventz.co.in/' target='_blank'>goldeneventz.co.in</a>) — Premier weddings &amp; grand celebrations.</li>" +
            "<li><b>ZMZ Events</b> (<a href='https://zmzevents.com' target='_blank'>zmzevents.com</a>) — Luxury corporate &amp; concert event management.</li>" +
            "</ul>",
          quickReplies: [
            { label: "Explore Work Section", intentId: "__goto_work" },
            { label: "Contact Team", intentId: "contact" },
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
          "alex",
          "sarah",
          "alex morgan",
          "sarah chen",
        ],
        reply: () => ({
          html:
            "<b>Meet the Founding Leadership at Day One:</b><ul>" +
            "<li><b>Alex Morgan</b> — <i>Founder &amp; Engineering Lead</i>.<br/>Directs product architecture, custom software development, and technical strategy for all client engagements.</li>" +
            "<li><b>Sarah Chen</b> — <i>Co-Founder &amp; Design Director</i>.<br/>Leads creative direction, brand systems, and UI/UX engineering from initial concept to high-converting launch.</li>" +
            "</ul>You work directly with the partners — no junior account managers or lost context.",
          quickReplies: [
            { label: "Message Alex on WhatsApp", intentId: "contact" },
            { label: "Message Sarah on WhatsApp", intentId: "contact" },
            { label: "Jump to Team Section", intentId: "__goto_team" },
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
            "<b>The Studio Standard — Why Ambitious Brands Choose Day One:</b><ul>" +
            "<li><b>1. Full-Stack Delivery</b> — One team designs, builds, ranks, and markets your product.</li>" +
            "<li><b>2. Proven Results</b> — <b>₹3 Cr+</b> in client revenue generated to date.</li>" +
            "<li><b>3. Dedicated Point of Contact</b> — Direct access to founders; you always know who owns your project.</li>" +
            "<li><b>4. Built for Scale</b> — Engineered with clean code and growth-ready architecture.</li>" +
            "<li><b>5. Honest Timelines &amp; Pricing</b> — No hidden costs or surprise scope changes.</li>" +
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
          "affordable",
          "expensive",
        ],
        reply: () => ({
          html:
            "<b>Transparent, Milestone-Based Pricing:</b><br/>" +
            "Every project has unique scope — a high-converting landing page, an e-commerce platform, or a full custom SaaS system have different requirements.<br/><br/>" +
            "We offer <b>fixed milestone quotes</b> with zero hidden fees. The fastest way to get a clear timeline &amp; quote is a quick 10-minute consultation call with our founders (free &amp; zero obligation).",
          quickReplies: [
            { label: "Get an Instant Quote", intentId: "contact" },
            { label: "See Our Work", intentId: "work" },
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
            "<b>Our 5-Step Project Roadmap:</b><ul>" +
            "<li><b>1. Discovery &amp; Strategy</b> — Deep dive into your business goals, target audience, and competitive edge.</li>" +
            "<li><b>2. UI/UX Architecture</b> — Interactive high-fidelity design prototypes crafted for maximum conversion.</li>" +
            "<li><b>3. Full-Stack Build</b> — Modern development with performance benchmarks and QA testing.</li>" +
            "<li><b>4. Launch &amp; SEO</b> — Flawless deployment with technical SEO and analytics wiring.</li>" +
            "<li><b>5. Scale &amp; Marketing</b> — Performance campaigns and feature expansion.</li>" +
            "</ul>Landing pages take ~1-2 weeks; custom software/apps take ~4-8 weeks.",
          quickReplies: [
            { label: "Start Your Project", intentId: "contact" },
            { label: "Meet the Team", intentId: "team" },
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
          "remote",
          "india",
          "global",
        ],
        reply: () => ({
          html:
            "<b>Our Studio Location:</b><br/>" +
            "<b>Day One Studio</b><br/>" +
            "Level 8, Nexus Tech Tower<br/>" +
            "Bandra Kurla Complex (BKC), Mumbai 400051, India.<br/><br/>" +
            "We collaborate with clients across Mumbai, pan-India, UAE/Dubai, and worldwide via asynchronous and real-time channels.",
          quickReplies: [
            { label: "Get in Touch", intentId: "contact" },
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
              "<b>Let's build something extraordinary together!</b><br/><br/>" +
              "I've opened our <b>Direct Contact Card</b> on your screen. You can tap to WhatsApp Alex Morgan or Sarah Chen directly, or email us at:<ul>" +
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
        ],
        reply: () => ({
          html:
            "<b>Our Technology &amp; Tooling Stack:</b><ul>" +
            "<li><b>Frontend:</b> Next.js 15+, React, TypeScript, Modern CSS/Tailwind, WebGL/Canvas micro-animations.</li>" +
            "<li><b>Backend &amp; APIs:</b> Node.js, Python, PostgreSQL, Redis, REST &amp; GraphQL.</li>" +
            "<li><b>Mobile:</b> React Native, Flutter, Swift, Kotlin.</li>" +
            "<li><b>Infrastructure:</b> Vercel, AWS, Cloudflare Edge, Docker.</li>" +
            "<li><b>AI &amp; Automation:</b> Custom NLP agents, vector retrieval, Webhook automations.</li>" +
            "</ul>",
          quickReplies: [
            { label: "Custom Software", intentId: "software" },
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
            "<b>Privacy, NDA &amp; Security:</b><br/>" +
            "We treat client intellectual property with complete confidentiality. All client agreements include strict non-disclosure terms, and your code &amp; design assets remain 100% your property.<br/><br/>" +
            "You can review our <a href='/privacy-policy'>Privacy Policy</a> and <a href='/terms-conditions'>Terms &amp; Conditions</a> anytime.",
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
          html: "You're very welcome! Is there anything else about our projects, services, or pricing I can help with?",
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
          html: "Thanks for stopping by Day One! I'll be right here if you need anything else. Have a fantastic day!",
          quickReplies: [],
        }),
      },
    ],
    [onOpenContact]
  );

  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const keywordMatches = (lower: string, keyword: string) => {
    return new RegExp("(?:^|\\W)" + escapeRegex(keyword) + "(?:$|\\W)", "i").test(
      lower
    );
  };

  // Match specific individual project by name
  const matchSpecificProject = (lower: string) => {
    for (const p of ALL_PROJECTS) {
      if (
        p.keywords.some((kw) => keywordMatches(lower, kw)) ||
        lower.includes(p.name.toLowerCase())
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
            `<p style="margin: 0.35rem 0;">${matchedProject.summary}</p>` +
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
          score += kw.split(" ").length * 2; // longer matching phrases carry higher weight
        } else if (lower.includes(kw)) {
          score += 1;
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

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: displayText,
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
            html: "Navigated you to the <b>Selected Work</b> section! You can click any project row to view the live website.",
            quickReplies: [
              { label: "Real Estate Work", intentId: "work_realestate" },
              { label: "E-Commerce Work", intentId: "work_ecommerce" },
              { label: "Contact the Team", intentId: "contact" },
            ],
          },
        ]);
      }, 400);
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
            html: "Here is our <b>Leadership Team</b> section — tap Alex Morgan or Sarah Chen to connect directly.",
            quickReplies: [
              { label: "Get in touch", intentId: "contact" },
              { label: "Our Services", intentId: "services" },
            ],
          },
        ]);
      }, 400);
      return;
    }

    setIsTyping(true);
    const delay = 350 + Math.random() * 250;

    setTimeout(() => {
      setIsTyping(false);
      const intent = forcedIntentId
        ? findIntentById(forcedIntentId)
        : matchIntent(displayText);

      const result = intent
        ? intent.reply()
        : {
            html:
              "I'm dedicated to answering everything about <b>Day One</b>, our <b>15 live projects</b>, <b>services</b>, <b>team</b>, and <b>pricing</b>.<br/><br/>" +
              "Could you clarify your question, or pick from these topics?",
            quickReplies: mainMenu(),
          };

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        html: result.html,
        quickReplies: result.quickReplies || undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, delay);
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
              html:
                "Hi! I'm the <b>Day One Assistant</b> — operating 100% on-site with full details on our services, 15+ live projects, team, and pricing.<br/><br/>" +
                "How can I help you today?",
              quickReplies: mainMenu(),
            },
          ]);
        }, 400);
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
      <button
        type="button"
        className={`chat-toggle ${isOpen ? "open" : ""} ${
          hasSeen ? "seen" : ""
        }`}
        id="chatToggle"
        aria-label="Open chat assistant"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <svg
          className="chat-toggle-icon chat-toggle-icon--open"
          width="24"
          height="24"
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
        <svg
          className="chat-toggle-icon chat-toggle-icon--close"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3L17 17M17 3L3 17"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        {!hasSeen && (
          <span className="chat-toggle-badge" id="chatToggleBadge">
            1
          </span>
        )}
      </button>

      <div
        className={`chat-panel ${isOpen ? "open" : ""}`}
        id="chatPanel"
        role="dialog"
        aria-modal="true"
        aria-label="Day One chat assistant"
        aria-hidden={!isOpen}
      >
        <div className="chat-panel-header">
          <div className="chat-panel-avatar !bg-transparent !p-0.5">
            <img
              src="/assets/day1-emblem-dark.png"
              alt="Day One"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="chat-panel-heading">
            <span className="chat-panel-title">Day One Assistant</span>
            <span className="chat-panel-status">
              <i />
              On-site Knowledge Assistant
            </span>
          </div>
          <button
            type="button"
            className="chat-panel-close"
            id="chatPanelClose"
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="chat-panel-body" id="chatBody" ref={chatBodyRef}>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              {msg.html ? (
                <div
                  className={`chat-msg ${
                    msg.sender === "bot" ? "chat-msg--bot" : "chat-msg--user"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.html }}
                />
              ) : (
                <div
                  className={`chat-msg ${
                    msg.sender === "bot" ? "chat-msg--bot" : "chat-msg--user"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {msg.quickReplies && msg.quickReplies.length > 0 && (
                <div className="chat-quick-replies">
                  {msg.quickReplies.map((r, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="chat-quick-reply"
                      onClick={() => handleUserTurn(r.label, r.intentId)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          {isTyping && (
            <div className="chat-typing">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <form
          className="chat-panel-input"
          id="chatForm"
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            id="chatInput"
            ref={inputRef}
            placeholder="Ask about projects, services, team, pricing…"
            aria-label="Type your message"
            maxLength={300}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="chat-send-btn"
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 10L17.5 2.5L11.5 17.5L9.16667 11.25L2.5 10Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M9.16667 11.25L14 6.25"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>

        <p className="chat-panel-footnote">
          100% On-site Knowledge Assistant for Day One.{" "}
          <button type="button" onClick={onOpenContact}>
            Get in touch with founders &rarr;
          </button>
        </p>
      </div>
    </>
  );
}
