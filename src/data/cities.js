// Helper date strings for testing scenarios
const __now = new Date();
const __nowISO = __now.toISOString(); // partita che inizia ora
const __past70ISO = new Date(__now.getTime() - 70 * 60000).toISOString(); // partita finita (70' fa)

const slugify = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'team';

const baseRoster = [
    { number: 1, role: 'Portiere', name: 'Alessio Guardiani', year: '5A' },
    { number: 2, role: 'Difensore', name: 'Matteo Serra', year: '4B' },
    { number: 4, role: 'Difensore', name: 'Diego Ferri', year: '5C' },
    { number: 6, role: 'Centrocampista', name: 'Luca Parodi', year: '5B' },
    { number: 8, role: 'Centrocampista', name: 'Riccardo Gori', year: '4C' },
    { number: 9, role: 'Attaccante', name: 'Filippo Greco', year: '5D' },
    { number: 10, role: 'Attaccante', name: 'Emiliano Costa', year: '5A' },
    { number: 11, role: 'Attaccante', name: 'Gabriele Sanna', year: '4A' }
];

const baseStaff = [
    { role: 'Head Coach', name: 'Mauro Testa' },
    { role: 'Vice Allenatore', name: 'Simone Lodi' },
    { role: 'Prep. Atletico', name: 'Giulia Ferrante' },
    { role: 'Team Manager', name: 'Chiara Volpi' }
];

const createRoster = (teamName = '') => {
    const slug = slugify(teamName);
    return baseRoster.map((player, idx) => ({ ...player, id: `${slug}-player-${idx + 1}` }));
};

const createStaff = (teamName = '') => {
    const slug = slugify(teamName);
    return baseStaff.map((member, idx) => ({ ...member, id: `${slug}-staff-${idx + 1}` }));
};

const attachTeamExtras = (teams = []) => teams.map((team) => ({
    ...team,
    roster: team.roster ?? createRoster(team.name),
    staff: team.staff ?? createStaff(team.name)
}));

const DEFAULT_CITY_LOGO = "/logo/PNG-lcs_logo_white_t.png";

const buildStandingTeam = (slug, name, rank) => {
    const pts = Math.max(3, 14 - rank * 2);
    const gf = Math.max(3, 12 - rank);
    const ga = Math.max(1, 3 + rank);
    const w = Math.max(0, 3 - rank + 1);
    const l = Math.max(0, rank - 1);
    const d = Math.max(0, 3 - w - l);
    return {
        id: `${slug}-${slugify(name)}`,
        name,
        logo: DEFAULT_CITY_LOGO,
        p: 3,
        w,
        d,
        l,
        gf,
        ga,
        gd: gf - ga,
        pts
    };
};

const createSyntheticCity = ({ slug, title, primaryTeam, secondaryTeam }) => {
    const teamNames = [
        primaryTeam,
        secondaryTeam ?? `${primaryTeam} Academy`,
        `${title} Select`,
        `${title} Youth`
    ];
    const standings = teamNames.map((name, index) => buildStandingTeam(slug, name, index + 1));
    const schoolCards = standings.slice(0, 2).map((team, index) => ({
        id: team.id,
        name: team.name,
        logo: DEFAULT_CITY_LOGO,
        city: title,
        coach: `Coach ${team.name.split(" ")[0]}`,
        founded: 1970 + index,
        colors: index === 0 ? "Blu / Oro" : "Rosso / Nero",
        record: `${6 - index}V - ${index}P`
    }));
    return {
        title,
        schools: attachTeamExtras(schoolCards),
        matches: [],
        groups: [
            {
                name: "Girone Unico",
                teams: standings
            }
        ],
        news: [],
        partners: []
    };
};

const createSyntheticCities = (configs = []) => configs.reduce((acc, cfg) => {
    if (!cfg?.slug || acc[cfg.slug]) {
        return acc;
    }
    acc[cfg.slug] = createSyntheticCity(cfg);
    return acc;
}, {});

const syntheticCities = createSyntheticCities([
    { slug: "milano", title: "Milano Cup", primaryTeam: "Liceo Manzoni", secondaryTeam: "ITIS Milano" },
    { slug: "roma", title: "Roma Capitale", primaryTeam: "Liceo Giulio Cesare", secondaryTeam: "Istituto Roma" }
]);

