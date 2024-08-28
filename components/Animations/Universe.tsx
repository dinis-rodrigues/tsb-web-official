/* eslint-disable @next/next/no-img-element */

const Universe = () => {
  return (
    <div className="objects hide-mobile">
      <div className="earth">
        <img alt="" className="object_earth" src={`/assets/images/textures/earth.svg`} />
      </div>
      <div className="moon">
        <img alt="" className="object_moon" src={`/assets/images/textures/moon.svg`} />
      </div>
      <div className="box_astronaut">
        <img alt="" className="object_astronaut" src={`/assets/images/textures/astronaut.svg`} />
      </div>
    </div>
  );
};

export default Universe;
