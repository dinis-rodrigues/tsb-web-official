import { db } from "../Contexts/Firebase";
import { ref, get } from "@firebase/database";
import { DepartmentTab, PublicTeam } from "../../interfaces";
import { Dispatch, SetStateAction } from "react";
import TeamImage from "../Images/TeamImage";

/** Transforms the date string into Date Object
 * @param  {string} date dd/mm/yyy or dd-mm-yyyy
 * @return {Date Object}
 */
const inputToDate = (date: string) => {
  if (!date) {
    return new Date();
  }
  let splitter = "";
  if (date.includes("/")) {
    splitter = "/";
  } else if (date.includes("-")) {
    splitter = "-";
  } else {
    // console.log("Incorrect date format");
    return new Date();
  }
  const arr: Array<string> = date.split(splitter);
  if (arr.length <= 1) {
    // when the state is initializing, the date doesn't exist yet
    return new Date();
  }
  const year = parseInt(arr[2]);
  const month = parseInt(arr[1]) - 1;
  const day = parseInt(arr[0]);
  return new Date(year, month, day);
};

/** Retrieves the profile image path based on the User ID
 * @param  {string} id User id
 * @param  {any} firebaseStorage firebase storage object
 * @param  {boolean} compressed returns the compressed image path or not
 * @return {string} image path
 */
const getUserImgUrl = (id: string, compressed: boolean = false) => {
  const baseUrl = "https://tsb.tecnico.ulisboa.pt";
  if (compressed) {
    return baseUrl + `/db/users/${id}/img/${id}comp.png`;
  } else {
    return baseUrl + `/db/users/${id}/img/${id}.png`;
  }
};

/**
 * Gets number of active team members
 * @param publicTeamDb
 * @returns
 */
const getNumberOfActiveMembers = (publicTeamDb: PublicTeam) => {
  let teamNum = 0;
  Object.entries(publicTeamDb).forEach(([, user]) => {
    if (user.info.inTeam) teamNum++;
  });
  return teamNum;
};

/**
 * Gets only in Team users
 * @param publicTeamDb
 * @returns
 */
const getOnlyMemberInTeam = (publicTeamDb: PublicTeam) => {
  // Filter now the corresponding team members of the department
  const onlyInTeam: PublicTeam = {};
  Object.entries(publicTeamDb).forEach(([userId, user]) => {
    if (user.info.inTeam) onlyInTeam[userId] = user;
  });
  return onlyInTeam;
};

/**
 * Retrieves all team members to display in team section
 * @param setPublicTeam
 * @param setTeamToDisplay
 * @param setDepartmentTabs
 * @param setTeamNumber
 */
const getTeamToDisplay = (
  setPublicTeam: Dispatch<SetStateAction<PublicTeam | undefined>>,
  setTeamToDisplay: Dispatch<SetStateAction<PublicTeam | undefined>>,
  setDepartmentTabs: Dispatch<SetStateAction<DepartmentTab[] | undefined>>,
  setTeamNumber: Dispatch<SetStateAction<number>>
) => {
  // Retrieve public team information from DB
  get(ref(db, "public/officialWebsite/team"))
    .then((snapshot) => {
      const publicTeamDb: PublicTeam = snapshot.val();
      if (!publicTeamDb) return;
      setPublicTeam(publicTeamDb);

      const onlyInTeam = getOnlyMemberInTeam(publicTeamDb);
      setTeamToDisplay(onlyInTeam);

      const teamNum = getNumberOfActiveMembers(publicTeamDb);
      setTeamNumber(teamNum);
      // Update existing departments for the tabs to choose from
      getTeamDepartments(publicTeamDb, setDepartmentTabs);
    })
    .catch((err) => console.log(err));
};

/**
 * Gets all unique departments to display in team section
 * @param publicTeamDb
 * @param setDepartmentTabs
 */
const getTeamDepartments = (
  publicTeamDb: PublicTeam,
  setDepartmentTabs: Dispatch<SetStateAction<DepartmentTab[] | undefined>>
) => {
  const tabs = [{ name: "All", active: true }];

  // Get all departments
  const departments = Object.entries(publicTeamDb).map(
    ([, user]) => user.info.department
  );
  // get all unique departments
  const uniqueDepartments = departments.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  uniqueDepartments.sort();
  // Create the department tabs object
  uniqueDepartments.forEach((dep) => tabs.push({ name: dep, active: false }));
  setDepartmentTabs(tabs);
};

/**
 *
 * @param publicTeam
 * @param department
 * @param departmentTabs
 * @param setDepartmentTabs
 * @param setTeamToDisplay
 * @returns
 */
const toggleActiveDepartment = (
  publicTeam: PublicTeam | undefined,
  department: string,
  departmentTabs: DepartmentTab[],
  setDepartmentTabs: Dispatch<SetStateAction<DepartmentTab[] | undefined>>,
  setTeamToDisplay: Dispatch<SetStateAction<PublicTeam | undefined>>
) => {
  if (!publicTeam) return;
  const newTabs = departmentTabs.map((dep) => {
    let isActive = false;
    if (department === dep.name) isActive = true;
    return { name: dep.name, active: isActive };
  });
  setDepartmentTabs(newTabs);

  // Filter now the corresponding team members of the department
  const newTeamToDisplay: PublicTeam = {};
  Object.entries(publicTeam).forEach(([userId, user]) => {
    if (
      (user.info.department === department || department === "All") &&
      user.info.inTeam
    )
      newTeamToDisplay[userId] = user;
  });
  setTeamToDisplay(newTeamToDisplay);
};

/**
 * Sorts team members based on position and joinedIn date
 * @param teamToDisplay
 * @returns
 */
const sortTeaMembers = (teamToDisplay: PublicTeam) => {
  const adminPositions = [
    "Team Leader",
    "Head of Department",
    "Technical Director",
  ];
  const usersList = Object.entries(teamToDisplay).map((userObj) => userObj);
  console.log(usersList);
  return usersList.sort((a, b) => {
    let userA = a[1].info;
    let userB = b[1].info;

    // Check if users has the max position
    let idxA = adminPositions.indexOf(userA.position);
    let idxB = adminPositions.indexOf(userB.position);

    // non-admin position gets a larger index, auxiliary for sorting
    if (idxA === -1) idxA = 1000;
    if (idxB === -1) idxB = 1000;

    // Sort by entry date if they have the same position
    if (idxA === idxB) {
      if (inputToDate(userA.joinedIn) > inputToDate(userB.joinedIn)) return 1;
      if (inputToDate(userA.joinedIn) < inputToDate(userB.joinedIn)) return -1;
      return 0;
    } else if (idxA < idxB) return -1;
    else if (idxA > idxB) return 1;
    else return 0;
  });
};

/**
 * Retrieves sorted JSX Team Elements
 * @param teamToDisplay
 * @returns
 */
const returnSortedByPositionTeam = (teamToDisplay: PublicTeam) => {
  const usersList = sortTeaMembers(teamToDisplay);
  return usersList.map(([userId, user]) => {
    return (
      <div className="col mb-2" key={userId}>
        <TeamImage
          src={getUserImgUrl(userId)}
          name={user.info.name}
          department={user.info.department}
          position={user.info.position}
        />
      </div>
    );
  });
};

export {
  getUserImgUrl,
  getTeamToDisplay,
  toggleActiveDepartment,
  returnSortedByPositionTeam,
  inputToDate,
};
