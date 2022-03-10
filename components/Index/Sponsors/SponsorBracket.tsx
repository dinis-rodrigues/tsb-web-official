import { Fragment } from "react";
import { SponsorBracketPublic } from "../../../interfaces";
import SponsorBlock from "./SponsorBlock";

type Props = {
  bracket: SponsorBracketPublic;
  bracketNum: number;
};
const SponsorBracket = ({ bracket, bracketNum }: Props) => {
  // justify-content-center d-flex
  const bracketSponsors = bracket.bracketSponsors;
  return (
    <Fragment>
      <div className="text-black mt-3">
        <h5 className="text-uppercase m-0">{bracket.name}</h5>
        <hr
          className={"sponsor-divider mt-1"}
          style={{ backgroundColor: bracket.color?.hex }}
        />
      </div>
      {/* Sponsor SVG's go here */}
      <div className="row text-black d-flex justify-content-center">
        {bracket.sponsorsBoardList.map((sponsorId) => {
          return (
            <SponsorBlock
              key={sponsorId}
              name={bracketSponsors[sponsorId].name}
              url={bracketSponsors[sponsorId].url}
              svgPath={bracketSponsors[sponsorId].svgPath}
              numColumns={bracket.numColumns}
              currBracketNum={bracketNum}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default SponsorBracket;
