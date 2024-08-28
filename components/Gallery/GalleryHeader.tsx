const GalleryHeader = () => {
  return (
    <section className="gallery gallery-section bg-dark video-sec gallery-slider p-0">
      <div
        className="blocks"
        id="block"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <div className="gallery-video-container ">
          <video className="gallery-video-header" autoPlay loop muted>
            <source src={`/assets/video/tsbGalleryLoop.mp4`} type="video/mp4" />
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
