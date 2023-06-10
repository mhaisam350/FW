import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Contact.module.css';
import Link from 'next/link';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Contact - Frontwheel</title>
                <meta name="description" content="FW Contact" />
            </Head>

            <Navbar />

            <section className={styles['contact-container']}>4
                <h1 className={styles.heading}>Get in touch</h1>
                <article className={styles['contact-subcontainer']}>
                    <article className={styles['contact-article']}>
                        <h2 className={styles['article-heading']}>Opening hours</h2>
                        <p className={styles['article-text']}>Monday - Friday</p>
                        <p className={styles['article-text']}>9am - 5pm</p>
                    </article>
                    <article className={styles['contact-article']}>
                        <h2 className={styles['article-heading']}>Address</h2>
                        <p className={styles['article-text']}>Address Line 1</p>
                        <p className={styles['article-text']}>Address Line 2</p>
                    </article>
                    <article className={styles['contact-article']}>
                        <h2 className={styles['article-heading']}>Support</h2>
                        <p className={styles['article-text']}>Phone</p>
                        <p className={styles['article-text']}>Email</p>
                    </article>
                    <article className={styles['contact-article']}>
                        <button className={styles['contact-icon']}><Link href="/"><a><FontAwesomeIcon className={styles['social-icon']} icon={faFacebook} /></a></Link></button>
                        <button className={styles['contact-icon']}><Link href="/"><a><FontAwesomeIcon className={styles['social-icon']} icon={faInstagram} /></a></Link></button>
                    </article>
                </article>
            </section>

            {/* <Footer /> */}

        </div>
    )
}