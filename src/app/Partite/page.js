import AnimatedTitle from '@/components/AnimatedTitle';
import MatchesSlider from '@/components/MatchesSlider';
import LiveMatchTimeline from '@/components/LiveMatchTimeline';
import { eslMatches } from '@/data/eslData';
import '../competitions/[city]/[section]/section.css';
import './partite.css';

const DEFAULT_CITY_SLUG = 'partite';
const MATCH_DURATION_MINUTES = 50;
const MATCH_CENTER_TITLE = 'LCS Match Center';
const MATCH_CENTER_TAGLINE = 'Il recap nazionale con i migliori highlights ESL.';

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
    const matches = Array.isArray(eslMatches) ? eslMatches : [];
    const liveMatch = findLiveMatch(matches);
    const bannerTitle = `${MATCH_CENTER_TITLE} · ${MATCH_CENTER_TAGLINE}`;

    return (
        <div className="city-page">
            <div className="city-section city-partite pdt">
                <div className="match-center-header">
                    <AnimatedTitle text={bannerTitle} />
                    <p className="match-center-tagline">{MATCH_CENTER_TAGLINE}</p>
                    <p className="match-center-subcopy">
                        Risultati aggiornati, cronache live e roster ufficiali in un unico hub nazionale ESL.
                    </p>
                </div>
                <MatchesSlider matches={matches} citySlug={DEFAULT_CITY_SLUG} />
                {liveMatch && <LiveMatchTimeline match={liveMatch} />}
            </div>
        </div>
    );
}
