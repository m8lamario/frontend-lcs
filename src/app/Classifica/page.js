import eslData from "@/data/eslData";
import styles from "./Classifica.module.css";

const DEFAULT_LOGO = "/logo/PNG-lcs_logo_white_t.png";
const STAGE_CONFIG = [
    { label: "Ottavi di finale", matchCount: 8 },
    { label: "Quarti di finale", matchCount: 4 },
    { label: "Semifinali", matchCount: 2 },
    { label: "Finale", matchCount: 1 }
];

const buildBracketRounds = () => {
    let cursor = 0;
    return STAGE_CONFIG.map(({ label, matchCount }) => {
        const matchesSlice = eslData.slice(cursor, cursor + matchCount);
        cursor += matchCount;
        const matches = Array.from({ length: matchCount }, (_, idx) => {
            const sourceMatch = matchesSlice[idx] ?? {};
            const normalizedMatch = {
                id: `${label.replace(/\s+/g, "-").toLowerCase()}-${idx + 1}`,
                roundLabel: label,
                FirstTeam: sourceMatch.FirstTeam ?? null,
                SecondTeam: sourceMatch.SecondTeam ?? null,
                WinnerTeam: sourceMatch.WinnerTeam ?? null
            };
            return { ...normalizedMatch, isChampionCard: label === "Finale" && Boolean(normalizedMatch.WinnerTeam) };
        });
        return { label, matches };
    });
};

const Bracket = ({ rounds }) => (
    <div className={styles.bracket}>
        {rounds.map((round) => (
            <div className={styles.bracket__round} key={round.label}>
                <p className={styles.bracket__roundLabel}>{round.label}</p>
                <div className={styles.bracket__matchList}>
                    {round.matches.map((match) => (
                        <article
                            key={match.id}
                            className={`${styles.bracket__match}${match.isChampionCard ? ` ${styles["bracket__match--champion"]}` : ""}`}
                        >
                            {[match.FirstTeam, match.SecondTeam]
                                .map((team, idx) => {
                                    const slot = idx === 0 ? "home" : "away";
                                    const normalizedTeam = team ?? {
                                        id: `${match.id}-${slot}`,
                                        name: "Da definire",
                                        cityName: "",
                                        logo: DEFAULT_LOGO,
                                        isPlaceholder: true
                                    };
                                    const highlightChampion =
                                        match.WinnerTeam?.id && normalizedTeam.id === match.WinnerTeam.id && match.isChampionCard;
                                    return (
                                        <div
                                            key={normalizedTeam.id}
                                            className={`${styles.bracket__team}${normalizedTeam.isPlaceholder ? ` ${styles["bracket__team--placeholder"]}` : ""}${highlightChampion ? ` ${styles["bracket__team--highlight"]}` : ""}`}
                                        >
                                            <div className={styles.bracket__teamMeta}>
                                                <p className={styles.bracket__teamName}>{normalizedTeam.name}</p>
                                                <p className={styles.bracket__teamCity}>{normalizedTeam.cityName || ""}</p>
                                            </div>
                                            {match.isChampionCard && idx === 0 && match.WinnerTeam?.id === normalizedTeam.id && (
                                                <span className={styles.bracket__badge}>Campione ESL</span>
                                            )}
                                            {normalizedTeam.isPlaceholder && <span className={styles.bracket__badge}>In arrivo</span>}
                                        </div>
                                    );
                                })}
                        </article>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export default function Classifica() {
    const rounds = buildBracketRounds();
    return (
        <section className={styles.classifica}>
            <header className={styles.classifica__intro}>
                <p className={styles.classifica__eyebrow}>Fase Nazionale ESL</p>
                <h1>Tabellone Campionato</h1>
                <p>
                    Le vincitrici dei tornei cittadini avanzano nella griglia nazionale a eliminazione diretta.
                    Il tabellone si adatta automaticamente al numero di città qualificate, evidenziando il percorso
                    verso il titolo di Campione ESL.
                </p>
            </header>
            {rounds.length ? <Bracket rounds={rounds} /> : <p className={styles.classifica__empty}>Il tabellone sarà disponibile appena concluse le fasi locali.</p>}
        </section>
    );
}
