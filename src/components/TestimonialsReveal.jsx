"use client";

import { useEffect, useRef, useState } from "react";

export default function TestimonialsReveal() {
  const rootRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = rootRef.current;
    if (!el) return;

    // Usa IntersectionObserver per attivare l'animazione solo quando necessario
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return;

    const el = rootRef.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dynamic import di GSAP solo quando necessario
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const title = el.querySelector(".testi-title");
        const lead = el.querySelector(".testi-lead");
        const cards = gsap.utils.toArray(el.querySelectorAll(".testi-card"));
        const blobs = gsap.utils.toArray(el.querySelectorAll(".testi-blob"));

        if (prefersReduced) {
          gsap.set([title, lead, cards], { autoAlpha: 1, y: 0, skewY: 0 });
          return;
        }

        const ctx = gsap.context(() => {
          gsap.set([title, lead], { autoAlpha: 0, y: 24 });
          gsap.set(cards, { autoAlpha: 0, y: 28, rotate: -1.5, scale: 0.98 });

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 55%",
              once: true,
            },
          });

          tl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 })
            .to(lead, { autoAlpha: 1, y: 0, duration: 0.5 }, "<+0.05")
            .to(
              cards,
              {
                autoAlpha: 1,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.14,
              },
              "<+0.05"
            );

          // parallax delicato sui blob di background
          blobs.forEach((b, i) => {
            gsap.to(b, {
              yPercent: i % 2 === 0 ? -10 : -6,
              xPercent: i % 2 === 0 ? 8 : -5,
              rotate: i % 2 === 0 ? 7 : -5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            });
          });
        }, el);

        return () => ctx.revert();
      });
    });
  }, [isVisible]);

  return (
    <section ref={rootRef} className="section-reveal testimonials-reveal" style={{ textAlign: "left" }}>
      {/* Background decor */}
      <div className="testi-bg" aria-hidden>
        <div className="testi-blob testi-blob--1" />
        <div className="testi-blob testi-blob--2" />
        <div className="testi-noise" />
      </div>

      <header className="testi-header">
        <h2 className="testi-title">Dicono di noi</h2>
        <p className="testi-lead">Le parole di chi ha vissuto da vicino i valori e lo spirito del nostro progetto.</p>
      </header>

      <div className="testi-grid">
        {/* Card 1 */}
        <article className="testi-card">
          <div className="testi-card__accent" />
          <div className="testi-card__content">
            <div className="testi-card__quoteMark" aria-hidden>“</div>
            <blockquote className="testi-quote">
              L'iniziativa ripercorre i veri valori dello sport in cui credo e in cui mi riconosco. Il torneo si svolge in maniera spontanea e genuina con l'impegno e la dedizione degli organizzatori.
            </blockquote>
            <footer className="testi-author">
              <div className="testi-avatar" aria-hidden>
                <span>GA</span>
              </div>
              <div className="testi-meta">
                <div className="testi-name">Giancarlo Antognoni</div>
                <div className="testi-role">Dirigente sportivo, ex calciatore</div>
              </div>
            </footer>
          </div>
        </article>

        {/* Card 2 */}
        <article className="testi-card">
          <div className="testi-card__accent" />
          <div className="testi-card__content">
            <div className="testi-card__quoteMark" aria-hidden>“</div>
            <blockquote className="testi-quote">
              Grazie ad un torneo simile io ho dato inizio alla mia carriera.
            </blockquote>
            <footer className="testi-author">
              <div className="testi-avatar" aria-hidden>
                <span>CF</span>
              </div>
              <div className="testi-meta">
                <div className="testi-name">Ciro Ferrara</div>
                <div className="testi-role">Allenatore, ex calciatore</div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}

