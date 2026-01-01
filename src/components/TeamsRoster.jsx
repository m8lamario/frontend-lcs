import Image from 'next/image';
import Link from 'next/link';
import EmptyState from './EmptyState';

const META_FIELDS = [
    { key: 'city', label: 'Città' },
    { key: 'coach', label: 'Coach' },
    { key: 'founded', label: 'Anno' },
    { key: 'colors', label: 'Colori' },
    { key: 'record', label: 'Record' },
];

export default function TeamsRoster({ teams = [], citySlug = '' }) {
    if (!teams.length) {
        return (
            <section className="teams-roster teams-roster-empty">
                <EmptyState
                    title="Nessuna squadra registrata"
                    description="Non ci sono ancora roster pubblicati per questa città. Torna presto per scoprire le formazioni partecipanti."
                    action={{ label: 'Torna alle competizioni', href: '/competitions' }}
                    align="left"
                />
            </section>
        );
    }

    const buildHref = (teamId) => {
        if (!citySlug || !teamId) return null;
        return `/competitions/${citySlug}/squadre/${teamId}`;
    };

    return (
        <section className="teams-roster">
            {teams.map((team) => {
                const meta = META_FIELDS
                    .map((field) => ({ label: field.label, value: team[field.key] }))
                    .filter((entry) => !!entry.value);
                const teamHref = buildHref(team.id);
                const cardBody = (
                    <>
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
                    </>
                );

                if (teamHref) {
                    return (
                        <Link
                            key={team.id || team.name}
                            href={teamHref}
                            className="team-card"
                            aria-label={`Vai alla scheda di ${team.name}`}
                        >
                            {cardBody}
                        </Link>
                    );
                }

                return (
                    <article key={team.id || team.name} className="team-card" role="group">
                        {cardBody}
                    </article>
                );
            })}
        </section>
    );
}
