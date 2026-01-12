import dynamic from "next/dynamic";
import img from "@/../public/HomeFoto/DSCF6614-Migliorato-NR.webp";
import Image from "next/image";
import Link from "next/link";
import { FutbolIcon, TrophyIcon, StarIcon, PeopleGroupIcon, HandHoldingHeartIcon, HandHoldingDollarIcon } from "@/components/Icons";

// Componenti above-the-fold caricati normalmente
import HeroWithBackground from "@/components/HeroWithBackground";

// Lazy load dei componenti below-the-fold per ridurre il bundle iniziale
const SectionReveal = dynamic(() => import("@/components/SectionReveal"), {
    ssr: true,
});
const EventReveal = dynamic(() => import("@/components/EventReveal"), {
    ssr: true,
    loading: () => <div style={{ minHeight: "300px" }} />,
});
const TestimonialsReveal = dynamic(() => import("@/components/TestimonialsReveal"), {
    ssr: true,
    loading: () => <div style={{ minHeight: "300px" }} />,
});

export default function Page() {
    return (
        <div className={"homeESL"}>
            <HeroWithBackground text="estudentsleague" />

            <div className={"contentHome"}>
                <EventReveal />
                {/* Sezioni di esempio con animazione GSAP su scroll */}
                <SectionReveal title="" align="right">
                    <div className={"div-content"}>
                        <div className={"div-content-text"}>
                            <h2>Chi siamo</h2>
                            <p>Lega Calcio Studenti (LCS) è una lega studentesca nata con l&#39;obiettivo di valorizzare lo sport nel contesto scolastico, incentivando i licei a supportare i propri atleti e proponendo ai partecipanti nuove opportunità accademiche e didattiche.</p>
                            <Link href="/competitions" className="btn-cta">Scopri di più</Link>
                        </div>
                        <figure className="div-image">
                            <Image
                                src={img}
                                alt="Mole Cup"
                                fill
                                priority
                                sizes="(max-width: 900px) 100vw, 520px"
                                style={{ objectFit: "cover" }}
                            />
                        </figure>
                    </div>
                </SectionReveal>
                <SectionReveal title="Come funziona" align="center">
                    <ul className={"timeline"}>
                        <li>
                            <div className={"desc"}>
                                <h4>Fase a gironi</h4>
                                <p>Le squadre si affrontano in tre gironi da quattro squadre</p>
                            </div>
                            <div className={"imgCircle"}>
                                <div className={"circle"}><FutbolIcon /></div>
                            </div>
                            <div className={"desc"}></div>
                        </li>
                        <li className={"linea"}>
                        </li>
                        <li>
                            <div className={"desc"}>
                            </div>
                            <div className={"imgCircle"}>
                                <div className={"circle"}><TrophyIcon /></div>
                            </div>
                            <div className={"desc desc-right"}>
                                <h4>Eliminazione diretta</h4>
                                <p>Le 12 migliori squadre procedono alla fase ad eliminazione diretta</p>
                            </div>
                        </li>
                        <li className={"linea"}></li>
                        <li>
                            <div className={"desc"}>
                                <h4>Finale nazionale</h4>
                                <p>Stay tuned</p>
                            </div>
                            <div className={"imgCircle"}>
                                <div className={"circle"}><StarIcon /></div>
                            </div>
                            <div className={"desc"}></div>
                        </li>
                    </ul>

                </SectionReveal>

                {/* Nuova sezione: I nostri valori */}
                <SectionReveal title="I nostri valori" align="left" className="values-section">
                    <p className="values-lead">Lo sport nei giovani può avere un impatto sulla formazione del futuro</p>
                    <div className="values-grid">
                        <article className="value-card">
                            <div className="value-icon"><PeopleGroupIcon /></div>
                            <h3>Alternanza scuola lavoro</h3>
                            <ul className="value-list">
                                <li>Riprese e montaggio</li>
                                <li>Giornalismo</li>
                                <li>Sicurezza</li>
                            </ul>
                        </article>
                        <article className="value-card">
                            <div className="value-icon"><HandHoldingHeartIcon /></div>
                            <h3>Cause benefiche</h3>
                            <div className="pills">
                                <span className="pill">ONG Interos</span>
                                <span className="pill">Just the woman I am</span>
                                <span className="pill">Onlus</span>
                                <span className="pill">African Impact</span>
                                <span className="pill">FFF</span>
                            </div>
                        </article>
                        <article className="value-card">
                            <div className="value-icon"><HandHoldingDollarIcon /></div>
                            <h3>Donazioni</h3>
                            <p className="value-stats">Abbiamo donato oltre <strong>3000€</strong> per l&#39;emergenza Covid e oltre <strong>500€</strong> all&#39;associazione Genova nel cuore</p>
                        </article>
                    </div>
                </SectionReveal>

                {/* Nuova sezione: Dicono di noi */}
                <TestimonialsReveal />

            </div>

        </div>
    );
}
