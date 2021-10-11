import cx from "classnames";
import { useEffect, useState } from "react";
import { DepartmentTab, PublicTeam } from "../../interfaces";

import {
  getTeamToDisplay,
  returnSortedByPositionTeam,
  toggleActiveDepartment,
} from "../utils/generalFunctions";
const Team = () => {
  const [publicTeam, setPublicTeam] = useState<PublicTeam>();
  const [teamNumber, setTeamNumber] = useState(0);
  const [teamToDisplay, setTeamToDisplay] = useState<PublicTeam>();
  const [departmentTabs, setDepartmentTabs] = useState<DepartmentTab[]>();
  useEffect(() => {
    getTeamToDisplay(
      setPublicTeam,
      setTeamToDisplay,
      setDepartmentTabs,
      setTeamNumber
    );
  }, []);
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
            backgroundImage: `linear-gradient(0deg,rgba(17,12,71,.7),rgba(17,12,71,.7)),url("assets/images/index/teamPhoto.jpg")`,
            opacity: "0.8",
          }}
        ></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h4 className="display-6 f-700">OUR TEAM</h4>
            <p className="f-medium">
              Only with strong, inspiring, and creative minds can we keep coming
              up with new and inventive solutions. These are the {teamNumber}{" "}
              incredible people that make all this possible.
            </p>
            {departmentTabs?.map((dep) => (
              <span
                className={cx("department-tab", { active: dep.active })}
                key={dep.name}
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
                <div className="scrollable-team">
                  <div className="row">
                    {teamToDisplay && returnSortedByPositionTeam(teamToDisplay)}
                  </div>
                </div>

                {/* </PerfectScrollbar> */}
              </div>

              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
