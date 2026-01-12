import Link from "next/link";
import './Styles/Footer.css';
import { FacebookIcon, TwitterIcon, DiscordIcon, LinkedInIcon } from './Icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer>
                <div className="logo-wrap">
                    <img className="logo" src="/logo/PNG-lcs_logo_white_t.png" alt="ESL Logo"/>
                    <h4>ESL</h4>
                </div>
                <div className="socials">
                    <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                    <a href="#" aria-label="Twitter"><TwitterIcon /></a>
                    <a href="#" aria-label="Discord"><DiscordIcon /></a>
                    <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <h2>Su di noi</h2>
                        </li>
                        <li>
                            <a href={"/"}>Home</a>
                        </li>
                        <li>
                            <a href={"/team"}>Team</a>
                        </li>
                        <li>
                            <a href={"/contatti"}>Contatti</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h2>Competizione</h2>
                        </li>
                        <li>
                            <a href={"/competitions"}>Cittadina</a>
                        </li>
                        <li>
                            <a href={"/"}>Esl</a>
                        </li>
                        <li>
                            <a href={"Squadre"}>Regolamento</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h2>Legal</h2>
                        </li>
                        <li>
                            <Link href={"/terms"}>Terms</Link>
                        </li>
                        <li>
                            <Link href={"/privacy"}>Privacy</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h2>ESL</h2>
                        </li>
                        <li>
                            <address>
                                Via Don Giovanni Minzoni 14 <br/>
                                10121 <br/>
                                Torino, Italy
                            </address>
                        </li>
                    </ul>
                </div>
            </footer>
        <div className={"copyright"}>
            <h2>© {currentYear} ESL. Tutti i diritti riservati.</h2>
        </div>
    </>
    );
}