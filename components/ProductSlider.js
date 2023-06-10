import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import styles from './ProductSlider.module.css';


export const SliderItem = ({ children, width }) => {
    return (
        <article className={styles['carousel-item']} style={ { width: width }  } > 
            { children }
        </article>
    )
}

const ProductSlider = ({ children }) => {

    const sliderContainerRef = useRef();

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [pixelWidth, setPixelWidth] = useState(undefined);

    const [swipeStart, setSwipeStart] = useState(undefined);
    const [swiping, setSwiping] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);

    const slides = children.length;
    
    // const updateIndex = (newIndex) => {

    //     if (newIndex < 0) {
    //         newIndex = 0;
    //     } else if (newIndex >= slides) {
    //         newIndex = slides - 1;
    //     }

    //     setCurrent(newIndex);

    // }

    const nextSlide = () => {
        // setCurrent(current === slides - 1 ? 0 : current + 1);
        
        // Disable infinite scroll
        setCurrent(current === slides - 3 ? current : current + 1);
    }

    const prevSlide = () => {
        // setCurrent(current === 0 ? slides - 1 : current - 1);

        // Disable infinite scroll
        setCurrent(current === 0 ? current : current - 1);
    }

    const getSliderWidth = () => {
        const newWidth = sliderContainerRef.current.clientWidth;
        setPixelWidth(newWidth);
    }

    const swipeDistancePercentage = () => {
        return (swipeDistance / pixelWidth) * 100;
    }


    useEffect(() => {
        getSliderWidth();
        // console.log(pixelWidth);
    }, [swiping])
    

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!paused) {
    //             nextSlide();
    //         }
    //     }, 5000);
        
    //     return () => {
    //         if (interval) {
    //             clearInterval(interval);
    //         }
    //     };
    // })


    const handlePointerStart = (e) => {
        // console.log(e)
        // If multiple touches
        if (e.button !== 0 || !e.isPrimary) return;

        // If not a touch on slider
        // if (!e.target.matches(`[${this.config.attr}], [${this.config.attr}] *`)) return;

        setSwipeStart(e.screenX);
        // console.log(swipeStart);
        setSwiping(true);
        // console.log(touchStart);
    }

    const handlePointerMove = (e) => {
        // if (e.buttons === 1) {console.log(e);}
        // console.log(e);
        if (e.buttons !== 1 || !swiping || !e.isPrimary) return;

        // console.log(swipeStart);
        setSwipeDistance(e.screenX - swipeStart);
        // console.log(swipeDistance);

    }

    const handlePointerEnd = (e) => {

        const distance = swipeDistancePercentage();

         // change values for smaller widths
        if (distance <= -7) {
            nextSlide();
        } else if (distance >= 7) {
            prevSlide();
        }
        
        setSwiping(false);
        setSwipeDistance(0);

        // console.log(swipeDistance);
        // console.log(distance);

    }

    const handlePointerCancel = (e) => {

        setSwiping(false);
        setSwipeDistance(0);

    }

    const transitionClass = swiping ? styles[''] : styles['transition'] ;


    return (

        <main className={styles.carousel} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} ref={sliderContainerRef}>

            <div className={styles['inner'] + " " + transitionClass} onPointerDown={handlePointerStart} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerCancel} style={ { transform: `translateX(${-(current * 33.3) + swipeDistancePercentage()}%)` } }>
                
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "33.3%" });
                })}
            </div>

            <div className={styles.indicators}>
                <button onClick={prevSlide} className={styles.indicator}><FontAwesomeIcon icon={faChevronLeft} /></button>

                <button onClick={nextSlide} className={styles.indicator}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>

        </main>

    )

}

export default ProductSlider;