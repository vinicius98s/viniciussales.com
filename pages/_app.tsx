import type { AppProps } from "next/app";
import Script from "next/script";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "@components/Footer";

import "@styles/globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-display: ${display.style.fontFamily};
          --font-sans: ${sans.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Footer />
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
