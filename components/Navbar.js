import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faCartArrowDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const [isToggled, setIsToggled] = useState(false);
    const [background, setBackground] = useState(false);

    const toggleClass = isToggled ? styles['nav-show'] : styles['nav-hide'];
    const backgroundClass = background ? styles['header-background'] : styles['header-transparent'];

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setBackground(true);
        } else {
            setBackground(false);
        }

    }

    useEffect(() => {
        
            changeBackground();
            window.addEventListener("scroll", changeBackground)

    })
    
    return (
        <header className={styles['header'] + " " + styles['flex'] + " " + backgroundClass}>
            <Link href="/"><a className={styles['logo-link']}><img className={styles.logo} src="../logo-resize.png" alt="logo" /></a></Link>
        
            <button onClick={ () => setIsToggled(!isToggled)} className={styles['icon-button'] + " " + styles['nav-toggle-btn']} id={styles['ham-icon']}><FontAwesomeIcon icon={isToggled ? faXmark : faBars} /></button>

            <nav>
                <ul className={styles['pages-nav'] + " " + styles['flex'] + " " + toggleClass}>
                    <li className={styles['nav-item']}><Link href="/store"><a>Store</a></Link></li>
                    <li className={styles['nav-item']}><Link href="/journal"><a>Journal</a></Link></li>
                    <li className={styles['nav-item']}><Link href="/our-story"><a>Our Story</a></Link></li>
                    <li className={styles['nav-item']}><Link href="/contact"><a>Contact</a></Link></li>
                </ul>

                {/* <ul className={styles['icons-container']}>
                    <li className={styles['nav-item']}><Link href="/"><button className={styles['icon-button']}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></Link></li>
                    <li className={styles['nav-item']}><Link href="/"><FontAwesomeIcon icon={faCartArrowDown} /></Link></li>
                </ul> */}
            </nav>
        </header>
    );
}

export default Navbar;