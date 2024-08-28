import cx from "classnames";
import { useEffect } from "react";
import CountUp from "react-countup";
import { BsTrophy } from "react-icons/bs";
import { GiSpeedometer } from "react-icons/gi";
import { IoLeaf } from "react-icons/io5";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { useAnimate, useAnimateGroup } from "react-simple-animate";
import { UncontrolledTooltip } from "reactstrap";
import { TooltipIconItems } from "../../interfaces";

type Props = {
  startCount?: boolean;
};
const HydrogenSection = ({ startCount = false }: Props) => {
  const GROUP_ANIMATION_DURATION_INTERVAL = 0.6;
  const { play, style } = useAnimate({
    start: { transform: "translateX(5%)", opacity: 0 },
    end: { transform: "translateX(0%)", opacity: 1 },
    duration: 1,
  });

  const tooltipItems: TooltipIconItems[] = [
    {
      icon: <BsTrophy className="icon-lg" />,
      title: "1st Place",
      tooltip: "Innovation Prize",
      tooltipTarget: "tooltip-6",
    },
    {
      icon: <IoLeaf className="icon-lg" />,
      title: "Green Materials",
      tooltip: "Flax Fibre and eco-friendly resins",
      tooltipTarget: "tooltip-7",
    },
    {
      icon: <GiSpeedometer className="icon-lg" />,
      tooltip: "Top Speed",
      tooltipTarget: "tooltip-8",
      counter: true,
      counterStart: 0,
      counterEnd: 17,
      counterDelay: GROUP_ANIMATION_DURATION_INTERVAL * 3 - 0.2,
      suffix: " km/h",
      duration: 2.3,
    },
    {
      icon: <RiBattery2ChargeLine className="icon-lg" />,
      tooltip: "Fuel Cell Power",
      tooltipTarget: "tooltip-9",
      counter: true,
      counterStart: 0,
      counterEnd: 5000,
      counterDelay: GROUP_ANIMATION_DURATION_INTERVAL * 4 - 0.2,
      suffix: " W",
      duration: 2.4,
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
  }, [startCount]);
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
            backgroundImage: `radial-gradient(transparent, black),url("/assets/images/index/about/SM01_2023.jpg")`,
            opacity: "0.7",
            // backgroundPosition: "center 10%",
          }}
        ></div>
      </div>
      <div className="container">
        <div className="text-center justify-content-center row">
          <div className="col-lg-4 d-flex align-items-center justify-content-center">
            <div className="row ">
              {tooltipItems.map((item, index) => (
                <div className="col-6 col-md" key={index} style={stylesGroup[index]!}>
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
                      <h5 className="text-white index-subheader mt-2 text-shadow">{item.title}</h5>
                    )}
                    <UncontrolledTooltip placement={"top"} target={item.tooltipTarget}>
                      {item.tooltip}
                    </UncontrolledTooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-4 switch-order z-inf">
            <h4 className="index-header f-700 text-white" style={style}>
              HYDROGEN
            </h4>
            <hr className="divider" />
            <p className="f-medium text-white">
              Given recent advances in fuel cell technology, hydrogen has proven itself as a viable
              clean source of energy.
            </p>
            <p className="f-medium text-white">
              In 2019 we gave ourselves the challenge to start designing and developing a hydrogen
              powered vessel. Additionally we designed our own system for efficient hydrogen
              production through electrolysis.
            </p>
            <p className="f-medium text-white">
              In 2020 we won the innovation prize from Monaco Solar and Energy Boat Challenge for
              our hydrogen setup, and in 2021 our first catamaran prototype was completed featuring
              a 5 kW fuel cell with flax fibre cabin. In 2022, we were awarded the Innovation Prize
              at Monaco Energy Boat Challenge for our improvements to the hydrogen systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HydrogenSection;
