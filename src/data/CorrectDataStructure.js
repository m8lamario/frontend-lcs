// LocalLeague (lookup_field: slug)
// GET /localleagues/ (list)
export const localleagues = [
    {
        "id": 1,
        "slug": "molecup",
        "name": "Mole Cup",
        "title": "Mole Cup Reale Mutua",
        "subtitle": "Stage cittadino Torino",
        "news": [
            { "id": 101, "title": "Finale regionale al Cus Torino", "excerpt": "Semifinali nel nuovo campo sintetico.", "date": "2025-01-05", "image": "/HomeFoto/13.jpg" },
            { "id": 102, "title": "Galfer in testa alla classifica", "excerpt": "Tre vittorie consecutive e primato difeso.", "date": "2025-01-03", "image": "/HomeFoto/19.jpg" },
            { "id": 103, "title": "Allenamenti aperti al pubblico", "excerpt": "Clinic tecnico per studenti e famiglie.", "date": "2024-12-28", "image": "/HomeFoto/DSCF6614-Migliorato-NR.webp" },
            { "id": 104, "title": "Campus vuoto, ma le porte restano aperte", "excerpt": "Il Comune apre gli spalti per famiglie e giornalisti.", "date": "2025-01-10", "image": "/HomeFoto/13.jpg" }
        ],
        "teams": [
            { "id": 1, "slug": "alfieri", "name": "Alfieri", "short_name": "ALF", "local_league": 1, "coach": "Coach Ribaudo", "record": "4V - 1P", "pts": 12 },
            { "id": 2, "slug": "galfer", "name": "Galfer", "short_name": "GAL", "local_league": 1, "coach": "Coach Dara", "record": "5V - 0P", "pts": 15 },
            { "id": 3, "slug": "gioberti", "name": "Gioberti", "short_name": "GIO", "local_league": 1, "coach": "Coach Manera", "record": "2V - 2P", "pts": 7 },
            { "id": 4, "slug": "copernico", "name": "Copernico", "short_name": "COP", "local_league": 1, "coach": "Coach Latini", "record": "1V - 4P", "pts": 3 },
            { "id": 5, "slug": "torretta", "name": "Torretta", "short_name": "TOR", "local_league": 1, "coach": "Coach Andrei", "record": "3V - 2P", "pts": 9 },
            { "id": 1, "slug": "alfieri2", "name": "Alfieri", "short_name": "ALF", "local_league": 1, "coach": "Coach Ribaudo", "record": "4V - 1P", "pts": 12 },
            { "id": 2, "slug": "galfer2", "name": "Galfer", "short_name": "GAL", "local_league": 1, "coach": "Coach Dara", "record": "5V - 0P", "pts": 15 },
            { "id": 3, "slug": "gioberti2", "name": "Gioberti", "short_name": "GIO", "local_league": 1, "coach": "Coach Manera", "record": "2V - 2P", "pts": 7 },
            { "id": 4, "slug": "copernico2", "name": "Copernico", "short_name": "COP", "local_league": 1, "coach": "Coach Latini", "record": "1V - 4P", "pts": 3 },
            { "id": 5, "slug": "torretta2", "name": "Torretta", "short_name": "TOR", "local_league": 1, "coach": "Coach Andrei", "record": "3V - 2P", "pts": 9 }
        ],
        "stadiums": [
            { "id": 1, "name": "Cus Torino", "address": "Via Milano, 63, 10095 Grugliasco TO", "latitude": "45.020000", "longitude": "7.100000", "local_leagues": [1] },
            { "id": 2, "name": "Campo Maserati", "address": "Strada Settimo 120, Torino", "latitude": "45.056000", "longitude": "7.660000", "local_leagues": [1] }
        ]
    },
    {
        "id": 2,
        "slug": "romacup",
        "name": "Roma Cup",
        "title": "Roma Cup Acea",
        "subtitle": "Girone Centro",
        "news": [
            { "id": 201, "title": "Calendario ufficiale Roma Cup", "excerpt": "Pubblicate date e orari delle prime giornate.", "date": "2025-02-01", "image": "/HomeFoto/19.jpg" },
            { "id": 202, "title": "Derby Giulio Cesare vs Visconti", "excerpt": "Attesi oltre 500 studenti sugli spalti.", "date": "2025-02-10", "image": "/HomeFoto/13.jpg" },
            { "id": 203, "title": "Coppa Fair Play", "excerpt": "Due squadre fanno squadra per un progetto cittadino.", "date": "2025-02-14", "image": "/HomeFoto/DSCF6614-Migliorato-NR.webp" }
        ],
        "teams": [
            { "id": 10, "slug": "giulio-cesare", "name": "Giulio Cesare", "short_name": "GCE", "local_league": 2, "coach": "Coach Lupini", "record": "3V - 1P", "pts": 10 },
            { "id": 11, "slug": "visconti", "name": "Visconti", "short_name": "VIS", "local_league": 2, "coach": "Coach Minelli", "record": "2V - 1P", "pts": 8 },
            { "id": 12, "slug": "keplero", "name": "Keplero", "short_name": "KEP", "local_league": 2, "coach": "Coach Piran", "record": "1V - 2P", "pts": 5 },
            { "id": 13, "slug": "virgilio", "name": "Virgilio", "short_name": "VIR", "local_league": 2, "coach": "Coach Riva", "record": "0V - 4P", "pts": 1 }
        ],
        "stadiums": [
            { "id": 5, "name": "Stadio delle Terme", "address": "Largo delle Terme 12, 00184 Roma", "latitude": "41.889100", "longitude": "12.494500", "local_leagues": [2] },
            { "id": 6, "name": "Campo Garbatella", "address": "Via G. Pullino 50, 00154 Roma", "latitude": "41.862900", "longitude": "12.486700", "local_leagues": [2] }
        ]
    },
    {
        "id": 3,
        "slug": "venicecup",
        "name": "Venezia Cup",
        "title": "Venezia Cup Maratona",
        "subtitle": "Coppa del Nord-Est",
        "news": [
            { "id": 301, "title": "San Marco ospita la semifinale", "excerpt": "Il campo sull'acqua sarà il fulcro del weekend.", "date": "2025-03-01", "image": "/HomeFoto/13.jpg" },
            { "id": 302, "title": "Corso di arbitri studenti", "excerpt": "Nuovi arbitri arrivano da Mestre e Chioggia.", "date": "2025-03-07", "image": "/HomeFoto/19.jpg" }
        ],
        "teams": [
            { "id": 20, "slug": "marconi", "name": "Marconi", "short_name": "MAR", "local_league": 3, "coach": "Coach Vega", "record": "4V - 2P", "pts": 14 },
            { "id": 21, "slug": "laguna", "name": "Laguna", "short_name": "LAG", "local_league": 3, "coach": "Coach Sereni", "record": "3V - 3P", "pts": 9 },
            { "id": 22, "slug": "palazzina", "name": "Palazzina", "short_name": "PAL", "local_league": 3, "coach": "Coach Delfi", "record": "2V - 2P", "pts": 6 },

        ],
        "stadiums": [
            { "id": 8, "name": "Campo San Trovaso", "address": "Calle della Toletta 2, Venezia", "latitude": "45.430000", "longitude": "12.330000", "local_leagues": [3] }
        ]
    },
    {
        "id": 4,
        "slug": "milancup",
        "name": "Milano Cup",
        "title": "Milano Cup Allianz",
        "subtitle": "Girone Lombardia",
        "news": [
            { "id": 401, "title": "Arena di Baggio sold-out", "excerpt": "Prima giornata con 1.200 studenti.", "date": "2025-01-18", "image": "/HomeFoto/13.jpg" },
            { "id": 402, "title": "Sforza guida la classifica marcatori", "excerpt": "Cinque reti nelle prime due gare.", "date": "2025-01-20", "image": "/HomeFoto/19.jpg" }
        ],
        "teams": [
            { "id": 30, "slug": "parini", "name": "Parini", "short_name": "PAR", "local_league": 4, "coach": "Coach Baresi", "record": "2V - 0P", "pts": 6 },
            { "id": 31, "slug": "volta", "name": "Volta", "short_name": "VOL", "local_league": 4, "coach": "Coach Colombo", "record": "1V - 1P", "pts": 3 },
            { "id": 32, "slug": "sforza", "name": "Sforza", "short_name": "SFO", "local_league": 4, "coach": "Coach Oriali", "record": "0V - 2P", "pts": 0 }
        ],
        "stadiums": [
            { "id": 9, "name": "Arena Baggio", "address": "Via Olivieri 22, Milano", "latitude": "45.457000", "longitude": "9.106000", "local_leagues": [4] }
        ]
    },
    {
        "id": 5,
        "slug": "napolicup",
        "name": "Napoli Cup",
        "title": "Napoli Cup Givova",
        "subtitle": "Girone Sud",
        "news": [
            { "id": 501, "title": "Partenza tra fuochi e musica", "excerpt": "Inaugurazione al Collana con dj set.", "date": "2025-02-05", "image": "/HomeFoto/DSCF6614-Migliorato-NR.webp" }
        ],
        "teams": [
            { "id": 40, "slug": "sannazaro", "name": "Sannazaro", "short_name": "SAN", "local_league": 5, "coach": "Coach Insigne", "record": "1V - 0P", "pts": 3 },
            { "id": 41, "slug": "umberto", "name": "Umberto", "short_name": "UMB", "local_league": 5, "coach": "Coach Cannavaro", "record": "0V - 1P", "pts": 0 }
        ],
        "stadiums": [
            { "id": 10, "name": "Stadio Collana", "address": "Viale Colli Aminei, Napoli", "latitude": "40.851800", "longitude": "14.268100", "local_leagues": [5] }
        ]
    },
    {
        "id": 6,
        "slug": "bolognacup",
        "name": "Bologna Cup",
        "title": "Bologna Cup Illumia",
        "subtitle": "Emilia Centrale",
        "news": [
            { "id": 601, "title": "Derby al PalaDozza", "excerpt": "Istituto Fermi contro Sabin apre il torneo.", "date": "2025-01-25", "image": "/HomeFoto/19.jpg" }
        ],
        "teams": [
            { "id": 50, "slug": "fermi", "name": "Fermi", "short_name": "FER", "local_league": 6, "coach": "Coach Pozzi", "record": "2V - 1P", "pts": 6 },
            { "id": 51, "slug": "sabin", "name": "Sabin", "short_name": "SAB", "local_league": 6, "coach": "Coach Messina", "record": "1V - 2P", "pts": 3 }
        ],
        "stadiums": [
            { "id": 11, "name": "PalaDozza", "address": "Piazza Manfredi Azzarita 8, Bologna", "latitude": "44.498000", "longitude": "11.324000", "local_leagues": [6] }
        ]
    },
    {
        "id": 7,
        "slug": "palermocup",
        "name": "Palermo Cup",
        "title": "Palermo Cup AMGAS",
        "subtitle": "Girone Sicilia",
        "news": [
            { "id": 701, "title": "Allenamenti sul mare", "excerpt": "Squadre in campo alla Favorita al tramonto.", "date": "2025-02-12", "image": "/HomeFoto/13.jpg" }
        ],
        "teams": [
            { "id": 60, "slug": "meli", "name": "Meli", "short_name": "MEL", "local_league": 7, "coach": "Coach Corini", "record": "0V - 0P", "pts": 0 },
            { "id": 61, "slug": "garibaldi", "name": "Garibaldi", "short_name": "GAR", "local_league": 7, "coach": "Coach Guidi", "record": "0V - 0P", "pts": 0 }
        ],
        "stadiums": [
            { "id": 12, "name": "Campo Favorita", "address": "Viale del Fante 30, Palermo", "latitude": "38.163000", "longitude": "13.340000", "local_leagues": [7] }
        ]
    },
    {
        "id": 8,
        "slug": "bariwave",
        "name": "Bari Wave",
        "title": "Bari Wave Acqua",
        "subtitle": "Adriatico Sud",
        "news": [
            { "id": 801, "title": "Beach field indoor", "excerpt": "Il palazzetto si trasforma con sabbia scenica.", "date": "2025-03-03", "image": "/HomeFoto/19.jpg" }
        ],
        "teams": [
            { "id": 70, "slug": "marconi-bari", "name": "Marconi Bari", "short_name": "MBA", "local_league": 8, "coach": "Coach Cassano", "record": "1V - 0P", "pts": 3 },
            { "id": 71, "slug": "scacchi", "name": "Scacchi", "short_name": "SCA", "local_league": 8, "coach": "Coach Ventura", "record": "0V - 1P", "pts": 0 }
        ],
        "stadiums": [
            { "id": 13, "name": "Palaflorio", "address": "Viale Archimede 2, Bari", "latitude": "41.104000", "longitude": "16.871000", "local_leagues": [8] }
        ]
    }
]

