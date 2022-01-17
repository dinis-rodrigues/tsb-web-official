/* eslint-disable @next/next/no-img-element */
import LightGallery from "lightgallery/react";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";

const RecruitmentFields = () => {
  return (
    <div className="row fields-wrapper ">
      <h2 className="recruitment-heading mb-3">OPEN DEPARTMENTS</h2>
      <LightGallery
        mode="lg-fade"
        speed={500}
        plugins={[
          lgThumbnail,
          lgZoom,
          lgAutoplay,
          lgFullscreen,
          lgRotate,
          lgShare,
        ]}
        elementClassNames="row justify-content-center"
      >
        <a
          className="col-4 m-0 p-0 pb-2"
          href={`${process.env.BASE_PATH}/assets/images/recruitment/DC.jpeg`}
        >
          <div className="field cursor-pointer">
            <img
              src={`${process.env.BASE_PATH}/assets/images/recruitment/DC.jpeg`}
              alt=""
            />
          </div>
        </a>
        <a
          className="col-4 m-0 p-0 pb-2"
          href={`${process.env.BASE_PATH}/assets/images/recruitment/MM.jpeg`}
        >
          <div className="field cursor-pointer">
            <img
              src={`${process.env.BASE_PATH}/assets/images/recruitment/MM.jpeg`}
              alt=""
            />
          </div>
        </a>
        <a
          className="col-4 m-0 p-0 pb-2"
          href={`${process.env.BASE_PATH}/assets/images/recruitment/SE.jpeg`}
        >
          <div className="field cursor-pointer">
            <img
              src={`${process.env.BASE_PATH}/assets/images/recruitment/SE.jpeg`}
              alt=""
            />
          </div>
        </a>

        <a
          className="col-4 m-0 p-0 pb-2"
          href={`${process.env.BASE_PATH}/assets/images/recruitment/SM.jpeg`}
        >
          <div className="field cursor-pointer">
            <img
              src={`${process.env.BASE_PATH}/assets/images/recruitment/SM.jpeg`}
              alt=""
            />
          </div>
        </a>
        <a
          className="col-4 m-0 p-0 pb-2"
          href={`${process.env.BASE_PATH}/assets/images/recruitment/PH.jpeg`}
        >
          <div className="field cursor-pointer">
            <img
              src={`${process.env.BASE_PATH}/assets/images/recruitment/PH.jpeg`}
              alt=""
            />
          </div>
        </a>
      </LightGallery>
    </div>
  );
};

export default RecruitmentFields;
