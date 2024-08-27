import BottomWaves from "../Animations/BottomWaves";
import GlowingStars from "../Animations/GlowingStars";

import "react-toastify/dist/ReactToastify.css";

const RecruitmentClosed = () => {
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
              <h1 className="text-info index-header">No longer accepting applications</h1>
              {/* <h2>Good Luck {info.firstName} !</h2> */}
              <h3 className="index-subheader">
                If you really want, you can still contact us at{" "}
                <span className="contact-addr">tecnico.solarboat@gmail.com</span> and tell us why
                you want to join our team!
              </h3>
            </div>
          </div>
        </div>
      </div>

      <GlowingStars />
      <BottomWaves />
    </div>
  );
};

export default RecruitmentClosed;
