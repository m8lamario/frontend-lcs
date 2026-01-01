import Link from 'next/link';
import cities from '@/data/cities';
import styles from './competitions.module.css';

const formatHighlights = [
    {
        title: 'Gironi dinamici',
        description: 'Ogni città struttura i propri gironi in base alle scuole iscritte con aggiornamenti weekly.'
    },
    {
        title: 'Knockout Day',
        description: 'Le migliori squadre accedono a semifinali e finale secca in giornata dedicata.'
    },
    {
        title: 'Cronache live',
        description: 'Timeline e score vengono aggiornati in tempo reale per match live e programmati.'
    }
];

const toArray = (value) => (Array.isArray(value) ? value : []); // Normalizza i campi opzionali del mock

export default function CompetitionsIndex() {
    const cityEntries = Object.entries(cities ?? {});

    const totals = cityEntries.reduce(
        (acc, [, city]) => {
            const schools = toArray(city.schools);
            const matches = toArray(city.matches);
            const live = matches.filter((match) => match.isLive || match.status === 'LIVE').length;
            const upcoming = matches.filter((match) => match.status === 'SCHEDULED').length;

            return {
                schools: acc.schools + schools.length,
                matches: acc.matches + matches.length,
                liveMatches: acc.liveMatches + live,
                upcoming: acc.upcoming + upcoming
            };
        },
        { schools: 0, matches: 0, liveMatches: 0, upcoming: 0 }
    );

    const heroStats = [
        { label: 'Città attive', value: cityEntries.length, hint: 'stagione in corso' },
        { label: 'Scuole iscritte', value: totals.schools, hint: 'team approvati' },
        { label: 'Match programmati', value: totals.matches, hint: 'calendario ufficiale' },
        {
            label: 'Live ora',
            value: totals.liveMatches,
            hint: totals.upcoming ? `${totals.upcoming} in arrivo` : 'nessuno in programma'
        }
    ];

    return (
        <main className={styles.wrapper}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>LCS Competitions</p>
                <h1>Calendario tornei cittadini</h1>
                <p className={styles.subtitle}>
                    Scopri le tappe del circuito liceale: gruppi, match live e scuole coinvolte in tutta Italia.
                </p>
                <div className={styles.stats}>
                    {heroStats.map((stat) => (
                        <article key={stat.label} className={styles.statCard}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span>{stat.label}</span>
                            <small>{stat.hint}</small>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.format}>
                {formatHighlights.map((item) => (
                    <article key={item.title} className={styles.formatCard}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </article>
                ))}
            </section>

            <section className={styles.citySection}>
                <div>
                    <p className={styles.eyebrow}>Sedi ufficiali</p>
                    <h2>Seleziona la tua città</h2>
                    <p className={styles.subtitle}>
                        Ogni card mostra scuole coinvolte, stato dei gironi e partite attive. Entra per roster e risultati.
                    </p>
                </div>

                <div className={styles.cityGrid}>
                    {cityEntries.map(([slug, city]) => {
                        const schools = toArray(city.schools);
                        const matches = toArray(city.matches);
                        const groups = toArray(city.groups);
                        const liveNow = matches.filter((match) => match.isLive || match.status === 'LIVE').length;
                        const scheduled = matches.filter((match) => match.status === 'SCHEDULED').length;

                        return (
                            <article key={slug} className={styles.cityCard}>
                                <div className={styles.cardHeader}>
                                    <h3>{city.title}</h3>
                                    <span className={styles.chip}>
                                        {schools.length ? `${schools.length} scuole` : 'Roster in arrivo'}
                                    </span>
                                </div>
                                <p className={styles.cityMeta}>
                                    {liveNow ? `${liveNow} live • ` : ''}
                                    {matches.length ? `${matches.length} match totali` : 'Calendario in allestimento'}
                                    {scheduled ? ` • ${scheduled} in arrivo` : ''}
                                </p>
                                {groups.length > 0 && (
                                    <div className={styles.groupList}>
                                        {groups.map((group) => (
                                            <span key={group.name}>{group.name}</span>
                                        ))}
                                    </div>
                                )}
                                <div className={styles.cardFooter}>
                                    <Link className={styles.cityLink} href={`/competitions/${slug}`}>
                                        Esplora città
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
