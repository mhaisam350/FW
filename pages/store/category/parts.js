import { storefront } from "../../../utils";

import StoreNav from "../../../components/StoreNav";
import ProductDisplay from "../../../components/ProductDisplay";
import Footer from "../../../components/Footer";

import Head from 'next/head';
import Link from 'next/link';

import styles from '../../../styles/CategoryPage.module.css'

export default function Parts( { collection } ) {

    // console.log(products);

    const collectionHandle = collection.handle;
    const collectionName = collectionHandle.charAt(0).toUpperCase() + collectionHandle.slice(1);
    
    const products = collection.products;

    return (
        <>
            <Head>
                <title> {collectionName} - Frontwheel</title>
            </Head>

            <StoreNav />

            <h1 className={styles.title}>{collectionName}</h1>

            <ProductDisplay products={products} />

            <Footer />

        </>
    )

}


export async function getStaticProps() {

    const { data } = await storefront(productsInCollectionQuery, { collection: "parts" } );
    // console.log(data);

    return {
        props: {
            collection: data.collection,
        }
    }

}

const productsInCollectionQuery = `

query ProductsInCollection($collection: String!) {
    collection(handle: $collection) {
      handle
      products(first: 10) {
        edges {
          node {
            title
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 2) {
              edges {
                node {
                  url(transform: {maxWidth: 400})
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;