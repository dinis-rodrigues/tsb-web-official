import { GalleryItem } from "../../interfaces";
import { dateToString } from "../utils/generalFunctions";

type Props = {
  galleryInfo: GalleryItem | undefined;
};
const GalleryInfo = ({ galleryInfo }: Props) => {
  return (
    <div className="gallery-side" style={{ position: "sticky", top: 150 }}>
      <h5 className="side-title">Details</h5>
      <div className="sidebar-container borders">
        <div className="gallery-info f-medium">
          {galleryInfo ? galleryInfo.description : ""}
          <hr />
          {galleryInfo?.timestamp && (
            <p>Uploaded on {dateToString(galleryInfo.timestamp)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryInfo;
