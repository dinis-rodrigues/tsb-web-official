import { SiAtom } from "react-icons/si";
import { IoBulbOutline } from "react-icons/io5";
import { FaCogs } from "react-icons/fa";
import { GiAnchor } from "react-icons/gi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { useEffect, useState } from "react";
import cx from "classnames";
// import { GiChart } from "react-icons/hi";
type Props = {
  startZoom: boolean;
  initialDepartment?: string;
};
const About = ({ initialDepartment = "dc", startZoom }: Props) => {
  const [activeDep, setActiveDep] = useState<string>(initialDepartment);
  const [initialZoom, setInitialZoom] = useState<string>("");
  useEffect(() => {
    if (startZoom) {
      setInitialZoom(initialDepartment);
      setActiveDep(initialDepartment);
    } else {
      setInitialZoom("");
      setActiveDep(initialDepartment);
    }
  }, [startZoom, initialDepartment]);
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="bg-changer">
        <div
          className={cx("section-bg", { active: activeDep === "es" })}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/about/es3.jpg")`,
          }}
        ></div>
        <div
          className={cx("section-bg", { active: activeDep === "ms" })}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/about/ms2.jpg")`,
          }}
        ></div>
        <div
          className={cx("section-bg", {
            active: activeDep === "dc",
            "zoom-eff": initialZoom === "dc",
          })}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/about/dc.jpg")`,
          }}
        ></div>
        <div
          className={cx("section-bg", { active: activeDep === "mm" })}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/about/mm3.jpg")`,
          }}
        ></div>
        <div
          className={cx("section-bg", { active: activeDep === "hp" })}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/about/hp.jpg")`,
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-2 row">
          <div className="text-center justify-content-center row">
            <div className="col-lg-10 z-inf">
              <h4 className="index-header f-700 text-white">ABOUT US</h4>
              <p className="f-medium">
                Técnico Solar Boat is a project consisting of cross-degree
                engineering students from Instituto Superior Técnico, Portugal
                that work together on the development of a solar, hydrogen and
                autonomous boat.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="item-card p-3"
              onMouseOver={() => setActiveDep("es")}
            >
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <IoBulbOutline className="icon-lg" />
                {/* <SiAtom className="icon-lg" /> */}
              </div>
              <h5 className="text-white mt-2 text-shadow index-subheader">
                Electrical Systems
              </h5>
              <p className="department-description mt-2 text-shadow">
                Energy management, hydrofoils control system, dual motor system,
                telemetry, database and autonomous driving with machine learning
                models.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="item-card p-3"
              onMouseOver={() => setActiveDep("ms")}
            >
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info ">
                <FaCogs className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow index-subheader">
                Mechanical Systems
              </h5>
              <p className="department-description mt-2 text-shadow">
                Design, simulation and production of the hydro-foil struts,
                transmission system, propulsion column and custom trailer.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="item-card p-3"
              onMouseOver={() => setActiveDep("dc")}
            >
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <GiAnchor className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow index-subheader">
                Design and Composites
              </h5>
              <p className="department-description mt-2 text-shadow">
                Design, simulation and production of every composite made
                component.
              </p>
            </div>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-4">
            <div
              className="item-card p-3"
              onMouseOver={() => setActiveDep("mm")}
            >
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <HiOutlinePresentationChartBar className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow index-subheader">
                Management and Marketing
              </h5>
              <p className="department-description mt-2 text-shadow">
                Business endeavors Resource acquisition and allocation. Business
                contracts.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="item-card p-3"
              onMouseOver={() => setActiveDep("hp")}
            >
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <SiAtom className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow index-subheader">
                Hydrogen and Fuel Cell
              </h5>
              <p className="department-description mt-2 text-shadow">
                Development of a hydrogen powered boat.
              </p>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
