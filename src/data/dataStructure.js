
export const localLeagueSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    slug: { type: "string" },
    name: { type: "string" },
    title: { type: "string" },
    subtitle: { type: "string" },
    news: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          excerpt: { type: "string" },
          date: { type: "string", description: "YYYY-MM-DD" },
          image: { type: "string" }
        }
      }
    },
    teams: {
      type: "array",
      items: { type: "object", description: "team reference or team object" }
    },
    stadiums: {
      type: "array",
      items: { type: "object", description: "stadium reference or object" }
    }
  },
  required: ["id", "slug", "name"]
};

export const teamSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    local_league: { type: ["integer", "string"], description: "id or slug della local league" },
    slug: { type: "string" },
    name: { type: "string" },
    short_name: { type: "string" },
    coach: { type: "string" },
    record: { type: "string" },
    pts: { type: "integer" },
    players: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          shirt_number: { type: "integer" },
          position: { type: "string" },
          team: { type: ["integer", "string"] }
        }
      }
    }
  },
  required: ["id", "slug", "name"]
};

export const playerSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    team: { type: ["integer", "string"] },
    first_name: { type: "string" },
    last_name: { type: "string" },
    shirt_number: { type: "integer" },
    position: { type: "string" }
  },
  required: ["id", "team", "first_name", "last_name"]
};

export const stadiumSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    local_leagues: { type: "array", items: { type: ["integer", "string"] } },
    name: { type: "string" },
    address: { type: "string" },
    latitude: { type: "string" },
    longitude: { type: "string" }
  },
  required: ["id", "name"]
};

export const matchEventSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    team_match: { type: "integer" },
    player: { type: ["string", "null"] },
    minute: { type: "integer" },
    event_type: { type: "string" }
  },
  required: ["id", "team_match", "event_type"]
};

export const matchTeamSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    is_home: { type: "boolean" },
    penalties: { type: "integer" },
    score: { type: "integer" },
    team: { type: "object", description: "team reference (id/slug/name/short_name)" },
    events: { type: "array", items: matchEventSchema }
  },
  required: ["id", "is_home", "team"]
};

export const matchSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    datetime: { type: "string", description: "ISO datetime string" },
    stadium: { type: "object", description: "stadium reference or object" },
    score_text: { type: "string" },
    name: { type: "string" },
    finished: { type: "boolean" },
    teams: { type: "array", items: matchTeamSchema }
  },
  required: ["id", "datetime", "teams"]
};

const dataStructure = {
  localLeague: localLeagueSchema,
  team: teamSchema,
  player: playerSchema,
  stadium: stadiumSchema,
  match: matchSchema,
  matchEvent: matchEventSchema
};

export default dataStructure;

