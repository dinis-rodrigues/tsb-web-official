import Image from "next/image";
import { useState } from "react";

import { getUserImgUrl } from "../utils/generalFunctions";
import placeholder from "/public/assets/images/index/placeholder.png";

type Props = {
  src: string;
  name: string;
  position: string;
  department: string;
};
const TeamImage = ({ src, name, position, department }: Props) => {
  const [srcUrl, setSrcUrl] = useState<string>(src);
  return srcUrl ? (
    <div
      className="team-image-container shadow"
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <Image
        className="team-image"
        objectPosition={"center"}
        alt=""
        src={srcUrl}
        onError={() => setSrcUrl(placeholder.src)}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        priority
        blurDataURL={
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0qgcAAPkAu0/RaYsAAAAASUVORK5CYII="
        }
      />

      <div className="team-description z-inf text-shadow">
        <p className="f-medium f-700">{name}</p>
        {/* <p>{department}</p> */}
        <p>{position}</p>
      </div>
      {/* <img src={src} alt="" width={100} /> */}
    </div>
  ) : (
    <span>Nope</span>
  );
};

export default TeamImage;
