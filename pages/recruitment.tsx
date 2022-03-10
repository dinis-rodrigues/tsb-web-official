import ReactFullpage, { fullpageApi } from "@fullpage/react-fullpage";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import RecruitmentClosed from "../components/Recruitment/RecruitmentClosed";
import RecruitmentDepartments from "../components/Recruitment/RecruitmentDepartments";
import RecruitmentForm from "../components/Recruitment/RecruitmentForm";
import RecruitmentHeader from "../components/Recruitment/RecruitmentHeader";
import RecruitmentIntro from "../components/Recruitment/RecruitmentIntro";
import { navRecruitmentTheme } from "../components/utils/constants";
import {
  getRecruitmentInfo,
  getRecruitmentTable,
} from "../components/utils/generalFunctions";
import { Departments, NavTheme } from "../interfaces";

const Recruitment = () => {
  const [navTheme, setNavTheme] = useState<NavTheme>(navRecruitmentTheme[0]);
  const [fullPageApi, setFullPageApi] = useState<fullpageApi>();
  const [openDepartments, setOpenDepartments] = useState<Departments>({});
  const [activeTable, setActiveTable] = useState("");

  useEffect(() => {
    getRecruitmentTable(setActiveTable);
    getRecruitmentInfo(setOpenDepartments);
  }, []);

  return (
    <div className="App">
      <Head>
        <title>Recruitment</title>
      </Head>

      <Navbar
        theme={navTheme.color}
        hideFooter={navTheme.hideFooter}
        isOpaque={navTheme.isOpaque}
        switchFooterTheme={navTheme.switchFooterTheme}
      />
      <ToastContainer theme="dark" />

      {Object.entries(openDepartments).length > 0 && (
        <ReactFullpage
          lockAnchors={true}
          autoScrolling={true}
          scrollOverflow
          navigation
          responsiveWidth={1250}
          normalScrollElements={".allow-scroll"} // for the select menu otherwise it does not open
          onLeave={(origin, destination) => {
            setNavTheme(navRecruitmentTheme[destination.index]); // This throws a warning, don't care
          }}
          afterRender={() => {
            // @ts-ignore
            setFullPageApi(window.fullpage_api!);
          }}
          render={() => {
            return (
              <ReactFullpage.Wrapper>
                <RecruitmentHeader />
                <RecruitmentIntro />
                {activeTable ? (
                  <Fragment>
                    <RecruitmentDepartments />
                    <RecruitmentForm
                      departments={openDepartments}
                      activeTable={activeTable}
                      fullPageApi={fullPageApi}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <RecruitmentClosed />
                  </Fragment>
                )}
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
