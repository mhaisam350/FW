import { useState } from 'react';

import { formatPrice } from '../utils';

import Link from 'next/link';

import styles from './Product.module.css';

export default function Product( { product } ) {

    const image = product.images.edges;
    // console.log(image);

    const [background, setBackground] = useState(image[0].node.url);

    return (

        <article className={styles.product} onMouseEnter={ () => setBackground(image[1].node.url) } onMouseLeave={ () => setBackground(image[0].node.url) }>

            <Link key={product.handle} href={`/store/products/${product.handle}`}>
                <a>
                                
                    <div className={styles['image-container']} style={ {backgroundImage: `url("${background}")`} }>

                    </div>

                    <div className={styles['text-container']}>
                        <h3 className={styles['product-name']}>{product.title}</h3>
                        {/* <h3>{product.handle}</h3> */}
                        <p className={styles['product-price']}>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
                        {/* <p>{product.tags[0]}</p> */}
                    </div>

                </a>
            </Link>

        </article>

    )

}
