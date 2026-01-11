// javascript
import { notFound, redirect } from 'next/navigation';
import { localleagues, matches as allMatches } from '@/data/CorrectDataStructure';
import AnimatedTitle from '@/components/AnimatedTitle';
import TeamsRoster from '@/components/TeamsRoster';
import MatchesSlider from '@/components/MatchesSlider';
import LiveMatchTimeline from '@/components/LiveMatchTimeline';
import AnimatedSectionTitle from '@/components/AnimatedSectionTitle';
import Standings from '@/components/Standings';
import NewsSection from '@/components/NewsSection';
import "./section.css";

const DEFAULT_LOGO = '/logo/PNG-lcs_logo_white_t.png';
const MATCH_DURATION = 50;
const toArray = (value) => (Array.isArray(value) ? value : []);

const leaguesBySlug = localleagues.reduce((acc, league) => {
    if (league?.slug) acc[league.slug.toLowerCase()] = league;
    return acc;
}, {});

const normalizeEventType = (type = '') => {
    switch (type.toUpperCase()) {
        case 'GOAL':
            return 'goal';
        case 'YELLOW_CARD':
            return 'yellow';
        case 'RED_CARD':
            return 'red';
        default:
            return type.toLowerCase();
    }
};

const buildEvents = (teamMatch, fallbackName) =>
    toArray(teamMatch?.events).map((event, idx) => ({
        minute: event.minute ?? 0,
        type: normalizeEventType(event.event_type || ''),
        team: fallbackName,
        player: event.player || `${fallbackName} #${idx + 1}`
    }));

const formatScore = (home, away, scoreText) => {
    if (scoreText) return scoreText;
    if (home?.score != null && away?.score != null) return `${home.score} - ${away.score}`;
    return '-';
};

const rawMatchesCache = new Map();
const getRawMatchesForLeague = (slug) => {
    const key = slug?.toLowerCase?.() ?? slug;
    if (rawMatchesCache.has(key)) return rawMatchesCache.get(key);

    const filtered = toArray(allMatches)
        .filter((match) =>
            toArray(match.teams).some(
                (teamMatch) => (teamMatch?.team?.local_league ?? '').toLowerCase() === key
            )
        );

    rawMatchesCache.set(key, filtered);
    return filtered;
};

const matchesCache = new Map();
const getMatchesForLeague = (slug) => {
    const key = slug?.toLowerCase?.() ?? slug;
    if (matchesCache.has(key)) return matchesCache.get(key);

    const mapped = getRawMatchesForLeague(key)
        .map((match) => {
            const teams = toArray(match.teams);
            const homeEntry = teams.find((entry) => entry.is_home);
            const awayEntry = teams.find((entry) => entry.is_home === false);
            const homeName = homeEntry?.team?.name || homeEntry?.team?.short_name || 'Home';
            const awayName = awayEntry?.team?.name || awayEntry?.team?.short_name || 'Away';
            const start = match.datetime ? new Date(match.datetime).getTime() : null;
            const now = Date.now();
            const isLive = !match.finished && start !== null && now >= start && now <= start + MATCH_DURATION * 60000;
            const status = match.finished ? 'FT' : isLive ? 'LIVE' : 'SCHEDULED';

            return {
                id: match.id,
                date: match.datetime,
                stage: match.stage || match.name || 'Match Day',
                home: { name: homeName, logo: DEFAULT_LOGO },
                away: { name: awayName, logo: DEFAULT_LOGO },
                score: formatScore(homeEntry, awayEntry, match.score_text),
                status,
                isLive,
                events: [...buildEvents(homeEntry, homeName), ...buildEvents(awayEntry, awayName)]
            };
        });

    matchesCache.set(key, mapped);
    return mapped;
};

const mapTeamsForRoster = (league) =>
    toArray(league?.teams).map((team, index) => ({
        id: team.slug || team.id || `team-${index}`,
        name: team.name || team.short_name || `Team ${index + 1}`,
        logo: team.logo || DEFAULT_LOGO,
        city: league.name || league.title,
        coach: team.coach || 'Coach da definire',
        founded: team.founded,
        colors: team.colors,
        record: team.record,
        achievements: team.achievements,
        contact: team.contact
    }));

