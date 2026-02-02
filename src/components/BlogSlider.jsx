'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogSlider.module.css';

const MAX_VISIBLE = 5;
const DRAG_THRESHOLD = 50; // Soglia minima in pixel per considerare un drag

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
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, durationMs);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [slides.length, durationMs, isPaused]);

  const handleDragStart = useCallback((clientX) => {
    setIsDragging(true);
    setIsPaused(true);
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
    hasDragged.current = false;
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    dragCurrentX.current = clientX;
    const diff = Math.abs(dragCurrentX.current - dragStartX.current);
    if (diff > 10) {
      hasDragged.current = true;
    }
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = dragStartX.current - dragCurrentX.current;

    if (Math.abs(diff) >= DRAG_THRESHOLD && slides.length > 1) {
      if (diff > 0) {
        // Drag verso sinistra -> slide successiva
        setIndex(prev => (prev + 1) % slides.length);
      } else {
        // Drag verso destra -> slide precedente
        setIndex(prev => (prev - 1 + slides.length) % slides.length);
      }
    }

    // Reset dopo un breve delay per permettere il click se non c'è stato drag
    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  }, [isDragging, slides.length]);

  // Mouse events
  const handleMouseDown = useCallback((e) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
    setIsPaused(false);
  }, [isDragging, handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback((e) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Previeni il click sul link se c'è stato un drag
  const handleLinkClick = useCallback((e) => {
    if (hasDragged.current) {
      e.preventDefault();
    }
  }, []);

  if (!slides.length) return null;

  const current = slides[index];
  const imgSrc = current?.image || fallbackImage;
  const dateFormatted = current?.date
    ? new Date(current.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <section
      ref={containerRef}
      className={`${styles.scrollBlog} ${isDragging ? styles.dragging : ''}`}
      aria-roledescription="carousel"
      aria-label="Blog posts"
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link 
        href={`/competitions/${city}/blog/${current.slug}`}
        className={styles.card}
        onClick={handleLinkClick}
        draggable={false}
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
              aria-label="carousel indicator"
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