//Team (lookup_field: slug)
// GET /teams/ (list)
export const teams = [
    { "id": 1, "local_league": "molecup", "slug": "alfieri", "name": "Alfieri", "short_name": "ALF", "players": [ { "id": 1, "first_name": "Pippo", "last_name": "Rossi", "shirt_number": 12, "position": "ATT", "team": 1 }, { "id": 2, "first_name": "Marco", "last_name": "Sella", "shirt_number": 5, "position": "DIF", "team": 1 } ] },
    { "id": 2, "local_league": "molecup", "slug": "galfer", "name": "Galfer", "short_name": "GAL", "players": [ { "id": 3, "first_name": "Luca", "last_name": "Trova", "shirt_number": 8, "position": "CEN", "team": 2 }, { "id": 4, "first_name": "Paolo", "last_name": "Bava", "shirt_number": 9, "position": "ATT", "team": 2 } ] },
    { "id": 3, "local_league": "molecup", "slug": "gioberti", "name": "Gioberti", "short_name": "GIO", "players": [ { "id": 5, "first_name": "Federico", "last_name": "Lodi", "shirt_number": 6, "position": "CEN", "team": 3 } ] },
    { "id": 10, "local_league": "romacup", "slug": "giulio-cesare", "name": "Giulio Cesare", "short_name": "GCE", "players": [ { "id": 11, "first_name": "Edoardo", "last_name": "Lauri", "shirt_number": 7, "position": "ATT", "team": 10 } ] },
    { "id": 11, "local_league": "romacup", "slug": "visconti", "name": "Visconti", "short_name": "VIS", "players": [ { "id": 12, "first_name": "Lorenzo", "last_name": "Papi", "shirt_number": 10, "position": "CEN", "team": 11 } ] },
    { "id": 21, "local_league": "venicecup", "slug": "laguna", "name": "Laguna", "short_name": "LAG", "players": [ { "id": 21, "first_name": "Sara", "last_name": "Rossi", "shirt_number": 4, "position": "CEN", "team": 21 } ] },
    { "id": 30, "local_league": "milancup", "slug": "parini", "name": "Parini", "short_name": "PAR", "players": [ { "id": 30, "first_name": "Giacomo", "last_name": "Sforza", "shirt_number": 9, "position": "ATT", "team": 30 } ] },
    { "id": 31, "local_league": "milancup", "slug": "volta", "name": "Volta", "short_name": "VOL", "players": [ { "id": 31, "first_name": "Enrico", "last_name": "Bassi", "shirt_number": 5, "position": "DIF", "team": 31 } ] },
    { "id": 40, "local_league": "napolicup", "slug": "sannazaro", "name": "Sannazaro", "short_name": "SAN", "players": [ { "id": 40, "first_name": "Fabio", "last_name": "Russo", "shirt_number": 10, "position": "ATT", "team": 40 } ] },
    { "id": 41, "local_league": "napolicup", "slug": "umberto", "name": "Umberto", "short_name": "UMB", "players": [ { "id": 41, "first_name": "Antonio", "last_name": "Vitale", "shirt_number": 3, "position": "DIF", "team": 41 } ] },
    { "id": 50, "local_league": "bolognacup", "slug": "fermi", "name": "Fermi", "short_name": "FER", "players": [ { "id": 50, "first_name": "Lorenzo", "last_name": "Pozzi", "shirt_number": 4, "position": "CEN", "team": 50 } ] },
    { "id": 51, "local_league": "bolognacup", "slug": "sabin", "name": "Sabin", "short_name": "SAB", "players": [ { "id": 51, "first_name": "Giovanni", "last_name": "Messina", "shirt_number": 11, "position": "ATT", "team": 51 } ] },
    { "id": 60, "local_league": "palermocup", "slug": "meli", "name": "Meli", "short_name": "MEL", "players": [ { "id": 60, "first_name": "Pietro", "last_name": "Corini", "shirt_number": 7, "position": "ATT", "team": 60 } ] },
    { "id": 61, "local_league": "palermocup", "slug": "garibaldi", "name": "Garibaldi", "short_name": "GAR", "players": [ { "id": 61, "first_name": "Emanuele", "last_name": "Guidi", "shirt_number": 2, "position": "DIF", "team": 61 } ] },
    { "id": 70, "local_league": "bariwave", "slug": "marconi-bari", "name": "Marconi Bari", "short_name": "MBA", "players": [ { "id": 70, "first_name": "Stefano", "last_name": "Cassano", "shirt_number": 8, "position": "CEN", "team": 70 } ] },
    { "id": 71, "local_league": "bariwave", "slug": "scacchi", "name": "Scacchi", "short_name": "SCA", "players": [ { "id": 71, "first_name": "Alberto", "last_name": "Ventura", "shirt_number": 6, "position": "DIF", "team": 71 } ] }
]

