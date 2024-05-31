import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";

import Layout from "@components/Layout";
import GlobalStyles from "@styles/global";
import theme from "@styles/theme";
import Footer from "@components/Footer";

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
    </>
  );
}

export default MyApp;
