// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-thumbnail.scss";
import "lightgallery/scss/lg-autoplay.scss";
import "lightgallery/scss/lg-fullscreen.scss";
import "lightgallery/scss/lg-rotate.scss";
import "lightgallery/scss/lg-share.scss";

// My styles
import "../styles/globals.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import FaviconIcons from "../components/Head/FaviconIcons";

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <FaviconIcons />
  </Head>;
  return <Component {...pageProps} />;
}
export default MyApp;
