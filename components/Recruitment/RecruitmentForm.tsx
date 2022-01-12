import React, { Fragment, useEffect, useState } from "react";

import BottomWaves from "../Animations/BottomWaves";
import GlowingStars from "../Animations/GlowingStars";

import "react-toastify/dist/ReactToastify.css";

import { Departments, RecruitmentFormInfo } from "../../interfaces";
import RecruitmentFormFields from "./RecruitmentFormFields";

type Props = {
  departments: Departments;
  activeTable?: string;
};
const RecruitmentForm = ({ departments, activeTable }: Props) => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [info, setInfo] = useState<RecruitmentFormInfo>({
    firstName: "",
    lastName: "",
    phoneNumber: null,
    email: "",
    confirmEmail: "",
    degree: "MEEC",
    curricularYear: 1,
    country: "Portugal",
    socialLink: "",
    motivation: "",
  });

  return (
    <div
      className="section"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div
        className="container nav-margin d-flex align-items-center justify-content-center"
        style={{ marginBottom: "5rem" }}
      >
        <div className="row">
          <div className="col-md-8 mx-auto z-inf">
            <div id="contact-form" className="glass-morph p-3 card">
              {submissionSuccess ? (
                <Fragment>
                  <h1 className="text-info index-header">
                    Application Submitted
                  </h1>
                  <h2>Good Luck {info.firstName} !</h2>
                  <p>
                    You will receive a confirmation email at{" "}
                    <span className="contact-addr">{info.email}</span> with
                    further information on the process. If you don&apos;t
                    receive it please contact us at{" "}
                    <span className="contact-addr">
                      tecnico.solarboat@gmail.com
                    </span>
                  </p>
                </Fragment>
              ) : (
                <RecruitmentFormFields
                  info={info}
                  setInfo={setInfo}
                  departments={departments}
                  activeTable={activeTable}
                  setSubmissionSuccess={setSubmissionSuccess}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <GlowingStars />
      <BottomWaves />
    </div>
  );
};

export default RecruitmentForm;
