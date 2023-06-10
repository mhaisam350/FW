import Link from 'next/link';
import styles from './Post.module.css';

export default function Post({ post }) {

    const bg = post.frontmatter.cover_image;

    return (
        <article className={styles.card}>
            
            <Link href={`/journal/${post.slug}`}>
                <a className={styles.link} >
                    <div className={styles['bg-container']} style={ {backgroundImage: `url(${bg})`} }>
                        <div className={styles['text-container']}>
                            <p className={styles.date}>{post.frontmatter.date}</p>
                            <h3 className={styles.title}>{post.frontmatter.title}</h3>
                        </div>
                    </div>
                </a>
            </Link>

        </article>
    )
}