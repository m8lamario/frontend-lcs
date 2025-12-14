'use client';

import Image from 'next/image';

/**
 * Timeline degli eventi della partita live.
 * Props:
 *  - match: {
 *      home: { name, logo },
 *      away: { name, logo },
 *      stage, score, status, minute,
 *      events: [{ minute, type: 'goal'|'yellow'|'red', team, player }]
 *    }
 */
export default function LiveMatchTimeline({ match }) {
  if (!match) return null;

  const MATCH_DURATION = 50; // durata regolamentare
  const clamp01 = (n) => Math.max(0, Math.min(1, n));

  // Calcolo minuto live basato sull'orario di inizio
  const startTs = match?.date ? new Date(match.date).getTime() : null;
  const nowTs = Date.now();
  const elapsedMin = startTs ? Math.floor((nowTs - startTs) / 60000) : null;
  const isLiveNow = typeof elapsedMin === 'number' && elapsedMin >= 0 && elapsedMin < MATCH_DURATION;
  const isPast = typeof elapsedMin === 'number' && elapsedMin >= MATCH_DURATION;

  // Eventi ordinati e massimo minuto per determinare eventuale supplementare
  const events = Array.isArray(match.events)
    ? [...match.events].sort((a, b) => (a?.minute ?? 0) - (b?.minute ?? 0))
    : [];

  // Calcolo una versione degli eventi con "displayMinute" solo per la posizione grafica
  const timelineEvents = events.map((event) => {
    const minute = event?.minute ?? 0;
    return { ...event, minute, displayMinute: minute };
  });

  const MIN_TIMELINE_GAP = 6;
  for (let i = 0; i < timelineEvents.length - 2; i += 1) {
    const baseEvent = timelineEvents[i];
    const futureEvent = timelineEvents[i + 2];
    if ((futureEvent.minute - baseEvent.minute) < MIN_TIMELINE_GAP) {
      const bumpedMinute = (baseEvent.displayMinute ?? baseEvent.minute) + MIN_TIMELINE_GAP;
      if (bumpedMinute > (futureEvent.displayMinute ?? futureEvent.minute)) {
        futureEvent.displayMinute = bumpedMinute;
      }
    }
  }

  const maxActualMinute = events.length ? Math.max(...events.map((e) => e?.minute ?? 0)) : 0;
  const maxDisplayMinute = timelineEvents.length
    ? Math.max(...timelineEvents.map((e) => e.displayMinute ?? e.minute ?? 0))
    : 0;
  const effectiveMax = Math.max(MATCH_DURATION, maxDisplayMinute);
  const showExtraTimeLabel = maxActualMinute > MATCH_DURATION;

  const toPct = (min) => `${Math.round(clamp01((min ?? 0) / effectiveMax) * 100)}%`;

  const liveText = isLiveNow
    ? `${elapsedMin}' LIVE`
    : null;

  const iconFor = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'goal':
        return '⚽';
      case 'yellow':
        return '🟨';
      case 'red':
        return '🟥';
      default:
        return '•';
    }
  };

  const sideFor = (teamName) => {
    const homeName = match.home?.name || '';
    return (teamName && teamName === homeName) ? 'top' : 'bottom';
  };

  return (
    <section className="live-timeline-section">
      <div className="live-timeline-card">
        <div className="lt-header">
          <div className="lt-team">
            <div className="lt-logo">
              {match.home?.logo && (
                <Image src={match.home.logo} alt={match.home?.name || 'Casa'} fill sizes="64px" style={{ objectFit: 'contain' }} />
              )}
            </div>
            <div className="lt-team-name" title={match.home?.name}>{match.home?.name}</div>
          </div>

          <div className="lt-center">
            <div className="lt-stage">{match.stage}</div>
            <div className="lt-score" aria-label="Risultato">{match.score || '-'}</div>
            {isLiveNow && (
              <span className="live-badge"><span className="live-dot" />{liveText}</span>
            )}
            {isPast && (
              <span className="ft-badge">FT</span>
            )}
          </div>

          <div className="lt-team">
            <div className="lt-logo">
              {match.away?.logo && (
                <Image src={match.away.logo} alt={match.away?.name || 'Ospiti'} fill sizes="64px" style={{ objectFit: 'contain' }} />
              )}
            </div>
            <div className="lt-team-name" title={match.away?.name}>{match.away?.name}</div>
          </div>
        </div>

        <div className="lt-timeline" aria-label="Timeline eventi">
          <div className="lt-scale">
            <span className="lt-mark lt-start">0'</span>
            <span className="lt-mark lt-end">50'{showExtraTimeLabel ? ' + Supp.' : ''}</span>
          </div>
          <div className="lt-track">
            {/* Indicatore minuto corrente */}
            {isLiveNow && (
              <div className="lt-live-indicator" style={{ left: toPct(elapsedMin ?? 0) }} aria-hidden="true" />
            )}

            {/* Eventi */}
            {timelineEvents.map((e, idx) => {
              const minute = e?.minute ?? 0;
              const displayMinute = typeof e.displayMinute === 'number' ? e.displayMinute : minute;
              const left = toPct(displayMinute);
              const side = sideFor(e?.team);
              const icon = iconFor(e?.type);
              const extra = minute > MATCH_DURATION ? minute - MATCH_DURATION : 0;
              const label = [
                typeof minute === 'number' ? (extra > 0 ? `${MATCH_DURATION}+${extra}'` : `${minute}'`) : null,
                e?.type ? e.type.toUpperCase() : null,
                e?.player ? `— ${e.player}` : null,
                e?.team ? `(${e.team})` : null,
              ].filter(Boolean).join(' ');
              return (
                <div key={idx} className={`lt-event ${side}`} style={{ left }} title={label}>
                  <div className="lt-pin" />
                  <div className="lt-bubble">
                    <span className="lt-icon" aria-hidden="true">{icon}</span>
                    <span className="lt-text">{typeof minute === 'number' ? (extra > 0 ? `${MATCH_DURATION}+${extra}' ` : `${minute}' `) : ''}{e?.player || e?.type || ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
