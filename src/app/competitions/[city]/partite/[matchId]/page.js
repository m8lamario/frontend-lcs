import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import cities from '@/data/cities';
import LiveMatchTimeline from '@/components/LiveMatchTimeline';
import './match.css';

export async function generateStaticParams() {
    return Object.entries(cities).flatMap(([cityKey, data]) => {
        if (!Array.isArray(data.matches)) return [];
        return data.matches.map(match => ({ city: cityKey, matchId: match.id }));
    });
}

export async function generateMetadata({ params }) {
    const { city, matchId } = await params;
    const key = city?.toLowerCase?.();
    const match = key ? cities[key]?.matches?.find((m) => m.id === matchId) : null;
    if (!match) {
        return { title: 'Partita non trovata' };
    }
    const home = match.home?.name || 'Sconosciuta';
    const away = match.away?.name || 'Sconosciuta';
    return {
        title: `${home} vs ${away} — ${cities[key].title}`,
        description: `Dettaglio partita ${home} vs ${away} (${match.stage || 'Torneo'})`
    };
}

const MATCH_DURATION = 50;

const formatDate = (dateStr) => {
    if (!dateStr) return { shortDate: '', time: '' };
    const date = new Date(dateStr);
    return {
        shortDate: date.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }),
        time: date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };
};

const computeLiveState = (match) => {
    if (!match?.date) return { isLive: false, finished: false, minute: null };
    const start = new Date(match.date).getTime();
    const now = Date.now();
    const diffMin = Math.floor((now - start) / 60000);
    const isLive = diffMin >= 0 && diffMin < MATCH_DURATION;
    const finished = diffMin >= MATCH_DURATION;
    return { isLive, finished, minute: isLive ? diffMin : null };
};

export default async function MatchDetailPage({ params }) {
    const { city, matchId } = await params;
    const key = city?.toLowerCase?.();
    const data = key ? cities[key] : null;
    if (!data) notFound();

    const match = data.matches?.find((m) => m.id === matchId);
    if (!match) notFound();

    const { shortDate, time } = formatDate(match.date);
    const { isLive, finished, minute } = computeLiveState(match);

    return (
        <div className="match-detail-page">
            <div className="match-detail-header">
                <Link className="back-link" href={`/competitions/${city}/partite`}>
                    &larr; Torna alle partite
                </Link>
                <h1>{data.title}</h1>
                <p className="match-meta">
                    <span>{shortDate}</span>
                    {time && <span>• {time}</span>}
                    {match.stage && <span>• {match.stage}</span>}
                </p>
            </div>

            <section className="match-detail-card">
                <div className="team-block">
                    <div className="team-logo">
                        {match.home?.logo && (
                            <Image src={match.home.logo} alt={match.home?.name || 'Squadra casa'} fill sizes="120px" style={{ objectFit: 'contain' }} />
                        )}
                    </div>
                    <p className="team-name">{match.home?.name || 'TBD'}</p>
                </div>
                <div className="score-section">
                    <p className="score">{match.score || '-'}</p>
                    <p className="status">
                        {isLive && minute !== null && `${minute}' LIVE`}
                        {!isLive && finished && 'FT'}
                        {!isLive && !finished && (match.status || 'SCHEDULED')}
                    </p>
                </div>
                <div className="team-block">
                    <div className="team-logo">
                        {match.away?.logo && (
                            <Image src={match.away.logo} alt={match.away?.name || 'Squadra ospite'} fill sizes="120px" style={{ objectFit: 'contain' }} />
                        )}
                    </div>
                    <p className="team-name">{match.away?.name || 'TBD'}</p>
                </div>
            </section>

            {Array.isArray(match.events) && match.events.length > 0 && (
                <section className="events-section">
                    <h2>Eventi</h2>
                    <ul>
                        {match.events.map((event, idx) => (
                            <li key={`${event.minute}-${idx}`}>
                                <span className="minute">{event.minute}&rsquo;</span>
                                <span className="type">{event.type}</span>
                                <span className="player">{event.player}</span>
                                {event.team && <span className="team">({event.team})</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {isLive && (
                <section className="timeline-section">
                    <h2>Andamento Live</h2>
                    <LiveMatchTimeline match={{ ...match, minute }} />
                </section>
            )}
        </div>
    );
}
