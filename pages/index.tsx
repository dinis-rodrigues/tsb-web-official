import React, { useEffect } from "react";
import Head from "next/head";
// import Custom Components
import Header from "../components/common/header";
import BannerSection from "../components/index/banner";
import ServicesSection from "../components/index/services";
import AboutSection from "../components/index/about";
import DownloadSection from "../components/index/download";
import ScreenShotsSection from "../components/index/screenshots";
import VideoSection from "../components/index/video";
import Feature from "../components/index/feature";
import FooterSection from "../components/common/footer";
import BreadcrumbSection from "../components/breadcrumb-comon-sections/breadcrumb-section";

export default function Home() {
  useEffect(() => {
    document.body.style.setProperty("--primary", "#357fef");
    document.body.style.setProperty("--secondary", "#4e4e4e");
    document.body.style.setProperty("--light", "#13B8EA");
    document.body.style.setProperty("--dark", "#4E56F3");
  });
  return (
    <div>
      <Head>
        <title>Técnico Solar Boat</title>
      </Head>

      <Header className="app1" />

      {/* <BannerSection /> */}

      <BreadcrumbSection
        className="col-12"
        bgDark="bg-dark video-sec breadcrumb-slider p-0"
        textRight="text-center"
        justifyContent="justify-content-center"
        classDiv="col-12"
        path="Breadcrumb Style"
        title="Video Background"
        style="Técnico Solar Boat"
        setOver="set-over"
        showcaseType="Video"
      />

      <Feature />

      <ServicesSection />

      <AboutSection />

      <DownloadSection />

      <ScreenShotsSection />

      <VideoSection />

      <FooterSection />
    </div>
  );
}
