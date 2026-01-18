import { getPostData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import styles from './blog.module.css';

export default async function BlogPostPage({ params }) {
    const { city, blog: slug } = params;

    try {
        const postData = await getPostData(slug);

        if (postData.city?.toLowerCase() !== city.toLowerCase()) {
            notFound();
        }

        const formattedDate = postData.date
            ? new Date(postData.date).toLocaleDateString('it-IT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
              })
            : null;

        return (
            <section className={styles.page}>
                <article className={styles.article}>
                    <header className={styles.hero}>
                        <div className={styles.heroContent}>
                            <p className={styles.eyebrow}>{(postData.city ?? city).toUpperCase()}</p>
                            <h1 className={styles.title}>{postData.title}</h1>
                            {postData.subtitle && (
                                <p className={styles.subtitle}>{postData.subtitle}</p>
                            )}
                            <div className={styles.meta}>
                                {postData.author && <span>{postData.author}</span>}
                                {postData.author && formattedDate && (
                                    <span className={styles.metaDivider} aria-hidden="true">
                                        ·
                                    </span>
                                )}
                                {formattedDate && <span>{formattedDate}</span>}
                            </div>
                            {postData.tags?.length > 0 && (
                                <ul className={styles.tags}>
                                    {postData.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {postData.image && (
                            <div className={styles.heroMedia}>
                                <img
                                    src={postData.image}
                                    alt={postData.title}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        )}
                    </header>
                    <div className={styles.bodyCard}>
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                        />
                    </div>
                </article>
            </section>
        );
    } catch (e) {
        console.error(e);
        notFound();
    }
}
