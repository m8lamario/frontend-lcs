"use client";
import React, { useMemo } from "react";
import EmptyState from "./EmptyState";

const DEFAULT_POINT_SYSTEM = { win: 3, draw: 1, loss: 0 };
const createBaseStats = (team = {}) => ({
  p: 0,
  w: 0,
  d: 0,
  l: 0,
  gf: 0,
  ga: 0,
  gd: 0,
  pts: 0,
  ...team,
});
const sortTeams = (teams = []) =>
  teams
    .map((team) => ({ ...team, gd: (team.gf ?? 0) - (team.ga ?? 0) }))
    .sort(
      (a, b) =>
        (b.pts ?? 0) - (a.pts ?? 0) ||
        (b.gd ?? 0) - (a.gd ?? 0) ||
        (b.gf ?? 0) - (a.gf ?? 0) ||
        (a.name || "").localeCompare(b.name || "")
    );
const prettifyGroupName = (value, fallback) => {
  if (!value) return fallback;
  const label = value.toString().replace(/[-_]/g, " ").trim();
  return label ? label.replace(/\b\w/g, (char) => char.toUpperCase()) : fallback;
};
const isMatchCompleted = (match) => {
  if (typeof match?.finished === "boolean") {
    return match.finished;
  }
  if (typeof match?.played === "boolean") {
    return match.played;
  }
  return true;
};
const normalizeSide = (side, fallbackId) => {
  const base = side?.team ?? side ?? {};
  const rawId = base.id ?? base.slug ?? base.name ?? side?.id ?? fallbackId;
  return {
    id: rawId?.toString() ?? fallbackId,
    name: base.name ?? side?.name ?? "Squadra",
    logo: base.logo ?? side?.logo ?? null,
    slug: base.slug,
    groupId: side?.groupId ?? base.local_league ?? base.groupId ?? null,
    score:
      typeof side?.score === "number"
        ? side.score
        : typeof side?.goals === "number"
          ? side.goals
          : 0,
  };
};
const normalizeTeamsFromMatch = (match, matchIdx) => {
  if (Array.isArray(match?.teams) && match.teams.length >= 2) {
    const ordered = [...match.teams].sort(
      (teamA, teamB) => (teamB?.is_home ? 1 : 0) - (teamA?.is_home ? 1 : 0)
    );
    return ordered.slice(0, 2).map((team, idx) => normalizeSide(team, `match-${matchIdx}-team-${idx}`));
  }
  if (match?.homeTeam && match?.awayTeam) {
    return [
      normalizeSide({ ...match.homeTeam, score: match.homeScore ?? match.homeTeam.score }, `match-${matchIdx}-home`),
      normalizeSide({ ...match.awayTeam, score: match.awayScore ?? match.awayTeam.score }, `match-${matchIdx}-away`),
    ];
  }
  return null;
};
const updateTeamEntry = (teamMap, side, opponent, pointSystem) => {
  const key = side.id ?? `team-${teamMap.size + 1}`;
  const entry = teamMap.get(key) ?? createBaseStats({ id: key, name: side.name, logo: side.logo, slug: side.slug });

  entry.p += 1;
  entry.gf += side.score;
  entry.ga += opponent.score;

  if (side.score > opponent.score) {
    entry.w += 1;
    entry.pts += pointSystem.win ?? DEFAULT_POINT_SYSTEM.win;
  } else if (side.score === opponent.score) {
    entry.d += 1;
    entry.pts += pointSystem.draw ?? DEFAULT_POINT_SYSTEM.draw;
  } else {
    entry.l += 1;
    entry.pts += pointSystem.loss ?? DEFAULT_POINT_SYSTEM.loss;
  }

  entry.gd = entry.gf - entry.ga;
  teamMap.set(key, entry);
};
const aggregateMatchesByGroup = (matches = [], pointSystem = DEFAULT_POINT_SYSTEM) => {
  if (!matches?.length) return [];

  const groupsMap = new Map();

  matches.forEach((match, matchIdx) => {
    if (!isMatchCompleted(match)) return;
    const teams = normalizeTeamsFromMatch(match, matchIdx);
    if (!teams) return;

    const [home, away] = teams;
    const groupIdRaw =
      match.groupId ?? match.groupSlug ?? match.group?.id ?? home.groupId ?? away.groupId ?? `group-${groupsMap.size + 1}`;
    const groupId = groupIdRaw.toString();
    const groupName = match.groupName ?? match.group?.name ?? prettifyGroupName(groupIdRaw, `Girone ${groupsMap.size + 1}`);

    if (!groupsMap.has(groupId)) {
      groupsMap.set(groupId, { id: groupId, name: groupName, teamMap: new Map() });
    }

    const bucket = groupsMap.get(groupId);
    if (!bucket.name && groupName) {
      bucket.name = groupName;
    }

    updateTeamEntry(bucket.teamMap, home, away, pointSystem);
    updateTeamEntry(bucket.teamMap, away, home, pointSystem);
  });

  return Array.from(groupsMap.values()).map(({ id, name, teamMap }, idx) => ({
    id,
    name: name || `Girone ${idx + 1}`,
    teams: sortTeams(Array.from(teamMap.values())),
  }));
};
const normalizeGroupsFallback = (groups = []) =>
  groups.map((group, index) => ({
    id: group?.id ?? group?.name ?? `group-${index + 1}`,
    name: group?.name ?? `Girone ${index + 1}`,
    teams: sortTeams((group?.teams ?? []).map((team) => createBaseStats(team))),
  }));

