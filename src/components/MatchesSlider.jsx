'use client';

import Image from 'next/image';
import { useMemo, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function MatchesSlider({ matches = [] }) {
  if (!matches || !matches.length) return null;

  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const reducedMotion = useRef(false);
  const [selectedDay, setSelectedDay] = useState(null);

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

  // Raggruppo per giorno (YYYY-MM-DD)
  const groups = useMemo(() => {
    const byDay = matches.reduce((acc, m) => {
      const d = m.date ? new Date(m.date) : null;
      const key = d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : 'sconosciuto';
      if (!acc[key]) acc[key] = [];
      acc[key].push(m);
      return acc;
    }, {});
    const orderedKeys = Object.keys(byDay).sort();
    return { byDay, orderedKeys };
  }, [matches]);

  // Selezione giorno di default (primo disponibile) o quello che contiene match live
  useEffect(() => {
    if (!groups.orderedKeys?.length) return;
    const liveMatch = matches.find(m => m.isLive);
    const defaultKey = liveMatch && liveMatch.date ? (() => {
      const d = new Date(liveMatch.date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })() : groups.orderedKeys[0];
    setSelectedDay(defaultKey);
  }, [groups.orderedKeys, matches]);

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
  }, [selectedDay, matches]);

  const scrollByAmount = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('.match-card');
    const delta = (card ? card.clientWidth : el.clientWidth * 0.8) + 16; // gap approx
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  const formatDateLabel = (key) => {
    const [y, m, d] = key.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const day = date.toLocaleDateString('it-IT', { weekday: 'short' });
    const dayNum = String(d).padStart(2, '0');
    const month = date.toLocaleDateString('it-IT', { month: 'short' });
    return `${day} ${dayNum} ${month}`;
  };

  const visibleItems = useMemo(() => {
    const list = selectedDay ? (groups.byDay[selectedDay] || []) : matches;
    return list.map((m) => {
      const date = m.date ? new Date(m.date) : null;
      const shortDate = date
        ? date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
        : '';
      const time = date
        ? date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
        : '';

      const liveText = m.isLive ? (typeof m.minute === 'number' ? `${m.minute}' LIVE` : 'LIVE') : null;

      return (
        <div key={m.id} className="match-card" ref={setCardRef}>
          <div className="match-header">
            <span className="match-date" aria-label="Data partita">{shortDate}{time ? ` • ${time}` : ''}</span>
            <div className="match-meta-right">
              {m.stage && <span className="match-stage">{m.stage}</span>}
              {m.isLive && (
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
              {m.status && !m.isLive && <span className="status">{m.status}</span>}
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
        </div>
      );
    });
  }, [selectedDay, groups.byDay, matches]);

  return (
    <section className="matches-section">
      {/* Date tabs */}
      {groups.orderedKeys.length > 1 && (
        <div className="date-tabs" role="tablist" aria-label="Filtra per data">
          {groups.orderedKeys.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={selectedDay === key}
              className={`date-tab${selectedDay === key ? ' active' : ''}`}
              onClick={() => setSelectedDay(key)}
              type="button"
            >
              {formatDateLabel(key)}
            </button>
          ))}
        </div>
      )}

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
