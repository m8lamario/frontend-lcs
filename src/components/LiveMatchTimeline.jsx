'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Styles/LiveMatchTimeline.module.css';

/**
 * Reusable vertical timeline component for football match events.
 * 
 * Input: match object containing home/away info and an events array.
 * Events array structure: [{ minute, type, player, team }]
 * 
 * Layout:
 * - Total height based on viewport (100vh).
 * - Each minute gets viewportHeight / 50 space.
 * - Team-based side alignment (left/right).
 * - Visual connectors (dot + line).
 */
export default function LiveMatchTimeline({ match }) {
  const MATCH_DURATION = 50;

  const [currentMinute, setCurrentMinute] = useState(null);

  const matchDate = match?.date ? new Date(match.date) : null;
  const now = useMemo(() => new Date(), []);
  const hasStarted = matchDate ? matchDate.getTime() <= now.getTime() : false;
  const isLive = match?.status === 'LIVE' || match?.isLive;
  const isUpcoming = !hasStarted && !isLive;
  const showTimeline = isLive || hasStarted;
  const hasEvents = Array.isArray(match?.events) && match.events.length > 0;

  useEffect(() => {
    if (!match?.date || !showTimeline) {
      setCurrentMinute(null);
      return;
    }

    if (match?.status !== 'LIVE' && !match?.isLive) {
      setCurrentMinute(null);
      return;
    }

    const calculateMinute = () => {
      const start = new Date(match.date).getTime();
      const nowTs = Date.now();
      const diff = Math.floor((nowTs - start) / 60000);
      const min = Math.min(Math.max(0, diff), MATCH_DURATION);
      setCurrentMinute(min);
    };

    calculateMinute();
    const interval = setInterval(calculateMinute, 30000);
    return () => clearInterval(interval);
  }, [match?.date, match?.status, match?.isLive, MATCH_DURATION, showTimeline]);

  if (!match || (!showTimeline && !isUpcoming)) return null;

  // Group events by minute
  const eventsByMinute = useMemo(() => {
    const groups = {};
    (match.events || []).forEach(event => {
      const min = Math.min(Math.max(0, event.minute), MATCH_DURATION);
      if (!groups[min]) groups[min] = [];
      groups[min].push(event);
    });
    return groups;
  }, [match.events]);

  const homeName = match.home?.name;

  const iconFor = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'goal': return '⚽';
      case 'yellow': return '🟨';
      case 'red': return '🟥';
      default: return '•';
    }
  };

  return (
    <div className={styles['live-timeline-vertical']}>
      {/* Match Header: Teams and Score */}
      <div className={styles['lt-v-header']}>
        <div className={`${styles['lt-v-team']} ${styles['lt-v-left']}`}>
          <div className={styles['lt-v-logo']}>
            {match.home?.logo && (
              <Image 
                src={match.home.logo} 
                alt={match.home?.name || 'Home'} 
                fill 
                sizes="48px" 
                style={{ objectFit: 'contain' }} 
              />
            )}
          </div>
          <span className={styles['lt-v-team-name']}>{match.home?.name}</span>
        </div>

        <div className={styles['lt-v-score-container']}>
          <div className={styles['lt-v-score-row']}>
             <span className={styles['lt-v-score-val']}>{match.score?.split('-')[0]?.trim() || 0}</span>
             <span className={styles['lt-v-score-divider']}>-</span>
             <span className={styles['lt-v-score-val']}>{match.score?.split('-')[1]?.trim() || 0}</span>
          </div>
          <div className={styles['lt-v-match-status']}>
            <span className={styles['lt-v-stage']}>{match.stage}</span>
            {match.status === 'LIVE' && (
              <span className={styles['lt-v-live-tag']}>
                <span className={styles['lt-v-live-dot']} />
                LIVE
              </span>
            )}
          </div>
        </div>

        <div className={`${styles['lt-v-team']} ${styles['lt-v-right']}`}>
          <div className={styles['lt-v-logo']}>
            {match.away?.logo && (
              <Image 
                src={match.away.logo} 
                alt={match.away?.name || 'Away'} 
                fill 
                sizes="48px" 
                style={{ objectFit: 'contain' }} 
              />
            )}
          </div>
          <span className={styles['lt-v-team-name']}>{match.away?.name}</span>
        </div>
      </div>

      {/* Timeline Body */}
      <div className={styles['lt-v-body']}>
        <div className={styles['lt-v-axis']} />

        {showTimeline && currentMinute !== null && currentMinute >= 0 && currentMinute <= MATCH_DURATION && (
          <div
            className={styles['lt-v-live-progress']}
            style={{
              top: `calc(${currentMinute} * (100vh / ${MATCH_DURATION}))`,
              marginTop: '2rem' 
            }}
          >
            <div className={styles['lt-v-live-progress-dot']} />
            <div className={styles['lt-v-live-progress-line']} />
            <span className={styles['lt-v-live-progress-text']}>{currentMinute}'</span>
          </div>
        )}

        {showTimeline && Array.from({ length: MATCH_DURATION + 1 }).flatMap((_, minute) => {
          const events = eventsByMinute[minute] || [];
          const isMark = minute % 10 === 0 || minute === 0 || minute === MATCH_DURATION;

          if (events.length === 0 && !isMark && (isUpcoming || !hasEvents)) return [];

          return (
            <div
              key={minute}
              className={styles['lt-v-minute-slot']}
              style={{
                top: `calc(${minute} * (100vh / ${MATCH_DURATION}) - (100vh / ${MATCH_DURATION} / 2))`,
                height: `calc(100vh / ${MATCH_DURATION})`
              }}
            >
              {isMark && <span className={styles['lt-v-time-mark']} style={{ top: '50%' }}>{minute}'</span>}

              {!isUpcoming && (
                <div className={styles['lt-v-events-stack']}>
                  {events.map((event, idx) => {
                    const isHome = event.team === homeName;
                    const sideClass = isHome ? styles['lt-v-left'] : styles['lt-v-right'];
                    const verticalOffset = ((idx + 0.5) / events.length) * 100;

                    return (
                      <div
                        key={idx}
                        className={`${styles['lt-v-event-row']} ${sideClass}`}
                        style={{ top: `${verticalOffset}%` }}
                      >
                        <div className={styles['lt-v-marker-dot']} />
                        <div className={styles['lt-v-connector-line']} />
                        <div className={styles['lt-v-event-details']}>
                          <span className={styles['lt-v-type-icon']}>{iconFor(event.type)}</span>
                          <span className={styles['lt-v-player']}>{event.player}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
