"use client";

import React, { useState, useEffect } from "react";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const SUBMITTED_KEY = "z21LeadSubmitted";
    const DISMISSED_KEY = "z21LeadDismissed";

    try {
      if (
        localStorage.getItem(SUBMITTED_KEY) === "1" ||
        sessionStorage.getItem(DISMISSED_KEY) === "1"
      ) {
        return;
      }
    } catch {
      // ignore
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("z21LeadDismissed", "1");
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      setErrorMessage("Please fill in every field.");
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/hello@dayonebrand.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "New Free SEO Audit lead — Day One",
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
          }),
        }
      );

      if (!res.ok) throw new Error("Request failed");
      try {
        localStorage.setItem("z21LeadSubmitted", "1");
      } catch {
        // ignore
      }
      setIsSubmitted(true);
    } catch {
      setErrorMessage(
        "Something went wrong — please try again, or reach us directly."
      );
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#0c0a1b]/80 backdrop-blur-md z-[500] flex items-center justify-center p-4 transition-all duration-400 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      id="leadPopup"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-[28rem] bg-[#14134d]/90 backdrop-blur-lg rounded-2xl p-8 shadow-[0_1rem_3rem_rgba(0,6,102,0.6)] border border-[#fcfeea]/10 flex flex-col gap-5 transition-transform duration-400 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="leadPopupTitle"
      >
        <button
          type="button"
          className="absolute top-4 right-4 bg-transparent border-none text-[#fcfeea]/50 cursor-pointer p-2 transition-colors duration-300 hover:text-[#00f0ff]"
          id="leadPopupClose"
          aria-label="Close"
          onClick={handleClose}
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

        <span className="inline-flex self-start px-2.5 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-[family-name:var(--font-heading)] text-[0.65rem] font-bold uppercase tracking-wider">🎁 Free SEO Audit</span>
        <h3 id="leadPopupTitle" className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#fcfeea] leading-tight m-0">
          Get a Free SEO &amp; Website Audit
        </h3>
        <p className="text-[#a7a8cf] text-sm leading-relaxed m-0">
          We&apos;ll check your site&apos;s speed, keywords, and growth gaps &mdash; no
          cost, no commitment.
        </p>

        {!isSubmitted ? (
          <form
            className="flex flex-col gap-4 mt-2"
            id="leadPopupForm"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="leadFirstName" className="text-[#a7a8cf] text-[0.7rem] font-bold uppercase tracking-wider">First Name *</label>
                <input
                  type="text"
                  id="leadFirstName"
                  name="first_name"
                  placeholder="e.g. Rahul"
                  className="w-full h-11 px-4 rounded-xl bg-[#0c0a1b]/50 border border-[#fcfeea]/10 text-[#fcfeea] text-sm transition-all duration-300 outline-none focus:border-[#00f0ff]/50 focus:bg-[#0c0a1b]"
                  required
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="leadLastName" className="text-[#a7a8cf] text-[0.7rem] font-bold uppercase tracking-wider">Last Name *</label>
                <input
                  type="text"
                  id="leadLastName"
                  name="last_name"
                  placeholder="e.g. Sharma"
                  className="w-full h-11 px-4 rounded-xl bg-[#0c0a1b]/50 border border-[#fcfeea]/10 text-[#fcfeea] text-sm transition-all duration-300 outline-none focus:border-[#00f0ff]/50 focus:bg-[#0c0a1b]"
                  required
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="leadPhone" className="text-[#a7a8cf] text-[0.7rem] font-bold uppercase tracking-wider">Phone Number *</label>
              <input
                type="tel"
                id="leadPhone"
                name="phone"
                placeholder="+91 98765 43210"
                className="w-full h-11 px-4 rounded-xl bg-[#0c0a1b]/50 border border-[#fcfeea]/10 text-[#fcfeea] text-sm transition-all duration-300 outline-none focus:border-[#00f0ff]/50 focus:bg-[#0c0a1b]"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="leadEmail" className="text-[#a7a8cf] text-[0.7rem] font-bold uppercase tracking-wider">Email *</label>
              <input
                type="email"
                id="leadEmail"
                name="email"
                placeholder="you@company.com"
                className="w-full h-11 px-4 rounded-xl bg-[#0c0a1b]/50 border border-[#fcfeea]/10 text-[#fcfeea] text-sm transition-all duration-300 outline-none focus:border-[#00f0ff]/50 focus:bg-[#0c0a1b]"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#1868e8] text-[#fcfeea] font-[family-name:var(--font-sans)] text-sm font-bold uppercase tracking-wider cursor-pointer border-none mt-2 transition-all duration-300 hover:bg-[#1868e8]/90 hover:shadow-[0_0_1rem_rgba(24,104,232,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
              id="leadPopupSubmit"
              disabled={isSending}
            >
              {isSending ? "Sending…" : "Claim My Free Audit"}
            </button>
            {errorMessage && (
              <p className="text-[#00f0ff] text-xs text-center m-0 mt-2" id="leadPopupNote">
                {errorMessage}
              </p>
            )}
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-8 animate-in fade-in duration-500" id="leadPopupSuccess">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="#00f0ff" strokeWidth="1.6" />
              <path
                d="M7.5 12.5L10.5 15.5L16.5 9"
                stroke="#00f0ff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#fcfeea] mt-2">Thanks — you&apos;re in!</h3>
            <p className="text-[#a7a8cf] text-sm leading-relaxed">Our team will reach out with your free audit shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
