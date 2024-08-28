const RecruitmentHeader = () => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div
        className="bg-changer"
        style={{
          transform: "scale(1, -1)",
        }}
      >
        <video
          src={`/assets/video/waves.mp4`}
          className="video-bg"
          data-keepplaying
          autoPlay
          loop
        ></video>
      </div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-lg z-inf">
            <div>
              <h4 className="index-header f-700 text-white">YOUR JOURNEY STARTS HERE</h4>
              {/* <hr className="divider" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHeader;
