import { useState } from 'react';

import StoreNav from '../../components/StoreNav';
import Cart from '../../components/Cart';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';

import Head from 'next/head';

export default function CartPage() {

    const [isLoading, setIsLoading] = useState(false);

    return (

        <>
            <Head>
                <title>Cart - Frontwheel</title>
            </Head>

            {/* <StoreNav /> */}

            <button onClick={() => {setIsLoading(!isLoading)}}>Click</button>

            {isLoading ? <LoadingSpinner /> : ' ' }


            {/* <Sidebar /> */}

            {/* <Cart></Cart> */}

            {/* <Footer /> */}
        </>

    )

}