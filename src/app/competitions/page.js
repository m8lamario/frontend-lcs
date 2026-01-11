import Link from 'next/link';
// Sostituisce il vecchio import di cities con la nuova struttura dati
import { localleagues, matches as allMatches } from '@/data/CorrectDataStructure';
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

// Utility
const toArray = (value) => (Array.isArray(value) ? value : []);
const parseDate = (value) => {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
};
const isLiveMatch = (match) => {
    // Heuristica: non finita e orario di inizio passato => LIVE
    if (!match || match.finished) return false;
    const dt = parseDate(match.datetime);
    if (!dt) return false;
    return dt <= new Date();
};
const isScheduledMatch = (match) => {
    // Non finita e orario di inizio futuro => SCHEDULED
    if (!match || match.finished) return false;
    const dt = parseDate(match.datetime);
    if (!dt) return false;
    return dt > new Date();
};

export default function CompetitionsIndex() {
    // Le "città" corrispondono alle leghe locali
    const leagues = toArray(localleagues);
    const matches = toArray(allMatches);

    const totals = leagues.reduce(
        (acc, league) => {
            const teams = toArray(league.teams);
            return {
                schools: acc.schools + teams.length,
                matches: acc.matches, // i match sono globali, somma sotto
                liveMatches: acc.liveMatches,
                upcoming: acc.upcoming
            };
        },
        { schools: 0, matches: 0, liveMatches: 0, upcoming: 0 }
    );

    // Calcolo aggregati globali dai match
    const liveGlobal = matches.filter(isLiveMatch).length;
    const upcomingGlobal = matches.filter(isScheduledMatch).length;

    totals.matches = matches.length;
    totals.liveMatches = liveGlobal;
    totals.upcoming = upcomingGlobal;

    const heroStats = [
        { label: 'Città attive', value: leagues.length, hint: 'stagione in corso' },
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
                    {leagues.map((league) => {
                        const teams = toArray(league.teams);
                        const leagueMatches = matches.filter((m) =>
                            toArray(m.teams).some((tm) => tm?.team?.local_league === league.slug)
                        );
                        const liveNow = leagueMatches.filter(isLiveMatch).length;
                        const scheduled = leagueMatches.filter(isScheduledMatch).length;
                        const total = leagueMatches.length;

                        return (
                            <article key={league.slug ?? league.id} className={styles.cityCard}>
                                <div className={styles.cardHeader}>
                                    <h3>{league.title || league.name}</h3>
                                    <span className={styles.chip}>
                                        {teams.length ? `${teams.length} scuole` : 'Roster in arrivo'}
                                    </span>
                                </div>
                                <p className={styles.cityMeta}>
                                    {liveNow ? `${liveNow} live • ` : ''}
                                    {total ? `${total} match totali` : 'Calendario in allestimento'}
                                    {scheduled ? ` • ${scheduled} in arrivo` : ''}
                                </p>
                                {/* Niente gruppi nella nuova struttura: omesso elenco gruppi */}
                                <div className={styles.cardFooter}>
                                    <Link className={styles.cityLink} href={`/competitions/${league.slug}`}>
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
