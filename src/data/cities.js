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
            {
                id: 'm1',
                date: '2025-10-12T15:00:00+02:00',
                stage: 'Girone A',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '2 - 1',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm2',
                date: '2025-10-18T17:30:00+02:00',
                stage: 'Girone A',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 0',
                status: 'LIVE',
                isLive: true,
                minute: 65
            },
            {
                id: 'm3',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm4',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm5',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm6',
                date: '2025-11-05T18:00:00+01:00',
                stage: 'Semifinali',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '3 - 2',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm7',
                date: '2025-11-06T20:30:00+01:00',
                stage: 'Semifinali',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '0 - 0',
                status: 'LIVE',
                isLive: true,
                minute: 38
            },
            {
                id: 'm8',
                date: '2025-11-10T16:00:00+01:00',
                stage: 'Finale',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '2 - 0',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm9',
                date: '2025-11-12T10:00:00+01:00',
                stage: 'Finale',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 2',
                status: 'FT',
                isLive: false
            },
            {
                id: 'm10',
                date: '2025-11-14T14:00:00+01:00',
                stage: 'Amichevole',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'SCHEDULED',
                isLive: false
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
