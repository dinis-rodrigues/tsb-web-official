import React from "react";

const GalleryHeader = () => {
  return (
    <section className="agency breadcrumb-section bg-dark video-sec breadcrumb-slider p-0">
      <div
        className="blocks"
        data-vide-bg="../assets/video/sea.mp4"
        data-vide-options="position: 0% 50%"
        id="block"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: -1,
            inset: "0px",
            overflow: "hidden",
            backgroundSize: "cover",
            backgroundColor: "transparent",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0% 50%",
            backgroundImage: "none",
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              margin: "auto",
              position: "absolute",
              zIndex: -1,
              top: "50%",
              left: "0%",
              transform: "translate(0%, -50%)",
              visibility: "visible",
              opacity: 1,
              width: "100%",
              height: "auto",
            }}
          >
            <source src="/assets/video/tsbGalleryLoop.webm" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="container set-over">
        <div className="row">
          <div className="col-12">
            <h1 className="breadcrumb-text text-center">
              Relive our highlights and greatest moments
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHeader;
