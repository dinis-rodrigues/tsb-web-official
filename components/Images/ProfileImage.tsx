import { useState } from "react";

type Props = {
  src: string;
};

const ProfileImage = ({ src }: Props) => {
  const [srcUrl, setSrcUrl] = useState<string>(src);
  return src ? (
    <div
      className="profile-image-container profile-shadow"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="team-image ">
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcUrl}
            alt=""
            onError={() => setSrcUrl(`/assets/images/index/placeholder.png`)}
            width="100%"
          />
        }
      </div>

      <div className="team-description z-inf text-shadow"></div>
    </div>
  ) : (
    <span>Error</span>
  );
};

export default ProfileImage;
