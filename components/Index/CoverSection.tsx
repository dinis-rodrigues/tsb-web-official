const CoverSection = () => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        // backgroundImage:
        // `url("${process.env.BASE_PATH}/assets/images/coverPhoto.jpg")`,
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="mobile-top-margin row">
          <div className="text-center justify-content-center row">
            <div className="col-lg-10 z-inf">
              <img
                width={"200"}
                src={`${process.env.BASE_PATH}/assets/images/msebc/monaco-logo.png`}
                alt=""
              />
              <h4 className="index-header f-700 text-white">
                MONACO ENERGY BOAT CHALLENGE 2002
              </h4>

              <div className="col">
                <div className="p-3">
                  <h5 className="text-white mt-2 text-shadow index-subheader">
                    Communication Prize Video Submission
                  </h5>
                  <div className="iframe-container">
                    <iframe
                      src="https://www.youtube.com/embed/EyFjiI4x6-o?autoplay=1&mute=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
                      width="560"
                      height="315"
                      title="Técnico Solar Boat - Communication Prize"
                      frameBorder="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2"></div>

          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
};

export default CoverSection;
