// javascript
import { notFound, redirect } from 'next/navigation';
import cities from '@/data/cities';
import AnimatedTitle from '@/components/AnimatedTitle';
import TeamsRoster from '@/components/TeamsRoster';
import MatchesSlider from '@/components/MatchesSlider';
import LiveMatchTimeline from '@/components/LiveMatchTimeline';
import AnimatedSectionTitle from '@/components/AnimatedSectionTitle';
import Standings from '@/components/Standings';
import NewsSection from '@/components/NewsSection';
import "./section.css";

export async function generateStaticParams() {
    return Object.keys(cities).flatMap(cityKey => {
        const data = cities[cityKey];
        const sections = ['home']; // sempre disponibile
        if (Array.isArray(data.matches) && data.matches.length) sections.push('partite');
        if (Array.isArray(data.groups) && data.groups.length) sections.push('classifica');
        if (Array.isArray(data.news) && data.news.length) sections.push('notizie');
        if (Array.isArray(data.schools) && data.schools.length) sections.push('squadre');
        return sections.map(section => ({ city: cityKey, section }));
    });
}

export async function generateMetadata({ params }) {
    // Attendere params (Next 15: params è asincrono nei Server Components)
    const { city, section } = await params;
    const key = city.toLowerCase();
    const sectionKey = section?.toLowerCase?.() ?? '';
    const data = cities[key];
    const baseTitle = data ? data.title : 'Competitions';
    const title = sectionKey === 'home' ? baseTitle : `${baseTitle} — ${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`;
    return { title };
}

export default async function SectionPage({ params }) {
    // Attendere params (Next 15: params è asincrono nei Server Components)
    const { city, section } = await params;
    const key = city.toLowerCase();
    const sectionKey = section?.toLowerCase?.() ?? '';
    const data = cities[key];
    if (!data) notFound();

    // Validazione sezione per evitare stati incoerenti
    const allowed = new Set(['home', 'squadre', 'partite', 'classifica', 'notizie']);
    if (!allowed.has(sectionKey)) notFound();

    // Selezione semplice: redirect 'home' al page root della città per evitare duplicazioni
    if (sectionKey === 'home') {
        return redirect(`/competitions/${city}`);
    }

    // Trova l'eventuale partita LIVE corrente (in base all'orario)
    const MATCH_DURATION = 50;
    const nowTs = Date.now();
    const isLiveNow = (m) => {
        const start = m?.date ? new Date(m.date).getTime() : null;
        if (!start) return false;
        const diffMin = Math.floor((nowTs - start) / 60000);
        return diffMin >= 0 && diffMin < MATCH_DURATION;
    };
    const liveMatch = Array.isArray(data.matches)
        ? data.matches.find(isLiveNow)
        : null;

    const sectionContent = {
        squadre: (
            <>
                <TeamsRoster teams={data.schools} citySlug={city} />
            </>
        ),
        partite: (
            <>
                <MatchesSlider matches={data.matches || []} citySlug={city} />
                {liveMatch && (
                    <LiveMatchTimeline match={liveMatch} />
                )}

            </>
        ),
        classifica: Array.isArray(data.groups) && data.groups.length > 0 ? (
            <>
                <Standings groups={data.groups} />
            </>
        ) : null,
        notizie: Array.isArray(data.news) && data.news.length > 0 ? (
            <>
                <AnimatedSectionTitle className={"CityTitleInfo"}>Notizie</AnimatedSectionTitle>
                <p className="news-intro">Ultimi aggiornamenti, comunicati e curiosità dal torneo.</p>
                <NewsSection news={data.news} />
            </>
        ) : null,
    }[sectionKey];

    if (!sectionContent) {
        return notFound();
    }

    const sectionContainerClass = `city-section city-${sectionKey}`;

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={data.title} />
                </div>
            </div>

            <div className={sectionContainerClass}>
                {sectionContent}
            </div>
        </div>
    );
}
