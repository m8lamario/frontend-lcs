import Link from "next/link";
import './Styles/Footer.css';
import {InstagramIcon, TikTokIcon} from './Icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer>
                <div className="logo-wrap">
                    <img className="logo" src="/logoCities/lcsw.png" alt="ESL Logo" loading="lazy"/>
                    <h4>LCS</h4>
                </div>
                <div className="socials">
                    <a href="https://www.instagram.com/lcsrealemutua/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
                    <a href="https://www.tiktok.com/@molecup_torino" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon /></a>
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