const cities = {
    torino: {
        title: 'Mole cup',
        schools: attachTeamExtras([
            { id: 'liceo-leonardo-1', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'M. Rossi', founded: 1965, colors: 'Bianco / Blu', record: '6V - 2P', achievements: ['Campioni 2023', 'Fair Play 2024'], contact: 'prof.sport@leonardo.edu' },
            { id: 'itis-a-1', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'F. Bianchi', founded: 1971, colors: 'Nero / Oro', record: '5V - 3P', achievements: ['Finalisti 2023'], contact: 'coach.itis@itis-a.edu' },
            { id: 'liceo-leonardo-2', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'M. Rossi', founded: 1965, colors: 'Bianco / Blu' },
            { id: 'itis-a-2', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'F. Bianchi', founded: 1971, colors: 'Nero / Oro' },
            { id: 'liceo-leonardo-3', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'M. Rossi', founded: 1965, colors: 'Bianco / Blu' },
            { id: 'itis-a-3', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'F. Bianchi', founded: 1971, colors: 'Nero / Oro' },
            { id: 'liceo-leonardo-4', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'M. Rossi', founded: 1965, colors: 'Bianco / Blu' },
            { id: 'itis-a-4', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'F. Bianchi', founded: 1971, colors: 'Nero / Oro' },
            { id: 'liceo-leonardo-5', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'M. Rossi', founded: 1965, colors: 'Bianco / Blu' },
            { id: 'itis-a-5', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'F. Bianchi', founded: 1971, colors: 'Nero / Oro' },
            { id: 'liceo-leonardo-6', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'M. Rossi', founded: 1965, colors: 'Bianco / Blu' },
            { id: 'itis-a-6', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', city: 'Torino', coach: 'F. Bianchi', founded: 1971, colors: 'Nero / Oro' },
        ]),
        matches: [
            // Completed matches (FT)
            {
                id: 'm1',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Girone A',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '2 - 1',
                status: 'FT',
                isLive: false,
                events: [
                    { minute: 11, type: 'goal', team: 'Liceo Leonardo', player: 'M. Rossi' },
                    { minute: 33, type: 'yellow', team: 'ITIS A.', player: 'F. Bianchi' },
                    { minute: 52, type: 'goal', team: 'ITIS A.', player: 'L. Moretti' },
                    { minute: 74, type: 'goal', team: 'Liceo Leonardo', player: 'D. Sala' }
                ]
            },
            // Partita finita (tempo basato sull'orario) con eventi oltre il 50' per test supplementare
            {
                id: 'm_supp_ft',
                date: __past70ISO,
                stage: 'Test Supplementare',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '2 - 2',
                status: 'FT',
                isLive: false,
                events: [
                    { minute: 12, type: 'goal', team: 'Liceo Leonardo', player: 'A. Neri' },
                    { minute: 38, type: 'yellow', team: 'ITIS A.', player: 'B. Riva' },
                    { minute: 55, type: 'goal', team: 'ITIS A.', player: 'C. Serra' },
                    { minute: 63, type: 'goal', team: 'Liceo Leonardo', player: 'D. Pini' }
                ]
            },
            {
                id: 'm2',
                date: '2025-11-05T18:00:00+01:00',
                stage: 'Girone A',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 0',
                status: 'FT',
                isLive: false,
                events: [
                    { minute: 4, type: 'yellow', team: 'Liceo Leonardo', player: 'G. Valli' },
                    { minute: 19, type: 'goal', team: 'ITIS A.', player: 'S. Rossi' },
                    { minute: 65, type: 'red', team: 'Liceo Leonardo', player: 'M. Gallo' }
                ]
            },
            {
                id: 'm3',
                date: '2025-11-10T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT',
                isLive: false,
                events: [
                    { minute: 28, type: 'goal', team: 'Liceo Leonardo', player: 'D. Sala' },
                    { minute: 40, type: 'yellow', team: 'ITIS A.', player: 'A. Conti' },
                    { minute: 78, type: 'goal', team: 'ITIS A.', player: 'L. Moretti' }
                ]
            },
            // Single live match (current day) - only this has isLive: true
            {
                id: 'm4',
                date: '2025-12-13T15:30:00+01:00',
                stage: 'Semifinali',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '0 - 1',
                status: 'LIVE',
                isLive: true,
                minute: 43,
                events: [
                    { minute: 5, type: 'goal', team: 'Liceo Leonardo', player: 'E. Ferro' },
                    { minute: 12, type: 'yellow', team: 'ITIS A.', player: 'F. Bianchi' },
                    { minute: 31, type: 'yellow', team: 'Liceo Leonardo', player: 'G. Valli' },
                    { minute: 42, type: 'yellow', team: 'ITIS A.', player: 'L. Conti' }
                ]
            },
            // Partita che inizia adesso (per test minuto live su base oraria)
            {
                id: 'm_now',
                date: __nowISO,
                stage: 'Amichevole',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '2 - 1',
                status: 'SCHEDULED',
                isLive: true,
                events: [
                    { minute: 2, type: 'yellow', team: 'ITIS A.', player: 'M. Testa' },
                    { minute: 5, type: 'yellow', team: 'Liceo Leonardo', player: 'M. Testa' },
                    { minute: 12, type: 'Goal', team: 'ITIS A.', player: 'M. Testa' },
                    { minute: 26, type: 'Goal', team: 'Liceo Leonardo', player: 'M. Testa' },
                    { minute: 31, type: 'Goal', team: 'ITIS A.', player: 'M. Testa' },
                ]
            },
            // More completed matches
            {
                id: 'm5',
                date: '2025-11-14T14:00:00+01:00',
                stage: 'Amichevole',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '3 - 2',
                status: 'FT',
                isLive: false,
                events: []
            },
            {
                id: 'm6',
                date: '2025-11-06T20:30:00+01:00',
                stage: 'Finale',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 2',
                status: 'FT',
                isLive: false,
                events: []
            },
            // Future scheduled matches
            {
                id: 'm7',
                date: '2025-12-20T18:00:00+01:00',
                stage: 'Torneo Amichevole',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'SCHEDULED',
                isLive: false,
                events: []
            },
            {
                id: 'm8',
                date: '2026-01-10T16:00:00+01:00',
                stage: 'Girone C',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'SCHEDULED',
                isLive: false,
                events: []
            },
            {
                id: 'm9',
                date: '2026-02-14T14:00:00+01:00',
                stage: 'Girone B',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'SCHEDULED',
                isLive: false,
                events: []
            },
            {
                id: 'm10',
                date: '2026-03-18T18:00:00+01:00',
                stage: 'Girone A',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'SCHEDULED',
            },
            {
                id: 'm11',
                date: '2026-03-19T18:00:00+01:00',
                stage: 'Girone A',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'SCHEDULED',
            }
        ],
        groups: [
            {
                name: 'Girone A',
                teams: [
                    { id: 'leonardo', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 },
                    { id: 'itis-a', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 6 },
                    { id: 'liceo-b', name: 'Liceo B.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3 },
                    { id: 'itis-c', name: 'ITIS C.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 1 },
                ]
            },             {
                name: 'Girone B',
                teams: [
                    { id: 'leonardo', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 },
                    { id: 'itis-a', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 8 },
                    { id: 'liceo-b', name: 'Liceo B.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3 },
                    { id: 'itis-c', name: 'ITIS C.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 1 },
                ]
            },
            {
                name: 'Girone C',
                teams: [
                    { id: 'leonardo', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 },
                    { id: 'itis-a', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 6 },
                    { id: 'liceo-b', name: 'Liceo B.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3 },
                    { id: 'itis-c', name: 'ITIS C.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 1 },
                ]
            }
        ],
        news: [
            {
                id: 'n1',
                title: 'Inizia la Mole Cup: calendario e formato',
                excerpt: 'Al via il torneo scolastico con gironi da quattro squadre e fasi finali a eliminazione diretta. Scopri date e regolamento.',
                date: '2025-09-20',
                image: '/HomeFoto/13.jpg'
            },
            {
                id: 'n2',
                title: 'Highlights prima giornata',
                excerpt: 'Partenza sprint per Liceo Leonardo: vittoria di misura e tante occasioni da gol. Tutti i risultati e le classifiche aggiornate.',
                date: '2025-10-12',
                image: '/HomeFoto/19.jpg'
            },
            {
                id: 'n3',
                title: 'Fair Play Award',
                excerpt: 'Riconoscimento speciale a ITIS A. per il comportamento esemplare in campo e sugli spalti durante la seconda giornata.',
                date: '2025-10-18',
                image: '/HomeFoto/DSCF6614-Migliorato-NR.webp'
            }
        ],
        partners: [
            { id: 'partner-uno', name: 'Comune di Torino', type: 'Istituzionale', logo: '/logo/PNG-lcs_logo_white_t.png', url: 'https://www.comune.torino.it/' },
            { id: 'partner-due', name: 'Torino Sport', type: 'Community', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'partner-tre', name: 'LCS Official Store', type: 'Merch', logo: '/logo/PNG-lcs_logo_white_t.png', url: 'https://www.example.com/' }
        ],
        champion: null
    },
    partite: {
        title: 'LCS Match Center',
        tagline: 'Il recap nazionale con i migliori highlights ESL.',
        schools: attachTeamExtras([
            { id: 'campus-united', name: 'Campus United', logo: DEFAULT_CITY_LOGO, city: 'Italia', coach: 'Coach R. Galli', founded: 1998, colors: 'Blu / Argento' },
            { id: 'polisportiva-delta', name: 'Polisportiva Delta', logo: DEFAULT_CITY_LOGO, city: 'Italia', coach: 'Coach V. Tonani', founded: 2001, colors: 'Verde / Nero' },
            { id: 'lcs-all-stars', name: 'LCS All Stars', logo: DEFAULT_CITY_LOGO, city: 'Italia', coach: 'Coach P. Neri', founded: 2010, colors: 'Bianco / Oro' }
        ]),
        matches: [
            {
                id: 'lp-live',
                date: __nowISO,
                stage: 'Supercoppa Nazionale',
                home: { name: 'Campus United', logo: DEFAULT_CITY_LOGO },
                away: { name: 'Polisportiva Delta', logo: DEFAULT_CITY_LOGO },
                score: '1 - 0',
                status: 'LIVE',
                isLive: true,
                minute: 27,
                events: [
                    { minute: 9, type: 'goal', team: 'Campus United', player: 'M. Bressan' },
                    { minute: 16, type: 'yellow', team: 'Polisportiva Delta', player: 'E. Lodi' }
                ]
            },
            {
                id: 'lp-semi',
                date: '2025-12-28T15:30:00+01:00',
                stage: 'Semifinale',
                home: { name: 'LCS All Stars', logo: DEFAULT_CITY_LOGO },
                away: { name: 'Campus United', logo: DEFAULT_CITY_LOGO },
                score: '2 - 2',
                status: 'FT',
                isLive: false,
                events: [
                    { minute: 7, type: 'goal', team: 'LCS All Stars', player: 'T. Vianello' },
                    { minute: 24, type: 'goal', team: 'Campus United', player: 'D. Olivieri' },
                    { minute: 33, type: 'goal', team: 'Campus United', player: 'R. Milia' },
                    { minute: 44, type: 'goal', team: 'LCS All Stars', player: 'A. Viglietti' }
                ]
            },
            {
                id: 'lp-finale',
                date: '2026-01-18T17:00:00+01:00',
                stage: 'Finale Elite',
                home: { name: 'Polisportiva Delta', logo: DEFAULT_CITY_LOGO },
                away: { name: 'LCS All Stars', logo: DEFAULT_CITY_LOGO },
                score: '-',
                status: 'SCHEDULED',
                isLive: false,
                events: []
            },
            {
                id: 'lp-friendly',
                date: '2026-02-02T20:30:00+01:00',
                stage: 'Amichevole Showcase',
                home: { name: 'Campus United', logo: DEFAULT_CITY_LOGO },
                away: { name: 'Select Academy', logo: DEFAULT_CITY_LOGO },
                score: '-',
                status: 'SCHEDULED',
                isLive: false,
                events: []
            }
        ],
        groups: [
            {
                name: 'Ranking Nazionale',
                teams: [
                    buildStandingTeam('partite', 'Campus United', 1),
                    buildStandingTeam('partite', 'Polisportiva Delta', 2),
                    buildStandingTeam('partite', 'LCS All Stars', 3),
                    buildStandingTeam('partite', 'Select Academy', 4)
                ]
            }
        ],
        news: [
            {
                id: 'lp-news-1',
                title: 'Campus United rimonta e vola alla finale',
                excerpt: "Successo ai rigori contro LCS All Stars: decide l'ultimo penalty di Olivieri.",
                date: '2025-12-29',
                image: '/HomeFoto/13.jpg'
            },
            {
                id: 'lp-news-2',
                title: 'Polisportiva Delta firma il colpo dell anno',
                excerpt: 'Arriva il playmaker Senna per rinforzare il centrocampo in vista della finale.',
                date: '2025-12-30',
                image: '/HomeFoto/19.jpg'
            }
        ],
        partners: [
            { id: 'lp-partner-1', name: 'LCS Network', type: 'Media', logo: DEFAULT_CITY_LOGO, url: 'https://www.example.com/' },
            { id: 'lp-partner-2', name: 'Campus Lab', type: 'Training', logo: DEFAULT_CITY_LOGO }
        ],
        champion: null
    },
    ...syntheticCities
};

export default cities;
