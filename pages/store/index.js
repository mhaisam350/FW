import { storefront } from '../../utils';

import StoreNav from '../../components/StoreNav';
// import MainCarousel, { CarItem } from '../../components/MainCarousel';
// import ProductSlider, { SliderItem } from '../../components/ProductSlider';
import Carousel, { CarouselItem } from '../../components/Carousel';
import Footer from '../../components/Footer';

import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/Store.module.css';


export default function Store({ products }) {
    // console.log(products);
    // console.log(process.env.NEXT_PUBLIC_SHOPIFY_API_URL);

    return (

        <>
            
            <Head>
                <title>Store - Frontwheel</title>
            </Head>

            <StoreNav />


            {/* <MainCarousel>
              <CarItem background={'/carousel1.jpg'}>Item 1</CarItem>
              <CarItem background={'/helmet-bike.jpg'}>Item 2</CarItem>
              <CarItem background={'/harley-banner.jpg'}>Item 3</CarItem>
            </MainCarousel> */}

            <Carousel width={'100'} height={'100'} items={1} loop={true} autoplay={true} arrows={false} indicators={true} darkmode={true}>
              <CarouselItem background={'/carousel1.jpg'}>
                <div className={styles['grid-container']}>
                  <div className={styles['carousel-text']}>
                    <h2 className={styles['carousel-subtitle']}>Image Subtitle</h2>
                    <h1 className={styles['carousel-title']}>Image Title</h1>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem background={'/helmet-bike.jpg'}>
              <div className={styles['grid-container']}>
                  <div className={styles['carousel-text']}>
                    <h2 className={styles['carousel-subtitle']}>Image Subtitle</h2>
                    <h1 className={styles['carousel-title']}>Image Title</h1>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem background={'/harley-banner.jpg'}>
              <div className={styles['grid-container']}>
                  <div className={styles['carousel-text']}>
                    <h2 className={styles['carousel-subtitle']}>Image Subtitle</h2>
                    <h1 className={styles['carousel-title']}>Image Title</h1>
                  </div>
                </div>
              </CarouselItem>
            </Carousel>

{/* 
            <section className={styles['discover-container']}>

              <div className={styles['discover-text']}>
                <h2 className={styles['discover-title']}>Section Title</h2>
                <p className={styles['discover-paragraph']}>Maecenas enim erat, blandit se sadsd asda sad asdasads das sadsd asd sadas asdasd dsadsd ligula vel, ultricies pulvinar tellus. Mauris id interdum elit. In hac habitasse platea dictumst. </p>
                <button className={styles['discover-button']}>Discover</button>
              </div>

              <div className={styles['discover-subcontainer']}>
                <img src={'/gear.jpg'} className={styles['discover-image']}/>
              </div>

            </section> */}

            <section className={styles['categories-container']}>

              <div className={styles['categories-subcontainer']}>

                <Link href='/store/category/parts'>
                  <a className={styles['category-article'] + ' ' + styles['parts-article']}>
                    <article className={styles['category-content']} id={styles['parts-content']}>
                        <h3 className={styles['category-title']}>Parts</h3>
                        <p className={styles['category-text']}>Maecenas enim erat, blandit se sadsd asda sad asdasads das sadsd asd sadas 
                        asdasd dsadsd ligula vel, ultricies pulvinar tellus. </p>
                        <button className={styles['category-btn']}>Discover Now</button>
                    </article>
                  </a>
                </Link>

                <Link href='/store/category/apparel'>
                  <a className={styles['category-article'] + ' ' + styles['apparel-article']}>
                    <article className={styles['category-content']}>
                        <h3 className={styles['category-title']}>Apparel</h3>
                        <p className={styles['category-text']}>Maecenas enim erat, blandit se sadsd asda sad asdasads das sadsd asd sadas 
                        asdasd dsadsd ligula vel, ultricies pulvinar tellus. </p>
                        <button className={styles['category-btn']}>Discover Now</button>
                    </article>
                  </a>
                </Link>

                <Link href='/store/category/lifestyle'>
                  <a className={styles['category-article'] + ' ' + styles['lifestyle-article']}>
                    <article className={styles['category-content']}>
                        <h3 className={styles['category-title']}>Lifestyle</h3>
                        <p className={styles['category-text']}>Maecenas enim erat, blandit se sadsd asda sad asdasads das sadsd asd sadas 
                        asdasd dsadsd ligula vel, ultricies pulvinar tellus. </p>
                        <button className={styles['category-btn']}>Discover Now</button>
                    </article>
                  </a>
                </Link>

              </div>

            </section>

            <Footer />

            {/* <section>

              <h1>Products</h1>
                <Link href={'/store/cart'}>
                  <a>
                    <button>Cart</button>
                  </a>
                </Link>

                <div>

                    {products.edges.map((item) => {

                        const product = item.node;
                        const image = product.images.edges[0].node;

                        return (
                            <div className={styles.container}>
                                <Link key={product.handle} href={`/store/products/${product.handle}`}>
                                    <a>

                                        <div>
                                            <img src={image.url} alt={image.altText} />
                                        </div>

                                        <div>
                                            <h3>{product.title}</h3>
                                            <p>{product.priceRange.minVariantPrice.amount}</p>
                                            <p>{product.tags[0]}</p>
                                        </div>

                                    </a>
                                </Link>
                            </div>
                        )
                    })}

                </div>

            </section> */}

        </>

    )

}

// export async function getStaticProps() {

//     const { data } = await storefront(productsQuery);
//     // console.log(data);

//     return {
//         props: {
//             products: data.products,
//         },
//     }

// }

// const productsQuery = `

// query Products {
//     products(first: 15) {
//       edges {
//         node {
//           title
//           handle
//           tags
//           priceRange {
//             minVariantPrice {
//               amount
//             }
//           }
//           images(first: 1) {
//             edges {
//               node {
//                 url(transform: {
//                   maxWidth: 200
//                 })
//                 altText
//               }
//             }
//           }
//         }
//       }
//     }
//   }  
//   `;