// Player (PK lookup)
// GET /players/ (list)
export const players = [
    { "id": 1, "team": "alfieri", "first_name": "Pippo", "last_name": "Rossi", "shirt_number": 12, "position": "ATT" },
    { "id": 2, "team": "alfieri", "first_name": "Marco", "last_name": "Sella", "shirt_number": 5, "position": "DIF" },
    { "id": 3, "team": "galfer", "first_name": "Luca", "last_name": "Trova", "shirt_number": 8, "position": "CEN" },
    { "id": 4, "team": "galfer", "first_name": "Paolo", "last_name": "Bava", "shirt_number": 9, "position": "ATT" },
    { "id": 5, "team": "gioberti", "first_name": "Federico", "last_name": "Lodi", "shirt_number": 6, "position": "CEN" },
    { "id": 11, "team": "giulio-cesare", "first_name": "Edoardo", "last_name": "Lauri", "shirt_number": 7, "position": "ATT" },
    { "id": 12, "team": "visconti", "first_name": "Lorenzo", "last_name": "Papi", "shirt_number": 10, "position": "CEN" },
    { "id": 21, "team": "laguna", "first_name": "Sara", "last_name": "Rossi", "shirt_number": 4, "position": "CEN" },
    { "id": 30, "team": "parini", "first_name": "Giacomo", "last_name": "Sforza", "shirt_number": 9, "position": "ATT" },
    { "id": 31, "team": "volta", "first_name": "Enrico", "last_name": "Bassi", "shirt_number": 5, "position": "DIF" },
    { "id": 40, "team": "sannazaro", "first_name": "Fabio", "last_name": "Russo", "shirt_number": 10, "position": "ATT" },
    { "id": 41, "team": "umberto", "first_name": "Antonio", "last_name": "Vitale", "shirt_number": 3, "position": "DIF" },
    { "id": 50, "team": "fermi", "first_name": "Lorenzo", "last_name": "Pozzi", "shirt_number": 4, "position": "CEN" },
    { "id": 51, "team": "sabin", "first_name": "Giovanni", "last_name": "Messina", "shirt_number": 11, "position": "ATT" },
    { "id": 60, "team": "meli", "first_name": "Pietro", "last_name": "Corini", "shirt_number": 7, "position": "ATT" },
    { "id": 61, "team": "garibaldi", "first_name": "Emanuele", "last_name": "Guidi", "shirt_number": 2, "position": "DIF" },
    { "id": 70, "team": "marconi-bari", "first_name": "Stefano", "last_name": "Cassano", "shirt_number": 8, "position": "CEN" },
    { "id": 71, "team": "scacchi", "first_name": "Alberto", "last_name": "Ventura", "shirt_number": 6, "position": "DIF" }
]

