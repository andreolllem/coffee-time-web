import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";

const APP_NAME = "Coffee-Time";
const APP_DESCRIPTION = "App Rede Social Familiar";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="coffee-time" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
