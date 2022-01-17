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
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../Contexts/Firebase";

type Props = {
  userInfo: PublicUserInfo;
  userId: string;
};

const TeamMember = ({ userInfo, userId }: Props) => {
  const [userDbInfo, setUserDbInfo] = useState<PublicUserInfo>();

  useEffect(() => {
    get(ref(db, `/public/officialWebsite/team/${userId}/info`)).then(
      (snapshot) => {
        const userData: PublicUserInfo = snapshot.val();
        if (!userData) return;
        setUserDbInfo(userData);
      }
    );
  }, [userId]);
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
                    <span className="text-info">
                      {userDbInfo && userDbInfo.name}
                    </span>
                  </h1>
                </div>
                <div className="header-sub-text">
                  <h4 className="font-secondary text-secundary">
                    {userDbInfo && userDbInfo.position}
                    {" · "}
                    <span className="text-info">
                      {userDbInfo && userDbInfo.department}
                    </span>
                    {" · "}
                    {getAge(
                      userDbInfo && userDbInfo.birth ? userDbInfo.birth : ""
                    )}
                    yo
                  </h4>
                  <h5>
                    {getProfileJoinedInInfo(
                      userDbInfo && userDbInfo.joinedIn
                        ? userDbInfo.joinedIn
                        : "",
                      userDbInfo && userDbInfo.leftIn
                    )}
                  </h5>
                </div>
                {userDbInfo && userDbInfo.description && (
                  <div className="header-sub-text">
                    <div className="header-sub-text">
                      <h5 className="text-hash text-uppercase text-secondary">
                        # Description
                      </h5>
                      <span style={{ fontSize: "1rem" }}>
                        {userDbInfo && userDbInfo.description}
                      </span>
                    </div>
                    <p className="font-secondary font-large"></p>
                  </div>
                )}
                <div className="link-horizontal">
                  {userDbInfo && userDbInfo.linkedin && (
                    <Link href={userDbInfo && userDbInfo.linkedin} passHref>
                      <button
                        className="btnd btnd-info"
                        style={{ marginRight: "1rem" }}
                      >
                        Linkedin
                      </button>
                    </Link>
                  )}
                  <Link href={"/#team"} passHref>
                    <button className="btnd btnd-dark">Go back to Team</button>
                  </Link>
                </div>
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
                <span className="text-info">
                  {userDbInfo && userDbInfo.name}
                </span>
              </h1>
            </div>
            <div className="header-sub-text">
              <h4 className="font-secondary text-secundary">
                {userDbInfo && userDbInfo.position}
                {" · "}
                <span className="text-info">
                  {userDbInfo && userDbInfo.department}
                </span>
                {" · "}
                {getAge(userDbInfo && userDbInfo.birth ? userDbInfo.birth : "")}
                yo
              </h4>
              <h5>
                {getProfileJoinedInInfo(
                  userDbInfo?.joinedIn ? userDbInfo?.joinedIn : "",
                  userDbInfo?.leftIn ? userDbInfo?.leftIn : ""
                )}
              </h5>
            </div>
            {userInfo.description && (
              <div className="header-sub-text">
                <div className="header-sub-text">
                  <h5 className="text-hash text-uppercase text-dark">
                    # Description
                  </h5>
                  {userDbInfo?.description}
                </div>
                <p className="font-secondary font-large"></p>
              </div>
            )}
            <div className="link-horizontal">
              {userDbInfo && userDbInfo.linkedin && (
                <Link href={userDbInfo && userDbInfo.linkedin} passHref>
                  <button
                    className="btnd btnd-info"
                    style={{ marginRight: "1rem" }}
                  >
                    Linkedin
                  </button>
                </Link>
              )}
              <Link href={"/#team"} passHref>
                <button className="btnd btnd-dark">Go back to Team</button>
              </Link>
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
