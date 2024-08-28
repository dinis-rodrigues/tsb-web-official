/* eslint-disable @next/next/no-img-element */
import LightGallery from "lightgallery/react";

import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Departments } from "../../interfaces";

interface Props {
  openDepartments: Departments;
}

const RecruitmentFields = ({ openDepartments }: Props) => {
  console.log(openDepartments);
  const isDcRecruitmentOpen = Object.prototype.hasOwnProperty.call(openDepartments, "dc");
  const isMmRecruitmentOpen = Object.prototype.hasOwnProperty.call(openDepartments, "mm");
  const isSeRecruitmentOpen = Object.prototype.hasOwnProperty.call(openDepartments, "es");
  const isSmRecruitmentOpen = Object.prototype.hasOwnProperty.call(openDepartments, "sm");
  const isHpRecruitmentOpen = Object.prototype.hasOwnProperty.call(openDepartments, "hp");
  return (
    <div className="row fields-wrapper ">
      <h2 className="recruitment-heading mb-3">OPEN DEPARTMENTS</h2>
      <LightGallery
        mode="lg-fade"
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate]}
        elementClassNames="row justify-content-center"
      >
        {isDcRecruitmentOpen ? (
          <a className="col-4 m-0 p-0 pb-2" href={`/assets/images/recruitment/DC2023_1sem.jpg`}>
            <div className="field cursor-pointer">
              <img src={`/assets/images/recruitment/DC2023_1sem.jpg`} alt="" />
            </div>
          </a>
        ) : null}
        {isMmRecruitmentOpen ? (
          <a className="col-4 m-0 p-0 pb-2" href={`/assets/images/recruitment/MM2023_1sem.jpg`}>
            <div className="field cursor-pointer">
              <img src={`/assets/images/recruitment/MM2023_1sem.jpg`} alt="" />
            </div>
          </a>
        ) : null}
        {isSeRecruitmentOpen ? (
          <a className="col-4 m-0 p-0 pb-2" href={`/assets/images/recruitment/SE2023_1sem.jpg`}>
            <div className="field cursor-pointer">
              <img src={`/assets/images/recruitment/SE2023_1sem.jpg`} alt="" />
            </div>
          </a>
        ) : null}

        {isSmRecruitmentOpen ? (
          <a className="col-4 m-0 p-0 pb-2" href={`/assets/images/recruitment/SM.jpeg`}>
            <div className="field cursor-pointer">
              <img src={`/assets/images/recruitment/SM.jpeg`} alt="" />
            </div>
          </a>
        ) : null}
        {isHpRecruitmentOpen ? (
          <a className="col-4 m-0 p-0 pb-2" href={`/assets/images/recruitment/PH.jpeg`}>
            <div className="field cursor-pointer">
              <img src={`/assets/images/recruitment/PH.jpeg`} alt="" />
            </div>
          </a>
        ) : null}
      </LightGallery>
    </div>
  );
};

export default RecruitmentFields;
