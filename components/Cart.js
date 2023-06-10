import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/state";

import { createCart } from "../utils/createCart";
import { displayCart } from "../utils/displayCart";
import { removeItemFromCart } from "../utils/removeItemFromCart";
import { storefront } from "../utils";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTrash } from '@fortawesome/free-solid-svg-icons';

import LoadingSpinner from "./LoadingSpinner";

import Link from 'next/link';
import styles from './Cart.module.css';


export default function Cart() {

    // const [showProducts, setShowProducts] = useState(true);
    const [products, setProducts] = useState([]);
    const [cost, setCost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [reload, setReload] = useState(null);
    
    const { cartId, setCartId, isToggled } = useAppContext();


    // Create or load cartId 
    useEffect(() => {

        async function handleCart() {

            let cartData = JSON.parse(
                window.localStorage.getItem('CART'),
            );
            // console.log(cartData);
            // console.log(new Date().getTime());
            // console.log(cartData.expiry);

            // if (new Date().getTime() > cartData.expiry) {
            //     console.log('expired');
            // } else {
            //     console.log('valid');
            //     return;
            // }

            if (cartData && new Date().getTime() - cartData.timeCreated < 18*60*60*1000 ) {

                setIsLoading(true);

                setCartId(cartData.cart.cartId);
                
                const existingCart = await displayCart(cartData.cart.cartId);

                // console.log(existingCart.body);

                setProducts(existingCart.body.cart.lines.edges);
                setCost(existingCart.body.cart.estimatedCost);

                // console.log(prevProducts.current = products === products);
                // console.log(prevProducts.current = products);
                // console.log(products);

                setIsLoading(false);

                // console.log(products);
                // console.log(cost);

                // console.log(cartData);
                // console.log(cartId);

                return;
            }

            console.log('--- Creating cart ---')

            cartData = await createCart();

            // window.localStorage.setItem('CART_STATUS', 'clean');

            // let cartData = createCartResponse;
            
            // console.log(cartData.body);

            const storage = {
                cart: cartData.body,
                timeCreated: new Date().getTime(),
            }
            
            setCartId(cartData.body.cartId)

            // window.localStorage.setItem(
            //     'CART',
            //     JSON.stringify(cartData.body),
            // );

            window.localStorage.setItem(
                'CART',
                JSON.stringify(storage),
            );

            // console.log(cartId);

        }

        handleCart();

        const interval = setInterval(() => {

            const state = window.localStorage.getItem('CART_STATUS');

            if (state && state === 'dirty') {
                handleCart();
                window.localStorage.setItem('CART_STATUS', 'clean');
            };

        }, 300);

        return () => {
            clearTimeout(interval);
        }

    }, []);




    const handleRemoveFromCart = async (itemId) => {

        setIsLoading(true);
        
        console.log('--- Removing from cart ---');

        // console.log(cartId);
        // window.localStorage.setItem('CART_STATUS', 'dirty');

        const removeFromCartResponse = await removeItemFromCart(cartId, itemId);
        
        let data = removeFromCartResponse

        setIsLoading(false);

        window.localStorage.setItem('CART_STATUS', 'dirty');

        

        // console.log(data);
        return data;


    }

    
    // Empty existing cartId
    function emptyCart() {

        window.localStorage.removeItem('CART');

        window.localStorage.setItem('CART_STATUS', 'dirty');

        setCartId(null); 
        setProducts([]);
        setCost({});
    }


    async function handleCheckout() {

        // console.log(cartId);
        const  response   = await storefront(checkoutURLQuery, { cartId });
        const  webUrl  = response.data.cart.checkoutUrl;
        // console.log(webUrl);
        window.location.href = webUrl;

    }

    // Reset scroll position
    useEffect(() => {

        const cartProducts = document.getElementById('cart-products');

        if (isToggled && cartProducts) {cartProducts.scroll(0, 0);}

    }, [isToggled])



    return (

        <>

            <h1 className={styles['cart-title']}>Cart items</h1>

            {isLoading ? <LoadingSpinner /> : '' }

            {products.length > 0 && Object.keys(cost).length > 0 && cost.totalTaxAmount ? (
                
                <div className={styles['cart-container']}>

                    <div className={styles['cart-products']} id={'cart-products'} >

                        {products.map((item, index) => {

                        // console.log(item);
                        item = item.node;

                            return (

                                

                                <article key={index} className={styles['product']}>

                                    <Link href={`/store/products/${item.merchandise.product.handle}`}>
                                        <a>
                                            <img src={item.merchandise.image?.url} className={styles['product-img']} />
                                        </a>
                                    </Link>
                                
                                    <div className={styles['product-details']}>

                                        <Link href={`/store/products/${item.merchandise.product.handle}`}>
                                            <a>
                                                <h3 className={styles['product-name']}>{item.merchandise.product.title}</h3>
                                            </a>
                                        </Link>

                                        <p className={styles['product-variant']}>{item.merchandise.title}</p>

                                            <div className={styles['product-subcontainer']}>

                                                <p className={styles['product-quantity']}>x {item.quantity}</p>

                                                <div>
                                                    <p className={styles['product-cost']}>{item.merchandise.priceV2.amount} {item.merchandise.priceV2.currencyCode}</p>
                                                    <button className={styles['remove-btn']} onClick={() => {
                                                        handleRemoveFromCart(item.id);
                                                    }}><FontAwesomeIcon icon={faTrash} /></button>
                                                </div>

                                            </div>

                                    </div>
                                    
                                    
                                </article>

                                
                            )

                        })}

                    </div>

                    <section className={styles['static-container']}>
                        {/* {console.log(cost)} */}
                        <p className={styles['subtotal']}>Subtotal: {cost.subtotalAmount.amount + ' ' + cost.subtotalAmount.currencyCode}</p>
                        <p className={styles['subtotal']}>Taxes: {cost.totalTaxAmount.amount + ' ' + cost.totalTaxAmount.currencyCode}</p>
                        <p className={styles['grand-total']}>Grand Total: {cost.totalAmount.amount + ' ' + cost.totalAmount.currencyCode}</p>

                        <button onClick={handleCheckout} className={styles['cart-btn']} id={styles['checkout-btn']}>Checkout</button>
                        <button onClick={emptyCart} className={styles['cart-btn']} id={styles['empty-btn']}>Empty Cart</button>
                
                    </section>

                </div>

             ) : (

                <div className={styles['cart-container']}>
                    <p className={styles['cart-message']}>Your cart is empty.</p>
                </div>
            

            )}


                
            {/* <p>Total: {cost.totalAmount.amount}</p> */}

        </>

    )
    

}


const checkoutURLQuery = `
query CheckoutURL($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
    }
  }  
`;