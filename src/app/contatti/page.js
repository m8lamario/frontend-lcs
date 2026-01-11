'use client';

import { useMemo, useState } from "react";
import styles from "./contatti.module.css";

const CONTACT_EMAIL = "contatti@lcsleague.it";
const CONTACT_PHONE = "+39 011 123 4567";
const CONTACT_ADDRESS = "Via dello Sport 21, 10100 Torino";

const infoCards = [
    {
        id: "press",
        label: "Relazioni media",
        description: "Per interviste, materiali stampa e accrediti evento.",
        ctaLabel: "Scrivi alla press",
        href: `mailto:${CONTACT_EMAIL}?subject=Richiesta%20media`,
        meta: "Risposta entro 24h"
    },
    {
        id: "schools",
        label: "Scuole e dirigenti",
        description: "Onboarding scuole, partnership educative e format ESL.",
        ctaLabel: "Prenota una call",
        href: "mailto:partnership@lcsleague.it?subject=Partnership%20istituto",
        meta: "Disponibilità lun-ven"
    },
    {
        id: "teams",
        label: "Team e capitani",
        description: "Regolamenti, tesseramenti e supporto gare locali.",
        ctaLabel: "Apri chat Telegram",
        href: "https://t.me/lcsleague",
        meta: "Community ufficiale"
    }
];

const initialFormState = { name: "", email: "", message: "" };

const validators = {
    name: (value) => (value.trim().length >= 3 ? "" : "Inserisci almeno 3 caratteri."),
    email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Inserisci un'email valida."),
    message: (value) => (value.trim().length >= 20 ? "" : "Il messaggio deve avere almeno 20 caratteri.")
};

export default function ContattiPage() {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");

    const isFormValid = useMemo(() =>
        Object.entries(formData).every(([key, value]) => validators[key](value) === "")
    , [formData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
        setStatus("idle");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = Object.entries(formData).reduce((acc, [key, value]) => {
            const error = validators[key](value);
            if (error) {
                acc[key] = error;
            }
            return acc;
        }, {});

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setStatus("error");
            return;
        }

        const subject = encodeURIComponent(`Richiesta di contatto da ${formData.name}`);
        const body = encodeURIComponent(
            `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMessaggio:\n${formData.message}`
        );
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        if (typeof window !== "undefined") {
            window.location.href = mailtoLink;
            setStatus("submitted");
        }
    };

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>Parla con la lega</p>
                <h1>Contattaci per media, scuole e supporto squadre.</h1>
                <p className={styles.lead}>
                    Rispondiamo rapidamente a richieste di partnership, organizzazione eventi e supporto regolamentare.
                    Compila il form o scrivici direttamente via email: il team LCS segue ogni città con un referente dedicato.
                </p>
                <div className={styles.heroMeta}>
                    <div>
                        <span>HQ</span>
                        <strong>{CONTACT_ADDRESS}</strong>
                    </div>
                    <div>
                        <span>Telefono</span>
                        <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}>{CONTACT_PHONE}</a>
                    </div>
                    <div>
                        <span>Email</span>
                        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </div>
                </div>
            </section>

            <section className={styles.cardsSection}>
                {infoCards.map((card) => (
                    <article key={card.id} className={styles.infoCard}>
                        <div>
                            <p className={styles.cardEyebrow}>{card.meta}</p>
                            <h2>{card.label}</h2>
                            <p>{card.description}</p>
                        </div>
                        <a className={styles.cardCta} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>
                            {card.ctaLabel}
                        </a>
                    </article>
                ))}
            </section>

            <section className={styles.formSection}>
                <div>
                    <p className={styles.eyebrow}>Scrivici ora</p>
                    <h2>Invia un messaggio al team LCS</h2>
                    <p>
                        Ti basta raccontarci chi sei, la città di riferimento e il motivo del contatto. Ti rispondiamo via email
                        entro una giornata lavorativa.
                    </p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <label>
                        Nome e cognome
                        <input
                            type="text"
                            name="name"
                            placeholder="Es. Martina Rossi"
                            value={formData.name}
                            onChange={handleChange}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="tu@scuola.it"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </label>
                    <label>
                        Messaggio
                        <textarea
                            name="message"
                            placeholder="Raccontaci di cosa hai bisogno..."
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            aria-invalid={errors.message ? "true" : "false"}
                        />
                        {errors.message && <span className={styles.error}>{errors.message}</span>}
                    </label>
                    <button type="submit" className={styles.submit} disabled={!isFormValid}>
                        Invia email
                    </button>
                    {status === "submitted" && <p className={styles.success}>Stiamo aprendo il tuo client email...</p>}
                    {status === "error" && <p className={styles.error}>Controlla i campi evidenziati e riprova.</p>}
                </form>
            </section>
        </main>
    );
}

