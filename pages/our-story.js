import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Head from 'next/head';

import styles from '../styles/OurStory.module.css';

export default function OurStory() {
    return (
        
        <>
            <Head>
                <title>Our Story - FrontWheel</title>
                <meta name="description" content="FW Our Story" />
            </Head>
            
            <Navbar />

            <section className={styles.container}>

                <section className={styles['story-container']}>
                
                    <div className={styles['heading-container']}>

                        <h1 className={styles.heading}>Our Story</h1>

                        <h2 className={styles.subheading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vivamus eget condimentum quam, at blandit mauris. 
                            Praesent ac tristique risus. 
                            Pellentesque iaculis velit et massa ornare finibus.
                        </h2>

                        <div className={styles['flex-container']}>

                            <article className={styles['story-article']}>
                                <h3 className={styles['article-title']}>Vivamus nunc turpis</h3>
                                <p>
                                Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                                Pellentesque ultrices id mauris ac dictum. Phasellus nec sem ex. 
                                Nulla enim purus, condimentum at tempor nec, efficitur non ipsum
                                </p>
                            </article>
                            
                            <article className={styles['story-article']}>
                                <h3 className={styles['article-title']}>Vivamus nunc turpis</h3>
                                <p>
                                Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                                Pellentesque ultrices id mauris ac dictum. Phasellus nec sem ex. 
                                Nulla enim purus, condimentum at tempor nec, efficitur non ipsum
                                </p>
                            </article>

                        </div>

                        <div className={styles['flex-container']}>

                            <article className={styles['story-article']}>
                                <h3 className={styles['article-title']}>Vivamus nunc turpis</h3>
                                <p>
                                Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                                Pellentesque ultrices id mauris ac dictum. Phasellus nec sem ex. 
                                Nulla enim purus, condimentum at tempor nec, efficitur non ipsum
                                </p>
                            </article>
                            
                            <article className={styles['story-article']}>
                                <h3 className={styles['article-title']}>Vivamus nunc turpis</h3>
                                <p>
                                Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                                Pellentesque ultrices id mauris ac dictum. Phasellus nec sem ex. 
                                Nulla enim purus, condimentum at tempor nec, efficitur non ipsum
                                </p>
                            </article>

                        </div>
                    
                    </div>

                    <div className={styles['image']}></div>

                </section>

                <section className={styles['team-container']}>

                    <h2 className={styles['team-heading']}>Our Team</h2>

                    <div className={styles['team-grid']}>

                        <article className={styles['team-article']}>
                            <h3 className={styles['article-title']}>First Name</h3>
                            <p>
                            Suspendisse potenti Donsadad sdasdd sas asda dsa dec eu odio dui. Vivamus non ex tortor. 
                            Pellentesque ultrices iasdaadsadsaddsad mauris ac dictum. 
                            </p>
                        </article>
                            
                        <article className={styles['team-article']}>
                            <h3 className={styles['article-title']}>First Name</h3>
                            <p>
                            Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                            Pellentesque ultrice dictum. Phasellus nec sem ex. 
                            Nulla enim purus, condimentum at tempor nec, efficitur non ipsum
                            </p>
                        </article>

                        <article className={styles['team-article']}>
                            <h3 className={styles['article-title']}>First Name</h3>
                            <p>
                            Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                            Pellentesque ultrices id mauris ac dictum. Phasellus nec sem ex. 
                            Nulla enim purus, condimentum at ton ipsum
                             </p>
                        </article>

                        <article className={styles['team-article']}>
                            <h3 className={styles['article-title']}>First Name</h3>
                            <p>
                            Suspendisse potenti. Donec eu odio dui. Vivamus non ex tortor. 
                            Pellens nec sem ex. 
                            Nulla enim purus, condimentum at tempor nec, efficitur non ipsum
                            </p>
                        </article>

                    </div>

                </section>

            </section>

            <Footer />

        </>

    )
}