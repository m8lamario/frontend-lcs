const DEFAULT_TEAM_LOGO = "/logo/PNG-lcs_logo_white_t.png";

const __now = new Date();
const __nowISO = __now.toISOString();
const __past70ISO = new Date(__now.getTime() - 70 * 60000).toISOString();

const teams = {  // per classifica
    // manzoni: { id: "team-manzoni", name: "Liceo Manzoni", cityName: "Milano", logo: DEFAULT_TEAM_LOGO },
};


const eslData = [ // per classifica
    // { FirstTeam: teams.manzoni, SecondTeam: null, WinnerTeam: teams.manzoni },
];

// per partite
export const eslMatches = [
    {
        id: 'lp-live',
        date: __nowISO,
        stage: 'Supercoppa Nazionale',
        home: { name: 'Campus United', logo: DEFAULT_TEAM_LOGO },
        away: { name: 'Polisportiva Delta', logo: DEFAULT_TEAM_LOGO },
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
        home: { name: 'LCS All Stars', logo: DEFAULT_TEAM_LOGO },
        away: { name: 'Campus United', logo: DEFAULT_TEAM_LOGO },
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
        home: { name: 'Polisportiva Delta', logo: DEFAULT_TEAM_LOGO },
        away: { name: 'LCS All Stars', logo: DEFAULT_TEAM_LOGO },
        score: '-',
        status: 'SCHEDULED',
        isLive: false,
        events: []
    },
    {
        id: 'lp-friendly',
        date: '2026-02-02T20:30:00+01:00',
        stage: 'Amichevole Showcase',
        home: { name: 'Campus United', logo: DEFAULT_TEAM_LOGO },
        away: { name: 'Select Academy', logo: DEFAULT_TEAM_LOGO },
        score: '-',
        status: 'SCHEDULED',
        isLive: false,
        events: []
    },
    {
        id: 'lp-special',
        date: __past70ISO,
        stage: 'Special Test',
        home: { name: 'Campus United', logo: DEFAULT_TEAM_LOGO },
        away: { name: 'Polisportiva Delta', logo: DEFAULT_TEAM_LOGO },
        score: '3 - 3',
        status: 'FT',
        isLive: false,
        events: [
            { minute: 12, type: 'goal', team: 'Campus United', player: 'R. Conti' },
            { minute: 34, type: 'yellow', team: 'Polisportiva Delta', player: 'S. De Luca' },
            { minute: 59, type: 'goal', team: 'Polisportiva Delta', player: 'L. Serrati' },
            { minute: 68, type: 'goal', team: 'Campus United', player: 'D. Viganò' }
        ]
    }
];

export default eslData;
