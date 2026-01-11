import { notFound } from 'next/navigation';
import { localleagues } from '@/data/CorrectDataStructure';
import AnimatedTitle from '@/components/AnimatedTitle';
import CityScrollNews from '@/components/CityScrollNews';
import LocalPartners from '@/components/LocalPartners';
import StadiumMap from '@/components/StadiumMap';
import "./city.css";

const leaguesBySlug = localleagues.reduce((acc, league) => {
    if (league?.slug) acc[league.slug.toLowerCase()] = league;
    return acc;
}, {});

export const dynamicParams = true;

export function generateStaticParams() {
    return Object.keys(leaguesBySlug).map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
    const { city } = await params;
    const key = city.toLowerCase();
    const data = leaguesBySlug[key];
    const title = data?.name || data?.title || 'Competitions';
    return { title };
}

export default async function CityPage({ params }) {
    const { city } = await params;
    const key = city.toLowerCase();
    const data = leaguesBySlug[key];
    if (!data) notFound();

    const news = Array.isArray(data.news) ? data.news : [];
    const hasNews = news.length > 0;
    const partners = Array.isArray(data.partners) ? data.partners : [];
    const stadiums = Array.isArray(data.stadiums) ? data.stadiums : [];

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={data.name || data.title}/>
                </div>
            </div>
            <div className="city-info">
                {hasNews && (
                    <CityScrollNews items={news} durationMs={4000} />
                )}
                <LocalPartners partners={partners} />
                {stadiums.length > 0 && (
                    <section className="stadium-section">
                        <h2>Stadio e direzioni</h2>
                        <div className="stadium-grid">
                            {stadiums.map((stadium) => (
                                <StadiumMap
                                    key={stadium.id || stadium.name}
                                    name={stadium.name}
                                    address={stadium.address}
                                    latitude={stadium.latitude}
                                    longitude={stadium.longitude}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
