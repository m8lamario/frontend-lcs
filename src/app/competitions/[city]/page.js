import { notFound } from 'next/navigation';
import cities from '@/data/cities';
import AnimatedTitle from '@/components/AnimatedTitle';
import CityScrollNews from '@/components/CityScrollNews';
import LocalPartners from '@/components/LocalPartners';
import "./city.css";

export const dynamicParams = true;

export function generateStaticParams() {
    return Object.keys(cities).map(city => ({ city }));
}

export async function generateMetadata({ params }) {
    const { city } = await params;
    const key = city.toLowerCase();
    const data = cities[key];
    return { title: data ? data.title : 'Competitions' };
}

export default async function CityPage({ params }) {
    const { city } = await params;
    const key = city.toLowerCase();
    const data = cities[key];
    if (!data) notFound();

    const hasNews = Array.isArray(data.news) && data.news.length > 0;
    const partners = Array.isArray(data.partners) && data.partners.length > 0 ? data.partners : [];

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={data.title}/>
                </div>
            </div>
            <div className="city-info">
                {hasNews && (
                    <CityScrollNews items={data.news} durationMs={1000} />
                )}
                <LocalPartners partners={partners} />
            </div>
        </div>
    );
}
