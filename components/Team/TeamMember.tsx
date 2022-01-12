import Link from "next/link";
import { PublicUserInfo } from "../../interfaces";
import BottomWaves from "../Animations/BottomWaves";
import GlowingStars from "../Animations/GlowingStars";
import Universe from "../Animations/Universe";
import ProfileImage from "../Images/ProfileImage";
import cx from "classnames";
import {
  getAge,
  getProfileJoinedInInfo,
  getUserImgUrl,
} from "../utils/generalFunctions";

type Props = {
  userInfo: PublicUserInfo;
  userId: string;
};

const TeamMember = ({ userInfo, userId }: Props) => {
  return (
    <div
      className={cx("section", {
        "bg-premium": userInfo.userName === "dinis-rodrigues",
        "bg-dark": userInfo.userName !== "dinis-rodrigues",
      })}
      style={{ fontSize: "small" }}
    >
      <div className="container stars">
        {/* This is only for large screens */}

        <div className="row hide-mobile">
          <div className="col-lg-5 col-md-6 col-sm d-flex justify-content-center align-items-center">
            <ProfileImage src={getUserImgUrl(userId)} />
          </div>
          <div className="col-lg-6 col-md-6 col-sm offset-lg-1">
            <div className="profile-header" style={{ textAlign: "left" }}>
              <div>
                <div className="header-text">
                  <h2>{"Hi, I'm"}</h2>
                  <h1>
                    <span className="text-info">{userInfo.name} </span>
                  </h1>
                </div>
                <div className="header-sub-text">
                  <h4 className="font-secondary text-secundary">
                    {userInfo.position}
                    {" · "}
                    <span className="text-info">{userInfo.department}</span>
                    {" · "}
                    {getAge(userInfo.birth)}yo
                  </h4>
                  <h5>
                    {getProfileJoinedInInfo(userInfo.joinedIn, userInfo.leftIn)}
                  </h5>
                </div>
                {userInfo.description && (
                  <div className="header-sub-text">
                    <div className="header-sub-text">
                      <h5 className="text-hash text-uppercase text-dark">
                        # Description
                      </h5>
                      {userInfo.description}
                    </div>
                    <p className="font-secondary font-large"></p>
                  </div>
                )}
                {userInfo.linkedin && (
                  <div className="link-horizontal">
                    <Link href={userInfo.linkedin} passHref>
                      <button className="btnd btnd-info">Linkedin</button>
                    </Link>
                    <Link href={"/#team"} passHref>
                      <button className="btnd btnd-dark">
                        Go back to Team
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* This is only for mobile screens */}
        <div className="row only-mobile nav-margin">
          <div className="col-12 d-flex justify-content-center">
            <ProfileImage src={getUserImgUrl(userId)} />
          </div>
          <div className="col-12">
            <div className="header-text">
              <h2>{"Hi, I'm"}</h2>
              <h1>
                <span className="text-info">{userInfo.name} </span>
              </h1>
            </div>
            <div className="header-sub-text">
              <h4 className="font-secondary text-secundary">
                {userInfo.position}
                {" · "}
                <span className="text-info">{userInfo.department}</span>
                {" · "}
                {getAge(userInfo.birth)}yo
              </h4>
              <h5>
                {getProfileJoinedInInfo(userInfo.joinedIn, userInfo.leftIn)}
              </h5>
            </div>
            {userInfo.description && (
              <div className="header-sub-text">
                <div className="header-sub-text">
                  <h5 className="text-hash text-uppercase text-dark">
                    # Description
                  </h5>
                  {userInfo.description}
                </div>
                <p className="font-secondary font-large"></p>
              </div>
            )}
            <div className="link-horizontal">
              <button className="btnd btnd-info">Linkedin</button>
            </div>
          </div>
        </div>
      </div>
      <GlowingStars />
      <BottomWaves />
      <Universe />
    </div>
  );
};

export default TeamMember;
