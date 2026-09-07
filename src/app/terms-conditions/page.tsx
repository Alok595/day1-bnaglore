"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import ContactModal from "@/components/ContactModal";
import ChatAssistant from "@/components/ChatAssistant";

export default function TermsConditionsPage() {
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
          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-updated">Last updated: 30 August 2026</p>

          <h2>1. About These Terms</h2>
          <p>
            These terms govern your use of the dayonebrand.com website and any
            services you engage Day One (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;the studio&quot;)
            for, including web design &amp; development, solution-based software,
            SEO and digital marketing. By browsing this site or engaging our
            services, you agree to these terms. A separate, signed proposal or
            agreement for a specific project will always take precedence over
            this general page where the two differ.
          </p>

          <h2>2. Our Services</h2>
          <p>
            We provide four core disciplines, delivered by one accountable team
            rather than handed off between agencies:
          </p>
          <ul>
            <li>Web Design &amp; Development</li>
            <li>
              Solution-Based Software (custom builds, internal tools,
              integrations)
            </li>
            <li>SEO (technical, on-page and content strategy)</li>
            <li>
              Digital Marketing (paid campaigns, funnels, content, ROI-driven)
            </li>
          </ul>
          <p>
            The exact scope, deliverables and timeline for any project are
            confirmed in writing (proposal, quote or contract) before work
            begins.
          </p>

          <h2>3. Proposals, Quotes &amp; Payment</h2>
          <ul>
            <li>
              Every project starts with a scoped proposal or quote. Pricing
              depends on complexity, timeline and the specific deliverables
              agreed.
            </li>
            <li>
              Projects typically require an upfront deposit before work begins,
              with the balance split across agreed milestones or on completion.
            </li>
            <li>
              Ongoing services (SEO retainers, marketing management, software
              maintenance) are billed on a recurring basis as agreed in the
              relevant proposal.
            </li>
            <li>
              Late payments may pause active work until the account is settled.
            </li>
            <li>
              All fees are exclusive of applicable taxes (GST or otherwise)
              unless stated otherwise.
            </li>
          </ul>

          <h2>4. Timelines &amp; Client Responsibilities</h2>
          <p>
            Realistic timelines depend on us receiving what we need from you on
            time — content, brand assets, feedback and approvals. Delays on your
            end may shift the delivery date accordingly. We&apos;ll always flag this
            as early as possible rather than let a deadline quietly slip.
          </p>

          <h2>5. Revisions &amp; Change Requests</h2>
          <p>
            Each proposal specifies a reasonable number of revision rounds.
            Requests that go meaningfully beyond the original agreed scope (new
            pages, new features, a different direction entirely) are treated as
            change requests and quoted separately before we proceed.
          </p>

          <h2>6. Intellectual Property &amp; Ownership</h2>
          <ul>
            <li>
              Once a project is paid in full, ownership of the final agreed
              deliverables (final website files, final designs, final software as
              specified in the contract) transfers to you.
            </li>
            <li>
              We retain the right to reuse general know-how, frameworks, and
              non-client-specific code or components across other projects.
            </li>
            <li>
              Unless you tell us otherwise in writing, we may showcase completed
              work in our portfolio, case studies and marketing materials.
            </li>
            <li>
              Any third-party assets used in your project (stock photography,
              fonts, plugins, licensed software) remain subject to their own
              respective licenses.
            </li>
          </ul>

          <h2>7. Third-Party Tools, Domains &amp; Hosting</h2>
          <p>
            Where a project involves third-party services — domain registration,
            hosting, premium plugins, ad accounts, SaaS subscriptions — those
            ongoing costs are the client&apos;s responsibility unless explicitly
            included in the proposal. We&apos;ll always be upfront about what&apos;s
            included and what isn&apos;t before you commit.
          </p>

          <h2>8. Confidentiality</h2>
          <p>
            We treat information shared with us during a project — business
            plans, credentials, data — as confidential, and we don&apos;t disclose it
            to third parties except where necessary to deliver the project (e.g.
            a specialist sub-contractor bound by the same confidentiality) or
            where required by law.
          </p>

          <h2>9. Warranties &amp; Limitation of Liability</h2>
          <p>
            We build things carefully and stand behind our work, but we can&apos;t
            guarantee uninterrupted or error-free operation of every third-party
            platform, browser or network our deliverables run on. To the extent
            permitted by law, our liability for any claim arising from a project
            is limited to the fees paid for that specific project. We are not
            liable for indirect or consequential losses (like lost profits or
            lost business opportunities).
          </p>

          <h2>10. Marketing &amp; SEO Results Disclaimer</h2>
          <p>
            SEO rankings, ad platform performance, and marketing results depend
            on factors outside our direct control — search engine algorithm
            changes, competitor activity, ad platform policies, and market
            conditions. We commit to sound strategy and diligent execution, but
            we cannot guarantee specific rankings, traffic numbers or
            conversion outcomes.
          </p>

          <h2>11. Cancellation &amp; Refunds</h2>
          <p>
            Either party may cancel an ongoing engagement with written notice,
            as specified in the project&apos;s proposal (typically 30 days for
            retainers). Work already completed and any non-refundable
            third-party costs incurred on your behalf are payable regardless of
            cancellation. Deposits for one-off projects are generally
            non-refundable once work has begun, reflecting time and resources
            already committed.
          </p>

          <h2>12. Website Use</h2>
          <p>
            You may browse and use dayonebrand.com for its intended purpose —
            learning about our services and getting in touch. You agree not to
            misuse the site (attempting to breach security, scrape content for
            commercial resale, or interfere with its normal operation).
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising
            from these terms or a project engagement will be subject to the
            exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>

          <h2>14. Changes to These Terms</h2>
          <p>
            We may revise these terms from time to time to reflect how we
            operate or changes in law. The &quot;Last updated&quot; date above will always
            show the current version. For active projects, the terms in your
            signed proposal or contract continue to apply for that engagement.
          </p>

          <div className="legal-contact-box">
            <h2 style={{ marginTop: 0 }}>Questions about these terms?</h2>
            <p>
              Email us at{" "}
              <a href="mailto:hello@dayonebrand.com">hello@dayonebrand.com</a>{" "}
              or call / WhatsApp us at{" "}
              <a href="tel:+919322982085">+91 93229 82085</a>.
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
