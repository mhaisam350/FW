// Sort Journal entries in descending order
export const sortByDate = (a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
}

// Format prices for products
export const formatPrice = (number) => {
    return Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0}).format(number);
}

// Fetch products from Shopify store
export async function storefront(query, variables = {}) {
    
    const response = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        // return false;
    }

    
    return response.json();

}

// export const storefront = async ({ query, variables }) => {
//     try {
//       const result = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Storefront-Access-Token':
//           process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
//         },
//         body: JSON.stringify({ query, variables }),
//       }).then((res) => res.json())
  
//       if (result.errors) {
//         console.log({ errors: result.errors })
//       } else if (!result || !result.data) {
//         console.log({ result })
//         return 'No results found.'
//       }
  
//       return result.data
//     } catch (error) {
//       console.log(error)
//     }
//   }