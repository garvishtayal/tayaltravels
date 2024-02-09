// pages/_app.js
import Head from 'next/head';
import '../styles/global.css'; // Import your global styles here

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tayal Travels</title>
        <meta name="description" content="Tayal Travels is a travel blogging site, which provide you with best travel blogs and content" />
        <meta name="keywords" content="travel, travels, travelblog, tayal, tayaltravels, destination, vacation, adventure, nature, peace, wildlife" />
        <meta name="author" content="Abhishek Tayal" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="https://tayaltravels.sgp1.cdn.digitaloceanspaces.com/assets/favicon.ico" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Tayal Travels" />
        <meta property="og:description" content="Tayal Travels is a travel blogging site, which provide you with best travel blogs and content" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tayaltravels.com" />
        <meta property="og:image" content="https://tayaltravels.sgp1.cdn.digitaloceanspaces.com/assets/tayaltravels.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Tayal Travels" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tayal Travels" />
        <meta name="twitter:description" content="Tayal Travels is a travel blogging site, which provide you with best travel content" />
        <meta name="twitter:image" content="https://tayaltravels.sgp1.cdn.digitaloceanspaces.com/assets/tayaltravels.png" />
        <meta name="twitter:site" content="@tayal_travels" />
        <meta name="twitter:creator" content="@GarvishTayal" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
