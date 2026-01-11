import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { localleagues, matches } from '@/data/CorrectDataStructure';
import { eslMatches } from '@/data/eslData';
import LiveMatchTimeline from '@/components/LiveMatchTimeline';
import styles from './match.module.css';

const MATCH_DURATION = 50;
const MATCH_CENTER_SLUG = 'partite';
const MATCH_CENTER_LEAGUE = { slug: MATCH_CENTER_SLUG, title: 'LCS Match Center', name: 'Match Center Nazionale' };

const allLeagues = [...localleagues, MATCH_CENTER_LEAGUE];

const leaguesBySlug = allLeagues.reduce((acc, league) => {
    acc[league.slug.toLowerCase()] = league;
    return acc;
}, {});

const matchesByLeague = matches.reduce((acc, match) => {
    const slugs = new Set(
        (match?.teams || [])
            .map(({ team }) => team?.local_league?.toLowerCase?.())
            .filter(Boolean)
    );
    slugs.forEach((slug) => {
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(match);
    });
    return acc;
}, {});

matchesByLeague[MATCH_CENTER_SLUG] = eslMatches || [];

const getMatchesForLeague = (slug) => matchesByLeague[slug?.toLowerCase?.()] || [];

const findMatchForLeague = (slug, matchId) =>
    getMatchesForLeague(slug).find((match) => String(match.id) === String(matchId));

const getMatchStartTimestamp = (match) => {
    if (!match?.date) return null;
    const ts = new Date(match.date).getTime();
    return Number.isFinite(ts) ? ts : null;
};

const deriveMatchStatus = (match, { isLive, finished }, nowTs) => {
    if (isLive) return 'LIVE';
    if (finished) return 'FINISHED';
    const start = getMatchStartTimestamp(match);
    if (start !== null && start > nowTs) return 'SCHEDULED';
    return match.status || 'SCHEDULED';
};

const createEventList = (match) => {
    if (Array.isArray(match?.teams) && match.teams.length) {
        const events = match.teams.flatMap((teamEntry) => {
            const teamName = teamEntry.team?.name || '';
            return (teamEntry.events || []).map((event) => {
                const minuteValue = typeof event.minute === 'number' ? event.minute : Number(event.minute);
                return {
                    minute: Number.isFinite(minuteValue) ? minuteValue : null,
                    type: event.event_type || 'Evento',
                    player: event.player || 'Giocatore sconosciuto',
                    team: teamName
                };
            });
        });
        return events.sort((a, b) => (a.minute ?? Infinity) - (b.minute ?? Infinity));
    }

    if (Array.isArray(match?.events)) {
        const events = match.events.map((event) => {
            const minuteValue = typeof event.minute === 'number' ? event.minute : Number(event.minute);
            return {
                minute: Number.isFinite(minuteValue) ? minuteValue : null,
                type: event.type || 'Evento',
                player: event.player || 'Giocatore sconosciuto',
                team: event.team || ''
            };
        });
        return events.sort((a, b) => (a.minute ?? Infinity) - (b.minute ?? Infinity));
    }

    return [];
};

const normalizeMatchData = (match) => {
    const entries = Array.isArray(match?.teams) ? match.teams : [];
    const hasStructuredTeams = entries.length > 0;
    const homeEntry = hasStructuredTeams ? (entries.find((team) => team.is_home) || entries[0] || null) : null;
    const awayEntry = hasStructuredTeams ? (entries.find((team) => !team.is_home) || entries[1] || null) : null;

    const fallbackHome = match.home || {};
    const fallbackAway = match.away || {};

    return {
        id: String(match.id),
        date: match.datetime || match.date || null,
        stage: match.stage || match.name || '',
        score: match.score_text || match.score || '-',
        status: match.finished ? 'FINISHED' : match.status || 'SCHEDULED',
        home: {
            name: homeEntry?.team?.name || fallbackHome.name || 'Sconosciuta',
            logo: homeEntry?.team?.logo || fallbackHome.logo || null
        },
        away: {
            name: awayEntry?.team?.name || fallbackAway.name || 'Sconosciuta',
            logo: awayEntry?.team?.logo || fallbackAway.logo || null
        },
        events: createEventList(match)
    };
};

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

