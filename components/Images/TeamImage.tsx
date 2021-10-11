import Image from "next/image";
import { useState } from "react";

import placeholder from "/public/assets/images/index/placeholder.png";

type Props = {
  src: string;
  name: string;
  position: string;
  department?: string;
};
const TeamImage = ({ src, name, position, department = "" }: Props) => {
  const [srcUrl, setSrcUrl] = useState<string>(src);
  department;
  return srcUrl ? (
    <div
      className="team-image-container shadow"
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <div className="team-image">
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcUrl}
            alt=""
            onError={() => setSrcUrl(placeholder.src)}
            width="100%"
          />
        }
      </div>

      <div className="team-description z-inf text-shadow">
        <p className="f-medium f-700">{name}</p>
        <p>{position}</p>
      </div>
    </div>
  ) : (
    <span>Error</span>
  );
};

export default TeamImage;
