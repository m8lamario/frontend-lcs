import Image from 'next/image';
import EmptyState from './EmptyState';
import './Styles/LocalPartners.css';

const fallbackLogo = '/logo/lcs-colorato-trasparente.png';

export default function LocalPartners({ partners = [] }) {
    if (!Array.isArray(partners) || partners.length === 0) {
        return (
            <EmptyState
                title="Nessun partner locale"
                description="Stiamo lavorando per coinvolgere nuove realtà sul territorio. Torna presto per scoprire chi supporterà la competizione."
                action={{ label: 'Richiedi informazioni', href: '/#contatti' }}
                align="left"
            />
        );
    }

    return (
        <section className="local-partners">
            <div className="local-partners__header">
                <p className="local-partners__eyebrow">Partnership locali</p>
                <h2 className="local-partners__title">Insieme per crescere il movimento scolastico</h2>
                <p className="local-partners__subtitle">Sponsor e istituzioni che sostengono il torneo con servizi, visibilità e iniziative sul territorio.</p>
            </div>
            <div className="local-partners__grid">
                {partners.map((partner) => (
                    <a
                        key={partner.id}
                        href={partner.url || '#'}
                        className="local-partner-card"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visita ${partner.name}`}
                    >
                        <div className="local-partner-card__logo">
                            <Image
                                src={partner.logo || fallbackLogo}
                                alt={partner.name}
                                width={64}
                                height={64}
                            />
                        </div>
                        <div className="local-partner-card__meta">
                            <span className="local-partner-card__type">{partner.type}</span>
                            <strong className="local-partner-card__name">{partner.name}</strong>
                        </div>
                        <div className="local-partner-card__cta">Scopri</div>
                    </a>
                ))}
            </div>
        </section>
    );
}
