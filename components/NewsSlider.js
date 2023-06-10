import React, { useState } from 'react'
import styles from './NewsSlider.module.css'

const NewsSlider = () => {

    return (
        <section className={styles['news-section']}>
            <div className={styles['news-container']}>

                <img src="../news1.jpg" alt="Bike" className={styles['news-image']}></img>
                
                <h3 className={styles['news-title']}>News Title</h3>
                <p className={styles['news-text']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Phasellus ac porttitor augue. Fusce tempor dolor elit, non posuere enim fermentum eu. 
                Suspendisse fermentum, velit eu varius interdum, nisi sem posuere risus, a pellentesque elit urna non velit. 
                Vivamus eu erat facilisis ante faucibus vehicula eget in nunc.</p>
            
            </div>
        </section>
    );
}

export default NewsSlider;