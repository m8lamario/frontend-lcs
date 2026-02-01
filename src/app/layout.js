import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


export default function RootLayout({ children }) {
    return (
        <html lang="it" >
        <head>
            <title>estudentsleague</title>
            <meta name="description" content="estudentsleague"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="stylesheet" href="https://use.typekit.net/ajb7nmd.css"/>
            {/* Google Fonts gestiti da next/font/google */}
            <style>{`
                html {
                    font-family: "helvetica-lt-pro", sans-serif;
                    font-weight: 300;
                    font-style: normal;
                }
            `}</style>
        </head>
        <body>
        <Nav/>
        <main className="main">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}