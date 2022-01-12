import { fullpageApi } from "@fullpage/react-fullpage";
import { Fragment, useEffect, useState } from "react";
import { SponsorBracketPublic } from "../../interfaces";

import SponsorImage from "../Images/SponsorImage";
import { getSponsorsFromDatabase } from "../utils/sponsorUtils";
import SponsorBracket from "./Sponsors/SponsorBracket";
// import { sponsorOrder } from "../Images/sponsorObj";

type Props = {
  fullPageApi: fullpageApi | undefined;
};
const DynamicSponsors = ({ fullPageApi }: Props) => {
  const [sponsorBrackets, setSponsorBrackets] = useState<
    [string, SponsorBracketPublic][]
  >([]);

  useEffect(() => {
    getSponsorsFromDatabase(setSponsorBrackets);
  }, []);

  useEffect(() => {
    // When we finish retrieving the sponsors, this means we are populating the page
    // with them, so we need to rebuld the fullPage plugin to take into account the
    // sponsors height on the page
    if (sponsorBrackets && fullPageApi)
      setTimeout(function () {
        fullPageApi.reBuild();
      }, 500);
  }, [sponsorBrackets, fullPageApi]);
  return (
    <div
      className="section"
      style={{
        backgroundColor: "white",
        fontSize: "small",
      }}
    >
      <div className="container nav-margin mb-3">
        <div className="row">
          <div className="col">
            <h4 className="index-header f-700 text-black">OUR SPONSORS</h4>
            <hr className="divider" />
            <div className="f-medium">
              <p className="text-black">
                Great ideas and inspiring words are not sufficient alone to
                change the world. Trust and credibility are fundamentally key to
                achieve success. From beginning we have been pushing efforts to
                build strong relations with companies, entities and
                organizations from all over the world.
              </p>
              <p className="text-black">
                Our final word goes to our incredible sponsors, we want to thank
                each and everyone who understands and believes in what we do.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col">
            {sponsorBrackets.map(([bracketId, bracket], idx) => {
              return (
                <SponsorBracket
                  key={bracketId}
                  bracket={bracket}
                  bracketNum={idx}
                />
              );
            })}
            {/* {Object.entries(sponsorOrder).map(([sponsorId, sponsor]) => {
                return (
                  <SponsorImage
                    key={sponsorId}
                    name={sponsor.name}
                    svgString={sponsor.svgString}
                    level={sponsor.level}
                  />
                );
              })} */}
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

export default DynamicSponsors;
