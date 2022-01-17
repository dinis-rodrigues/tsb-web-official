import parse from "html-react-parser";
import cx from "classnames";
import { buildSafeUrl } from "../../utils/generalFunctions";
import { getSvgStringFromPath } from "../../utils/sponsorUtils";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  svgPath: string;
  url: string;
  numColumns: number;
  currBracketNum: number;
};
const SponsorBlock = ({ svgPath, url, numColumns, currBracketNum }: Props) => {
  const [svgString, setSvgString] = useState("");

  useEffect(() => {
    getSvgStringFromPath(svgPath, setSvgString);
  }, [svgPath]);

  return (
    <a
      href={buildSafeUrl(url)}
      target="_blank"
      rel="noreferrer"
      className={cx("d-flex align-items-center justify-content-center pt-3", {
        "sponsor-height-1": currBracketNum === 1,
        "sponsor-height-2": currBracketNum === 2,
        "sponsor-height-3": currBracketNum === 3,
        "sponsor-height-4": currBracketNum === 4,
        "sponsor-height-5": currBracketNum === 5,
        "sponsor-height-6": currBracketNum >= 6,
        "col-6": numColumns === 2,
        "col-4": numColumns === 3,
        "col-3": numColumns === 4,
        "col-2": numColumns === 6,
        "col-1": numColumns === 12,
      })}
    >
      {parse(svgString)}
    </a>
  );
};

export default SponsorBlock;
