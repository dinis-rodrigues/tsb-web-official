import React from "react";
import RecruitmentFaq from "./RecruitmentFaq";
import RecruitmentFields from "./RecruitmentFields";
import GlowingStars from "../Animations/GlowingStars";
import { Departments } from "../../interfaces";

interface Props {
  openDepartments: Departments;
}

const RecruitmentDepartments = ({ openDepartments }: Props) => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="container">
        <div className="row ">
          <div className="col d-flex align-items-center justify-content-center z-inf">
            <RecruitmentFields openDepartments={openDepartments} />
          </div>
          <div className="col d-flex align-items-center justify-content-center z-inf">
            <RecruitmentFaq />
          </div>
        </div>
      </div>
      <GlowingStars />
    </div>
  );
};

export default RecruitmentDepartments;
