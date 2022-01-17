import React from "react";

import { BsGearFill } from "react-icons/bs";
import { GiPartyPopper, GiMicroscope, GiDna1 } from "react-icons/gi";
import { IoHammerSharp } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { CgCrown } from "react-icons/cg";
import GlowingStars from "../Animations/GlowingStars";

const RecruitmentIntro = () => {
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      {/* <div className="bg-changer">
        <div
          className={cx("section-bg active")}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/textures/black.jpg")`,
            opacity: "0.4",
          }}
        ></div>
      </div> */}
      <div className="container text-white">
        <div className="row">
          <div className="col-sm-12 col-lg-5 mr-auto text-left d-flex align-items-center z-inf">
            <div className="pr-md-5">
              <div className="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle mb-5">
                {/* <AiFillHeart /> */}
              </div>
              <h3 className="recruitment-heading mb-3">
                AWESOME OPPORTUNITIES
              </h3>
              <div className="recruitment-intro-p f-medium">
                <p>
                  In Técnico Solar Boat you will be encouraged to find your own
                  path of success.
                </p>
                <p>
                  We are looking for people who are passionate about the field
                  of renewable energies and who are willing to learn and grow.
                </p>
                <p>
                  Within you will find a wide range of opportunities that we are
                  currently developing such as:
                </p>
              </div>
              <ul className="list-unstyled mt-5">
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <span className="badge-circle mr-3 badge badge-info">
                        <BsGearFill />
                      </span>
                    </div>
                    <div>
                      <h6 className="mb-0">Solar Powered Vessel</h6>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <span className="badge-circle mr-3 badge badge-info">
                        <BsGearFill />
                      </span>
                    </div>
                    <div>
                      <h6 className="mb-0">Hydrogen Powered Vessel</h6>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <span className="badge-circle mr-3 badge badge-info">
                        <BsGearFill />
                      </span>
                    </div>
                    <div>
                      <h6 className="mb-0">Autonomous Vessel</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 perspective-transform hide-mobile">
            <div className="row">
              <div className="col-md-4 col-sm-2">
                <div className="info text-left bg-info shadow">
                  <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-info hide-medium-screen">
                    <GiDna1 className="icon-md" />
                  </div>
                  <h5 className="info-title text-white index-subheader">
                    Technology
                  </h5>
                  <p className="description f-medium">
                    We will be developing state-of-the art technologies and
                    pushing the boundaries of the current industry.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-2">
                <div className="info text-left bg-danger info-raised shadow">
                  <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-info hide-medium-screen">
                    <GiMicroscope className="icon-md" />
                  </div>
                  <h5 className="info-title text-white index-subheader">
                    Innovation
                  </h5>
                  <p className="description f-medium">
                    We endorse and employ a constructive environment. You will
                    have the opportunity to share and work on your own ideas.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-2">
                <div className="info text-left bg-default shadow">
                  <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-info hide-medium-screen">
                    <CgCrown className="icon-md" />
                  </div>
                  <h5 className="info-title text-white index-subheader">
                    Quality
                  </h5>
                  <p className="description f-medium">
                    We take pride on what we develop and showcase. We thrive to
                    achieve the highest performance in our outcomes.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-2">
                <div className="info text-left bg-primary shadow">
                  <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-info hide-medium-screen">
                    <HiSpeakerphone className="icon-md" />
                  </div>
                  <h5 className="info-title text-white index-subheader">
                    Communication
                  </h5>
                  <p className="description f-medium">
                    Develop self-awareness in you and others. By giving
                    constructive, meaningful, and timely feedback, everyone can
                    achieve and fulfil their full potential.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-2">
                <div className="info text-left bg-warning info-raised shadow">
                  <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-info hide-medium-screen">
                    <IoHammerSharp className="icon-md" />
                  </div>
                  <h5 className="info-title text-white index-subheader">
                    Proactive
                  </h5>
                  <p className="description f-medium">
                    You will have the opportunity to share and work on your own
                    ideas. Everyone has a say in the future and vision of the
                    project.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-2">
                <div className="info text-left bg-success shadow">
                  <div className="icon icon-shape bg-gradient-white shadow rounded-circle text-info hide-medium-screen">
                    <GiPartyPopper className="icon-md" />
                  </div>
                  <h5 className="info-title text-white index-subheader">
                    Team Spirit
                  </h5>
                  <p className="description f-medium">
                    What matters is the people who make this team. You will
                    encounter a great sense of accomplishment when you are
                    working with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlowingStars />
    </div>
  );
};

export default RecruitmentIntro;
