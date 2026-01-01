import { notFound } from 'next/navigation';
import AnimatedTitle from '@/components/AnimatedTitle';
import MatchesSlider from '@/components/MatchesSlider';
import LiveMatchTimeline from '@/components/LiveMatchTimeline';
import TeamsRoster from '@/components/TeamsRoster';
import cities from '@/data/cities';
import '../competitions/[city]/[section]/section.css';
import './partite.css';

const DEFAULT_CITY_SLUG = 'partite';
const MATCH_DURATION_MINUTES = 50;

const findLiveMatch = (matches = []) => {
    const nowTs = Date.now();
    return matches.find((match) => {
        const start = match?.date ? new Date(match.date).getTime() : null;
        if (!start) return false;
        const diffMin = Math.floor((nowTs - start) / 60000);
        return diffMin >= 0 && diffMin < MATCH_DURATION_MINUTES;
    }) ?? null;
};

export const metadata = {
    title: 'LCS Partite',
    description: 'Match center nazionale ESL con risultati live, timeline e highlight delle migliori scuole.'
};

export default function PartitePage() {
    const cityData = cities[DEFAULT_CITY_SLUG];
    if (!cityData) {
        return notFound();
    }

    const liveMatch = findLiveMatch(cityData.matches);
    const bannerTitle = cityData.tagline ? `${cityData.title} · ${cityData.tagline}` : cityData.title;

    return (
        <div className="city-page">
            <div className="city-section city-partite">
                <div className="match-center-header">
                    <AnimatedTitle text={bannerTitle} />
                    {cityData.tagline && (
                        <p className="match-center-tagline">{cityData.tagline}</p>
                    )}
                    <p className="match-center-subcopy">
                        Risultati aggiornati, cronache live e roster ufficiali in un unico hub nazionale ESL.
                    </p>
                </div>
                <MatchesSlider matches={cityData.matches || []} citySlug={DEFAULT_CITY_SLUG} />
                {liveMatch && <LiveMatchTimeline match={liveMatch} />}
            </div>
        </div>
    );
}
