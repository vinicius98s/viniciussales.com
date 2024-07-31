import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";
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
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
