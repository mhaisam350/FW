import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {marked} from 'marked';

import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'

import styles from '../../styles/PostPage.module.css';

export default function PostPage( {frontmatter: {title, date, cover_image}, slug, content} ) {
    return (

        <div className={styles.container}>

            <Head>
                <title>{title} - Frontwheel</title>
            </Head>

            <Navbar />

            <div className={styles.spacer}>
                
            </div>
            
            <article className={styles['post-container']}>

                <div className={styles['link-container']}>
                    <Link href='/journal'><a><p className={styles['journal-link']}>Journal</p></a></Link>
                    <p className={styles['post-name']}> / {title}</p>
                </div>
                

                <p className={styles.date}>{date}</p>
                <h1 className={styles.title}>{title}</h1>
                <img src={cover_image} alt="" className={styles.image} />
                <p className={styles.content} dangerouslySetInnerHTML={{__html: marked(content)}}></p>

            </article>

            <Footer />

        </div>

    )
}

export async function getStaticPaths() {

    const files = fs.readdirSync(path.join('posts'));

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }));
    
    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({params: {slug}}) {

    const mdWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');

    const {data: frontmatter, content} = matter(mdWithMeta);

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }

}