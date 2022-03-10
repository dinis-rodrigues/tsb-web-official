import { db } from "../Contexts/Firebase";
import { get, ref, child } from "@firebase/database";

import {
  AllAlbumPhotos,
  GalleryAlbum,
  GalleryItem,
  PublicGallery,
} from "../../interfaces";
import { Dispatch, SetStateAction } from "react";

/**
 * Retrieves all photos from the gallery in the database
 * @param newActiveGallery
 * @param galleryList
 * @param setGalleryInfo
 * @param setGalleryPhotos
 * @returns
 */
const getGalleryPhotos = (
  newActiveGallery: string,
  galleryList: [string, GalleryItem][],
  galleryPhotos: AllAlbumPhotos,
  setGalleryInfo: Dispatch<SetStateAction<GalleryItem | undefined>>,
  setGalleryPhotos: Dispatch<SetStateAction<AllAlbumPhotos>>
) => {
  if (!newActiveGallery) return;
  // set new gallery info
  setGalleryInfo(getCorrespondingGalleryInfo(newActiveGallery, galleryList));
  if (galleryPhotos[newActiveGallery]) return;
  get(
    child(
      ref(db, "public/officialWebsite/gallery/galleryPhotos"),
      newActiveGallery
    )
  ).then((snapshot) => {
    const allPhotos: GalleryAlbum = snapshot.val();
    if (!allPhotos) return;
    // get all photos of album
    setGalleryPhotos({ ...galleryPhotos, [newActiveGallery]: allPhotos });
  });
};

/**
 * Sorst the galleries by date
 * @param publicGallery
 * @returns
 */
const sortPublicGallery = (publicGallery: PublicGallery) => {
  return Object.entries(publicGallery).sort((a, b) => {
    let galleryA = a[1];
    let galleryB = b[1];

    if (galleryA.timestamp > galleryB.timestamp) return -1;
    if (galleryA.timestamp < galleryB.timestamp) return 1;
    return 0;
  });
};

/**
 * Retrieves the gallery by matching the provided gallery ID
 * @param activeGallery
 * @param galleryList
 * @returns
 */
const getCorrespondingGalleryInfo = (
  activeGallery: string,
  galleryList: [string, GalleryItem][]
) => {
  for (const [galleryId, galInfo] of galleryList) {
    if (galleryId === activeGallery) return galInfo;
  }
};

/**
 * Retrieves the gallery based on the current active gallery ID
 * @param galleryList
 * @param setGalleryInfo
 * @param setActiveGallery
 * @param setActiveGalleryDbRef
 */
const getActiveGallery = (
  galleryList: [string, GalleryItem][],
  setGalleryInfo: Dispatch<SetStateAction<GalleryItem | undefined>>,
  setActiveGallery: Dispatch<SetStateAction<string>>
) => {
  setActiveGallery((activeGallery: string) => {
    if (!activeGallery) {
      setGalleryInfo(galleryList[0][1]);
      return galleryList[0][0];
    } else {
      setGalleryInfo(getCorrespondingGalleryInfo(activeGallery, galleryList));
      return activeGallery;
    }
  });
};

/**
 * Retrieves all galleries from the database
 * @param setGalleryList
 * @param setGalleryInfo
 * @param setActiveGallery
 * @param setActiveGalleryDbRef
 */
const getGalleryList = (
  setGalleryList: Dispatch<SetStateAction<[string, GalleryItem][]>>,
  setGalleryInfo: Dispatch<SetStateAction<GalleryItem | undefined>>,
  setActiveGallery: Dispatch<SetStateAction<string>>
) => {
  get(ref(db, "public/officialWebsite/gallery/galleryList")).then(
    (snapshot) => {
      const publicGallery: PublicGallery = snapshot.val();
      if (!publicGallery) return;
      const sortedGallery = sortPublicGallery(publicGallery);

      setGalleryList(sortedGallery);
      // Get current gallery info and photos
      getActiveGallery(sortedGallery, setGalleryInfo, setActiveGallery);
    }
  );
};

export { getGalleryList, getGalleryPhotos };
