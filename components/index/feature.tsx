import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import { Controller, Scene } from "react-scrollmagic";

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

const Feature = () => {
  const [height, setHeight] = useState(0);
  const vidRef = useRef() as MutableRefObject<HTMLVideoElement>;

  useEffect(() => {
    let cheight = document.getElementById("sec")?.clientHeight;
    setHeight(cheight ? cheight : 0);
  }, []);
  return (
    <Controller>
      <Scene duration={height} indicators triggerHook={0.6}>
        {(progress: any, event: any) => {
          updateProgress(progress, vidRef);

          return (
            <section className="saas2 feature booking" id="feaure">
              <Container id="feature">
                <Row>
                  <Col md="10" className="offset-md-1">
                    <div className="title">
                      <div className="main-title">
                        <h2>Advance Features</h2>
                      </div>
                      <div className="sub-title">
                        <p className="sub-title-para">
                          We believe we have created the most efficient SaaS
                          landing page for your users. Landing page with
                          features that will convince you to use it for your
                          SaaS business.
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col xl="8" md="7">
                    <div className="center-text justify-content-center">
                      <div className="center-content center-mobile">
                        {/* <Image alt="" className="img-fluid" src="/assets/images/app_landing1/mobile.png" width={"100%"} height={"100%"}/> */}
                        <video
                          ref={vidRef}
                          src="/assets/video/gearbox.mp4"
                          width="80%"
                        ></video>
                      </div>
                    </div>
                  </Col>
                  <Col xl="4" md="5">
                    <div>
                      <div className="center-content justify-content-start">
                        <img
                          alt=""
                          className="img-fluid"
                          src="/assets/images/saas2/advance-feature/1.png"
                        />
                        <div className="feature-content">
                          <h5 className="feature-head">Clean Design</h5>
                          <p className="feature-para">
                            Lorem Ipsum is simply dummy text of the printing and
                            industry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="center-content justify-content-start">
                        <img
                          alt=""
                          className="img-fluid"
                          src="/assets/images/saas2/advance-feature/2.png"
                        />
                        <div className="feature-content">
                          <h5 className="feature-head">Dedicated Support</h5>
                          <p className="feature-para">
                            Lorem Ipsum is simply dummy text of the printing and
                            industry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="center-content justify-content-start">
                        <img
                          alt=""
                          className="img-fluid"
                          src="/assets/images/saas2/advance-feature/3.png"
                        />
                        <div className="feature-content">
                          <h5 className="feature-head">Easy Customiable</h5>
                          <p className="feature-para">
                            Lorem Ipsum is simply dummy text of the printing and
                            industry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="center-content justify-content-start">
                        <img
                          alt=""
                          className="img-fluid"
                          src="/assets/images/saas2/advance-feature/4.png"
                        />
                        <div className="feature-content">
                          <h5 className="feature-head">Multiple Demo</h5>
                          <p className="feature-para">
                            Lorem Ipsum is simply dummy text of the printing and
                            industry.
                          </p>
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

export default Feature;
