import type { NextPage } from "next";
import Head from "next/head";

import ReactFullpage from "@fullpage/react-fullpage";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

import CoverSection from "../components/Index/CoverSection";
import About from "../components/Index/About";
import SolarSection from "../components/Index/SolarSection";
import HydrogenSection from "../components/Index/HydrogenSection";
import AutonomousSection from "../components/Index/AutonomousSection";

const Home: NextPage = () => {
  const navColors = [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
  ];
  const [navTheme, setNavTheme] = useState("white");
  const [startAboutZoom, setStartAboutZoom] = useState(false);
  const [solarCount, setSolarCount] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <div className="App">
      <Head>
        <title>Técnico Solar Boat</title>
      </Head>
      <Navbar theme={navTheme} />
      <ReactFullpage
        navigation
        responsiveWidth={1250}
        // pluginWrapper={pluginWrapper}
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
        // scrollHorizontally = {true}
        // sectionsColor={state.sectionsColor}
        render={() => (
          <ReactFullpage.Wrapper>
            <CoverSection />
            <About startZoom={startAboutZoom} initialDepartment={"dc"} />
            <SolarSection startCount={solarCount} />
            <HydrogenSection startCount={solarCount} />
            <AutonomousSection playVideo={playVideo} />
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
};

export default Home;
