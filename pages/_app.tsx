import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import getConfig from 'next/config'
import { ToastContainer } from 'react-toastify';

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import '../public/assets/scss/flaticon.scss';
import '../public/assets/scss/font-awesome.scss';
import "../public/assets/scss/color-1.scss"
import '../public/assets/scss/themify.scss';
import "../public/assets/scss/slick.scss";
import "../public/assets/scss/slick-theme.scss";
import ThemeSwitch from '../components/themeSwitch';

const { publicRuntimeConfig = {} } = getConfig() || {};

// Progress bar configuration
NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

type Props = {
  children: React.ReactNode;
}
const MyFunctionComponent = ({ children }:Props) => {
  const [loader, setLoader] = useState(true)
  const [goingUp, setGoingUp] = useState(false)

  useEffect(() => {
    // Page Loader
    setTimeout(() => {
      setLoader(false)
    }, 1500)

    // Tap to Top Scroll 
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 500)
        setGoingUp(true);
      else
        setGoingUp(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const tapToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    });
  }

  return (
    <>
      <Head>
        <title>Unice</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {/* All of our children components go here */}
      {children}
      {/* Navigate to top */}
      <div className="tap-top" style={goingUp ? { display: 'block' } : { display: 'none' }} onClick={tapToTop}>
        <div><i className="fa fa-angle-double-up"></i></div>
      </div>
    </>
  )
}

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <div>
      <MyFunctionComponent>
        <Component {...pageProps} />
        <ThemeSwitch />
      </MyFunctionComponent>
      <ToastContainer />
    </div>
  )
}
export default MyApp
