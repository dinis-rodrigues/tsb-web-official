import React, { useEffect } from "react";
import cx from "classnames";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { GiSpeedometer } from "react-icons/gi";
import { FaSolarPanel } from "react-icons/fa";
import { GiElectric, GiSandsOfTime } from "react-icons/gi";

import CountUp from "react-countup";
import { UncontrolledTooltip } from "reactstrap";
import { useAnimate, useAnimateGroup } from "react-simple-animate";
import { TooltipIconItems } from "../../interfaces";

type Props = {
  startCount?: boolean;
};
const SolarSection = ({ startCount = false }: Props) => {
  const GROUP_ANIMATION_DURATION_INTERVAL = 0.6;

  const { play, style } = useAnimate({
    start: { transform: "translateX(-5%)", opacity: 0.4 },
    end: { transform: "translateX(0%)", opacity: 1 },
    duration: 1,
  });

  const tooltipItems: TooltipIconItems[] = [
    {
      icon: <RiBattery2ChargeLine className="icon-lg" />,
      tooltip: "Battery Energy",
      tooltipTarget: "tooltip-1",
      counter: true,
      counterStart: 100,
      counterEnd: 1500,
      counterDelay: 0,
      suffix: " Wh",
      duration: 2.3,
    },
    {
      icon: <GiSpeedometer className="icon-lg" />,
      tooltip: "Top Speed",
      tooltipTarget: "tooltip-2",
      counter: true,
      counterStart: 10,
      counterEnd: 40,
      counterDelay: GROUP_ANIMATION_DURATION_INTERVAL * 1 - 0.2,
      suffix: " km/h",
      duration: 2.1,
    },
    {
      icon: <FaSolarPanel className="icon-lg" />,
      tooltip: "Solar Panels Energy",
      tooltipTarget: "tooltip-3",
      counter: true,
      counterStart: 200,
      counterEnd: 1050,
      counterDelay: GROUP_ANIMATION_DURATION_INTERVAL * 2 - 0.2,
      suffix: " Wp",
      duration: 2.6,
    },
    {
      icon: <GiSandsOfTime className="icon-lg" />,
      tooltip: "Cruise Speed Duration",
      tooltipTarget: "tooltip-4",
      counter: true,
      counterStart: 0,
      counterEnd: 4,
      counterDelay: GROUP_ANIMATION_DURATION_INTERVAL * 3 - 0.2,
      suffix: " h",
      duration: 1.9,
    },
    {
      icon: <GiElectric className="icon-lg" />,
      tooltip: "Peak Power Output",
      tooltipTarget: "tooltip-5",
      counter: true,
      counterStart: 1000,
      counterEnd: 10000,
      counterDelay: GROUP_ANIMATION_DURATION_INTERVAL * 4 - 0.2,
      suffix: " W",
      duration: 3,
    },
  ];

  const { play: playGroup, styles: stylesGroup } = useAnimateGroup({
    sequences: tooltipItems.map(() => ({
      start: { opacity: 0, transform: "translateY(5%)" },
      end: { opacity: 1, transform: "translateY(0%)" },
      duration: GROUP_ANIMATION_DURATION_INTERVAL,
    })),
  });

  useEffect(() => {
    startCount && play(true);
    startCount && playGroup(true);
  }, [play, playGroup, startCount]);

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
          className={cx("section-bg", { active: startCount })}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/about/mm.jpg")`,
            opacity: "0.8",
          }}
        ></div>
      </div>
      <div className="container mobile-top-margin">
        <div className="row">
          <div className="col-lg-4 z-inf">
            <h4 className="index-header f-700" style={style}>
              SOLAR
            </h4>
            <hr className="divider" />
            <div className="f-medium">
              <p>
                Founded in 2015, when a small group of friends/students realized
                they wanted to do more within the Naval engineering degree.
              </p>
              <p>
                Already counting on three built prototypes: SR01, SR02 and SR03 
                with which we participated in five years of international 
                competitions.
              </p>{" "}
              <p>
                We are currently a unique project in the Iberian Peninsula. In
                July 2019 we earned the 2nd place of the Solar A class at the
                Monaco Solar and Energy Boat Challenge.
              </p>
              <p>
                Our latest, SR03, features three autonomous controlled hydrofoils.
                It&apos;s designed for fast and smooth cruising both at open sea 
                and still water environments. In 2022, SR03 finished 3rd in the Solar 
                class at Monaco Energy Boat Challenge.
              </p>
            </div>
          </div>
          {/* Space in the middle */}
          <div className="col-lg-4"></div>
          <div className="col-lg-4 d-flex align-items-center">
            <div className="row  justify-content-center">
              {tooltipItems.map((item, index) => (
                <div
                  className="col-6 col-md-4"
                  key={index}
                  style={stylesGroup[index]!}
                >
                  <div className="item-card p-3" id={item.tooltipTarget}>
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                      {item.icon}
                    </div>
                    {item.counter ? (
                      <CountUp
                        separator={" "}
                        start={item.counterStart}
                        end={item.counterEnd ? item.counterEnd : 0}
                        suffix={item.suffix}
                        delay={item.counterDelay}
                        duration={item.duration}
                      >
                        {({ countUpRef, start }) => {
                          startCount && start();
                          return (
                            <h5 className="text-white index-subheader mt-2 text-shadow">
                              <span ref={countUpRef}></span>
                            </h5>
                          );
                        }}
                      </CountUp>
                    ) : (
                      <h5 className="text-white index-subheader mt-2 text-shadow">
                        {item.title}
                      </h5>
                    )}
                    <UncontrolledTooltip
                      placement={"top"}
                      target={item.tooltipTarget}
                    >
                      {item.tooltip}
                    </UncontrolledTooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarSection;
