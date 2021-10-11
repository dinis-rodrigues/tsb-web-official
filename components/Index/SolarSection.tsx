import React from "react";
import cx from "classnames";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { GiSpeedometer } from "react-icons/gi";
import { FaSolarPanel } from "react-icons/fa";
import { GiElectric, GiSandsOfTime } from "react-icons/gi";

import CountUp from "react-countup";
import { UncontrolledTooltip } from "reactstrap";

type Props = {
  startCount?: boolean;
};
const SolarSection = ({ startCount = false }: Props) => {
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
            backgroundImage: `url("assets/images/index/about/mm.jpg")`,
            opacity: "0.8",
          }}
        ></div>
      </div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-lg-4">
            <h4 className="display-6 f-700">SOLAR</h4>
            <hr className="divider" />
            <p className="f-medium">
              Founded in 2015, when a small group of friends/students realized
              they wanted to do more within the Naval engineering degree.
            </p>
            <p className="f-medium">
              Already counting on three built prototypes: SR 01, SR 02 and SR 03
              with which we participated in five years of international
              competitions.
            </p>{" "}
            <p className="f-medium">
              We are currently an unique project in the Iberian Peninsula. In
              July 2019 we earned the 2nd place of the Solar A class at the
              Monaco Solar and Energy Boat Challenge.
            </p>
            <p className="f-medium">
              Our latest, SR 03 features a uniquely designed dual motor system
              and three autonomous controlled hydrofoils. It&apos;s designed for
              fast and smooth cruising both at open sea and river like
              environments.
            </p>
          </div>
          {/* Space in the middle */}
          <div className="col-lg-4"></div>
          <div className="col-lg-4 d-flex align-items-center justify-center">
            <div className="row">
              <div className="col-md">
                <div className="item-card p-3" id="tooltip-1">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <RiBattery2ChargeLine className="icon-lg" />
                  </div>

                  <CountUp
                    separator={" "}
                    start={0}
                    end={1500}
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

                  <UncontrolledTooltip placement={"top"} target={"tooltip-1"}>
                    Battery Energy
                  </UncontrolledTooltip>
                </div>
              </div>
              <div className="col-md">
                <div className="item-card p-3" id="tooltip-2">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <GiSpeedometer className="icon-lg" />
                  </div>
                  <CountUp
                    separator={" "}
                    start={0}
                    end={30}
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
                  <UncontrolledTooltip placement={"top"} target={"tooltip-2"}>
                    Top Speed
                  </UncontrolledTooltip>
                </div>
              </div>
              <div className="col-md">
                <div className="item-card p-3" id="tooltip-3">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                    <FaSolarPanel className="icon-lg" />
                  </div>
                  <CountUp
                    separator={" "}
                    start={0}
                    end={1050}
                    suffix={" Wh"}
                    delay={0}
                    duration={2}
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
                  <UncontrolledTooltip placement={"top"} target={"tooltip-3"}>
                    Solar Panels Energy
                  </UncontrolledTooltip>
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-md-4">
                  <div className="item-card p-3" id="tooltip-4">
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                      <GiSandsOfTime className="icon-lg" />
                    </div>
                    <CountUp
                      separator={" "}
                      start={0}
                      end={4}
                      suffix={" h"}
                      delay={0}
                      duration={2.1}
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
                  </div>
                  <UncontrolledTooltip placement={"top"} target={"tooltip-4"}>
                    Cruise Speed Duration
                  </UncontrolledTooltip>
                </div>

                <div className="col-md-5">
                  <div className="item-card p-3" id="tooltip-5">
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                      <GiElectric className="icon-lg" />
                    </div>
                    <CountUp
                      separator={" "}
                      start={0}
                      end={15000}
                      suffix={" W"}
                      delay={0}
                      duration={2}
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
                  </div>
                  <UncontrolledTooltip placement={"top"} target={"tooltip-5"}>
                    Peak Power Output
                  </UncontrolledTooltip>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarSection;
