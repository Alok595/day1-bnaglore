"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import ContactModal from "@/components/ContactModal";
import ChatAssistant from "@/components/ChatAssistant";

export default function PrivacyPolicyPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="legal-html legal-body" style={{ minHeight: "100vh" }}>
      <Header onOpenContact={() => setContactOpen(true)} />

      <main className="legal-page">
        <div className="legal-page-inner">
          <Link href="/" className="legal-back">
            ← Back to home
          </Link>
          <span className="legal-eyebrow">Legal</span>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: 30 August 2026</p>

          <h2>1. Introduction</h2>
          <p>
            Day One (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a Mumbai-based studio offering
            web design &amp; development, custom software, SEO and digital
            marketing services. This policy explains what information we collect
            when you visit dayonebrand.com or get in touch with us, how we use
            it, and the choices you have. By using this site or contacting us,
            you agree to the practices described here.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We only collect what&apos;s actually needed to respond to you and run this
            website properly:
          </p>
          <ul>
            <li>
              <strong>Information you give us directly</strong> — your name,
              phone number, email address and any message content when you use
              our contact picker, WhatsApp chat, call links, email links, or our
              on-site chat assistant.
            </li>
            <li>
              <strong>Automatically collected information</strong> — standard
              technical details like browser type, device type, approximate
              location (city-level, via IP) and pages visited, collected through
              normal web server logs and, where enabled, analytics tools.
            </li>
            <li>
              <strong>Chat assistant conversations</strong> — messages you type
              into our on-site chat assistant are processed in your browser to
              generate a relevant answer. We do not currently store these
              conversations on a server.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your enquiries and follow up on project discussions;</li>
            <li>
              Prepare proposals, quotes and contracts for services you&apos;ve asked
              about;
            </li>
            <li>
              Improve our website, our services and the experience of visiting
              our site;
            </li>
            <li>
              Meet legal, accounting or regulatory requirements where applicable.
            </li>
          </ul>
          <p>
            We do not use your personal information for any purpose beyond these
            without asking you first.
          </p>

          <h2>4. Cookies &amp; Similar Technologies</h2>
          <p>
            Our website loads fonts from Google Fonts, which may involve a
            request to Google&apos;s servers when the page loads. We may also use
            standard analytics cookies to understand how visitors use the site
            (for example, which pages are most viewed). You can disable cookies
            in your browser settings at any time — the site will still work,
            though some conveniences may be affected.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We rely on a small number of trusted third parties to run this site
            and communicate with you:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> — hosts this website;
            </li>
            <li>
              <strong>Google Fonts</strong> — serves the typefaces used across
              the site;
            </li>
            <li>
              <strong>WhatsApp Business</strong> — used for chat-based
              enquiries, subject to WhatsApp&apos;s own privacy terms;
            </li>
            <li>Standard mobile network carriers when you use a &quot;Call&quot; link.</li>
          </ul>
          <p>
            These providers only receive the minimum information necessary to
            perform their function and are bound by their own privacy
            commitments.
          </p>

          <h2>6. Data Sharing &amp; Disclosure</h2>
          <p>
            We do not sell, rent or trade your personal information. We only
            share it: with the third-party service providers described above; if
            required by law, court order or government request; or with your
            explicit consent.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We keep enquiry and project-related information for as long as
            reasonably necessary to serve you and to meet legal or accounting
            obligations, after which it is deleted or anonymised.
          </p>

          <h2>8. Data Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect
            the information you share with us. That said, no method of
            transmission over the internet is 100% secure, and we can&apos;t guarantee
            absolute security.
          </p>

          <h2>9. Your Rights</h2>
          <p>You can ask us at any time to:</p>
          <ul>
            <li>Tell you what personal information we hold about you;</li>
            <li>Correct any information that&apos;s inaccurate or out of date;</li>
            <li>Delete your personal information from our records;</li>
            <li>Stop using your information for a particular purpose.</li>
          </ul>
          <p>To exercise any of these, just email us — details below.</p>

          <h2>10. Children&apos;s Privacy</h2>
          <p>
            Our services are intended for businesses and individuals above the
            age of 18. We do not knowingly collect personal information from
            children.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time as our services or
            applicable law change. The &quot;Last updated&quot; date at the top will always
            reflect the latest version. Significant changes will be reflected
            here — we encourage you to check back periodically.
          </p>

          <div className="legal-contact-box">
            <h2 style={{ marginTop: 0 }}>Questions about this policy?</h2>
            <p>
              Email us at{" "}
              <a href="mailto:hello@dayonebrand.com">hello@dayonebrand.com</a>
            </p>
            <p>
              Or reach out via our{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setContactOpen(true);
                }}
              >
                contact options
              </a>{" "}
              and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      </main>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <ChatAssistant onOpenContact={() => setContactOpen(true)} />
    </div>
  );
}