const buildGroupsForLeague = (league) => {
    const teams = mapTeamsForRoster(league);
    if (!teams.length) return [];
    return [
        {
            name: league.title ? `${league.title} — Girone Unico` : 'Girone Unico',
            teams: teams.map((team) => ({
                id: team.id,
                name: team.name,
                logo: team.logo,
                p: team.p ?? 0,
                w: team.w ?? 0,
                d: team.d ?? 0,
                l: team.l ?? 0,
                gf: team.gf ?? 0,
                ga: team.ga ?? 0,
                gd: team.gd ?? 0,
                pts: team.pts ?? 0
            }))
        }
    ];
};

const leagueSections = (league, slug) => {
    const sections = new Set(['home']);
    if (mapTeamsForRoster(league).length) sections.add('squadre');
    if (getMatchesForLeague(slug).length) sections.add('partite');
    if (buildGroupsForLeague(league).length) sections.add('classifica');
    if (toArray(league.news).length) sections.add('notizie');
    return sections;
};

export async function generateStaticParams() {
    return localleagues.flatMap((league) => {
        const slug = league.slug?.toLowerCase();
        if (!slug) return [];
        return Array.from(leagueSections(league, slug)).map((section) => ({ city: slug, section }));
    });
}

export async function generateMetadata({ params }) {
    const { city, section } = await params;
    const league = leaguesBySlug[city.toLowerCase()];
    const sectionKey = section?.toLowerCase?.() ?? '';
    const baseTitle = league?.name || league?.title || 'Competitions';
    const title = sectionKey === 'home' || !sectionKey
        ? baseTitle
        : `${baseTitle} — ${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
    return { title };
}

export default async function SectionPage({ params }) {
    const { city, section } = await params;
    const slug = city.toLowerCase();
    const league = leaguesBySlug[slug];
    if (!league) notFound();

    const sectionKey = section?.toLowerCase?.() ?? '';
    const availableSections = leagueSections(league, slug);
    if (!availableSections.has(sectionKey)) notFound();

    if (sectionKey === 'home') {
        return redirect(`/competitions/${city}`);
    }

    const teams = mapTeamsForRoster(league);
    const matches = getMatchesForLeague(slug);
    const rawMatches = getRawMatchesForLeague(slug);
    const groups = buildGroupsForLeague(league);
    const news = toArray(league.news);

    const nowTs = Date.now();
    const liveMatch = matches.find((m) => {
        const start = m?.date ? new Date(m.date).getTime() : null;
        if (start === null) return false;
        const diffMin = Math.floor((nowTs - start) / 60000);
        return diffMin >= 0 && diffMin < MATCH_DURATION;
    });

    const placeholderLiveMatch = {
        id: 'nd',
        status: 'ND',
        stage: 'ND',
        score: 'ND - ND',
        events: [],
        home: { name: 'ND', logo: DEFAULT_LOGO },
        away: { name: 'ND', logo: DEFAULT_LOGO },
        date: null
    };
    const timelineMatch = liveMatch || placeholderLiveMatch;

    const sectionContent = {
        squadre: teams.length ? <TeamsRoster teams={teams} citySlug={slug} /> : null,
        partite: matches.length ? (
            <>
                <MatchesSlider matches={matches} citySlug={slug} />
                <LiveMatchTimeline match={timelineMatch} />
            </>
        ) : null,
        classifica: groups.length ? <Standings groups={groups} matches={rawMatches} /> : null,
        notizie: news.length ? (
            <>
                <AnimatedSectionTitle className="CityTitleInfo">Notizie</AnimatedSectionTitle>
                <p className="news-intro">Ultimi aggiornamenti, comunicati e curiosità dal torneo.</p>
                <NewsSection news={news} />
            </>
        ) : null
    }[sectionKey];

    if (!sectionContent) {
        return notFound();
    }

    const sectionContainerClass = `city-section city-${sectionKey}`;

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={league.name || league.title} />
                </div>
            </div>

            <div className={sectionContainerClass}>
                {sectionContent}
            </div>
        </div>
    );
}
