'use client';

import { useState } from 'react';
import styles from './Styles/SocialLinks.module.css';

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
);

export default function SocialLinks({ socials = {} }) {
    const [hoveredCard, setHoveredCard] = useState(null);

    const { instagram, tiktok } = socials;

    if (!instagram && !tiktok) {
        return null;
    }

    const socialData = [
        {
            id: 'instagram',
            name: 'Instagram',
            handle: instagram,
            url: instagram ? `https://instagram.com/${instagram.replace('@', '')}` : null,
            icon: InstagramIcon,
            gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            bgGlow: 'rgba(225, 48, 108, 0.4)',
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            handle: tiktok,
            url: tiktok ? `https://tiktok.com/@${tiktok.replace('@', '')}` : null,
            icon: TikTokIcon,
            gradient: 'linear-gradient(45deg, #00f2ea 0%, #ff0050 100%)',
            bgGlow: 'rgba(0, 242, 234, 0.4)',
        },
    ].filter(s => s.handle);

    return (
        <section className={styles.socialLinks}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Seguici sui social</p>
                <h2 className={styles.title}>Resta aggiornato con noi</h2>
                <p className={styles.subtitle}>
                    Non perderti i momenti migliori, dietro le quinte e tutte le novità della competizione.
                </p>
            </div>

            <div className={styles.cardsContainer}>
                {socialData.map((social) => (
                    <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.card}
                        onMouseEnter={() => setHoveredCard(social.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                            '--card-gradient': social.gradient,
                            '--card-glow': social.bgGlow,
                        }}
                    >
                        <div className={styles.cardGlow} />
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}>
                                <social.icon />
                            </div>
                            <div className={styles.cardInfo}>
                                <span className={styles.platformName}>{social.name}</span>
                                <span className={styles.handle}>{social.handle}</span>
                            </div>
                            <div className={styles.cardArrow}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                        <div
                            className={`${styles.hoverEffect} ${hoveredCard === social.id ? styles.active : ''}`}
                        />
                    </a>
                ))}
            </div>
        </section>
    );
}
