'use client';

import styles from "../legal.module.css";

const sections = [
    {
        id: "scope",
        title: "Ambito di applicazione",
        body: [
            "I presenti Termini disciplinano l'accesso e l'utilizzo del portale LCS (" +
            "\"Servizio\") da parte di scuole, studenti, partner e visitatori.",
            "Navigando sul sito accetti integralmente questi Termini. Se operi per conto di una scuola o azienda, " +
            "dichiari di avere i poteri necessari per vincolare l'ente rappresentato."
        ]
    },
    {
        id: "usage",
        title: "Condizioni d'uso",
        list: [
            "È vietato pubblicare contenuti illeciti, diffamatori o che violino diritti di terzi.",
            "Le credenziali di accesso fornite alle scuole sono personali e non trasferibili.",
            "Possiamo sospendere o limitare l'accesso al Servizio in caso di violazioni o manutenzioni straordinarie."
        ],
        body: [
            "Eventuali materiali forniti (regolamenti, kit media, asset grafici) restano di proprietà ESL/LCS e sono " +
            "utilizzabili esclusivamente per finalità istituzionali legate alla lega."
        ]
    },
    {
        id: "ip",
        title: "Proprietà intellettuale",
        body: [
            "Logo, naming, contenuti editoriali e dati delle competizioni sono protetti da copyright e marchi registrati.",
            "La riproduzione totale o parziale è consentita solo con autorizzazione scritta del team comunicazione LCS."
        ]
    },
    {
        id: "liability",
        title: "Limitazione di responsabilità",
        body: [
            "Forniamo il Servizio \"così com'è\" senza garanzie di disponibilità continua o assenza di errori.",
            "Non siamo responsabili per danni indiretti, perdita di dati, interruzioni o utilizzi impropri derivanti da terzi.",
            "Le scuole restano responsabili della condotta degli studenti e dell'idoneità degli impianti utilizzati."
        ]
    },
    {
        id: "changes",
        title: "Modifiche ai Termini",
        body: [
            "Ci riserviamo il diritto di aggiornare periodicamente questi Termini per riflettere nuove funzionalità o " +
            "aggiornamenti normativi.",
            "Le modifiche saranno comunicate sul sito con data di entrata in vigore. L'uso continuato del Servizio dopo tale " +
            "data implica l'accettazione delle modifiche."
        ]
    }
];

const meta = [
    { label: "Ultimo aggiornamento", value: "11 gennaio 2026" },
    { label: "Referente legale", value: "legal@lcsleague.it", href: "mailto:legal@lcsleague.it" },
    { label: "Documenti correlati", value: "Privacy Policy", href: "/privacy" }
];

export default function TermsPage() {
    return (
        <main className={styles.page}>
            <section className={styles.intro}>
                <p className={styles.eyebrow}>Policy ufficiale</p>
                <h1>Termini e Condizioni ESL</h1>
                <p>
                    Questo documento definisce le regole per utilizzare i servizi digitali e gli asset informativi della Lega
                    Calcio Studenti. Consigliamo di consultarlo periodicamente, specialmente in prossimità di tornei o attivazioni.
                </p>
            </section>

            {sections.map((section) => (
                <section key={section.id} id={section.id} className={styles.block}>
                    <h2>{section.title}</h2>
                    {section.body?.map((paragraph, idx) => (
                        <p key={`p-${section.id}-${idx}`}>{paragraph}</p>
                    ))}
                    {section.list && (
                        <ul>
                            {section.list.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}

            <div className={styles.metaGrid}>
                {meta.map((item) => (
                    <div key={item.label} className={styles.metaCard}>
                        <span>{item.label}</span>
                        {item.href ? (
                            <a href={item.href}>{item.value}</a>
                        ) : (
                            <strong>{item.value}</strong>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}

