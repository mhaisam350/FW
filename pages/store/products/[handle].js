import { storefront } from '../../../utils';
// import { createCartWithItem } from '../../../utils/createCart';
import { addItemToCart } from '../../../utils/addItemToCart';
import { formatPrice } from '../../../utils';

import { useState, useEffect } from 'react';

import { useAppContext } from '../../../context/state';

import StoreNav from '../../../components/StoreNav';
import Carousel, { CarouselItem } from '../../../components/Carousel';
import OptionsForm from '../../../components/OptionsForm';
import QuantityForm from '../../../components/QuantityForm';
import Footer from '../../../components/Footer';

import Head from 'next/head';
import Link from 'next/link';

import styles from '../../../styles/ProductPage.module.css';



export default function ProductPage({ product }) {

    // console.log(product);
    // console.log(product.options);
    
    const images = product.images.edges;
    // console.log(images[0]);
    // const options = product.options;
    
    // console.log(options);

    // const variantId = product.variants.edges[1].node.id;

    // let vars = product.variants.edges;

    const variantOptions = product.variants.edges?.map(variant => {

        const options = {};

        variant.node.selectedOptions.map(item => {
            options[item.name] = item.value;
        });

        return {
            id: variant.node.id,
            title: product.title,
            options: options,
            variantTitle: variant.node.title,
            variantImage: variant.node.image.url,
            variantPrice: variant.node.priceV2.amount,
            variantQuantity: variant.node.quantityAvailable
        };

    });

    const defaultValues = {};
    product.options.map(item => {
        defaultValues[item.name] = item.values[0];
    })

    

    // console.log(defaultValues);
    // console.log(variantOptions);
    
    const [selectedVariant, setSelectedVariant] = useState(variantOptions[0].id);
    const [selectedOptions, setSelectedOptions] = useState(defaultValues);
    const [variantImage, setVariantImage] = useState(variantOptions[0].variantImage);
    // const [chosenVariant, setChosenVariant] = useState(vars[0].node.id);
    const [quantityAvailable, setQuantityAvailable] = useState(variantOptions[0].variantQuantity)
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState('');

    const { cartId, setCartId, setIsToggled } = useAppContext();


    function optionsSet(name, value) {
        setSelectedOptions(prevState => {
            return { ...prevState, [name]: value }
        });
    }

    function quantitySet(quantity) {
        setQuantity(parseInt(quantity));
    }

    // console.log(selectedOptions);
    // console.log(selectedVariant);
    // console.log(quantityAvailable);

    // Change selected variant by matching Option values
    useEffect(() => {

        let matchingVariant = variantOptions.filter(variant => JSON.stringify(Object.values(variant.options)) === JSON.stringify(Object.values(selectedOptions)));
        // console.log(matchingVariant);
        setSelectedVariant(matchingVariant[0].id);
        setQuantityAvailable(matchingVariant[0].variantQuantity);
        setVariantImage(matchingVariant[0].variantImage);

    }, [selectedOptions]);

    

    // Import checkout function from elsewhere
    async function checkout() {
        // console.log(selectedVariant);
        const { data }  = await storefront(checkoutMutation, { selectedVariant, quantity });
        // console.log(data);
        const { webUrl } = data.checkoutCreate.checkout;
        window.location.href = webUrl;

    }
    
    
    const handleAddToCart = async () => {

        // let data = window.localStorage.getItem('CART_ID');
        // if ( data !== null ) {
        //     // console.log(data);
        //     setCartId(JSON.parse(data));
        // }

        console.log('--- Adding to cart ---');

        // let data = window.localStorage.getItem('CART');
        
        // if ( data !== null ) {
        //     // console.log(data);
        //     setCartId(JSON.parse(data));
        // }

        // console.log(cartId);

        const localCart = JSON.parse(window.localStorage.getItem('CART')).cart.cartId;
        
        if ( localCart === cartId) {

            const addToCartResponse = await addItemToCart(localCart, selectedVariant, quantity);

            // let data = addToCartResponse;

            setIsToggled(true);

            window.localStorage.setItem('CART_STATUS', 'dirty');

            // console.log(addToCartResponse);

            // console.log(cartId);

            return;

        } else {
            console.error('Error loading cart');
            return;
        }
        

    }


    return (

        <div className={styles.container}>
            
            <Head>
                <title>{product.title} - Frontwheel</title>
            </Head>

            <StoreNav />

            <section className={styles['product-grid']}>

                <div className={styles['image-container']}>
                    
                    {/* <img src={variantImage} /> */}
                    <Carousel width={'100'} height={'100'} items={1} loop={true} autoplay={false} arrows={true} indicators={false} darkmode={false}>
                    {
                        images.map( image => (
                            <CarouselItem background={image.node.url}></CarouselItem>
                        ))
                    }
                    </Carousel>

                </div>

                <div className={styles['text-container']}>

                    <div className={styles['title-container']}>
                        <h1 className={styles['product-title']}>{product.title}</h1>
                        <p className={styles['product-price']}>{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
                    </div>

                    <p className={styles['product-description']}>{product.description}</p>


                    { 
                        product.options.map( ({ name, values }) => (
                            
                            <OptionsForm key={`key-${name}`} name={name} values={values} selectedOptions={selectedOptions} optionsSet={optionsSet} quantitySet={quantitySet} />
                        )) 
                    }

                    {quantityAvailable > 0 ? (

                        <>
                            <QuantityForm quantity={quantity} maxQuantity={quantityAvailable} quantitySet={quantitySet} />
                            
                            <div className={styles['button-container']}>
                                <button onClick={handleAddToCart} className={styles['purchase-btn']} id={styles['add-to-cartId-btn']}>Add to Cart</button>
                                <button onClick={checkout} className={styles['purchase-btn']} id={styles['buy-now-btn']}>Buy Now</button>
                            </div>

                        </>
                    ) : (

                        <button className={styles['purchase-btn']} id={styles['out-of-stock-btn']} disabled>
                            Out of Stock
                        </button>
                        
                    )}

                </div>

            </section>


            <Footer />

        </div>

    )

}


export async function getStaticPaths() {
    
    const { data } = await storefront(`
        {
            products(first: 20) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }
    `);

    return {
        paths: data.products.edges.map((product) => ({ params: { handle: product.node.handle } })),
        fallback: false,
    }
}


export async function getStaticProps( {params} ) {

    // console.log(params.handle);

    const { data } = await storefront(singleProductQuery, { handle: params.handle } );

    return {
        props: {
            product: data.product,
        }
    }

}


const singleProductQuery = `
query SingleProduct($handle: String!){
    product(handle: $handle) {
      id
      title
      description
      totalInventory
      priceRange{
        minVariantPrice{
          amount
          currencyCode
        }
      }
      images(first: 5){
        edges {
          node {
            url(transform: {
                maxWidth: 900
            })
            altText 
          }
        }
      }
      options(first: 10) {
        id
        name
        values
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            quantityAvailable
            image {
                url(transform: {maxWidth: 600})
                altText
            }
            product {
                title
                handle
              }
            selectedOptions {
                name
                value
              }
            priceV2{
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// EDIT AGAIN
const checkoutMutation = `
mutation CheckoutCreate($selectedVariant: ID! $quantity: Int!){
    checkoutCreate(input: {
      lineItems:{
        variantId: $selectedVariant,
        quantity: $quantity
      }
    }) {
      checkout {
        webUrl
      }
    }
  }
  
`; 