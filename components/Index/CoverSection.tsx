import profilePic from "../../public/assets/images/coverPhoto.jpg";

const CoverSection = () => {
  return (
    <div
      className="section"
      style={{
        backgroundImage: `url("assets/images/coverPhoto.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default CoverSection;
