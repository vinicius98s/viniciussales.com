import type { AppProps } from "next/app";
import Script from "next/script";
import { ThemeProvider } from "@emotion/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Layout from "@components/Layout";
import Footer from "@components/Footer";

import GlobalStyles from "@styles/global";
import theme from "@styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </ThemeProvider>
      {process.env.NODE_ENV === "production" && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="ef067378-b147-481f-b6fd-ab9a9bb96c6e"
        />
      )}
      <SpeedInsights />
    </>
  );
}

export default MyApp;
