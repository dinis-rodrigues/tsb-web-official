import { get, ref } from "firebase/database";
import { ImageLoader, ImageLoaderProps } from "next/image";
import Link from "next/link";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { NumberFormatValues } from "react-number-format";
import { v4 as uuid } from "uuid";
import {
  DepartmentTab,
  Departments,
  PublicTeam,
  RecruitmentDepartmentsForm,
  RecruitmentFormInfo,
} from "../../interfaces";
import { db } from "../Contexts/Firebase";
import TeamImage from "../Images/TeamImage";

/** Transforms the date string into Date Object
 * @param  {string} date dd/mm/yyy or dd-mm-yyyy
 * @return {Date Object}
 */
const inputToDate = (date: string | number) => {
  if (!date) {
    return new Date();
  }
  if (typeof date === "string") {
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
  }
  if (typeof date === "number") {
    // then it is a timestamp
    return new Date(date);
  }
  return new Date();
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
    return `${baseUrl}/db/users/${id}/img/${id}comp.png`;
  }
  return `${baseUrl}/db/users/${id}/img/${id}.png`;
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
  setTeamNumber: Dispatch<SetStateAction<number>>,
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
  setDepartmentTabs: Dispatch<SetStateAction<DepartmentTab[] | undefined>>,
) => {
  const tabs = [{ name: "All", active: true }];

  // Get all departments
  const departments = Object.entries(publicTeamDb).map(([, user]) => user.info.department);
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
  setTeamToDisplay: Dispatch<SetStateAction<PublicTeam | undefined>>,
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
    if ((user.info.department === department || department === "All") && user.info.inTeam)
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
  const adminPositions = ["Team Leader", "Head of Department", "Technical Director"];
  const usersList = Object.entries(teamToDisplay).map((userObj) => userObj);
  return usersList.sort((a, b) => {
    const userA = a[1].info;
    const userB = b[1].info;

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
    }
    if (idxA < idxB) return -1;
    if (idxA > idxB) return 1;
    return 0;
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
      <div className="col mb-2 d-flex justify-content-center" key={userId}>
        <Link href={getUserProfileLink(user.info.userName)} passHref style={{ color: "white" }}>
          <TeamImage
            src={getUserImgUrl(userId)}
            name={user.info.name}
            department={user.info.department}
            position={user.info.position}
          />
        </Link>
      </div>
    );
  });
};

/**
 * Replaces the values of width or height of the svg string with 100%
 * <svg width
 * @param s
 * @param toReplace
 * @returns
 */
const replaceSVGWidthAndHeight = (s: string, toReplace: string) => {
  // The svg may come with junk html before inTopKAsync, prune all of that
  s = s.substring(s.indexOf("<svg"));

  // Check if the <svg ... > has existing width/height attribute
  const svgParentString = s.substring(s.indexOf("<svg"), s.indexOf(">"));
  const toReplaceExists = svgParentString.indexOf(toReplace) > -1;

  if (toReplaceExists) {
    const wIdx = s.indexOf(toReplace) + toReplace.length;
    // split the string into two substrings, to replace the width
    let wSubString = s.substring(0, wIdx);
    const wRest = s.substring(wIdx);
    // find the closing " of the width="..."
    const wClosingIdx = wRest.indexOf(`"`);
    const finalWSub = wRest.substring(wClosingIdx);
    // add the width 100%
    wSubString += `100%${finalWSub}`;
    // find the next "
    return wSubString;
  }
  // Insert property into <svg toReplace >
  // split the string into two substrings, to replace the width
  const initString = s.substring(0, 4);
  const restString = s.substring(4);
  if (toReplace.indexOf("width") !== -1) {
    return `${initString} width="100%" ${restString}`;
  }
  return `${initString} height="100%" ${restString}`;
};

/**
 * Returns all indexes of linear gradients in svg string
 * @param s
 * @returns
 */
const getStringMatches = (s: string, expr = "linear") => {
  // Find all linear gradients indexes in svg string

  let regexp = /<linearGradient id=/g;
  if (expr === "image") regexp = /<image id=/g;
  if (expr === "pattern") regexp = /<pattern id=/g;
  let match;
  const matches = [];

  while (true) {
    match = regexp.exec(s);
    if (match === null) {
      break;
    }
    matches.push(match.index);
  }
  return matches;
};

/**
 * Replaces all linear gradients id, with a unique identifier, so that all id's among
 * all svgs are unique and different, otherwise the colors will get mixed
 * @param s
 * @returns
 */
const replaceClsClasses = (s: string, toFind: string) => {
  // replace all occurrences
  s = s.replaceAll(toFind, `class-${uuid()}`);

  return s;
};

/**
 * Cleans the svg string
 * @param s
 * @returns
 */
const cleanSvgString = (s: string) => {
  s = replaceSVGWidthAndHeight(s, `width="`);
  s = replaceSVGWidthAndHeight(s, `height="`);
  s = replaceLinearGradients(s, `<linearGradient id="`);
  s = replaceLinearGradients(s, `<image id="`, "image");
  s = replaceLinearGradients(s, `<pattern id="`, "pattern");
  for (let i = 0; i < 10; i++) {
    s = replaceClsClasses(s, `cls-${i}`);
  }
  s = replaceClsClasses(s, `cls`);

  return s;
};

/**
 * Replaces all cls default class names with unique identifiers
 * @param s
 * @returns
 */
