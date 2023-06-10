import styles from './Footer.module.css';
import Link from 'next/link';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import {  faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles['footer-text']}><FontAwesomeIcon className={styles['copyright-icon']} icon={faCopyright} />FrontWheel 2022 |</p>
            <ul className={styles['footer-list']}>
                <li className={styles['footer-link']}><Link href="/"><a>Terms and Conditions</a></Link></li>
                <li className={styles['footer-link']}><Link href="/"><a>Privacy Policy</a></Link></li>
                <li className={styles['footer-link']}><Link href="/"><a>Cookie Policy</a></Link></li>
            </ul>
            <ul className={styles['icon-list']}>
                <li className={styles['footer-icon']}><Link href="/"><a><FontAwesomeIcon className={styles['social-icon']} icon={faFacebook} /></a></Link></li>
                <li className={styles['footer-icon']}><Link href="/"><a><FontAwesomeIcon className={styles['social-icon']} icon={faInstagram} /></a></Link></li>
            </ul>
        </footer>
    );
}

export default Footer;