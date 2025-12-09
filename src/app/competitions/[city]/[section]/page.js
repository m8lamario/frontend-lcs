// javascript
import { notFound, redirect } from 'next/navigation';
import cities from '@/data/cities';
import AnimatedTitle from '@/components/AnimatedTitle';
import SchoolsScroller from '@/components/SchoolsScroller';
import MatchesSlider from '@/components/MatchesSlider';
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

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={data.title} />
                </div>
            </div>

            <div className="city-info">
                {sectionKey === 'squadre' && (
                    <>
                        <AnimatedSectionTitle className={"CityTitleInfo"}>Scuole</AnimatedSectionTitle>
                        <SchoolsScroller schools={data.schools} />
                    </>
                )}

                {sectionKey === 'partite' && (
                    <>
                        <MatchesSlider matches={data.matches || []} />
                    </>
                )}

                {sectionKey === 'classifica' && Array.isArray(data.groups) && data.groups.length > 0 && (
                    <>
                        <AnimatedSectionTitle className={"CityTitleInfo"}>Classifica</AnimatedSectionTitle>
                        <Standings groups={data.groups} />
                    </>
                )}

                {sectionKey === 'notizie' && Array.isArray(data.news) && data.news.length > 0 && (
                    <>
                        <AnimatedSectionTitle className={"CityTitleInfo"}>Notizie</AnimatedSectionTitle>
                        <p className="news-intro">Ultimi aggiornamenti, comunicati e curiosità dal torneo.</p>
                        <NewsSection news={data.news} />
                    </>
                )}
            </div>
        </div>
    );
}
