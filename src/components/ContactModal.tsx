"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 bg-[#0c0a1b]/80 backdrop-blur-md z-[600] flex items-center justify-center p-4 transition-all duration-400 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      id="contactModal"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-md bg-[#14134d]/90 backdrop-blur-lg rounded-2xl p-8 shadow-[0_1rem_3rem_rgba(0,6,102,0.6)] border border-[#fcfeea]/10 flex flex-col transition-transform duration-400 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contactModalTitle"
      >
        <button
          type="button"
          className="absolute top-4 right-4 bg-transparent border-none text-[#fcfeea]/50 cursor-pointer p-2 transition-colors duration-300 hover:text-[#00f0ff]"
          id="contactModalClose"
          aria-label="Close"
          onClick={onClose}
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

        <div className="flex items-center mb-3">
          <Image
            src="/assets/d1-new-emblem.png"
            alt="Day One"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
        <h3 id="contactModalTitle" className="font-[family-name:var(--font-heading)] text-[1.35rem] font-semibold text-[#fcfeea] leading-tight m-0 mb-1.5">
          Who would you like to talk to?
        </h3>
        <p className="text-[#a7a8cf] text-[0.8rem] leading-[1.5] m-0 mb-6">
          Pick a team member to message directly on WhatsApp &mdash; straight to
          the right person.
        </p>

        <div className="flex flex-col gap-4">
          {/* Sunil Shetty */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0c0a1b]/60 border border-[#fcfeea]/10 transition-colors duration-300 hover:bg-[#0c0a1b]/80 hover:border-[#00f0ff]/30">
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1.5px solid rgba(0,240,255,0.4)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/assets/1772094173539.jpg"
                  alt="Sunil Shetty"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#fcfeea] text-sm font-bold">Sunil Shetty</span>
                  <span className="text-[10px] text-white/40 font-mono">(He/Him)</span>
                </div>
                <span className="text-[#00f0ff] text-[0.68rem] font-semibold uppercase tracking-wider">Founder &amp; Systems Architect</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/?text=Hi%20Sunil%2C%20I'd%20like%20to%20discuss%20a%20project%20with%20Day%20One."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 no-underline bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 hover:shadow-[0_4px_12px_rgba(37,211,102,0.3)] text-white"
                aria-label="WhatsApp Sunil Shetty"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 22L3.41152 16.8691C2.54422 15.3639 2.08876 13.6568 2.09099 11.9196C2.08095 6.44549 6.52644 2 11.99 2C14.6417 2 17.1315 3.02806 19.0062 4.9034C19.9303 5.82266 20.6627 6.91616 21.1611 8.12054C21.6595 9.32492 21.9139 10.6162 21.9096 11.9196C21.9096 17.3832 17.4641 21.8287 12 21.8287C10.3368 21.8287 8.71374 21.4151 7.26204 20.6192L2 22ZM7.49424 18.8349L7.79675 19.0162C9.06649 19.7676 10.5146 20.1644 11.99 20.1654C16.5264 20.1654 20.2263 16.4662 20.2263 11.9291C20.2263 9.73176 19.3696 7.65554 17.8168 6.1034C17.0533 5.33553 16.1453 4.72636 15.1453 4.31101C14.1452 3.89565 13.0728 3.68232 11.99 3.68331C7.44343 3.6839 3.74476 7.38316 3.74476 11.9202C3.74476 13.4724 4.17843 14.995 5.00502 16.3055L5.19645 16.618L4.35982 19.662L7.49483 18.8354L7.49424 18.8349Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.52024 7.76662C9.33885 7.35303 9.13737 7.34298 8.96603 7.34298C8.81477 7.33294 8.65288 7.33294 8.48154 7.33294C8.32083 7.33294 8.04845 7.39321 7.81684 7.64549C7.58464 7.89719 6.95007 8.49217 6.95007 9.71167C6.95007 10.9318 7.83693 12.1111 7.95805 12.2724C8.07858 12.4337 9.67149 15.0139 12.192 16.0124C14.2883 16.839 14.712 16.6777 15.1657 16.6269C15.6189 16.5767 16.6275 16.0325 16.839 15.4476C17.0405 14.8733 17.0405 14.3693 16.9802 14.2682C16.9199 14.1678 16.748 14.1069 16.5064 13.9758C16.2541 13.8552 15.0446 13.2502 14.813 13.1693C14.5808 13.0889 14.4195 13.0487 14.2582 13.2904C14.0969 13.5427 13.623 14.0969 13.4724 14.2582C13.3306 14.4195 13.1799 14.4396 12.9377 14.3185C12.686 14.1979 11.8895 13.9356 10.9418 13.0889C10.2056 12.4331 9.71167 11.6171 9.56041 11.3755C9.41979 11.1232 9.54032 10.992 9.67149 10.8709C9.78257 10.7604 9.92378 10.579 10.0449 10.4378C10.1654 10.296 10.2056 10.1855 10.2966 10.0242C10.377 9.86292 10.3368 9.71167 10.2765 9.59114C10.2157 9.48006 9.74239 8.25997 9.52024 7.76603V7.76662Z"
                    fill="currentColor"
                  />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mahima Shetty */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0c0a1b]/60 border border-[#fcfeea]/10 transition-colors duration-300 hover:bg-[#0c0a1b]/80 hover:border-[#ec4899]/30">
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1.5px solid rgba(236,72,153,0.4)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/assets/mahima-shetty.jpeg"
                  alt="Mahima Shetty"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#fcfeea] text-sm font-bold">Mahima Shetty</span>
                  <span className="text-[10px] text-white/40 font-mono">(She/Her)</span>
                </div>
                <span className="text-[#ec4899] text-[0.68rem] font-semibold uppercase tracking-wider">Video Editor &amp; Filmmaker</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/?text=Hi%20Mahima%2C%20I'd%20like%20to%20discuss%20video%20production%20and%20editing%20with%20Day%20One."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 no-underline bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 hover:shadow-[0_4px_12px_rgba(37,211,102,0.3)] text-white"
                aria-label="WhatsApp Mahima Shetty"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 22L3.41152 16.8691C2.54422 15.3639 2.08876 13.6568 2.09099 11.9196C2.08095 6.44549 6.52644 2 11.99 2C14.6417 2 17.1315 3.02806 19.0062 4.9034C19.9303 5.82266 20.6627 6.91616 21.1611 8.12054C21.6595 9.32492 21.9139 10.6162 21.9096 11.9196C21.9096 17.3832 17.4641 21.8287 12 21.8287C10.3368 21.8287 8.71374 21.4151 7.26204 20.6192L2 22ZM7.49424 18.8349L7.79675 19.0162C9.06649 19.7676 10.5146 20.1644 11.99 20.1654C16.5264 20.1654 20.2263 16.4662 20.2263 11.9291C20.2263 9.73176 19.3696 7.65554 17.8168 6.1034C17.0533 5.33553 16.1453 4.72636 15.1453 4.31101C14.1452 3.89565 13.0728 3.68232 11.99 3.68331C7.44343 3.6839 3.74476 7.38316 3.74476 11.9202C3.74476 13.4724 4.17843 14.995 5.00502 16.3055L5.19645 16.618L4.35982 19.662L7.49483 18.8354L7.49424 18.8349Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.52024 7.76662C9.33885 7.35303 9.13737 7.34298 8.96603 7.34298C8.81477 7.33294 8.65288 7.33294 8.48154 7.33294C8.32083 7.33294 8.04845 7.39321 7.81684 7.64549C7.58464 7.89719 6.95007 8.49217 6.95007 9.71167C6.95007 10.9318 7.83693 12.1111 7.95805 12.2724C8.07858 12.4337 9.67149 15.0139 12.192 16.0124C14.2883 16.839 14.712 16.6777 15.1657 16.6269C15.6189 16.5767 16.6275 16.0325 16.839 15.4476C17.0405 14.8733 17.0405 14.3693 16.9802 14.2682C16.9199 14.1678 16.748 14.1069 16.5064 13.9758C16.2541 13.8552 15.0446 13.2502 14.813 13.1693C14.5808 13.0889 14.4195 13.0487 14.2582 13.2904C14.0969 13.5427 13.623 14.0969 13.4724 14.2582C13.3306 14.4195 13.1799 14.4396 12.9377 14.3185C12.686 14.1979 11.8895 13.9356 10.9418 13.0889C10.2056 12.4331 9.71167 11.6171 9.56041 11.3755C9.41979 11.1232 9.54032 10.992 9.67149 10.8709C9.78257 10.7604 9.92378 10.579 10.0449 10.4378C10.1654 10.296 10.2056 10.1855 10.2966 10.0242C10.377 9.86292 10.3368 9.71167 10.2765 9.59114C10.2157 9.48006 9.74239 8.25997 9.52024 7.76603V7.76662Z"
                    fill="currentColor"
                  />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Sinchana Shetty */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0c0a1b]/60 border border-[#fcfeea]/10 transition-colors duration-300 hover:bg-[#0c0a1b]/80 hover:border-[#c084fc]/30">
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1.5px solid rgba(192,132,252,0.4)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/assets/sinchana-shetty.jpeg"
                  alt="Sinchana Shetty"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#fcfeea] text-sm font-bold">Sinchana Shetty</span>
                  <span className="text-[10px] text-white/40 font-mono">(She/Her)</span>
                </div>
                <span className="text-[#c084fc] text-[0.68rem] font-semibold uppercase tracking-wider">Creative Storyteller &amp; Creator</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/?text=Hi%20Sinchana%2C%20I'd%20like%20to%20discuss%20creative%20storytelling%20and%20brand%20collaborations%20with%20Day%20One."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 no-underline bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 hover:shadow-[0_4px_12px_rgba(37,211,102,0.3)] text-white"
                aria-label="WhatsApp Sinchana Shetty"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 22L3.41152 16.8691C2.54422 15.3639 2.08876 13.6568 2.09099 11.9196C2.08095 6.44549 6.52644 2 11.99 2C14.6417 2 17.1315 3.02806 19.0062 4.9034C19.9303 5.82266 20.6627 6.91616 21.1611 8.12054C21.6595 9.32492 21.9139 10.6162 21.9096 11.9196C21.9096 17.3832 17.4641 21.8287 12 21.8287C10.3368 21.8287 8.71374 21.4151 7.26204 20.6192L2 22ZM7.49424 18.8349L7.79675 19.0162C9.06649 19.7676 10.5146 20.1644 11.99 20.1654C16.5264 20.1654 20.2263 16.4662 20.2263 11.9291C20.2263 9.73176 19.3696 7.65554 17.8168 6.1034C17.0533 5.33553 16.1453 4.72636 15.1453 4.31101C14.1452 3.89565 13.0728 3.68232 11.99 3.68331C7.44343 3.6839 3.74476 7.38316 3.74476 11.9202C3.74476 13.4724 4.17843 14.995 5.00502 16.3055L5.19645 16.618L4.35982 19.662L7.49483 18.8354L7.49424 18.8349Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.52024 7.76662C9.33885 7.35303 9.13737 7.34298 8.96603 7.34298C8.81477 7.33294 8.65288 7.33294 8.48154 7.33294C8.32083 7.33294 8.04845 7.39321 7.81684 7.64549C7.58464 7.89719 6.95007 8.49217 6.95007 9.71167C6.95007 10.9318 7.83693 12.1111 7.95805 12.2724C8.07858 12.4337 9.67149 15.0139 12.192 16.0124C14.2883 16.839 14.712 16.6777 15.1657 16.6269C15.6189 16.5767 16.6275 16.0325 16.839 15.4476C17.0405 14.8733 17.0405 14.3693 16.9802 14.2682C16.9199 14.1678 16.748 14.1069 16.5064 13.9758C16.2541 13.8552 15.0446 13.2502 14.813 13.1693C14.5808 13.0889 14.4195 13.0487 14.2582 13.2904C14.0969 13.5427 13.623 14.0969 13.4724 14.2582C13.3306 14.4195 13.1799 14.4396 12.9377 14.3185C12.686 14.1979 11.8895 13.9356 10.9418 13.0889C10.2056 12.4331 9.71167 11.6171 9.56041 11.3755C9.41979 11.1232 9.54032 10.992 9.67149 10.8709C9.78257 10.7604 9.92378 10.579 10.0449 10.4378C10.1654 10.296 10.2056 10.1855 10.2966 10.0242C10.377 9.86292 10.3368 9.71167 10.2765 9.59114C10.2157 9.48006 9.74239 8.25997 9.52024 7.76603V7.76662Z"
                    fill="currentColor"
                  />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
