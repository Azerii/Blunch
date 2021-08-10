import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Breakfast at your doorstep" />
          <link rel="icon" href="/logo.svg" />
          <link
            rel="preload"
            href="/font/Gordita Medium.woff"
            as="font"
            crossOrigin=""
          />
          <link 
            rel="preload"
            as="image"
            href="/4 Chicken Waffles + 2 Sausages + Syrup.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/4 Plain Waffles + 2 Sausages + Syrup.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/6 Pancakes + 2 Sausages + Syrup.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Chicken Sandwich.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Chicken Stir Fry Noodles.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Egg &amp; Mayo Sandwich.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Sardine Sandwich.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Suya Stir Fry Noodles +Extra Suya.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Suya Stir Fry Noodles.jpg"
          />
          <link 
            rel="preload"
            as="image"
            href="/Zobo.jpg"
          />
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}