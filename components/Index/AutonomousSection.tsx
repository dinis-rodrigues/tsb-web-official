import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import MlSection from "../ML/MlSection";
import { useAnimate } from "react-simple-animate";

type Props = {
  playVideo?: boolean;
};
const AutonomousSection = ({ playVideo = false }: Props) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [toggleMl, setToggleMl] = useState(false);
  useEffect(() => {
    if (vidRef.current) {
      playVideo ? vidRef.current.play() : vidRef.current.pause();
      playVideo ? play(true) : play(false);
    }
  }, [playVideo]); // eslint-disable-line react-hooks/exhaustive-deps

  const { play, style } = useAnimate({
    start: { transform: "translateX(-5%)", opacity: 0.4 },
    end: { transform: "translateX(0%)", opacity: 1 },
    duration: 1,
  });

  return (
    <div
      className="section"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div
        className="bg-changer z-minus"
        style={{
          opacity: 0.5,
          transform: "scale(1, -1)",
        }}
      >
        <video
          src="assets/images/index/about/ai.mov"
          className="video-bg"
          ref={vidRef}
          autoPlay
          loop
        ></video>
      </div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-lg-4 ">
            <div>
              <h4 className="display-6 f-700" style={style}>
                AUTONOMOUS
              </h4>
              <hr className="divider" />
              <p className="f-medium">
                Artificial intelligence is changing the way we live our lives;
                it is everywhere and here to stay. Machine learning is a branch
                of artificial intelligence that allows software models to become
                more accurate at predicting outcomes without being explicitly
                programmed to do so. These models are trained upon historical
                data and can become extremely powerful in a variety of
                scenarios.
              </p>
              <p className="f-medium">
                In 2021 we took part in the The NJord - Autonomous Ship
                Challenge. It&apos;s a unique, international student
                competition, where participants are tasked with designing and
                building an autonomous ship.
              </p>
              <p className="f-medium">
                This first edition was fully digital and we achieved an
                incredible second place. This is a big step to one of our future
                goals: to develop an autonomous vessel, so that we can test our
                boats without the risk of harming the pilot!
              </p>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div
            className={cx("col-md align-items-center justify-content-center", {
              "d-flex": !toggleMl,
            })}
          >
            <MlSection setToggleMl={setToggleMl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousSection;
