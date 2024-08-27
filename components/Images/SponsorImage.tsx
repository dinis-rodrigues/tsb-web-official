import cx from "classnames";
import parse from "html-react-parser";
import {
  replaceClsClasses,
  replaceLinearGradients,
  replaceSVGWidthAndHeight,
} from "../utils/generalFunctions";

type Props = {
  name: string;
  level: string;
  svgString: string;
  url: string;
};
const SponsorImage = ({ svgString, level }: Props) => {
  svgString = replaceSVGWidthAndHeight(svgString, `width="`);
  svgString = replaceSVGWidthAndHeight(svgString, `height="`);
  svgString = replaceLinearGradients(svgString, `<linearGradient id="`);
  svgString = replaceLinearGradients(svgString, `<image id="`, "image");
  svgString = replaceLinearGradients(svgString, `<pattern id="`, "pattern");
  console.log(svgString);
  for (let i = 0; i < 10; i++) {
    svgString = replaceClsClasses(svgString, `cls-${i}`);
  }
  svgString = replaceClsClasses(svgString, `cls`);

  return (
    <div
      className={cx({
        "sponsor-prime": level === "Prime",
        "sponsor-gold": level === "Gold",
        "sponsor-silver": level === "Silver",
        "sponsor-bronze": level === "Bronze",
        "sponsor-copper": level === "Copper",
        "sponsor-aluminum": level === "Aluminum",
        "col-6": level === "Prime",
        "col-4": level === "Gold",
        "col-3": level === "Silver" || level === "Bronze",
        "col-2": level === "Copper" || level === "Aluminum",
      })}
    >
      {parse(svgString)}
    </div>
  );
};

export default SponsorImage;
