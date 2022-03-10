import { fullpageApi } from "@fullpage/react-fullpage";
import { useEffect } from "react";
import { SponsorBracketPublic } from "../../interfaces";

import { getSponsorsFromDatabase } from "../utils/sponsorUtils";
import SponsorBracket from "./Sponsors/SponsorBracket";
// import { sponsorOrder } from "../Images/sponsorObj";

type Props = {
  fullPageApi: fullpageApi | undefined;
  sponsorBrackets: [string, SponsorBracketPublic][];
};
const DynamicSponsors = ({ sponsorBrackets, fullPageApi }: Props) => {
  useEffect(() => {
    // Rebuild fullpagejs since this is dynamic scrollable content
    if (fullPageApi) {
      fullPageApi.reBuild();
    }
  }, [fullPageApi]);

  return (
    <div
      className="section fp-auto-height-responsive"
      style={{
        backgroundColor: "white",
        fontSize: "small",
      }}
    >
      <div className="container nav-margin" style={{ marginBottom: "2rem" }}>
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
          </div>
          <div className="col-2"></div>
        </div>
        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
};

export default DynamicSponsors;
