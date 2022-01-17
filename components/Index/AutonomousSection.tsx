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
    start: { transform: "translateX(-5%)", opacity: 0 },
    end: { transform: "translateX(0%)", opacity: 1 },
    duration: 1,
  });

  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div
        className="bg-changer"
        style={{
          opacity: 0.5,
          transform: "scale(1, -1)",
        }}
      >
        <video
          src={`${process.env.BASE_PATH}/assets/images/index/about/ai.mov`}
          className="video-bg"
          ref={vidRef}
          autoPlay
          loop
        ></video>
      </div>
      <div className="container">
        <div className="row mt-2">
          <div
            className={cx("col-lg-4 d-flex align-items-center z-inf", {
              "d-none": toggleMl,
            })}
          >
            <div>
              <h2 className="index-header f-700" style={style}>
                AUTONOMOUS
              </h2>
              <hr className="divider" />
              <div className="f-medium">
                <p>
                  Artificial intelligence is changing the way we live our lives;
                  it is everywhere and here to stay. In 2021 we took part in the
                  The NJord - Autonomous Ship Challenge. It&apos;s a unique,
                  international student competition, where participants are
                  tasked with designing and building an autonomous ship.
                </p>
                <p>
                  This first edition was fully digital and we achieved an
                  incredible second place. This is a big step to one of our
                  future goals: to develop an autonomous vessel, so that we can
                  test our boats without the risk of harming the pilot!
                </p>
              </div>
            </div>
          </div>

          <div
            className={cx(
              "col-md align-items-center justify-content-center z-inf",
              {
                "d-flex": !toggleMl,
              }
            )}
          >
            <MlSection setToggleMl={setToggleMl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousSection;
