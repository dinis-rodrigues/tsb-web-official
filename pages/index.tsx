import type { NextPage } from "next";
import Head from "next/head";

import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";

import About from "../components/Index/About";
import AutonomousSection from "../components/Index/AutonomousSection";
import Contact from "../components/Index/Contact";
import CoverSection from "../components/Index/CoverSection";
import DynamicSponsors from "../components/Index/DynamicSponsors";
import HydrogenSection from "../components/Index/HydrogenSection";
import SolarSection from "../components/Index/SolarSection";
import Team from "../components/Index/Team";
import { navIndexTheme } from "../components/utils/constants";
import { getSponsorsFromDatabase } from "../components/utils/sponsorUtils";
import { NavTheme, SponsorBracketPublic } from "../interfaces";

const Home: NextPage = () => {
  const anchors = ["home", "about", "solar", "hydrogen", "ai", "team", "sponsors", "contact"];
  const [navTheme, setNavTheme] = useState<NavTheme>(navIndexTheme[0]);
  const [startAboutZoom, setStartAboutZoom] = useState(false);
  const [solarCount, setSolarCount] = useState(false);
  const [hydrogenCount, setHydrogenCount] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();

  const [sponsorBrackets, setSponsorBrackets] = useState<[string, SponsorBracketPublic][]>([]);

  useEffect(() => {
    getSponsorsFromDatabase(setSponsorBrackets);
  }, []);

  return sponsorBrackets.length > 0 ? (
    <div className="App">
      <Head>
        <title>Técnico Solar Boat</title>
      </Head>
      <Navbar
        theme={navTheme.color}
        hideFooter={navTheme.hideFooter}
        isOpaque={navTheme.isOpaque}
        switchFooterTheme={navTheme.switchFooterTheme}
        fullPageApi={fullPageApi}
      />
      <ReactFullpage
        credits={{ enabled: false }}
        lockAnchors={true}
        scrollOverflow
        navigation
        responsiveWidth={1250}
        onLeave={(origin, destination) => {
          destination.index === 1 ? setStartAboutZoom(true) : setStartAboutZoom(false);
          destination.index === 2 ? setSolarCount(true) : setSolarCount(false);
          destination.index === 3 ? setHydrogenCount(true) : setHydrogenCount(false);
          destination.index === 4 ? setPlayVideo(true) : setPlayVideo(false);
          setNavTheme(navIndexTheme[destination.index]); // This throws a warning, don't care
        }}
        normalScrollElements={".scrollable-team"}
        anchors={anchors}
        navigationTooltips={["", "Intro", "Solar", "Hydrogen", "AI", "Team", "Sponsors", "Contact"]}
        afterRender={() => {
          // @ts-ignore
          setFullPageApi(window.fullpage_api!);
        }}
        render={({ fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <CoverSection />
              <About startZoom={startAboutZoom} initialDepartment={"dc"} />
              <SolarSection startCount={solarCount} />
              <HydrogenSection startCount={hydrogenCount} />
              <AutonomousSection playVideo={playVideo} />
              <Team onBottomScroll={() => fullpageApi!.moveTo("sponsors", 0)} />
              <DynamicSponsors sponsorBrackets={sponsorBrackets} fullPageApi={fullPageApi} />
              <Contact />
            </ReactFullpage.Wrapper>
          );
        }}
      />
      <ToastContainer theme="dark" />
    </div>
  ) : null;
};

export default Home;
