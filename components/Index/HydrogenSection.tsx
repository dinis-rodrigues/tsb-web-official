import cx from "classnames";
import { UncontrolledTooltip } from "reactstrap";
import { BsTrophy } from "react-icons/bs";
import { GiSpeedometer } from "react-icons/gi";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { IoLeaf } from "react-icons/io5";
import CountUp from "react-countup";

type Props = {
  startCount?: boolean;
};
const HydrogenSection = ({ startCount = false }: Props) => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="bg-changer z-minus">
        <div
          className={cx("section-bg active")}
          style={{
            backgroundImage: `url("assets/images/index/about/hp2.jpg")`,
            opacity: "0.7",
            // backgroundPosition: "center 10%",
          }}
        ></div>
      </div>
      <div className="container">
        <div className="text-center justify-content-center row">
          <div className="col-lg-4 d-flex align-items-center justify-content-center">
            <div className="row ">
              <div className="col-md">
                <div className="item-card p-3" id="hp-prize">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <BsTrophy className="icon-lg" />
                  </div>

                  <h5 className="text-white mt-2 text-shadow">1st Place</h5>
                  <UncontrolledTooltip placement={"top"} target={"hp-prize"}>
                    Innovation Prize
                  </UncontrolledTooltip>
                </div>
              </div>
              <div className="col-md">
                <div className="item-card p-3" id="hp-green">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <IoLeaf className="icon-lg" />
                  </div>

                  <h5 className="text-white mt-2 text-shadow">
                    Green Materials
                  </h5>
                  <UncontrolledTooltip placement={"top"} target={"hp-green"}>
                    Flax Fibre and eco-friendly resins
                  </UncontrolledTooltip>
                </div>
              </div>
              <div className="col-md">
                <div className="item-card p-3" id="hp-speed">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <GiSpeedometer className="icon-lg" />
                  </div>
                  <CountUp
                    separator={" "}
                    start={0}
                    end={17}
                    suffix={" km/h"}
                    delay={0}
                    duration={2.3}
                  >
                    {({ countUpRef, start }) => {
                      startCount && start();
                      return (
                        <h5 className="text-white mt-2 text-shadow">
                          <span ref={countUpRef}></span>
                        </h5>
                      );
                    }}
                  </CountUp>
                  <UncontrolledTooltip placement={"top"} target={"hp-speed"}>
                    Top Speed
                  </UncontrolledTooltip>
                </div>
              </div>
              <div className="col-md">
                <div className="item-card p-3" id="hp-energy">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <RiBattery2ChargeLine className="icon-lg" />
                  </div>
                  <CountUp
                    separator={" "}
                    start={0}
                    end={5000}
                    suffix={" Wh"}
                    delay={0}
                    duration={2.4}
                  >
                    {({ countUpRef, start }) => {
                      startCount && start();
                      return (
                        <h5 className="text-white mt-2 text-shadow">
                          <span ref={countUpRef}></span>
                        </h5>
                      );
                    }}
                  </CountUp>
                  <UncontrolledTooltip placement={"top"} target={"hp-energy"}>
                    Fuel Cell Energy
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-4 switch-order">
            <h4 className="display-6 f-700 text-white">HYDROGEN</h4>
            <hr className="divider" />
            <p className="f-medium text-white">
              Given recent advances in fuel cell technology, hydrogen has proven
              itself as a viable clean source of energy.
            </p>
            <p className="f-medium text-white">
              In 2019 we gave ourselves the challenge to start designing and
              developing a hydrogen powered vessel. Additionally we designed our
              own system for efficient hydrogen production through electrolysis.
            </p>
            <p className="f-medium text-white">
              In 2020 we won the innovation prize from Monaco Solar and Energy
              Boat Challenge for our hydrogen setup, and in 2021 our first
              catamaran prototype was completed featuring a 5 kWh fuel cell with
              flax fibre cabin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HydrogenSection;
