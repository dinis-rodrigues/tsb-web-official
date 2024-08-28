// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lg-thumbnail.scss";
import "lightgallery/scss/lg-autoplay.scss";
import "lightgallery/scss/lg-fullscreen.scss";
import "lightgallery/scss/lg-rotate.scss";
import "react-toastify/dist/ReactToastify.css";

// My styles
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useEffect } from "react";
import * as gtag from "../components/utils/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // For google analytics
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (process.env.NODE_ENV === "production") gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
export default MyApp;
