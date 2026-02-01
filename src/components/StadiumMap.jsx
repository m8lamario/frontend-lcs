import styles from './Styles/StadiumMap.module.css';

const StadiumIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
        <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
    </svg>
);

const LocationIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const buildMapsLink = ({ latitude, longitude, address }) => {
    const hasCoords = latitude && longitude;
    const coords = hasCoords ? `${latitude},${longitude}` : undefined;
    const destination = coords || encodeURIComponent(address || '');
    if (!destination) return null;
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};

const buildEmbedSrc = ({ latitude, longitude, address }) => {
    if (latitude && longitude) {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'YOUR_KEY';
        return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${latitude},${longitude}`;
    }
    if (address) {
        return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    }
    return null;
};

export default function StadiumMap({ name, address, latitude, longitude }) {
    const mapsHref = buildMapsLink({ latitude, longitude, address });
    const src = buildEmbedSrc({ latitude, longitude, address });
    if (!name && !address) return null;
    if (!src) return null;

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerInfo}>
                        <span className={styles.eyebrow}>Stadio ufficiale</span>
                        <h3 className={styles.stadiumName}>{name}</h3>
                    </div>
                    <div className={styles.iconBadge}>
                        <StadiumIcon />
                    </div>
                </div>
                {address && (
                    <div className={styles.addressRow}>
                        <LocationIcon />
                        <p className={styles.address}>{address}</p>
                    </div>
                )}
            </header>
            <div className={styles.mapWrap}>
                <iframe
                    title={`Mappa ${name}`}
                    loading="lazy"
                    allowFullScreen
                    src={src}
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <footer className={styles.footer}>
                {mapsHref && (
                    <a
                        className={styles.navButton}
                        href={mapsHref}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Apri nel navigatore
                        <ArrowIcon />
                    </a>
                )}
            </footer>
        </article>
    );
}
