import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

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
    </>
  );
}

export default MyApp;
