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
import { useEffect } from "react";
import * as ga from "../lib/ga";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  // MUI rendering first
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // canonical link for HTTPS
  const router = useRouter();
  const canonicalUrl = (
    `https://2022-a3-2022-a3-group-1.vercel.app/` +
    (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0];

  // google analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <CacheProvider value={emotionCache}>
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
