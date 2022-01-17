import type { NextPage } from "next";
import Head from "next/head";

import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

import CoverSection from "../components/Index/CoverSection";
import About from "../components/Index/About";
import SolarSection from "../components/Index/SolarSection";
import HydrogenSection from "../components/Index/HydrogenSection";
import AutonomousSection from "../components/Index/AutonomousSection";
import Team from "../components/Index/Team";
import DynamicSponsors from "../components/Index/DynamicSponsors";
import Contact from "../components/Index/Contact";
import FaviconIcons from "../components/Head/FaviconIcons";
import { navIndexTheme } from "../components/utils/constants";
import { NavTheme } from "../interfaces";

const Home: NextPage = () => {
  const anchors = [
    "home",
    "about",
    "solar",
    "hydrogen",
    "ai",
    "team",
    "sponsors",
    "contact",
  ];
  const [navTheme, setNavTheme] = useState<NavTheme>(navIndexTheme[0]);
  const [startAboutZoom, setStartAboutZoom] = useState(false);
  const [solarCount, setSolarCount] = useState(false);
  const [hydrogenCount, setHydrogenCount] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();

  return (
    <div className="App">
      <Head>
        <title>Técnico Solar Boat</title>
        <FaviconIcons />
      </Head>
      <Navbar
        theme={navTheme.color}
        hideFooter={navTheme.hideFooter}
        isOpaque={navTheme.isOpaque}
        switchFooterTheme={navTheme.switchFooterTheme}
        fullPageApi={fullPageApi}
      />
      <ReactFullpage
        lockAnchors={true}
        scrollOverflow
        navigation
        responsiveWidth={1250}
        onLeave={(origin, destination) => {
          destination.index === 1
            ? setStartAboutZoom(true)
            : setStartAboutZoom(false);
          destination.index === 2 ? setSolarCount(true) : setSolarCount(false);
          destination.index === 3
            ? setHydrogenCount(true)
            : setHydrogenCount(false);
          destination.index === 4 ? setPlayVideo(true) : setPlayVideo(false);
          setNavTheme(navIndexTheme[destination.index]); // This throws a warning, don't care
        }}
        normalScrollElements={".scrollable-team"}
        anchors={anchors}
        navigationTooltips={[
          "",
          "Intro",
          "Solar",
          "Hydrogen",
          "AI",
          "Team",
          "Sponsors",
          "Contact",
        ]}
        render={({ fullpageApi }) => {
          if (!fullPageApi) setFullPageApi(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              <CoverSection />
              <About startZoom={startAboutZoom} initialDepartment={"dc"} />
              <SolarSection startCount={solarCount} />
              <HydrogenSection startCount={hydrogenCount} />
              <AutonomousSection playVideo={playVideo} />
              <Team onBottomScroll={() => fullPageApi!.moveTo("sponsors", 0)} />
              <DynamicSponsors fullPageApi={fullPageApi} />
              <Contact />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default Home;
