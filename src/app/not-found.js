import Link from 'next/link';
import AnimatedTitle from '@/components/AnimatedTitle';
import EmptyState from '@/components/EmptyState';
import './globals.css';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Pagina non trovata — LCS'
};

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <AnimatedTitle text="404" className={styles.code} />
        <p className={styles.caption}>Pagina non trovata</p>
      </div>
      <EmptyState
        title="Oops, non c'è nulla qui"
        description="Il contenuto che stavi cercando potrebbe essere stato spostato o non esiste più. Usa i collegamenti sottostanti per continuare la navigazione."
        className={styles.panel}
        size="large"
      >
        <div className={styles.actions}>
          <Link href="/" className={styles.linkPrimary}>Vai alla home</Link>
          <Link href="/competitions" className={styles.linkGhost}>Esplora le competizioni</Link>
        </div>
      </EmptyState>
    </div>
  );
}

