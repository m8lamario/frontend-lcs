import { notFound } from 'next/navigation';
import { localleagues } from '@/data/CorrectDataStructure';
import AnimatedTitle from '@/components/AnimatedTitle';
import CityScrollNews from '@/components/CityScrollNews';
import BlogSlider from '@/components/BlogSlider';
import LocalPartners from '@/components/LocalPartners';
import StadiumMap from '@/components/StadiumMap';
import SocialLinks from '@/components/SocialLinks';
import StaffSection from '@/components/StaffSection';
import { getSortedPostsData } from '@/lib/blog';
import styles from './city.module.css';

const leaguesBySlug = localleagues.reduce((acc, league) => {
    if (league?.slug) acc[league.slug.toLowerCase()] = league;
    return acc;
}, {});

const cityBackgrounds = {
    boracup: '/backgroundCities/boracup.jpg',
    ferreacup: '/backgroundCities/ferreacup.jpg',
    leonessacup: '/backgroundCities/leonessacup.jpg',
    milano: '/backgroundCities/milano.png',
    molecup: '/backgroundCities/molecup.jpg',
    olympiuscup: '/backgroundCities/olympiuscup.jpg',
    turascup: '/backgroundCities/turascup.jpg',
};

const getBackgroundForCity = (slug) => cityBackgrounds[slug?.toLowerCase()] || '/backgroundCities/milano.png';

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
    const socials = data.socials || {};
    const staff = Array.isArray(data.staff) ? data.staff : [];

    const blogPosts = getSortedPostsData(city);
    const hasBlog = blogPosts.length > 0;
    const backgroundImage = getBackgroundForCity(key);

    return (
        <div className={styles.cityPage}>
            <div className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className={styles.bannerContent}>
                    <AnimatedTitle text={data.name || data.title}/>
                </div>
            </div>
            <div className={styles.cityInfo}>
                {/*{hasNews && (*/}
                {/*    <CityScrollNews items={news} durationMs={4000} />*/}
                {/*)}*/}
                {hasBlog && (
                    <BlogSlider items={blogPosts} city={city} durationMs={5000} />
                )}
                <LocalPartners partners={partners} />
                <SocialLinks socials={socials} />
                <StaffSection staff={staff} />
                {stadiums.length > 0 && (
                    <section className={styles.stadiumSection}>
                        <div className={styles.stadiumHeader}>
                            <p className={styles.stadiumEyebrow}>Dove giochiamo</p>
                            <h2 className={styles.stadiumTitle}>Stadi e indicazioni</h2>
                            <p className={styles.stadiumSubtitle}>
                                Trova lo stadio più vicino e ottieni le indicazioni per raggiungerlo facilmente.
                            </p>
                        </div>
                        <div className={styles.stadiumGrid}>
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
