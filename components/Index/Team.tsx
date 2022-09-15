import cx from "classnames";
import { useEffect, useRef, useState } from "react";
import { DepartmentTab, PublicTeam } from "../../interfaces";

import {
  getTeamToDisplay,
  returnSortedByPositionTeam,
  toggleActiveDepartment,
} from "../utils/generalFunctions";

type Props = {
  onBottomScroll: Function;
};

const Team = ({ onBottomScroll }: Props) => {
  const [publicTeam, setPublicTeam] = useState<PublicTeam>();
  const [teamNumber, setTeamNumber] = useState(0);
  const [teamToDisplay, setTeamToDisplay] = useState<PublicTeam>();
  const [departmentTabs, setDepartmentTabs] = useState<DepartmentTab[]>();

  const listInnerRef = useRef(null);
  useEffect(() => {
    getTeamToDisplay(
      setPublicTeam,
      setTeamToDisplay,
      setDepartmentTabs,
      setTeamNumber
    );
  }, []);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        onBottomScroll();
      }
    }
  };
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
          className={cx("section-bg active overlay")}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/index/teamPhoto.jpg")`,
            opacity: "0.2",
          }}
        ></div>
      </div>
      <div className="container nav-margin">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <h4 className="index-header f-700">OUR TEAM</h4>
            <p className="f-medium">
              Only with strong, inspiring, and creative minds can we keep coming
              up with new and inventive solutions. These are the {teamNumber}{" "}
              incredible people that make all this possible.
            </p>
            {departmentTabs?.map((dep, idx) => (
              <span
                className={cx("department-tab", { active: dep.active })}
                key={idx}
                onClick={() => {
                  toggleActiveDepartment(
                    publicTeam,
                    dep.name,
                    departmentTabs,
                    setDepartmentTabs,
                    setTeamToDisplay
                  );
                }}
              >
                {dep.name}
              </span>
            ))}
            <hr className="divider" />
            <div className="row">
              <div className="col-1"></div>
              <div className="col">
                {/* <PerfectScrollbar style={{ height: "50%" }}> */}
                <div
                  className="scrollable-team disable-scrollbars"
                  ref={listInnerRef}
                  onScroll={() => onScroll()}
                >
                  <div className="row">
                    {teamToDisplay && returnSortedByPositionTeam(teamToDisplay)}
                  </div>
                </div>

                {/* </PerfectScrollbar> */}
              </div>

              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Team;
