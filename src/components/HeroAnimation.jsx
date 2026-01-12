"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HeroAnimation({
  text = "estudentsleague",
  duration = 2,
  stagger = 0.1,
}) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const [mounted, setMounted] = useState(false);
  lettersRef.current = [];

  const addToRefs = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    if (!lettersRef.current.length) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dynamic import di GSAP solo quando necessario
    import("gsap").then(({ gsap }) => {
      const ctx = gsap.context(() => {
        // Stato iniziale: nascoste e leggermente spostate
        gsap.set(lettersRef.current, { y: 20, opacity: 0 });

        // Animazione di entrata
        gsap.to(lettersRef.current, {
          y: 0,
          opacity: 1,
          ease: prefersReduced ? "none" : "power3.out",
          duration: prefersReduced ? 0 : duration,
          stagger: prefersReduced ? 0 : stagger,
        });
      }, containerRef);

      return () => ctx.revert();
    });
  }, [mounted, duration, stagger]);

  const chars = Array.from(text);

  return (
    <section
      ref={containerRef}
      aria-label={text}
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "60vh",
        padding: "0px",
      }}
    >
      <h1
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.02em",
          color: "var(--text)",
            fontFamily: "Audiowide, sans-serif",
            textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.05,
          fontWeight: 400,
          // dimensioni fluide per diversi viewport
          fontSize: "clamp(32px, 7vw, 96px)",
          letterSpacing: "0.01em",
          whiteSpace: "pre-wrap",
        }}
      >
        {/* Per accessibilità, lo screen reader leggerà l'aria-label; queste lettere sono decorative */}
        {chars.map((ch, i) => (
          <span
            key={i}
            ref={addToRefs}
            aria-hidden="true"
            style={{ display: "inline-block" }}
          >
            {ch}
          </span>
        ))}
      </h1>
    </section>
  );
}