// Stadium (PK lookup)
// GET /stadiums/ (list)
export const stadiums = [
    { "id": 1, "local_leagues": ["molecup"], "name": "Cus Torino", "address": "Via Milano, 63, 10095 Grugliasco TO", "latitude": "45.020000", "longitude": "7.100000" },
    { "id": 2, "local_leagues": ["molecup"], "name": "Campo Maserati", "address": "Strada Settimo 120, Torino", "latitude": "45.056000", "longitude": "7.660000" },
    { "id": 5, "local_leagues": ["romacup"], "name": "Stadio delle Terme", "address": "Largo delle Terme 12, Roma", "latitude": "41.889100", "longitude": "12.494500" },
    { "id": 6, "local_leagues": ["romacup"], "name": "Campo Garbatella", "address": "Via G. Pullino 50, Roma", "latitude": "41.862900", "longitude": "12.486700" },
    { "id": 8, "local_leagues": ["venicecup"], "name": "Campo San Trovaso", "address": "Calle della Toletta 2, Venezia", "latitude": "45.430000", "longitude": "12.330000" },
    { "id": 9, "local_leagues": ["milancup"], "name": "Arena Baggio", "address": "Via Olivieri 22, Milano", "latitude": "45.457000", "longitude": "9.106000" },
    { "id": 10, "local_leagues": ["napolicup"], "name": "Stadio Collana", "address": "Viale Colli Aminei, Napoli", "latitude": "40.851800", "longitude": "14.268100" },
    { "id": 11, "local_leagues": ["bolognacup"], "name": "PalaDozza", "address": "Piazza Manfredi Azzarita 8, Bologna", "latitude": "44.498000", "longitude": "11.324000" },
    { "id": 12, "local_leagues": ["palermocup"], "name": "Campo Favorita", "address": "Viale del Fante 30, Palermo", "latitude": "38.163000", "longitude": "13.340000" },
    { "id": 13, "local_leagues": ["bariwave"], "name": "Palaflorio", "address": "Viale Archimede 2, Bari", "latitude": "41.104000", "longitude": "16.871000" }
]

