import { FaAngleRight } from "react-icons/fa";
import { GalleryItem } from "../../interfaces";
import cx from "classnames";
import { Dispatch, SetStateAction } from "react";

type Props = {
  galleryList: [string, GalleryItem][];
  activeGallery: string;
  setActiveGallery: Dispatch<SetStateAction<string>>;
};
const GallerySidebar = ({
  galleryList,
  activeGallery,
  setActiveGallery,
}: Props) => {
  return (
    <div className="gallery-side" style={{ position: "sticky", top: 150 }}>
      <h5 className="side-title">Albums</h5>
      <div className="sidebar-container borders">
        <ul className="sidebar-list">
          {galleryList
            ? galleryList.map(([galleryId, galleryInfo]) => (
                <li
                  key={galleryId}
                  className={cx("d-flex", {
                    active: galleryId === activeGallery,
                  })}
                  onClick={() => {
                    setActiveGallery(galleryId);
                  }}
                >
                  <span className="f-medium">
                    <FaAngleRight className="gallery-side-icon" />
                    {galleryInfo.name}
                  </span>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default GallerySidebar;