const replaceLinearGradients = (s: string, toFind: string, expr = "linear") => {
  const matches = getStringMatches(s, expr);
  // console.log(matches);
  // For each linear gradient, replace the id with a unique identifier
  matches.forEach((_, idx) => {
    // We need to do this for every occurrence, because each time we change the id, the
    // next indexes change
    const moreMatches = getStringMatches(s, expr);
    const matchIdx = moreMatches[idx];
    const subStr = s.substring(matchIdx + toFind.length);

    // Get the linear gradient Id
    const closureIdx = subStr.indexOf(`"`);
    const linearid = subStr.substring(0, closureIdx);
    // replace all linearId occurrences in svg, with a unique identifier
    s = s.replaceAll(linearid, uuid());
  });
  return s;
};

/**
 * Adds https to url if it's not present
 * @param url
 * @returns
 */
const buildSafeUrl = (url: string) => {
  if (url.indexOf("http://") !== -1) {
    return url.replace("http://", "https://");
  }
  if (url.indexOf("https://") === -1) {
    return `https://${url}`;
  }
  return url;
};

/** Transforms the date object into a dd/mm/yyyy string
 * @param  {string} d DateObject
 * @return {string} dd/mm/yyyy
 */
const dateToString = (d: Date | number, withHours = false) => {
  if (d instanceof Date) {
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${String(d.getMonth() + 1)}`.slice(-2);
    const year = d.getFullYear().toString();
    let dateString = `${day}/${month}/${year}`;
    if (withHours) {
      dateString += " ";
      dateString += `0${d.getHours()}`.slice(-2);
      dateString += "h";
      dateString += `0${d.getMinutes()}`.slice(-2);
    }
    return dateString;
  }
  const newD = new Date(d);
  const day = `0${newD.getDate()}`.slice(-2);
  const month = `0${String(newD.getMonth() + 1)}`.slice(-2);
  const year = newD.getFullYear().toString();
  let dateString = `${day}/${month}/${year}`;
  if (withHours) {
    dateString += " ";
    dateString += `0${newD.getHours()}`.slice(-2);
    dateString += "h";
    dateString += `0${newD.getMinutes()}`.slice(-2);
  }
  return dateString;
};

/**
 * Select handler
 * @param option
 * @param key
 * @param setInfo
 */
const handleSelectInput = (
  option: any,
  key: string,
  setInfo: Dispatch<SetStateAction<RecruitmentFormInfo>>,
) => {
  setInfo((info: RecruitmentFormInfo) => ({ ...info, [key]: option.value }));
};

/**
 * Input text handler
 * @param e
 * @param key
 */
const handleTextInput = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  key: string,
  setInfo: Dispatch<SetStateAction<RecruitmentFormInfo>>,
) => {
  let value = e.target.value;
  if (key === "email" || key === "confirmEmail") {
    value = value.trim();
  }
  setInfo((info: RecruitmentFormInfo) => ({ ...info, [key]: value }));
};

/**
 * Handles the input mask on change
 * @param value
 * @param key
 * @param setInfo
 */
const handleInputMask = (
  value: NumberFormatValues,
  key: string,
  setInfo: Dispatch<SetStateAction<RecruitmentFormInfo>>,
) => {
  const str = value.formattedValue.replaceAll("_", "");
  setInfo((info: RecruitmentFormInfo) => ({ ...info, [key]: str }));
};

/**
 * Handles the input checkbox on change
 * @param value
 * @param key
 * @param setInfo
 */
const handleCheckbox = (
  e: ChangeEvent<HTMLInputElement>,
  key: string,
  setInfo: Dispatch<SetStateAction<RecruitmentDepartmentsForm>>,
) => {
  const isChecked = e.target.checked;
  setInfo((info: RecruitmentDepartmentsForm) => ({
    ...info,
    [key]: isChecked,
  }));
};

const getRecruitmentInfo = (setDepartments: Dispatch<SetStateAction<Departments>>) => {
  get(ref(db, "public/recruitment/openDepartments")).then((snapshot) => {
    const departments: Departments = snapshot.val();

    if (!departments) return;
    setDepartments(departments);
  });
};

const getRecruitmentTable = (setActiveTable: Dispatch<SetStateAction<string>>) => {
  get(ref(db, "public/recruitment/activeTable")).then((snapshot) => {
    const activeTable: string = snapshot.val();
    if (!activeTable) return;
    setActiveTable(activeTable);
    console.log("Active table", activeTable);
  });
};

const getAge = (dateString: string) => {
  const today = new Date();
  const birthDate = inputToDate(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getProfileJoinedInInfo = (joinedIn: string, leftIn: string | undefined) => {
  if (joinedIn && leftIn) {
    return `I joined Técnico Solar Boat in ${joinedIn} and left with great sorrow in ${leftIn}`;
  }
  if (joinedIn) {
    return `I joined Técnico Solar Boat in ${joinedIn} and it has been the greatest experience of my life 😁!`;
  }
  return `I've joined Técnico Solar Boat in a while, but I cannot recall when. This is my life now! 🤩'`;
};

/**
 * Retrieves user profile URL
 * @param userId
 * @returns user url
 */
const getUserProfileLink = (userName: string) => {
  return `/team/${userName}`;
};

const imageLoader: ImageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

const getFooterTheme = (theme: 0 | 1 | "white" | "black", switchTheme = false) => {
  if (switchTheme) {
    return theme === "white" || theme === 0 ? "black" : "white";
  }
  return theme;
};

export {
  buildSafeUrl,
  cleanSvgString,
  dateToString,
  getAge,
  getFooterTheme,
  getProfileJoinedInInfo,
  getRecruitmentInfo,
  getRecruitmentTable,
  getTeamToDisplay,
  getUserImgUrl,
  getUserProfileLink,
  handleCheckbox,
  handleInputMask,
  handleSelectInput,
  handleTextInput,
  imageLoader,
  inputToDate,
  replaceClsClasses,
  replaceLinearGradients,
  replaceSVGWidthAndHeight,
  returnSortedByPositionTeam,
  toggleActiveDepartment,
};
