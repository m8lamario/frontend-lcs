'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import EmptyState from './EmptyState';
import styles from './CityScrollNews.module.css';
const MAX_VISIBLE = 5;

export default function CityScrollNews({ items = [], durationMs = 2000, fallbackImage = '/HomeFoto/19.jpg' }) {
  const normalized = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return [...items]
      .filter(n => n && n.title && n.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, MAX_VISIBLE);
  }, [items]);

  const slides = useMemo(() => {
    if (!normalized.length) return [];
    if (normalized.length === 1) {
      const only = normalized[0];
      return [...normalized, { ...only, id: `${only.id}-copy`, duplicated: true }];
    }
    return normalized;
  }, [normalized]);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, durationMs);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [slides.length, durationMs, isPaused]);

  const handlePause = (shouldPause) => setIsPaused(shouldPause);

  const goTo = (direction) => {
    setIndex(prev => {
      const next = (prev + direction + slides.length) % slides.length;
      return next;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      goTo(1);
      event.preventDefault();
    }
    if (event.key === 'ArrowLeft') {
      goTo(-1);
      event.preventDefault();
    }
  };

  if (!slides.length) {
    return (
      <EmptyState
        title="Nessuna notizia disponibile"
        description="Stiamo preparando nuovi aggiornamenti per questa città. Riprova più tardi per scoprire tutte le novità."
        action={{ label: 'Torna alla panoramica', href: '/' }}
      />
    );
  }
  const current = slides[index];
  const imgSrc = current?.image || fallbackImage;
  const dateFormatted = current?.date
    ? new Date(current.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <section
      className={styles.scrollNews}
      aria-roledescription="carousel"
      aria-label="Notizie principali"
      onMouseEnter={() => handlePause(true)}
      onMouseLeave={() => handlePause(false)}
    >
      <article
        className={styles.card}
        ref={carouselRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.imageWrap}>
          <Image
            key={current.id}
            src={imgSrc}
            alt={current.title}
            fill
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 90vw, 1200px"
            className={styles.image}
          />
          <div className={styles.gradient} />
        </div>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span>{index === 0 ? 'In evidenza' : 'Aggiornamento'}</span>
            {dateFormatted && (
              <time className={styles.date} dateTime={current.date}>{dateFormatted}</time>
            )}
          </div>
          <h3 className={styles.title}>{current.title}</h3>
          {current?.excerpt && <p className={styles.excerpt}>{current.excerpt}</p>}
        </div>
      </article>
      {slides.length > 1 && (
        <div className={styles.indicators} role="tablist" aria-label="Indicatori notizie">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.indicatorButton} ${idx === index ? styles.indicatorActive : ''}`.trim()}
              role="tab"
              aria-selected={idx === index}
              aria-label={`Vai alla notizia ${idx + 1}`}
              onClick={() => setIndex(idx)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
