'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    // Se la partita non è live, non mostriamo l'indicatore
    if (match?.status !== 'LIVE' && !match?.isLive) {
      setCurrentMinute(null);
      return;
    }

    const calculateMinute = () => {
      if (!match?.date) return;
      const start = new Date(match.date).getTime();
      const now = Date.now();
      const diff = Math.floor((now - start) / 60000);
      // Limitiamo il minuto tra 0 e MATCH_DURATION
      const min = Math.min(Math.max(0, diff), MATCH_DURATION);
      setCurrentMinute(min);
    };

    calculateMinute();
    const interval = setInterval(calculateMinute, 30000); // Aggiorna ogni 30s
    return () => clearInterval(interval);
  }, [match?.date, match?.status, match?.isLive, MATCH_DURATION]);

  if (!match) return null;

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
    <div className="live-timeline-vertical">
      {/* Match Header: Teams and Score */}
      <div className="lt-v-header">
        <div className="lt-v-team lt-v-left">
          <div className="lt-v-logo">
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
          <span className="lt-v-team-name">{match.home?.name}</span>
        </div>

        <div className="lt-v-score-container">
          <div className="lt-v-score-row">
             <span className="lt-v-score-val">{match.score?.split('-')[0]?.trim() || 0}</span>
             <span className="lt-v-score-divider">-</span>
             <span className="lt-v-score-val">{match.score?.split('-')[1]?.trim() || 0}</span>
          </div>
          <div className="lt-v-match-status">
            <span className="lt-v-stage">{match.stage}</span>
            {match.status === 'LIVE' && (
              <span className="lt-v-live-tag">
                <span className="lt-v-live-dot" />
                LIVE
              </span>
            )}
          </div>
        </div>

        <div className="lt-v-team lt-v-right">
          <div className="lt-v-logo">
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
          <span className="lt-v-team-name">{match.away?.name}</span>
        </div>
      </div>

      {/* Timeline Body */}
      <div className="lt-v-body">
        <div className="lt-v-axis" />
        
        {/* Live Progress Indicator */}
        {currentMinute !== null && currentMinute >= 0 && currentMinute <= MATCH_DURATION && (
          <div 
            className="lt-v-live-progress"
            style={{ 
              top: `calc(${currentMinute} * (100vh / ${MATCH_DURATION}))`,
              marginTop: '2rem' 
            }}
          >
            <div className="lt-v-live-progress-dot" />
            <div className="lt-v-live-progress-line" />
            <span className="lt-v-live-progress-text">{currentMinute}'</span>
          </div>
        )}

        {Array.from({ length: MATCH_DURATION + 1 }).map((_, minute) => {
          const events = eventsByMinute[minute] || [];
          const isMark = minute % 10 === 0 || minute === 0 || minute === MATCH_DURATION;

          if (events.length === 0 && !isMark) return null;

          return (
            <div 
              key={minute} 
              className="lt-v-minute-slot"
              style={{ 
                top: `calc(${minute} * (100vh / ${MATCH_DURATION}) - (100vh / ${MATCH_DURATION} / 2))`,
                height: `calc(100vh / ${MATCH_DURATION})`
              }}
            >
              {isMark && <span className="lt-v-time-mark" style={{ top: '50%' }}>{minute}'</span>}
              
              <div className="lt-v-events-stack">
                {events.map((event, idx) => {
                  const isHome = event.team === homeName;
                  const sideClass = isHome ? 'left' : 'right';
                  
                  // Stacking logic within the minute slot
                  // We use absolute positioning within the slot.
                  // Center events vertically within the slot space.
                  const verticalOffset = ((idx + 0.5) / events.length) * 100;

                  return (
                    <div 
                      key={idx} 
                      className={`lt-v-event-row lt-v-${sideClass}`}
                      style={{ top: `${verticalOffset}%` }}
                    >
                      <div className="lt-v-marker-dot" />
                      <div className="lt-v-connector-line" />
                      <div className="lt-v-event-details">
                        <span className="lt-v-type-icon">{iconFor(event.type)}</span>
                        <span className="lt-v-player">{event.player}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
