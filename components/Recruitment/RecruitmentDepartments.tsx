import React, { useState } from "react";
import cx from "classnames";
import RecruitmentFaq from "./RecruitmentFaq";
import RecruitmentFields from "./RecruitmentFields";

const RecruitmentDepartments = () => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="bg-changer">
        <div
          className={cx("section-bg active")}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/textures/black.jpg")`,
            opacity: "0.4",
            transform: "rotate(180deg)",
          }}
        ></div>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col d-flex align-items-center justify-content-center z-inf">
            <RecruitmentFields />
          </div>
          <div className="col d-flex align-items-center justify-content-center z-inf">
            <RecruitmentFaq />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDepartments;
