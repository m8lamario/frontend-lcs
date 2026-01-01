'use client';

import Image from 'next/image';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import EmptyState from './EmptyState';

export default function MatchesSlider({ matches = [], citySlug }) {
  const params = useParams?.() || {};
  const normalizedCity = (citySlug || params.city || '').toString().toLowerCase();

  const hasMatches = Array.isArray(matches) && matches.length > 0;

  if (!hasMatches) {
    return (
      <section className="matches-section">
        <EmptyState
          title="Nessuna partita disponibile"
          description="Appena saranno programmati nuovi incontri li troverai qui. Continua a seguirci per tutti gli aggiornamenti dal torneo."
          action={{ label: 'Torna alla città', href: citySlug ? `/competitions/${citySlug}` : '/' }}
        />
      </section>
    );
  }

  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const reducedMotion = useRef(false);

  const setCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Ordinamento cronologico unico (senza raggruppare per giornate)
  const sortedMatches = useMemo(() => {
    const toTs = (m) => {
      const d = m?.date ? new Date(m.date) : null;
      return d ? d.getTime() : Number.POSITIVE_INFINITY; // senza data in fondo
    };
    return [...matches].sort((a, b) => toTs(a) - toTs(b));
  }, [matches]);

  const MATCH_DURATION = 50; // durata regolamentare

  const isLiveNow = (m, now = Date.now()) => {
    const start = m?.date ? new Date(m.date).getTime() : null;
    if (!start) return false;
    const diffMin = Math.floor((now - start) / 60000);
    return diffMin >= 0 && diffMin < MATCH_DURATION;
  };

  // Trova l'indice pivot rispettando le regole:
  // 1) Se esiste una partita LIVE (in base all'orario) → è la prima visibile (anche se ci sono concluse prima, che restano a sinistra)
  // 2) Altrimenti, se nessuna è stata ancora raggiunta (tutte future) → prima card (indice 0)
  // 3) Altrimenti, la prima futura (>= adesso); se tutte passate → l'ultima
  const pivotIndex = useMemo(() => {
    if (!sortedMatches.length) return 0;
    const now = Date.now();
    const liveIdx = sortedMatches.findIndex((m) => isLiveNow(m, now));
    if (liveIdx !== -1) return liveIdx;
    const futureIdx = sortedMatches.findIndex((m) => {
      const d = m?.date ? new Date(m.date).getTime() : null;
      return d !== null && d >= now;
    });
    if (futureIdx !== -1) return futureIdx;
    return sortedMatches.length - 1;
  }, [sortedMatches]);

  // Azzeriamo i refs PRIMA di creare le card, così i ref callback popoleranno l'elenco corretto
  cardsRef.current = [];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    if (reducedMotion.current) {
      gsap.set(cardsRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    // Stato iniziale
    gsap.set(cardsRef.current, { autoAlpha: 0, y: 28 });

    const animatedSet = new WeakSet();
    let sequence = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedSet.has(entry.target)) {
            animatedSet.add(entry.target);
            const localDelay = Math.min(sequence * 0.06, 0.6);
            sequence += 1;
            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
              delay: localDelay,
              clearProps: 'transform,opacity'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: scroller,
        threshold: 0.25,
        rootMargin: '0px 40px 0px 0px'
      }
    );

    cardsRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sortedMatches]);

  // All'avvio posiziona lo slider in modo che la partita live/prossima sia la prima visibile
  useEffect(() => {
    const scroller = scrollerRef.current;
    const cards = cardsRef.current;
    if (!scroller || !cards.length) return;
    const target = cards[pivotIndex];
    if (!target) return;
    // Attendi il layout e poi scrolla senza animazione
    const id = requestAnimationFrame(() => {
      scroller.scrollTo({ left: target.offsetLeft, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(id);
  }, [pivotIndex, sortedMatches]);

  const scrollByAmount = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('.match-card');
    const delta = (card ? card.clientWidth : el.clientWidth * 0.8) + 16; // gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  // Utilità per formattare data/ora su ogni card
  const formatDateTime = (date) => {
    const shortDate = date
      ? date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
      : '';
    const time = date
      ? date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
      : '';
    return { shortDate, time };
  };

  const visibleItems = useMemo(() => {
    return sortedMatches.map((m) => {
      const date = m.date ? new Date(m.date) : null;
      const { shortDate, time } = formatDateTime(date);
      const start = date ? date.getTime() : null;
      const now = Date.now();
      const diffMin = start != null ? Math.floor((now - start) / 60000) : null;
      const liveNow = start != null && diffMin >= 0 && diffMin < MATCH_DURATION;
      const finished = start != null && diffMin >= MATCH_DURATION;
      const liveText = liveNow ? `${diffMin}' LIVE` : null;
      const matchHref = normalizedCity && m.id ? `/competitions/${normalizedCity}/partite/${m.id}` : undefined;

      return (
        <Link key={m.id || `${shortDate}-${time}`} href={matchHref || '#'} className="match-card" ref={setCardRef} aria-label={`Dettaglio partita ${m.home?.name || ''} contro ${m.away?.name || ''}`}>
          <div className="match-header">
            <span className="match-date" aria-label="Data partita">{shortDate}{time ? ` • ${time}` : ''}</span>
            <div className="match-meta-right">
              {m.stage && <span className="match-stage">{m.stage}</span>}
              {liveNow && (
                <span className="live-badge" aria-label="Partita in corso">
                  <span className="live-dot" />{liveText}
                </span>
              )}
            </div>
          </div>
          <div className="match-body">
            <div className="team">
              <div className="team-logo">
                {m.home?.logo && (
                  <Image src={m.home.logo} alt={m.home?.name || 'Squadra casa'} fill sizes="64px" style={{ objectFit: 'contain' }} />
                )}
              </div>
              {m.home?.name && <div className="team-name" title={m.home.name}>{m.home.name}</div>}
            </div>

            <div className="score-wrap" aria-label="Risultato">
              <span className="score">{m.score || '-'}</span>
              {(finished ? 'FT' : m.status) && !liveNow && (
                <span className="status">{finished ? 'FT' : m.status}</span>
              )}
            </div>

            <div className="team">
              <div className="team-logo">
                {m.away?.logo && (
                  <Image src={m.away.logo} alt={m.away?.name || 'Squadra ospite'} fill sizes="64px" style={{ objectFit: 'contain' }} />
                )}
              </div>
              {m.away?.name && <div className="team-name" title={m.away.name}>{m.away.name}</div>}
            </div>
          </div>
        </Link>
      );
    });
  }, [sortedMatches, normalizedCity]);

  return (
    <section className="matches-section">
      <div className="matches-controls">
        <button type="button" className="nav-btn prev" aria-label="Scorri a sinistra" onClick={() => scrollByAmount(-1)}>‹</button>
        <button type="button" className="nav-btn next" aria-label="Scorri a destra" onClick={() => scrollByAmount(1)}>›</button>
      </div>
      <div ref={scrollerRef} className="matches-scroller">
        {visibleItems}
      </div>
    </section>
  );
}
