import Link from "next/link";
import cities from "@/data/cities";
import "./Squadre.css";

export default function Squadre() {
    const totalCities = Object.keys(cities).length;

    const formatSteps = [
        {
            id: "draft",
            title: "Draft cittadino",
            description: "Ogni città seleziona 8 scuole tramite invito e ranking studentesco.",
            meta: "1 settimana di selezioni"
        },
        {
            id: "gironi",
            title: "Gironi bilanciati",
            description: "Round robin da 4 squadre, 3 punti per la vittoria, differenza reti come tie-break.",
            meta: "3 giornate garantite"
        },
        {
            id: "final-four",
            title: "Final Four",
            description: "Semifinali e finali in gara secca con tempi supplementari e rigori.",
            meta: "Stadio cittadino"
        },
        {
            id: "supercup",
            title: "Champions slot",
            description: "Le vincitrici accedono al master nazionale con media day e contenuti esclusivi.",
            meta: "Road to LCS Finals"
        }
    ];

    const championSlots = Object.entries(cities).reduce((acc, [slug, city]) => {
        const champion = city.champion;
        if (!champion) {
            return acc;
        }

        const schoolFallback = city.schools?.find((school) => school.name === champion.name) ?? city.schools?.[0];
        acc.push({
            id: slug,
            cityName: city.title || slug,
            championName: champion.name,
            record: champion.record || schoolFallback?.record,
            colors: champion.colors || schoolFallback?.colors,
            coach: champion.coach || schoolFallback?.coach,
            logo: champion.logo || schoolFallback?.logo,
            highlight: champion.highlight || schoolFallback?.achievements?.[0] || "Highlight in arrivo",
            slotLabel: "Campione in carica"
        });
        return acc;
    }, []);

    const hasChampions = championSlots.length > 0;

    const heroStats = [
        {
            id: "cities",
            label: "Città coinvolte",
            value: `${totalCities}+`
        },
        {
            id: "teams",
            label: "Scuole in gara",
            value: "32"
        },
        {
            id: "minutes",
            label: "Minuti giocati",
            value: "2.400+"
        }
    ];

    const totalSlots = totalCities;
    const needsPlayIn = totalSlots > 16;
    const entryRound = needsPlayIn ? "Sedicesimi di finale" : "Ottavi di finale";

    const nationalBracketBase = [
        {
            id: "round16",
            label: "Ottavi di finale",
            slots: 16,
            detail: "Le migliori sedici campionesse cittadine si affrontano in gara secca, no seconde chance."
        },
        {
            id: "quarter",
            label: "Quarti",
            slots: 8,
            detail: "Le vincenti avanzano nel tabellone ESL mantenendo il seed maturato nella fase locale."
        },
        {
            id: "semi",
            label: "Semifinali",
            slots: 4,
            detail: "Doppio media day, produzione broadcast e copertura social nazionale."
        },
        {
            id: "final",
            label: "Finale nazionale",
            slots: 2,
            detail: "Ultimo atto per il titolo ESL, con cerimonia premi e accesso al talent pool internazionale."
        }
    ];

    const nationalBracket = needsPlayIn
        ? [
            {
                id: "round32",
                label: "Sedicesimi di finale",
                slots: 32,
                detail: "Play-in adattivo quando le città superano quota 16: stessa sede, stessa intensità."
            },
            ...nationalBracketBase
        ]
        : nationalBracketBase;

    const nationalMeta = [
        { id: "venue", label: "Venue", value: "Sede unica ESL" },
        { id: "format", label: "Formato", value: "Eliminazione diretta" },
        { id: "round", label: "Round d'ingresso", value: entryRound },
        { id: "slots", label: "Campionesse", value: `${totalSlots} città` }
    ];

    return (
        <main className="main squadre-page">
            <section className="squadre-hero glass-panel">
                <div className="hero-content">
                    <p className="eyebrow">Formato ufficiale</p>
                    <h1>Squadre LCS: talento locale, scena nazionale ESL.</h1>
                    <p>
                        Ogni città costruisce il proprio percorso verso la fase ESL: scouting nelle scuole, gironi
                        equilibrati, final four spettacolari e un bracket nazionale a eliminazione diretta che incorona
                        la campionessa italiana.
                    </p>
                    <div className="hero-cta">
                        <Link href="/competitions" className="btn-primary">
                            Calendario completo
                        </Link>
                        <button type="button" className="btn-ghost">
                            Scarica regolamento
                        </button>
                    </div>
                </div>
                <ul className="hero-stats">
                    {heroStats.map((stat) => (
                        <li key={stat.id} className="stat-card">
                            <span>{stat.label}</span>
                            <strong>{stat.value}</strong>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="format-section glass-panel">
                <div className="section-heading">
                    <p className="eyebrow">Il format</p>
                    <h2>Dalla selezione cittadina al master nazionale.</h2>
                    <p>
                        Modello modulare e replicabile: ogni città gestisce un hub locale con standard comuni su
                        regolamento, storytelling e misurazione delle performance.
                    </p>
                </div>
                <div className="format-grid">
                    {formatSteps.map((step, index) => (
                        <article key={step.id} className="format-card">
                            <span className="format-card__index">{String(index + 1).padStart(2, "0")}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            <span className="format-card__meta">{step.meta}</span>
                        </article>
                    ))}
                </div>
            </section>

            <section className="winners-section">
                <div className="section-heading">
                    <p className="eyebrow">Slot vincitori</p>
                    <h2>Le campionesse cittadine 2026</h2>
                    <p>
                        Ogni card racconta il percorso della squadra regina di una città: record, colori, coach e piccola
                        highlight. Dove non c&apos;è ancora una regina lasciamo lo spazio pronto per il prossimo exploit.
                    </p>
                </div>
                <div className="winners-grid">
                    {hasChampions ? (
                        championSlots.map((winner) => (
                            <article key={winner.id} className="winner-card glass-panel">
                                <header className="winner-card__header">
                                    <span className="winner-badge">{winner.cityName}</span>
                                    <p>{winner.slotLabel}</p>
                                </header>
                                <div className="winner-card__body">
                                    <h3>{winner.championName}</h3>
                                    <p>{winner.highlight}</p>
                                    <ul className="winner-meta">
                                        <li>
                                            <span>Coach</span>
                                            <strong>{winner.coach || "TBD"}</strong>
                                        </li>
                                        <li>
                                            <span>Record</span>
                                            <strong>{winner.record || "0-0"}</strong>
                                        </li>
                                        <li>
                                            <span>Colori</span>
                                            <strong>{winner.colors || "Da annunciare"}</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className="winner-card__footer">
                                    <div className="winner-tags">
                                        <span>Slot ESL</span>
                                        <span>Confirmed</span>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <article className="winner-card glass-panel winner-card--empty winner-card--placeholder">
                            <div className="winner-card__body">
                                <h3>Campionesse in definizione</h3>
                                <p>Stiamo completando le finali locali: aggiorniamo qui appena proclamiamo le vincitrici.</p>
                            </div>
                        </article>
                    )}
                </div>
            </section>

            {/*<section className="national-stage glass-panel">*/}
            {/*    <div className="section-heading">*/}
            {/*        <p className="eyebrow">Fase nazionale ESL</p>*/}
            {/*        <h2>Evento annuale in sede unica, bracket diretto dal {entryRound.toLowerCase()}.</h2>*/}
            {/*        <p>*/}
            {/*            Dopo ogni circuito cittadino, le vincitrici entrano in un tabellone unico: sede condivisa, partite*/}
            {/*            secche, produzione ESL e storytelling coordinato. Se le città superano quota 16 inseriamo un play-in*/}
            {/*            per allinearci agli ottavi ufficiali.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <ul className="national-meta">*/}
            {/*        {nationalMeta.map((item) => (*/}
            {/*            <li key={item.id}>*/}
            {/*                <span>{item.label}</span>*/}
            {/*                <strong>{item.value}</strong>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*    <div className="bracket-grid">*/}
            {/*        {nationalBracket.map((round) => (*/}
            {/*            <article key={round.id} className="bracket-card">*/}
            {/*                <header>*/}
            {/*                    <p className="eyebrow">{round.label}</p>*/}
            {/*                    <h3>{round.slots} squadre</h3>*/}
            {/*                </header>*/}
            {/*                <p>{round.detail}</p>*/}
            {/*                <div className="bracket-card__meta">*/}
            {/*                    <span>Step ESL</span>*/}
            {/*                    <strong>{round.label}</strong>*/}
            {/*                </div>*/}
            {/*            </article>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}
        </main>
    );
}
