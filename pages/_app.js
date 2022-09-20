import Layout from "../components/Layout";
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { useRouter } from "next/router";
import Script from "next/script";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-E0010RXQ9K"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-E0010RXQ9K');
// </script>

export default function MyApp(props) {
  // MUI rendering first
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // canonical link for HTTPS
  const router = useRouter();
  const canonicalUrl = (
    `https://2022-a3-2022-a3-group-1.vercel.app/` +
    (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0];

  return (
    <>
      <CacheProvider value={emotionCache}>

        {/* google analytics */}
        <Script
          strategy="lazyOnLoad"
          src={`https://www.googletagmanager.com/gtag/js?id=G-E0010RXQ9K`}
        />
        <Script strategy="lazyOnLoad">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E0010RXQ9K');
          `}
        </Script>

        {/* metadata */}
        <Head>
          <title>GivingCoupons.sg</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="canonical" href={canonicalUrl} />
        </Head>

        {/* content */}
        <ThemeProvider theme={theme}>
          <Layout>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
