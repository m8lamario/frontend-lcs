'use client';

import { useState } from 'react';
import styles from './Styles/StaffSection.module.css';

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
);

export default function StaffSection({ staff = [] }) {
    const [hoveredMember, setHoveredMember] = useState(null);

    if (!Array.isArray(staff) || staff.length === 0) {
        return null;
    }

    // Trova il responsabile dello staff
    const leader = staff.find(member => member.isLeader);
    const teamMembers = staff.filter(member => !member.isLeader);

    const getInstagramUrl = (handle) => {
        if (!handle) return null;
        return `https://instagram.com/${handle.replace('@', '')}`;
    };

    return (
        <section className={styles.staffSection}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Il nostro team</p>
                <h2 className={styles.title}>Lo staff della competizione</h2>
                <p className={styles.subtitle}>
                    Le persone che rendono possibile ogni partita, ogni evento e ogni momento speciale.
                </p>
            </div>

            {/* Responsabile Staff */}
            {leader && (
                <div className={styles.leaderSection}>
                    <div className={styles.leaderCard}>
                        <div className={styles.leaderGlow} />
                        <div className={styles.leaderBadge}>
                            <StarIcon />
                            <span>Responsabile Staff</span>
                        </div>
                        <div className={styles.leaderContent}>
                            <div className={styles.leaderAvatar}>
                                <UserIcon />
                            </div>
                            <div className={styles.leaderInfo}>
                                <span className={styles.leaderRole}>{leader.role}</span>
                                {leader.instagram && (
                                    <a
                                        href={getInstagramUrl(leader.instagram)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.leaderInstagram}
                                    >
                                        <InstagramIcon />
                                        <span>{leader.instagram}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className={styles.joinCta}>
                            <p className={styles.joinText}>
                                Vuoi entrare a far parte dello staff? Contatta il responsabile!
                            </p>
                            {leader.instagram && (
                                <a
                                    href={getInstagramUrl(leader.instagram)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.joinButton}
                                >
                                    Contatta su Instagram
                                    <ArrowIcon />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Membri dello Staff */}
            {teamMembers.length > 0 && (
                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.id || index}
                            className={styles.memberCard}
                            onMouseEnter={() => setHoveredMember(index)}
                            onMouseLeave={() => setHoveredMember(null)}
                        >
                            <div className={`${styles.memberGlow} ${hoveredMember === index ? styles.active : ''}`} />
                            <div className={styles.memberAvatar}>
                                <UserIcon />
                            </div>
                            <div className={styles.memberInfo}>
                                <span className={styles.memberRole}>{member.role}</span>
                                {member.instagram && (
                                    <a
                                        href={getInstagramUrl(member.instagram)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.memberInstagram}
                                    >
                                        <InstagramIcon />
                                        <span>{member.instagram}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
