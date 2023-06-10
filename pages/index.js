import Head from 'next/head';
import Navbar from '../components/Navbar';
// import NewsSlider from '../components/NewsSlider'
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import {  faCopyright, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>FrontWheel Motors</title>
        <meta name="description" content="FW Homepage" />
      </Head>

      <Navbar />

      <main className={styles.hero}>
        <div className={styles['heading-container']}>
          <h1 className={styles.heading}>FrontWheel Motors</h1>
          <h2 className={styles.subheading}>Placeholder Subheading</h2>
        </div>
        <div className={styles['links-container']}>
          <Link href='/our-story'><a className={styles['hero-link']} id={styles['main-link1']}>Our Story</a></Link>
          {/* <hr className={styles.divider}></hr> */}
          <Link href='/contact'><a className={styles['hero-link']} id={styles['main-link2']}>Contact</a></Link>
        </div>
        <footer className={styles.footer}>
          <ul className={styles['footer-list']}>
            <li className={styles['footer-item']}><FontAwesomeIcon className={styles['copyright-icon']} icon={faCopyright} />2022 FrontWheel</li>
            <li className={styles['footer-item']}>|</li>
            <li className={styles['footer-item']}><Link href="/"><a><FontAwesomeIcon className={styles['social-icon']} icon={faFacebook} /></a></Link></li>
            <li className={styles['footer-item']}><Link href="/"><a><FontAwesomeIcon className={styles['social-icon']} icon={faInstagram} /></a></Link></li>
          </ul>
          {/* <FontAwesomeIcon className={styles['social-icon']} icon /> */}
        </footer>
      </main>

      {/* <section className={styles['featured-product']}>
        <h3 className={styles['product-title']}>Featured Product</h3>
        <p className={styles['product-description']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nullam malesuada aliquet porta. Maecenas nulla nulla, elementum vehicula malesuada nec, 
        interdum eu purus. Mauris orci urna, fringilla vitae cursus et, condimentum varius nisi. 
        Donec eleifend risus sit amet ex imperdiet viverra. Quisque ut tristique felis.</p>
        <img src="../featured1.jpeg" alt="Featured product" className={styles['product-image']}></img> 
      </section> */}

      <section className={styles['dual-panels']}>
      <Link href='/journal'>
        <a className={styles['panel-link']}>
          <div className={styles['panel'] + " " + styles['pseudo-hover']} id={styles['store-container']}>
            <div className={styles.center}>
              <h3 className={styles['panel-title']}>FW Journal</h3>
              <p className={styles['panel-text']}>Read More</p>
              <FontAwesomeIcon className={styles['panel-icon']} icon={faCircleChevronRight} />
            </div>
          </div>
        </a>
      </Link>
      <Link href='/store'>
        <a className={styles['panel-link']}>
          <div className={styles['panel'] + " " + styles['pseudo-hover']} id={styles['journal-container']}>
            <div className={styles.center}>
              <h3 className={styles['panel-title']}>Store</h3>
              <p className={styles['panel-text']}>Shop Now</p>
              <FontAwesomeIcon className={styles['panel-icon']} icon={faCircleChevronRight} />
            </div>
          </div>
        </a>
      </Link>
      </section>

      {/* <NewsSlider /> */}

    

    </div>
  )
}
