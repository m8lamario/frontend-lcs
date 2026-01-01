"use client";
import React, { useMemo } from "react";
import EmptyState from "./EmptyState";

/**
 * Standings
 * Props:
 * - groups: Array<{ name: string, teams: Array<{ id:string, name:string, logo?:string, p?:number, w?:number, d?:number, l?:number, gf?:number, ga?:number, gd?:number, pts?:number }> }>
 */
export default function Standings({ groups = [] }) {
  if (!groups || groups.length === 0) {
    return (
      <EmptyState
        title="Classifica non disponibile"
        description="Non ci sono ancora risultati per questa competizione. Torna più tardi per consultare la graduatoria aggiornata."
        action={{ label: "Vai alle competizioni", href: "/competitions" }}
        align="left"
      />
    );
  }

  const preparedGroups = useMemo(
    () =>
      groups.map((group, index) => {
        const safeTeams = (group?.teams ?? [])
          .map((t) => ({
            p: 0,
            w: 0,
            d: 0,
            l: 0,
            gf: 0,
            ga: 0,
            gd: 0,
            pts: 0,
            ...t,
          }))
          .sort(
            (a, b) =>
              (b.pts ?? 0) - (a.pts ?? 0) || (b.gd ?? 0) - (a.gd ?? 0) || (b.gf ?? 0) - (a.gf ?? 0)
          );

        return {
          id: group?.name || `group-${index + 1}`,
          name: group?.name || `Girone ${index + 1}`,
          teams: safeTeams,
        };
      }),
    [groups]
  );

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
