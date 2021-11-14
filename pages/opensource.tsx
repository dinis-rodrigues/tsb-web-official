import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SR01 from "../components/OpenSource/SR01/SR01";
import SR02 from "../components/OpenSource/SR01/SR02";

const OpenSource = () => {
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();
  return (
    <div className="App">
      <Head>
        <title>Técnico Solar Boat</title>
      </Head>
      <Navbar theme={"white"} />
      <ReactFullpage
        lockAnchors={true}
        scrollOverflow
        navigation
        responsiveWidth={1250}
        // onLeave={(origin, destination, direction) => {
        //   console.log("onLeave", { origin, destination, direction });
        //   destination.index === 1
        //     ? setStartAboutZoom(true)
        //     : setStartAboutZoom(false);
        //   destination.index === 2 || destination.index === 3
        //     ? setSolarCount(true)
        //     : setSolarCount(false);
        //   destination.index === 4 ? setPlayVideo(true) : setPlayVideo(false);
        //   setNavTheme(navColors[destination.index]);
        // }}
        render={({ fullpageApi }) => {
          if (!fullPageApi) setFullPageApi(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              <SR02 />
              <SR01 />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default OpenSource;
