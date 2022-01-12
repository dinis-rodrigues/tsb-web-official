import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { ToastContainer } from "react-toastify";
import GalleryHeader from "../components/Gallery/GalleryHeader";
import FaviconIcons from "../components/Head/FaviconIcons";
import Navbar from "../components/Navbar/Navbar";
import RecruitmentDepartments from "../components/Recruitment/RecruitmentDepartments";
import RecruitmentForm from "../components/Recruitment/RecruitmentForm";
import RecruitmentHeader from "../components/Recruitment/RecruitmentHeader";
import RecruitmentIntro from "../components/Recruitment/RecruitmentIntro";
import {
  getRecruitmentInfo,
  getRecruitmentTable,
} from "../components/utils/generalFunctions";
import { Departments } from "../interfaces";

const Recruitment = () => {
  const [navTheme, setNavTheme] = useState<"white" | "black">("white");
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();
  const [openDepartments, setOpenDepartments] = useState<Departments>({});
  const [activeTable, setActiveTable] = useState("");

  useEffect(() => {
    getRecruitmentTable(setActiveTable);
    getRecruitmentInfo(setOpenDepartments);
    // if (Object.entries(openDepartments).length > 0 && fullPageApi) {
    //   setTimeout(function () {
    //     fullPageApi.reBuild();
    //     console.log("rebuild");
    //   }, 1000);
    // }
  }, []);

  return (
    <div className="App">
      <Head>
        <title>Recruitment</title>
        <FaviconIcons />
      </Head>

      <Navbar theme={navTheme} />
      <ToastContainer theme="dark" />

      {Object.entries(openDepartments).length > 0 && (
        <ReactFullpage
          lockAnchors={true}
          autoScrolling={true}
          scrollOverflow
          navigation
          responsiveWidth={1250}
          normalScrollElements={".allow-scroll"} // for the select menu otherwise it does not open
          render={({ fullpageApi }) => {
            if (!fullPageApi) setFullPageApi(fullpageApi);
            return (
              <ReactFullpage.Wrapper>
                <RecruitmentHeader />
                <RecruitmentIntro />
                <RecruitmentDepartments />
                <RecruitmentForm
                  departments={openDepartments}
                  activeTable={activeTable}
                />
              </ReactFullpage.Wrapper>
            );
          }}
        />
      )}
      {/* <RecruitmentHeader /> */}

      {/* <Controller>
        <Scene
          offset={-100}
          triggerHook="onLeave"
          triggerElement="#triggerEl"
          // indicators={true}
        >
          {(progress: number) => {
            progress === 4 ? setNavTheme("black") : setNavTheme("white");
            return <Fragment></Fragment>;
          }}
        </Scene>
      </Controller> */}
    </div>
  );
};

export default Recruitment;
