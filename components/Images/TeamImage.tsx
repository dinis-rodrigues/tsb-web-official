import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  src: string;
  name: string;
  position: string;
  department?: string;
};
const TeamImage = ({ src, name, position }: Props) => {
  const [srcUrl, setSrcUrl] = useState<string>(src);
  return srcUrl ? (
    <div
      className="team-image-container"
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <div className="team-redirect">
        <FaExternalLinkAlt />
      </div>
      <div className="team-image">
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcUrl}
            alt=""
            onError={() =>
              setSrcUrl(
                `${process.env.BASE_PATH}/assets/images/index/placeholder.png`
              )
            }
            width="100%"
          />
        }
      </div>

      <div className="team-description z-inf text-shadow">
        <h4>
          <p className="index-subheader f-700">{name}</p>
        </h4>
        <h6 className="f-medium">{position}</h6>
        {/* <p>{position}</p> */}
      </div>
    </div>
  ) : (
    <span>Error</span>
  );
};

export default TeamImage;
