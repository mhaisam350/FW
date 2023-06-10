import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar';

import styles from './StoreNav.module.css';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faCartArrowDown, faMagnifyingGlass, faL } from '@fortawesome/free-solid-svg-icons';

const StoreNav = () => {

    const [isToggled, setIsToggled] = useState(false);
    // const [background, setBackground] = useState(false);

    const toggleClass = isToggled ? styles['nav-show'] : styles['nav-hide'];
    // const backgroundClass = background ? styles['header-background'] : styles['header-transparent'];

    // const changeBackground = () => {
    //     if (window.scrollY >= 50) {
    //         setBackground(true);
    //     } else {
    //         setBackground(false);
    //     }

    // }

    // useEffect(() => {
        
    //         changeBackground();
    //         window.addEventListener("scroll", changeBackground)

    // })


    
    return (
        <header className={styles['header'] + " " + styles['flex']}>

            <ul className={styles['logo-container'] + " " + styles['flex']}>
                <li><Link href="/"><a className={styles['logo-link']}><img className={styles.logo} src="../logo-resize.png" alt="logo" /></a></Link></li>
                <li className={styles['nav-item'] + " " + styles['logo-item']}>|</li>
                <li className={styles['nav-item'] + " " + styles['logo-item']}><Link href="/store"><a className={styles['store-link']}>Store</a></Link></li>
            </ul>
            

            <nav className={styles['nav'] + " " + styles['flex']}>
                <ul className={styles['pages-nav'] + " " + styles['flex'] + " " + toggleClass}>
                    <li className={styles['nav-item']}><Link href="/store/category/parts"><a>Parts</a></Link></li>
                    <li className={styles['nav-item']}><Link href="/store/category/apparel"><a>Apparel</a></Link></li>
                    <li className={styles['nav-item']}><Link href="/store/category/lifestyle"><a>Lifestyle</a></Link></li>
                </ul>

                <ul className={styles['icon-container']}>
                    {/* <li className={styles['nav-item']}><Link href="/"><button className={styles['nav-icon']}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></Link></li> */}
                    <li className={styles['nav-item'] + " " + styles['nav-icon']} id={styles['cart-icon']}> <Sidebar /> </li>
                </ul>
            </nav>

            <button onClick={ () => setIsToggled(!isToggled)} className={styles['nav-icon'] + " " + styles['nav-toggle-btn']} id={styles['ham-icon']}><FontAwesomeIcon icon={isToggled ? faXmark : faBars} /></button>

        </header>
    );
}

export default StoreNav;