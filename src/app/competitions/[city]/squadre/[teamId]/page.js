import Image from 'next/image';
import { notFound } from 'next/navigation';
import { localleagues, teams as apiTeams, players as apiPlayers } from '@/data/CorrectDataStructure';
import AnimatedTitle from '@/components/AnimatedTitle';
import './team.css';

const TEAM_LOGO_FALLBACK = '/logo/PNG-lcs_logo_white_t.png';

const normalizeSlug = (value = '') => value.toString().trim().toLowerCase();

const findLeagueBySlug = (slug) => localleagues.find((league) => league.slug === slug);

const findCombinedTeam = (leagueSlug, teamSlug) => {
    const league = findLeagueBySlug(leagueSlug);
    if (!league) return { league: null, team: null };

    const leagueTeam = league.teams?.find((team) => team.slug === teamSlug);
    const apiTeam = apiTeams.find((team) => team.slug === teamSlug && team.local_league === leagueSlug);
    if (!leagueTeam && !apiTeam) {
        return { league, team: null };
    }

    const combinedTeam = {
        slug: teamSlug,
        ...apiTeam,
        ...leagueTeam
    };

    if (!combinedTeam.name) {
        return { league, team: null };
    }

    return { league, team: combinedTeam };
};

const getPlayersForTeam = (teamSlug) => {
    const inlineRoster = apiTeams.find((team) => team.slug === teamSlug)?.players;
    if (Array.isArray(inlineRoster) && inlineRoster.length) {
        return inlineRoster;
    }
    return apiPlayers.filter((player) => player.team === teamSlug);
};

const buildRoster = (teamSlug) => getPlayersForTeam(teamSlug).map((player, index) => {
    const fullName = player.name || [player.first_name, player.last_name].filter(Boolean).join(' ').trim();
    return {
        id: player.id ?? `${teamSlug}-player-${index + 1}`,
        number: player.shirt_number ?? player.number ?? '-'
            ,
        role: player.position ?? player.role ?? 'Giocatore',
        name: fullName || 'Giocatore',
        year: player.year ?? null
    };
}).filter((player) => Boolean(player.name));

export async function generateStaticParams() {
    return localleagues.flatMap((league) => (
        Array.isArray(league.teams)
            ? league.teams.map((team) => ({ city: league.slug, teamId: team.slug }))
            : []
    ));
}

export async function generateMetadata({ params }) {
    const { city, teamId } = params;
    const citySlug = normalizeSlug(city);
    const teamSlug = normalizeSlug(teamId);
    const { league, team } = findCombinedTeam(citySlug, teamSlug);
    if (!league || !team) {
        return { title: 'Competitions' };
    }

    const leagueTitle = league.title || league.name || 'Competitions';
    const teamName = team.name ? ` — ${team.name}` : '';
    return { title: `${leagueTitle}${teamName}` };
}

export default async function TeamPage({ params }) {
    const { city, teamId } = params;
    const citySlug = normalizeSlug(city);
    const teamSlug = normalizeSlug(teamId);
    const { league, team } = findCombinedTeam(citySlug, teamSlug);

    if (!league || !team) notFound();

    const roster = buildRoster(team.slug);
    const staff = Array.isArray(team.staff) ? team.staff : [];

    const pills = [
        league.title && `Competizione: ${league.title}`,
        league.subtitle && `Stage: ${league.subtitle}`,
        team.coach && `Coach: ${team.coach}`,
        team.record && `Record: ${team.record}`,
        team.short_name && `Sigla: ${team.short_name}`
    ].filter(Boolean);

    return (
        <div className="team-page">
            <div className="team-hero">
                <div className="team-hero-inner">
                    <div className="team-hero-logo">
                        {team.logo ? (
                            <Image src={team.logo} alt={team.name} width={220} height={220} sizes="320px" />
                        ) : (
                            <Image src={TEAM_LOGO_FALLBACK} alt={team.name} width={220} height={220} sizes="320px" />
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
