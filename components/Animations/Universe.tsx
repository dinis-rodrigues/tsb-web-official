// import rocket from "/assets/images/textures/rocket.svg";

const Universe = () => {
  return (
    <div className="objects hide-mobile">
      <div className="earth">
        <img
          alt=""
          className="object_earth"
          src={`${process.env.BASE_PATH}/assets/images/textures/earth.svg`}
        />
      </div>
      <div className="moon">
        <img
          alt=""
          className="object_moon"
          src={`${process.env.BASE_PATH}/assets/images/textures/moon.svg`}
        />
      </div>
      <div className="box_astronaut">
        <img
          alt=""
          className="object_astronaut"
          src={`${process.env.BASE_PATH}/assets/images/textures/astronaut.svg`}
        />
      </div>
    </div>
  );
};

export default Universe;