/**
 * Standings
 * Props:
 * - groups: Array<{ name?: string, teams?: Array<{ id:string, name:string, logo?:string, p?:number, w?:number, d?:number, l?:number, gf?:number, ga?:number, gd?:number, pts?:number }> }>
 * - matches: Array<{ groupId?: string, groupName?: string, finished?: boolean, teams?: Array, homeTeam?: object, awayTeam?: object }>
 * - pointSystem: { win?: number, draw?: number, loss?: number }
 */
export default function Standings({ groups = [], matches = [], pointSystem = DEFAULT_POINT_SYSTEM }) {
  const preparedGroups = useMemo(() => {
    const derived = aggregateMatchesByGroup(matches, pointSystem);
    if (derived.length) {
      return derived;
    }
    return normalizeGroupsFallback(groups);
  }, [groups, matches, pointSystem]);

  if (!preparedGroups.length) {
    return (
      <EmptyState
        title="Classifica non disponibile"
        description="Non ci sono ancora risultati per questa competizione. Torna più tardi per consultare la graduatoria aggiornata."
        action={{ label: "Vai alle competizioni", href: "/competitions" }}
        align="left"
      />
    );
  }

  return (
    <section className="city-page standings-section">
      <div className="standings-stack">
        {preparedGroups.map((group, groupIdx) => (
          <article
            key={group.id}
            className="standings-card"
            role="region"
            aria-label={`Classifica ${group.name}`}
          >
            <header className="standings-card-header">
              <div>
                <p className="standings-eyebrow">Classifica</p>
                <h3>{group.name}</h3>
              </div>
              <div className="group-meta">
                <span className="group-pill">{group.teams.length} squadre</span>
                {group.teams[0] ? <span className="group-leader">Leader: {group.teams[0].name}</span> : null}
              </div>
            </header>

            <div className="standings-table" role="table">
              <div className="standings-row head" role="row">
                <div className="col pos" role="columnheader" aria-label="#">
                  #
                </div>
                <div className="col team" role="columnheader">
                  Squadra
                </div>
                <div className="col p" role="columnheader" title="Partite">
                  P
                </div>
                <div className="col w" role="columnheader" title="Vinte">
                  V
                </div>
                <div className="col d" role="columnheader" title="Pareggi">
                  N
                </div>
                <div className="col l" role="columnheader" title="Perse">
                  P
                </div>
                <div className="col gf" role="columnheader" title="Gol fatti">
                  GF
                </div>
                <div className="col ga" role="columnheader" title="Gol subiti">
                  GS
                </div>
                <div className="col gd" role="columnheader" title="Differenza reti">
                  DR
                </div>
                <div className="col pts" role="columnheader" title="Punti">
                  Pt
                </div>
              </div>

              {group.teams.map((team, idx) => (
                <div
                  key={team.id || team.name || `${groupIdx}-${idx}`}
                  className={`standings-row body ${idx < 3 ? "top" : ""}`}
                  role="row"
                >
                  <div className="col pos" role="cell">
                    <span className={`badge ${idx === 0 ? "gold" : idx === 1 ? "silver" : idx === 2 ? "bronze" : ""}`}>
                      {idx + 1}
                    </span>
                  </div>

                  <div className="col team" role="cell">
                    <div className="team-info">
                      <div className="logo">
                        {team.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={team.logo} alt={`logo ${team.name}`} />
                        ) : (
                          <div className="placeholder" aria-hidden="true" />
                        )}
                      </div>
                      <div className="name" title={team.name}>
                        {team.name}
                      </div>
                    </div>
                  </div>

                  <div className="col p" role="cell">{team.p ?? 0}</div>
                  <div className="col w" role="cell">{team.w ?? 0}</div>
                  <div className="col d" role="cell">{team.d ?? 0}</div>
                  <div className="col l" role="cell">{team.l ?? 0}</div>
                  <div className="col gf" role="cell">{team.gf ?? 0}</div>
                  <div className="col ga" role="cell">{team.ga ?? 0}</div>
                  <div className="col gd" role="cell">{team.gd ?? (team.gf ?? 0) - (team.ga ?? 0)}</div>
                  <div className="col pts" role="cell">{team.pts ?? 0}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
