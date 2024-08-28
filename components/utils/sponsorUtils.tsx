import { get, ref } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { SponsorBracketPublic, SponsorBracketsPublic } from "../../interfaces";
import { db } from "../Contexts/Firebase";
import { cleanSvgString } from "./generalFunctions";

/**
 * Retrieves and builds an svg string from existing svg url on server
 * @param svgPath
 * @param setSvgString
 * @returns
 */
const getSvgStringFromPath = async (svgPath: string | undefined, setSvgString: Function) => {
  if (!svgPath) return "";

  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    dataType: "html",
    headers: myHeaders,
  };

  fetch(svgPath.replace("http://", "https://"), requestOptions)
    .then(async (response) => ({ ok: response.ok, txt: await response.text() }))
    .then((result) => {
      if (result.ok) {
        const s = cleanSvgString(result.txt);
        setSvgString(s);
      } else {
        setSvgString(" ");
      }
    })
    .catch(() => setSvgString("Error loading sponsor."));
};

/**
 * Sorst sponsor brackets based on their top marging level
 * @param sponsorBrackets
 * @returns
 */
const sortSponsorBrackets = (sponsorBrackets: SponsorBracketsPublic) => {
  return Object.entries(sponsorBrackets).sort((a, b) => {
    const bracketA = a[1];
    const bracketB = b[1];

    if (bracketA.topMargin > bracketB.topMargin) return -1;
    if (bracketA.topMargin < bracketB.topMargin) return 1;
    return 0;
  });
};
/**
 * Retrieves sponsors from public database
 * @param setSponsorBrackets
 */
const getSponsorsFromDatabase = (
  setSponsorBrackets: Dispatch<SetStateAction<[string, SponsorBracketPublic][]>>,
) => {
  get(ref(db, "public/officialWebsite/sponsors/brackets")).then((snapshot) => {
    const sponsorBrackets: SponsorBracketsPublic = snapshot.val();

    if (!sponsorBrackets) {
      setSponsorBrackets([]);
      return;
    }
    // Sort sponsor brackets
    const sortedSponsorBrackets = sortSponsorBrackets(sponsorBrackets);
    setSponsorBrackets(sortedSponsorBrackets);
  });
};

export { getSponsorsFromDatabase, getSvgStringFromPath };