const buildMatchView = (match, nowTs) => {
    const normalized = normalizeMatchData(match);
    const liveState = computeLiveState(normalized);
    const status = deriveMatchStatus(normalized, liveState, nowTs);
    const matchStart = getMatchStartTimestamp(normalized);
    const isUpcoming = status === 'SCHEDULED' && matchStart !== null && matchStart > nowTs;
    const shouldHideScore = !liveState.isLive && !liveState.finished && (matchStart === null || nowTs < matchStart);

    return {
        ...normalized,
        ...liveState,
        status,
        isUpcoming,
        score: shouldHideScore ? '-' : normalized.score
    };
};

export async function generateStaticParams() {
    const leagueParams = localleagues.flatMap((league) =>
        getMatchesForLeague(league.slug).map((match) => ({ city: league.slug, matchId: String(match.id) }))
    );
    const matchCenterParams = (eslMatches || []).map((match) => ({ city: MATCH_CENTER_SLUG, matchId: String(match.id) }));
    return [...leagueParams, ...matchCenterParams];
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const { city, matchId } = resolvedParams;
    const key = city?.toLowerCase?.();
    const league = leaguesBySlug[key];
    const match = league ? findMatchForLeague(league.slug, matchId) : null;
    if (!league || !match) {
        return { title: 'Partita non trovata' };
    }
    const normalized = normalizeMatchData(match);
    const home = normalized.home?.name || 'Sconosciuta';
    const away = normalized.away?.name || 'Sconosciuta';
    return {
        title: `${home} vs ${away} — ${league.title}`,
        description: `Dettaglio partita ${home} vs ${away} (${normalized.stage || 'Torneo'})`
    };
}

export default async function MatchDetailPage({ params }) {
    const resolvedParams = await params;
    const { city, matchId } = resolvedParams;
    const key = city?.toLowerCase?.();
    const league = leaguesBySlug[key];
    if (!league) notFound();

    const rawMatch = findMatchForLeague(league.slug, matchId);
    if (!rawMatch) notFound();

    const nowTs = Date.now();
    const match = buildMatchView(rawMatch, nowTs);
    const { shortDate, time } = formatDate(match.date);
    const viewTimeline = match.isLive || match.finished;
    const backHref = city === MATCH_CENTER_SLUG ? `/Partite` : `/competitions/${city}/partite`;

    return (
        <div className={styles['match-detail-page']}>
            <div className={styles['match-detail-header']}>
                <Link className={styles['back-link']} href={backHref}>
                    &larr; Torna alle partite
                </Link>
                <h1>{league.title}</h1>
                <p className={styles['match-meta']}>
                    <span>{shortDate}</span>
                    {time && <span>• {time}</span>}
                    {match.stage && <span>• {match.stage}</span>}
                </p>
            </div>

            <section className={styles['match-detail-card']}>
                <div className={styles['team-block']}>
                    <div className={styles['team-logo']}>
                        {match.home?.logo && (
                            <Image src={match.home.logo} alt={match.home?.name || 'Squadra casa'} fill sizes="120px" style={{ objectFit: 'contain' }} />
                        )}
                    </div>
                    <p className={styles['team-name']}>{match.home?.name || 'TBD'}</p>
                </div>
                <div className={styles['score-section']}>
                    <p className={styles['score']}>{match.score || '-'}</p>
                    <p className={styles['status']}>
                        {match.isLive && match.minute !== null && `${match.minute}' LIVE`}
                        {!match.isLive && match.finished && 'FT'}
                        {!match.isLive && !match.finished && (match.status || 'SCHEDULED')}
                    </p>
                </div>
                <div className={styles['team-block']}>
                    <div className={styles['team-logo']}>
                        {match.away?.logo && (
                            <Image src={match.away.logo} alt={match.away?.name || 'Squadra ospite'} fill sizes="120px" style={{ objectFit: 'contain' }} />
                        )}
                    </div>
                    <p className={styles['team-name']}>{match.away?.name || 'TBD'}</p>
                </div>
            </section>

            {Array.isArray(match.events) && match.events.length > 0 && (
                <section className={styles['events-section']}>
                    <h2>Eventi</h2>
                    <ul>
                        {match.events.map((event, idx) => (
                            <li key={`${event.minute}-${idx}`}>
                                <span className={styles['minute']}>{event.minute}&rsquo;</span>
                                <span className={styles['type']}>{event.type}</span>
                                <span className={styles['player']}>{event.player}</span>
                                {event.team && <span className={styles['team']}>({event.team})</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {viewTimeline  && (
                <section className={styles['timeline-section']}>
                    <h2>Andamento Live</h2>
                    <LiveMatchTimeline match={match} />
                </section>
            )}
        </div>
    );
}
