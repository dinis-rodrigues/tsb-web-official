const CoverSection = () => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundImage: `url("${process.env.BASE_PATH}/assets/images/coverPhoto.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default CoverSection;
