const CoverSection = () => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundImage: `url("/assets/images/coverPhoto.jpg")`,
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default CoverSection;
