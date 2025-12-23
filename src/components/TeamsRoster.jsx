import Image from 'next/image';

const META_FIELDS = [
    { key: 'city', label: 'Città' },
    { key: 'coach', label: 'Coach' },
    { key: 'founded', label: 'Anno' },
    { key: 'colors', label: 'Colori' },
    { key: 'record', label: 'Record' },
];

export default function TeamsRoster({ teams = [] }) {
    if (!teams.length) {
        return (
            <section className="teams-roster teams-roster-empty">
                <p className="team-empty-state">Nessuna squadra disponibile per questa città.</p>
            </section>
        );
    }

    return (
        <section className="teams-roster">
            {teams.map((team) => {
                const meta = META_FIELDS
                    .map((field) => ({ label: field.label, value: team[field.key] }))
                    .filter((entry) => !!entry.value);

                return (
                    <article key={team.id} className="team-card">
                        <div className="team-card-header">
                            <div className="team-logo">
                                {team.logo ? (
                                    <Image
                                        src={team.logo}
                                        alt={team.name}
                                        width={72}
                                        height={72}
                                        sizes="96px"
                                        style={{ objectFit: 'contain' }}
                                    />
                                ) : (
                                    <span className="team-logo-placeholder">
                                        {team.name?.[0]?.toUpperCase() ?? '?'}
                                    </span>
                                )}
                            </div>
                            <div className="team-heading">
                                <p className="team-eyebrow">{team.division || 'Roster ufficiale'}</p>
                                <h3>{team.name}</h3>
                                {team.tagline && <p className="team-tagline">{team.tagline}</p>}
                            </div>
                        </div>

                        {meta.length > 0 && (
                            <dl className="team-meta">
                                {meta.map((entry) => (
                                    <div key={entry.label} className="team-meta-row">
                                        <dt>{entry.label}</dt>
                                        <dd>{entry.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}

                        {team.achievements?.length ? (
                            <ul className="team-badges">
                                {team.achievements.map((achievement) => (
                                    <li key={achievement}>{achievement}</li>
                                ))}
                            </ul>
                        ) : null}

                        {team.contact && (
                            <div className="team-card-footer">
                                <span>Referente</span>
                                <strong>{team.contact}</strong>
                            </div>
                        )}
                    </article>
                );
            })}
        </section>
    );
}

