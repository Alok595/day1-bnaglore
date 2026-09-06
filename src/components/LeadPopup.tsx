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
      className={`lead-popup-overlay ${isOpen ? "open" : ""}`}
      id="leadPopup"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="lead-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leadPopupTitle"
      >
        <button
          type="button"
          className="lead-popup-close"
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

        <span className="lead-popup-badge">🎁 Free SEO Audit</span>
        <h3 id="leadPopupTitle" className="lead-popup-title">
          Get a Free SEO &amp; Website Audit
        </h3>
        <p className="lead-popup-sub">
          We&apos;ll check your site&apos;s speed, keywords, and growth gaps &mdash; no
          cost, no commitment.
        </p>

        {!isSubmitted ? (
          <form
            className="lead-popup-form"
            id="leadPopupForm"
            onSubmit={handleSubmit}
          >
            <div className="lead-popup-row">
              <div className="lead-popup-field">
                <label htmlFor="leadFirstName">First Name *</label>
                <input
                  type="text"
                  id="leadFirstName"
                  name="first_name"
                  placeholder="e.g. Rahul"
                  required
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="lead-popup-field">
                <label htmlFor="leadLastName">Last Name *</label>
                <input
                  type="text"
                  id="leadLastName"
                  name="last_name"
                  placeholder="e.g. Sharma"
                  required
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="lead-popup-field">
              <label htmlFor="leadPhone">Phone Number *</label>
              <input
                type="tel"
                id="leadPhone"
                name="phone"
                placeholder="+91 98765 43210"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="lead-popup-field">
              <label htmlFor="leadEmail">Email *</label>
              <input
                type="email"
                id="leadEmail"
                name="email"
                placeholder="you@company.com"
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
              className="lead-popup-submit"
              id="leadPopupSubmit"
              disabled={isSending}
            >
              {isSending ? "Sending…" : "Claim My Free Audit"}
            </button>
            {errorMessage && (
              <p className="lead-popup-note" id="leadPopupNote">
                {errorMessage}
              </p>
            )}
          </form>
        ) : (
          <div className="lead-popup-success show" id="leadPopupSuccess">
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
            <h3>Thanks — you&apos;re in!</h3>
            <p>Our team will reach out with your free audit shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
