import { useState, useEffect } from 'react';

import { useAppContext } from '../context/state';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCartShopping} from '@fortawesome/free-solid-svg-icons';

import Cart from './Cart';

import styles from './Sidebar.module.css';

export default function Sidebar() {

    // const [isToggled, setIsToggled] = useState(false);
    const { isToggled, setIsToggled } = useAppContext();

    const displayClass = isToggled ? styles['show'] : styles['hide'];
    const iconClass = isToggled ? styles['icon-dark'] : styles['icon-light'];



    const toggleControl = (value) => {

        setIsToggled(value);

    }
    
    const overlayControl = (e) => {

        if (e.target.id === 'overlay-container') {
            setIsToggled(false);
        }
    }

    useEffect(() => {

        isToggled ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";

        // const overlayContainer = document.getElementById('overlay-container');

        // if (isToggled) {overlayContainer.scroll(0, 0);}

    }, [isToggled])

    return (
        <>

            <button className={styles['icon'] + " " + iconClass} onClick={(event) => setIsToggled(!isToggled)}><FontAwesomeIcon icon={ isToggled ? faXmark : faCartShopping} /></button>
            
            <div className={styles['container'] + " " + displayClass} onClick={overlayControl} id={'overlay-container'} > 

                <aside className={styles['cart-container']} >

                    <Cart />

                </aside>

            </div>
                

        </>
    )

}