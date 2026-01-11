import styles from './Styles/StadiumMap.module.css';

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
                <div>
                    <p className={styles.eyebrow}>Stadio ufficiale</p>
                    <h3>{name}</h3>
                </div>
                {address && <p className={styles.address}>{address}</p>}
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
            {mapsHref && (
                <a
                    className={styles.navButton}
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer"
                >
                    Apri nel navigatore
                </a>
            )}
        </article>
    );
}
