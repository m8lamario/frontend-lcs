import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import cities from '@/data/cities';
import AnimatedTitle from '@/components/AnimatedTitle';
import './team.css';

const findTeamByCity = (cityKey, teamId) => {
    const data = cities[cityKey];
    if (!data || !Array.isArray(data.schools)) return null;
    return data.schools.find((team) => team.id === teamId) || null;
};

export async function generateStaticParams() {
    return Object.entries(cities).flatMap(([cityKey, cityData]) => {
        if (!Array.isArray(cityData.schools)) return [];
        return cityData.schools.map((team) => ({ city: cityKey, teamId: team.id }));
    });
}

export async function generateMetadata({ params }) {
    const { city, teamId } = await params;
    const key = city.toLowerCase();
    const team = findTeamByCity(key, teamId);
    const cityTitle = cities[key]?.title || 'Competitions';
    const teamName = team?.name ? ` — ${team.name}` : '';
    return { title: `${cityTitle}${teamName}` };
}

export default async function TeamPage({ params }) {
    const { city, teamId } = await params;
    const key = city.toLowerCase();
    const data = cities[key];
    if (!data) notFound();

    const team = findTeamByCity(key, teamId);
    if (!team) notFound();

    const roster = Array.isArray(team.roster) ? team.roster : [];
    const staff = Array.isArray(team.staff) ? team.staff : [];

    const pills = [
        team.city && `Città: ${team.city}`,
        team.coach && `Coach: ${team.coach}`,
        team.founded && `Fondato: ${team.founded}`,
        team.colors && `Colori: ${team.colors}`,
        team.record && `Record: ${team.record}`,
    ].filter(Boolean);

    return (
        <div className="team-page">
            <div className="team-hero">
                <div className="team-hero-inner">
                    <div className="team-hero-logo">
                        {team.logo ? (
                            <Image src={team.logo} alt={team.name} width={220} height={220} sizes="320px" />
                        ) : (
                            <span className="team-logo-placeholder">{team.name?.[0]?.toUpperCase() ?? '?'}</span>
                        )}
                    </div>
                    <div>
                        <AnimatedTitle text={team.name} />
                        {team.tagline && <p>{team.tagline}</p>}
                        {pills.length > 0 && (
                            <div className="team-meta">
                                {pills.map((pill) => (
                                    <span key={pill} className="team-pill">{pill}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="team-section">
                <div className="team-section-header">
                    <h2>Rosa giocatori</h2>
                    <span className="section-pill">SQUADRA</span>
                </div>
                {roster.length ? (
                    <div className="roster-grid">
                        {roster.map((player) => (
                            <div key={player.id || player.name} className="roster-card">
                                <div className="roster-badge">{player.number ?? '-'}</div>
                                <div className="roster-meta">
                                    <span className="roster-role">{player.role}</span>
                                    <span className="roster-name">{player.name}</span>
                                    {player.year && <span className="roster-year">Classe {player.year}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="team-empty-state">Rosa non disponibile.</div>
                )}
            </div>

            <div className="team-section">
                <div className="team-section-header">
                    <h2>Staff tecnico</h2>
                    <span className="section-pill">STAFF</span>
                </div>
                {staff.length ? (
                    <div className="staff-list">
                        {staff.map((member) => (
                            <div key={member.id || member.name} className="staff-card">
                                <span className="staff-role">{member.role}</span>
                                <span className="staff-name">{member.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="team-empty-state">Staff non disponibile.</div>
                )}
            </div>
        </div>
    );
}
