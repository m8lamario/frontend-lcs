'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogSlider.module.css';

const MAX_VISIBLE = 5;

export default function BlogSlider({ items = [], city, durationMs = 5000, fallbackImage = '/HomeFoto/19.webp' }) {
  const normalized = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return [...items]
      .filter(n => n && n.title && n.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, MAX_VISIBLE);
  }, [items]);

  const slides = useMemo(() => {
    if (!normalized.length) return [];
    return normalized;
  }, [normalized]);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, durationMs);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [slides.length, durationMs, isPaused]);

  if (!slides.length) return null;

  const current = slides[index];
  const imgSrc = current?.image || fallbackImage;
  const dateFormatted = current?.date
    ? new Date(current.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <section
      className={styles.scrollBlog}
      aria-roledescription="carousel"
      aria-label="Blog posts"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Link 
        href={`/competitions/${city}/blog/${current.slug}`}
        className={styles.card}
      >
        <div className={styles.imageWrap}>
          <Image
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
            <span>Blog</span>
            {dateFormatted && (
              <time className={styles.date} dateTime={current.date}>{dateFormatted}</time>
            )}
          </div>
          <h3 className={styles.title}>{current.title}</h3>
          {current?.subtitle && <p className={styles.excerpt}>{current.subtitle}</p>}
        </div>
      </Link>
      {slides.length > 1 && (
        <div className={styles.indicators}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.indicatorButton} ${idx === index ? styles.indicatorActive : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIndex(idx);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
