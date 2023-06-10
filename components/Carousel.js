import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import styles from './Carousel.module.css';

export const CarouselItem = ({ children, width, height, boxShadow, color, background }) => {
    return (
        <article className={styles['carousel-item']} style={ { width: width, height: height, boxShadow: boxShadow, color: color, backgroundImage: `url(${background})` }  } > 
            { children }
        </article>
    )
}

// function debounce(fn, ms) {

//     let timer
  
//     return _ => {
  
//       clearTimeout(timer)
  
//       timer = setTimeout(_ => {
  
//         timer = null
  
//         fn.apply(this, arguments)
  
//       }, ms)
  
//     };
  
//   }

const Carousel = ({ children, width, height, items, loop, autoplay, arrows, indicators, darkmode }) => {

    // console.log(width);

    const sliderContainerRef = useRef();

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [pixelWidth, setPixelWidth] = useState(undefined);

    // const [winWidth, setWinWidth] = useState(0);
    // const [width, setwidth] = useState(0);

    const [swipeStart, setSwipeStart] = useState(undefined);
    const [swiping, setSwiping] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);

    const slides = children.length;

    const nextSlide = () => {
        if (loop) {
            setCurrent(current === slides - items ? 0 : current + 1);
        } else {
            setCurrent(current === slides - items ? current : current + 1);
        }
        
        // Disable infinite scroll
    }

    const prevSlide = () => {
        if (loop) {
            setCurrent(current === 0 ? slides - 1 : current - 1);
        } else {
            setCurrent(current === 0 ? current : current - 1);
        }

        // Disable infinite scroll
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
    

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(() => {
                if (!paused) {
                    nextSlide();
                }
            }, 5000);
            
            return () => {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }
    })

    // useEffect(() => {

    //     const deb = debounce(function handleResize() {
    //         setWinWidth(window.innerWidth);
    //         console.log(winWidth);
    //     }, 1000)

    //     window.addEventListener('resize', deb);

    //     if (width !== '100') {
    //         if (winWidth > 1460) {
    //             setwidth(width);
    //         } else if (winWidth > 800) {
    //             setwidth(50);
    //         } else {
    //             setwidth(100)
    //         }
    //     }

    //     return _ => {
    //         window.removeEventListener('resize', deb);
    //     }

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
        if (distance <= -8) {
            nextSlide();
        } else if (distance >= 8) {
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
    const bgClass = darkmode ? styles['dark'] : styles['light'];
    const boxShadow = darkmode ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)" : "";
    const color = darkmode ? "#fff" : "#000";

   
    


    return (

        <main className={styles['carousel'] + " " + bgClass} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} ref={sliderContainerRef}>

            <div className={styles['inner'] + " " + transitionClass} onPointerDown={handlePointerStart} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerCancel} style={ { transform: `translateX(${-(current * width) + swipeDistancePercentage()}%)`} }>
                
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: `${width}%`, height: `${height}vh`, boxShadow: boxShadow, color: color });
                })}
            </div>

            
            <div className={styles.navigation}>
                { arrows && 
                <>
                    <button onClick={prevSlide} className={styles['arrow'] + " " + styles['prev-arrow']}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button onClick={nextSlide} className={styles['arrow'] + " " + styles['next-arrow']}><FontAwesomeIcon icon={faChevronRight} /></button>
                </>
                }
                
                <div className={styles['indicator-container']}>
                    { indicators && 
                        React.Children.map(children, (child, index) => {
                            return (
                                <button onClick={() => setCurrent(index)} className={`${index === current ? styles.active : ""}` + " " + styles.indicator}></button>
                            )
                        })
                    }
                </div>

            </div>
        </main>

    )

}

export default Carousel;