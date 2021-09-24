import React, {
  ClassAttributes,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import AOS from "aos";
import Image from "next/image";
import "aos/dist/aos.css";
import { Container, Row, Col } from "reactstrap";
import { getUserBrowser } from "../../utils/generalFunctions";
import { Controller, Scene } from "react-scrollmagic";

const Download = () => {
  const vidRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const [height, setHeight] = useState(0);
  // const browser = getUserBrowser();
  const [browser, setBrowser] = useState("Unknown");
  const [currFrame, setCurrFrame] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 5000,
    });
    let currBrowser = getUserBrowser();
    let cheight = document.getElementById("sec")?.clientHeight;
    setHeight(cheight ? cheight : 0);
    setBrowser(currBrowser);
  }, []);

  const nextFrame = (vidRef: MutableRefObject<HTMLVideoElement>) => {
    const frameTime = 1 / 30;
    vidRef.current.currentTime = Math.min(
      vidRef.current.duration,
      vidRef.current.currentTime + frameTime
    );
  };

  const updateProgress = (
    progress: number,
    vidRef: MutableRefObject<HTMLVideoElement>
  ) => {
    if (vidRef.current) {
      vidRef.current.currentTime = Math.min(
        vidRef.current.duration,
        vidRef.current.duration * progress
      );
    }
  };

  return (
    <Controller>
      <Scene duration={height} indicators triggerHook={0.6}>
        {(progress: any, event: any) => {
          updateProgress(progress, vidRef);

          return (
            <section id="sec" className="app1 download">
              <Container>
                <Row>
                  <Col lg="5" md="6">
                    <div className="center-content center-mobile">
                      {/* <Image alt="" className="img-fluid" src="/assets/images/app_landing1/mobile.png" width={"100%"} height={"100%"}/> */}
                      <video
                        ref={vidRef}
                        src="/assets/video/gearbox.mp4"
                        width="80%"
                      ></video>
                    </div>
                  </Col>
                  {/* <button
            onClick={() => {
              // let newFrame = parseFloat(Number(currFrame + 0.1).toFixed(2));
              // browser === "Safari"
              //   ? vidRef.current.fastSeek(newFrame)
              //   : (vidRef.current.currentTime = newFrame);
              // console.log(newFrame);
              // setCurrFrame(newFrame);
              nextFrame(vidRef);
            }}
          >
            click me
          </button> */}
                  <Col lg="6" md="6" className="offset-lg-1">
                    <div className="center-text">
                      <div>
                        <div className="download-img">
                          <div className="set-relative">
                            <Image
                              alt=""
                              className="download-icon img-fluid"
                              src="/assets/images/app_landing1/download/download.png"
                              width={"100%"}
                              height={"100%"}
                            />
                            <div className="set-abs elipse center-abs">
                              <Image
                                alt=""
                                src="/assets/images/app_landing1/download/Ellipse.png"
                                width={"100%"}
                                height={"100%"}
                              />
                            </div>
                          </div>
                          <div className="center-img-content m-l-15">
                            <h3 className="m-b-5">{"ola"}</h3>
                            <p>the Unice</p>
                          </div>
                        </div>
                        <div className="information">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor unt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            ercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa.
                          </p>
                        </div>
                        <div className="link-horizontal">
                          <ul>
                            <li>
                              <a className="icon-btn">
                                <i
                                  aria-hidden="true"
                                  className="fa fa-android center-content shadow"
                                ></i>
                                <h6 className="text-center font-primary">
                                  android
                                </h6>
                              </a>
                            </li>
                            <li>
                              <a className="icon-btn">
                                <i
                                  aria-hidden="true"
                                  className="fa fa-apple center-content shadow"
                                ></i>
                                <h6 className="text-center font-primary">
                                  ios
                                </h6>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          );
        }}
      </Scene>
    </Controller>
  );
};

export default Download;