//Match (PK lookup)
// GET /matches/ (list)
export const matches = [
    {
        "id": 4,
        "datetime": "2026-01-11T10:25:58Z",
        "stadium": stadiums[0],
        "score_text": "0 - 0",
        "name": "Galfer vs Gioberti",
        "finished": false,
        "teams": [
            {
                "id": 7,
                "is_home": true,
                "penalties": 0,
                "score": 0,
                "team": { "id": 2, "local_league": "molecup", "slug": "galfer", "name": "Galfer", "short_name": "GAL" },
                "events": [
                ]
            },
            {
                "id": 8,
                "is_home": false,
                "penalties": 0,
                "score": 0,
                "team": { "id": 3, "local_league": "molecup", "slug": "gioberti", "name": "Gioberti", "short_name": "GIO" },
                "events": []
            }
        ]
    },
    {
        "id": 5,
        "datetime": "2025-11-04T17:00:00Z",
        "stadium": stadiums[0],
        "score_text": "2 - 2",
        "name": "Alfieri vs Copernico",
        "finished": true,
        "teams": [
            {
                "id": 9,
                "is_home": true,
                "penalties": 0,
                "score": 2,
                "team": { "id": 1, "local_league": "molecup", "slug": "alfieri", "name": "Alfieri", "short_name": "ALF" },
                "events": [
                    { "id": 4, "team_match": 9, "player": "Pippo Rossi", "minute": 11, "event_type": "GOAL" },
                    { "id": 5, "team_match": 9, "player": "Marco Sella", "minute": 33, "event_type": "GOAL" }
                ]
            },
            {
                "id": 10,
                "is_home": false,
                "penalties": 0,
                "score": 2,
                "team": { "id": 4, "local_league": "molecup", "slug": "copernico", "name": "Copernico", "short_name": "COP" },
                "events": [
                    { "id": 6, "team_match": 10, "player": "Luca Denari", "minute": 55, "event_type": "GOAL" },
                    { "id": 7, "team_match": 10, "player": "Dario Pasta", "minute": 70, "event_type": "GOAL" }
                ]
            }
        ]
    },
    {
        "id": 14,
        "datetime": "2025-11-08T20:30:00Z",
        "stadium": stadiums[1],
        "score_text": "3 - 1",
        "name": "Galfer vs Torretta",
        "finished": true,
        "teams": [
            {
                "id": 33,
                "is_home": true,
                "penalties": 0,
                "score": 3,
                "team": { "id": 2, "local_league": "molecup", "slug": "galfer", "name": "Galfer", "short_name": "GAL" },
                "events": [
                    { "id": 16, "team_match": 33, "player": "Luca Trova", "minute": 5, "event_type": "GOAL" }
                ]
            },
            {
                "id": 34,
                "is_home": false,
                "penalties": 0,
                "score": 1,
                "team": { "id": 5, "local_league": "molecup", "slug": "torretta", "name": "Torretta", "short_name": "TOR" },
                "events": [
                    { "id": 17, "team_match": 34, "player": "Arianna Valli", "minute": 44, "event_type": "GOAL" }
                ]
            }
        ]
    },
    {
        "id": 20,
        "datetime": "2025-12-12T16:30:00Z",
        "stadium": stadiums[2],
        "score_text": "3 - 1",
        "name": "Giulio Cesare vs Keplero",
        "finished": true,
        "teams": [
            {
                "id": 30,
                "is_home": true,
                "penalties": 0,
                "score": 3,
                "team": { "id": 10, "local_league": "romacup", "slug": "giulio-cesare", "name": "Giulio Cesare", "short_name": "GCE" },
                "events": [
                    { "id": 12, "team_match": 30, "player": "Edoardo Lauri", "minute": 8, "event_type": "GOAL" },
                    { "id": 13, "team_match": 30, "player": "Gabriele Muto", "minute": 39, "event_type": "GOAL" },
                    { "id": 14, "team_match": 30, "player": "Edoardo Lauri", "minute": 47, "event_type": "GOAL" }
                ]
            },
            {
                "id": 31,
                "is_home": false,
                "penalties": 0,
                "score": 1,
                "team": { "id": 12, "local_league": "romacup", "slug": "keplero", "name": "Keplero", "short_name": "KEP" },
                "events": [
                    { "id": 15, "team_match": 31, "player": "Simone Poni", "minute": 62, "event_type": "GOAL" }
                ]
            }
        ]
    },
    {
        "id": 25,
        "datetime": "2026-01-09T18:00:00Z",
        "stadium": stadiums[4],
        "score_text": "2 - 0",
        "name": "Marconi vs Laguna", // modificarlo perché già deducibile e sostituirlo con stage: 'Qualifica' o stage: 'Semifinale' ecc...
        "finished": false,
        "teams": [
            {
                "id": 41,
                "is_home": true,
                "penalties": 0,
                "score": 2,
                "team": { "id": 20, "local_league": "molecup", "slug": "marconi", "name": "Marconi", "short_name": "MAR" },
                "events": [
                    { "id": 20, "team_match": 41, "player": "Giulia Moro", "minute": 21, "event_type": "GOAL" }
                ]
            },
            {
                "id": 42,
                "is_home": false,
                "penalties": 0,
                "score": 0,
                "team": { "id": 21, "local_league": "venicecup", "slug": "laguna", "name": "Laguna", "short_name": "LAG" },
                "events": []
            }
        ]
    }
]

// MatchEvent (PK lookup)
// GET /matchevents/ (list)
export const matchEvents = [
    { "id": 2, "team_match": 7, "player": null, "minute": 4, "event_type": "GOAL" },
    { "id": 3, "team_match": 7, "player": null, "minute": 18, "event_type": "YELLOW_CARD" },
    { "id": 4, "team_match": 9, "player": "Pippo Rossi", "minute": 11, "event_type": "GOAL" },
    { "id": 12, "team_match": 30, "player": "Edoardo Lauri", "minute": 8, "event_type": "GOAL" },
    { "id": 16, "team_match": 33, "player": "Luca Trova", "minute": 5, "event_type": "GOAL" },
    { "id": 20, "team_match": 41, "player": "Giulia Moro", "minute": 21, "event_type": "GOAL" }
]

// Default aggregate export (optional)
const apiData = { localleagues, /*teams,*/ players, /*stadiums, matches,*/ matchEvents };

// news

export default apiData;
