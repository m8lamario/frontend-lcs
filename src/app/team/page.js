import SectionReveal from "@/components/SectionReveal";
import styles from "./team.module.css";

const companyOverview = {
    eyebrow: "Dietro la lega",
    title: "Team di sviluppo LCS",
    summary:
        "Un gruppo multidisciplinare che unisce prodotto digitale, operations e tecnologia per portare la Lega Calcio Studenti in sempre più città.",
    metrics: [
        { label: "Città supportate", value: "5" },
        { label: "Match live prodotti", value: "120+" },
        { label: "Release annuali", value: "18" },
    ],
};

const teamMembers = [
    {
        name: "Marta Esposito",
        role: "Head of Product",
        bio: "Coordina roadmap e discovery con scuole e partner assicurando esperienze coerenti tra piattaforma e torneo.",
        tech: ["Next.js", "Notion", "Linear"],
        initials: "ME",
    },
    {
        name: "Luca Ferrero",
        role: "Lead Engineer",
        bio: "Guida l'architettura front-end e le integrazioni con calendari, classifiche e sistemi di streaming in tempo reale.",
        tech: ["React 19", "GSAP", "Supabase"],
        initials: "LF",
    },
    {
        name: "Giulia Rinaldi",
        role: "Design & Research",
        bio: "Trasforma feedback di studenti e docenti in interfacce accessibili e coerenti sul web e sui maxischermi dell'evento.",
        tech: ["Figma", "Framer", "Storybook"],
        initials: "GR",
    },
    {
        name: "Samir Khaled",
        role: "DevOps & Data",
        bio: "Automatizza pipeline, osservabilità e raccolta dati per fornire insight su ranking, affluenza e engagement delle community.",
        tech: ["Vercel", "Grafana", "Python"],
        initials: "SK",
    },
    {
        name: "Elisa Marchetti",
        role: "Partnership Tech Lead",
        bio: "Integra i sistemi dei partner (ticketing, sponsor, learning) e garantisce flussi di dati sicuri e conformi.",
        tech: ["OAuth", "HubSpot", "BigQuery"],
        initials: "EM",
    },
    {
        name: "Davide Romano",
        role: "Broadcast & Media Tech",
        bio: "Sviluppa overlay grafici, automazioni per i contenuti social e supporta la regia durante le dirette streaming.",
        tech: ["OBS", "Node.js", "After Effects"],
        initials: "DR",
    },
];

const techStack = [
    {
        category: "Frontend",
        description: "Interfacce reattive per studenti, scuole e sponsor.",
        tools: ["Next.js 15", "React 19", "GSAP", "Framer Motion", "SWR"],
    },
    {
        category: "Backend & Data",
        description: "Servizi API, calendari e aggregazione delle statistiche.",
        tools: ["Node.js", "Supabase", "PostgreSQL", "Python", "BigQuery"],
    },
    {
        category: "DevOps & Delivery",
        description: "Pipeline, monitoraggio e performance sugli eventi live.",
        tools: ["Vercel", "Docker", "Grafana", "Turborepo", "Playwright"],
    },
    {
        category: "Collaboration",
        description: "Allineamento continuo tra prodotto, scuole e partner.",
        tools: ["Notion", "Figma", "Miro", "Slack", "Linear"],
    },
];

function TeamMemberCard({ member }) {
    return (
        <article className={styles.memberCard}>
            <div className={styles.memberHeader}>
                <div className={styles.initials}>{member.initials}</div>
                <div>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                </div>
            </div>
            <p className={styles.memberBio}>{member.bio}</p>
            <ul className={styles.badges}>
                {member.tech.map((item) => (
                    <li key={item} className={styles.badge}>
                        {item}
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default function TeamPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>{companyOverview.eyebrow}</p>
                <h1 className={styles.title}>{companyOverview.title}</h1>
                <p className={styles.lead}>{companyOverview.summary}</p>
                <div className={styles.metrics}>
                    {companyOverview.metrics.map((metric) => (
                        <article key={metric.label} className={styles.metricCard}>
                            <span className={styles.metricValue}>{metric.value}</span>
                            <span className={styles.metricLabel}>{metric.label}</span>
                        </article>
                    ))}
                </div>
            </section>

            <SectionReveal title="Persone e ruoli" className={styles.section} align="left">
                <p className={styles.sectionLead}>
                    Ogni città coinvolta in LCS è seguita da un referente tecnico e operativo che collabora con scuole, arbitri e media per
                    mantenere aggiornati risultati, classifiche e contenuti.
                </p>
                <div className={styles.teamGrid}>
                    {teamMembers.map((member) => (
                        <TeamMemberCard key={member.name} member={member} />
                    ))}
                </div>
            </SectionReveal>

            <SectionReveal title="Tecnologie & strumenti" className={styles.section} align="left">
                <p className={styles.sectionLead}>
                    Il nostro stack privilegia strumenti moderni, performanti e facilmente scalabili durante i picchi degli eventi live.
                </p>
                <div className={styles.techGrid}>
                    {techStack.map((group) => (
                        <article key={group.category} className={styles.techCard}>
                            <div>
                                <p className={styles.techCategory}>{group.category}</p>
                                <h3 className={styles.techTitle}>{group.description}</h3>
                            </div>
                            <ul className={styles.techList}>
                                {group.tools.map((tool) => (
                                    <li key={tool} className={styles.techPill}>
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </SectionReveal>
        </div>
    );
}

