import { ref, set, onValue, off } from "@firebase/database";
import { Dispatch, SetStateAction } from "react";
import { SM01Count, SR01Count, SR02Count, SR03Count } from "../../interfaces";
import { db } from "../Contexts/Firebase";

/**
 * Starts listening to changes on the counts stored in the database
 * @param boat
 * @param setCountButtons
 */
const startButtonDBListeners = (
  boat: string,
  setCountButtons: Dispatch<SetStateAction<SR01Count | SR02Count | SR03Count>>
) => {
  onValue(
    ref(db, `public/officialWebsite/openSource/${boat}/buttonCount`),
    (snapshot) => {
      const allButtonCounts: SR01Count | SR02Count = snapshot.val();
      if (!allButtonCounts) return;
      // get all photos of album
      setCountButtons(allButtonCounts);
    }
  );
};

/**
 * Starts listening to changes on the counts stored in the database
 * @param boat
 * @param setCountButtons
 */
const startSMButtonDBListeners = (
  boat: string,
  setCountButtons: Dispatch<SetStateAction<SM01Count>>
) => {
  onValue(
    ref(db, `public/officialWebsite/openSource/${boat}/buttonCount`),
    (snapshot) => {
      const allButtonCounts: SM01Count = snapshot.val();
      if (!allButtonCounts) return;
      // get all photos of album
      setCountButtons(allButtonCounts);
    }
  );
};

/**
 * Removes the listener from the database
 * @param boat
 */
const removeButtonDBListeners = (boat: string) => {
  off(ref(db, `public/officialWebsite/openSource/${boat}/buttonCount`));
};

/**
 * Updates with new count in the database
 * @param currCount
 * @param btnString
 * @param boat
 */
const addCountToButton = (
  currCount: number,
  btnString: string,
  boat: string
) => {
  set(
    ref(
      db,
      `public/officialWebsite/openSource/${boat}/buttonCount/${btnString}`
    ),
    currCount + 1
  );
};

/**
 * Downloads material, adds count to database, and opens download link
 * @param currCount
 * @param btnString
 * @param boat
 * @param urlLink
 */
const downloadMaterial = (
  currCount: number,
  btnString: string,
  boat: string,
  urlLink: string
) => {
  // Add new count to button
  addCountToButton(currCount, btnString, boat);

  // Download the file from urlLink, open new window
  window.open(urlLink, "_blank");
};

export {
  startButtonDBListeners,
  removeButtonDBListeners,
  addCountToButton,
  downloadMaterial,
  startSMButtonDBListeners,
};
