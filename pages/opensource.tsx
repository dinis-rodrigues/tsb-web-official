import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SM01 from "../components/OpenSource/SR01/SM01";
import SM02 from "../components/OpenSource/SR01/SM02";
import SP01 from "../components/OpenSource/SR01/SP01";
import SR01 from "../components/OpenSource/SR01/SR01";
import SR02 from "../components/OpenSource/SR01/SR02";
import SR03 from "../components/OpenSource/SR01/SR03";

const OpenSource = () => {
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();
  return (
    <div className="App">
      <Head>
        <title>Open Source</title>
      </Head>
      <Navbar theme={"white"} />
      <ReactFullpage
        credits={{ enabled: false }}
        lockAnchors={true}
        scrollOverflow
        navigation
        responsiveWidth={1250}
        navigationTooltips={[
          "2023-present - SP 01",
          "2024-present - SM 02",
          "2020-2023 - SM 01",
          "2021-2024 - SR 03",
          "2018-2020 - SR 02",
          "2016-2018 - SR 01",
        ]}
        showActiveTooltip={true}
        fitToSectionDelay={1000}
        render={({ fullpageApi }) => {
          if (!fullPageApi) setFullPageApi(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              <SP01 />
              <SM02 />
              <SM01 />
              <SR03 />
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
