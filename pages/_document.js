import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=KoHo:wght@300;400;600&display=swap" rel="stylesheet" />
            {/* <script src="https://kit.fontawesome.com/d7008b02a8.js" crossorigin="anonymous"></script>  */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument