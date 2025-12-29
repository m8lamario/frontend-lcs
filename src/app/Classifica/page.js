import cities from "@/data/cities";
import "./Classifica.css";

const DEFAULT_LOGO = "/logo/PNG-lcs_logo_white_t.png";

const stageLabelMap = {
    2: "Finale",
    4: "Semifinali",
    8: "Quarti di finale",
    16: "Ottavi di finale",
    32: "Sedicesimi di finale",
    64: "Trentaduesimi di finale"
};

const getStageLabel = (teamsInRound, fallbackIndex) => stageLabelMap[teamsInRound] ?? `Turno ${fallbackIndex + 1}`;

const compareTeams = (a = {}, b = {}) => {
    if ((b?.pts ?? 0) !== (a?.pts ?? 0)) return (b?.pts ?? 0) - (a?.pts ?? 0);
    if ((b?.gd ?? 0) !== (a?.gd ?? 0)) return (b?.gd ?? 0) - (a?.gd ?? 0);
    if ((b?.gf ?? 0) !== (a?.gf ?? 0)) return (b?.gf ?? 0) - (a?.gf ?? 0);
    return (a?.name ?? "").localeCompare(b?.name ?? "");
};

const createByeTeam = (seed) => ({
    id: `bye-${seed}`,
    name: "Slot vacante",
    cityName: "In attesa",
    logo: DEFAULT_LOGO,
    isBye: true,
    seed
});

const createPlaceholderTeam = (label) => ({
    id: `placeholder-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: label,
    cityName: "In aggiornamento",
    logo: DEFAULT_LOGO,
    isPlaceholder: true
});

const arrangeSeeds = (teams = []) => {
    const ordered = [];
    let left = 0;
    let right = teams.length - 1;
    while (left <= right) {
        if (left === right) {
            ordered.push(teams[left]);
        } else {
            ordered.push(teams[left], teams[right]);
        }
        left += 1;
        right -= 1;
    }
    return ordered;
};

const extractQualifiedTeams = () => {
    const entries = Object.entries(cities ?? {});
    return entries
        .map(([slug, city]) => {
            const groupTeams = city.groups?.[0]?.teams ?? [];
            const sorted = [...groupTeams].sort(compareTeams);
            const champion = sorted[0] ?? city.schools?.[0];
            if (!champion) {
                return null;
            }
            return {
                id: champion.id ?? `${slug}-team`,
                name: champion.name ?? "Squadra da definire",
                cityName: city.title ?? slug,
                logo: champion.logo ?? DEFAULT_LOGO,
                pts: champion.pts ?? 0,
                gd: champion.gd ?? 0,
                gf: champion.gf ?? 0
            };
        })
        .filter(Boolean);
};

const buildBracketRounds = (teams = []) => {
    if (!teams.length) return [];
    const sorted = [...teams].sort(compareTeams).map((team, idx) => ({ ...team, seed: idx + 1 }));
    const champion = sorted[0];
    const bracketSize = 2 ** Math.ceil(Math.log2(sorted.length));
    const paddedSeeds = [...sorted];
    while (paddedSeeds.length < bracketSize) {
        paddedSeeds.push(createByeTeam(paddedSeeds.length + 1));
    }
    const seededTeams = arrangeSeeds(paddedSeeds);
    const rounds = [];
    let teamsInRound = seededTeams;
    let roundIndex = 0;
    while (teamsInRound.length > 1) {
        const roundLabel = getStageLabel(teamsInRound.length, roundIndex);
        const matches = [];
        for (let i = 0; i < teamsInRound.length; i += 2) {
            const home = teamsInRound[i];
            const away = teamsInRound[i + 1];
            const containsChampion = [home, away].some((team) => team?.id === champion?.id);
            const autoAdvance = home && !home.isBye && away?.isBye ? home : away && !away.isBye && home?.isBye ? away : undefined;
            const projectedWinner = autoAdvance ?? (containsChampion ? champion : undefined);
            matches.push({
                id: `${roundIndex}-${i / 2}`,
                teams: [home, away].filter(Boolean),
                roundLabel,
                projectedWinner,
                highlightChampion: containsChampion,
                autoAdvance: Boolean(autoAdvance)
            });
        }
        rounds.push({ label: roundLabel, matches });
        teamsInRound = matches.map((match, idx) => {
            if (match.projectedWinner) {
                return match.projectedWinner;
            }
            return {
                ...createPlaceholderTeam(`Posto ${idx + 1}`),
                seed: null
            };
        });
        roundIndex += 1;
    }
    rounds.push({
        label: "Campione ESL",
        matches: [
            {
                id: "champion-card",
                teams: champion ? [champion] : [],
                isChampionCard: true
            }
        ]
    });
    return rounds;
};

const Bracket = ({ rounds }) => (
    <div className="bracket">
        {rounds.map((round) => (
            <div className="bracket__round" key={round.label}>
                <p className="bracket__roundLabel">{round.label}</p>
                <div className="bracket__matchList">
                    {round.matches.map((match) => (
                        <article
                            key={match.id}
                            className={`bracket__match ${match.isChampionCard ? "bracket__match--champion" : ""}`}
                        >
                            {match.teams.map((team) => (
                                <div
                                    key={team.id}
                                    className={`bracket__team${team.isBye ? " bracket__team--bye" : ""}${team.isPlaceholder ? " bracket__team--placeholder" : ""}${match.highlightChampion && team.id === match.teams[0]?.id ? " bracket__team--highlight" : ""}`}
                                >
                                    {team.seed && !team.isPlaceholder && !team.isBye && (
                                        <span className="bracket__teamSeed">#{team.seed}</span>
                                    )}
                                    <div className="bracket__teamMeta">
                                        <p className="bracket__teamName">{team.name}</p>
                                        <p className="bracket__teamCity">{team.cityName}</p>
                                    </div>
                                    {match.isChampionCard && <span className="bracket__badge">Campione ESL</span>}
                                    {team.isBye && <span className="bracket__badge">BYE</span>}
                                    {team.isPlaceholder && <span className="bracket__badge">In arrivo</span>}
                                </div>
                            ))}
                        </article>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export default function Classifica() {
    const qualifiedTeams = extractQualifiedTeams();
    const rounds = buildBracketRounds(qualifiedTeams);
    return (
        <section className="classifica">
            <header className="classifica__intro">
                <p className="classifica__eyebrow">Fase Nazionale ESL</p>
                <h1>Tabellone Campionato</h1>
                <p>
                    Le vincitrici dei tornei cittadini avanzano nella griglia nazionale a eliminazione diretta.
                    Il tabellone si adatta automaticamente al numero di città qualificate, evidenziando il percorso
                    verso il titolo di Campione ESL.
                </p>
            </header>
            {rounds.length ? (
                <Bracket rounds={rounds} />
            ) : (
                <p className="classifica__empty">Il tabellone sarà disponibile appena concluse le fasi locali.</p>
            )}
        </section>
    );
}
