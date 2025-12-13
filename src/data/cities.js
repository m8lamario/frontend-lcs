// Helper date strings for testing scenarios
const __now = new Date();
const __nowISO = __now.toISOString(); // partita che inizia ora
const __past70ISO = new Date(__now.getTime() - 70 * 60000).toISOString(); // partita finita (70' fa)

const cities = {
    torino: {
        title: 'Mole cup',
        schools: [
            { id: 'liceo-leonardo-1', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-1', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-2', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-2', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-3', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-3', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-4', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-4', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-5', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-5', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-6', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-6', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
        ],
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
                stage: 'Amichevole Test Orario',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '0 - 0',
                status: 'SCHEDULED',
                isLive: false,
                events: [
                    { minute: 2, type: 'yellow', team: 'ITIS A.', player: 'M. Testa' },
                    { minute: 10, type: 'yellow', team: 'Liceo Leonardo', player: 'M. Testa' }
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
            { id: 'partner-due', name: 'Torino Sport', type: 'Community', logo: '/logo/PNG-lcs_logo_white_t.png', url: 'https://www.torinosport.it/' },
            { id: 'partner-tre', name: 'LCS Official Store', type: 'Merch', logo: '/logo/PNG-lcs_logo_white_t.png', url: 'https://www.example.com/' }
        ]
    },
};
export default cities;
