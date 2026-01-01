import './Styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer>
                <div className="logo-wrap">
                    <img className="logo" src="/logo/PNG-lcs_logo_white_t.png"/>
                    <h4>ESL</h4>
                </div>
                <div className="socials">
                    <a className="fa-brands fa-facebook"></a>
                    <a className="fa-brands fa-x-twitter"></a>
                    <a className="fa-brands fa-discord"></a>
                    <a className="fa-brands fa-linkedin"></a>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <h2>Su di noi</h2>
                        </li>
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>Team</a>
                        </li>
                        <li>
                            <a>Contatti</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h2>Competizione</h2>
                        </li>
                        <li>
                            <a>Cittadina</a>
                        </li>
                        <li>
                            <a>Esl</a>
                        </li>
                        <li>
                            <a>Regolamento</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h2>Legal</h2>
                        </li>
                        <li>
                            <a>Terms</a>
                        </li>
                        <li>
                            <a>Privacy</a>
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