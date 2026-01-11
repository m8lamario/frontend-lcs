'use client';

import styles from "../legal.module.css";

const sections = [
    {
        id: "collection",
        title: "Dati raccolti",
        body: [
            "Raccogliamo informazioni fornite da scuole, studenti e partner (anagrafiche, contatti, ruoli) per la gestione " +
            "dei tornei ESL/LCS.",
            "Dati tecnici (log, device, pagine visitate) sono registrati automaticamente per garantire sicurezza e " +
            "migliorare l'esperienza utente."
        ]
    },
    {
        id: "purpose",
        title: "Finalità del trattamento",
        list: [
            "Organizzazione di eventi sportivi, comunicazioni operative e invio di aggiornamenti.",
            "Gestione credenziali staff/scuole e accesso a materiali didattici o media kit.",
            "Adempimenti legali e fiscali collegati alle attività della lega."
        ]
    },
    {
        id: "legalbasis",
        title: "Base giuridica",
        body: [
            "Il trattamento si basa sul consenso espresso dagli interessati, sull'esecuzione di accordi con scuole e " +
            "soggetti partner e sugli obblighi normativi applicabili.",
            "Il consenso può essere revocato in qualsiasi momento scrivendo al DPO."
        ]
    },
    {
        id: "retention",
        title: "Conservazione e sicurezza",
        body: [
            "Conserviamo i dati per il tempo strettamente necessario alle finalità dichiarate e in conformità con la normativa vigente.",
            "Applichiamo misure tecniche e organizzative per proteggere i dati da accessi non autorizzati, perdite o alterazioni."
        ]
    },
    {
        id: "rights",
        title: "Diritti degli interessati",
        list: [
            "Accesso, rettifica, cancellazione e portabilità dei dati personali.",
            "Limitazione o opposizione al trattamento per motivi legittimi.",
            "Diritto di reclamo al Garante per la protezione dei dati personali."
        ],
        body: [
            "Per esercitare i diritti invia una richiesta formale a privacy@lcsleague.it indicando l'oggetto del contatto e " +
            "la relazione con LCS."
        ]
    }
];

const meta = [
    { label: "Titolare del trattamento", value: "Lega Calcio Studenti - Via Don Giovanni Minzoni 14, 10121 Torino" },
    { label: "Email DPO", value: "privacy@lcsleague.it", href: "mailto:privacy@lcsleague.it" },
    { label: "Riferimenti normativi", value: "GDPR (UE) 2016/679" }
];

export default function PrivacyPage() {
    return (
        <main className={styles.page}>
            <section className={styles.intro}>
                <p className={styles.eyebrow}>Tutela dei dati</p>
                <h1>Informativa Privacy ESL</h1>
                <p>
                    Descriviamo in modo trasparente quali dati raccogliamo, perché lo facciamo e come puoi esercitare i tuoi diritti.
                    Questa informativa si applica a scuole, studenti, famiglie, sponsor e partner coinvolti nelle attività della lega.
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

