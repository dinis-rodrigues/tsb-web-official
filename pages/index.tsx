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

const Home: NextPage = () => {
  const navColors: ("white" | "black")[] = [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "black",
    "white",
  ];

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
  const [navTheme, setNavTheme] = useState<"white" | "black">("white");
  const [startAboutZoom, setStartAboutZoom] = useState(false);
  const [solarCount, setSolarCount] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();

  return (
    <div className="App">
      <Head>
        <title>Técnico Solar Boat</title>
      </Head>
      <Navbar theme={navTheme} fullPageApi={fullPageApi} />
      <ReactFullpage
        lockAnchors={true}
        scrollOverflow
        navigation
        responsiveWidth={1250}
        onLeave={(origin, destination, direction) => {
          console.log("onLeave", { origin, destination, direction });
          destination.index === 1
            ? setStartAboutZoom(true)
            : setStartAboutZoom(false);
          destination.index === 2 || destination.index === 3
            ? setSolarCount(true)
            : setSolarCount(false);
          destination.index === 4 ? setPlayVideo(true) : setPlayVideo(false);
          setNavTheme(navColors[destination.index]);
        }}
        afterReBuild={() => {
          console.log("Rebuilted....");
        }}
        normalScrollElements={".scrollable-team"}
        anchors={anchors}
        render={({ fullpageApi }) => {
          if (!fullPageApi) setFullPageApi(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              <CoverSection />
              <About startZoom={startAboutZoom} initialDepartment={"dc"} />
              <SolarSection startCount={solarCount} />
              <HydrogenSection startCount={solarCount} />
              <AutonomousSection playVideo={playVideo} />
              <Team />
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
