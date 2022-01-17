/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-prototype-builtins */
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import GallerySidebar from "../components/Gallery/GallerySidebar";
import GalleryInfo from "../components/Gallery/GalleryInfo";
import { Controller, Scene } from "react-scrollmagic";

import LightGallery from "lightgallery/react";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";

import {
  getGalleryList,
  getGalleryPhotos,
} from "../components/Gallery/galleryUtils";

import Navbar from "../components/Navbar/Navbar";
import { AllAlbumPhotos, GalleryItem } from "../interfaces";
import GalleryHeader from "../components/Gallery/GalleryHeader";
import FaviconIcons from "../components/Head/FaviconIcons";

const Gallery: NextPage = () => {
  const [galleryInfo, setGalleryInfo] = useState<GalleryItem>();
  const [galleryList, setGalleryList] = useState<[string, GalleryItem][]>([]);
  const [activeGallery, setActiveGallery] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<AllAlbumPhotos>({});

  useEffect(() => {
    getGalleryList(setGalleryList, setGalleryInfo, setActiveGallery);

    window.scroll({
      top: 1,
      left: 0,
    });
  }, []);

  useEffect(() => {
    if (activeGallery)
      getGalleryPhotos(
        activeGallery,
        galleryList,
        galleryPhotos,
        setGalleryInfo,
        setGalleryPhotos
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGallery]);

  return (
    <div className="App">
      <Head>
        <title>Gallery</title>
        <FaviconIcons />
      </Head>

      <Controller>
        <GalleryHeader />
        <Scene
          offset={-100}
          triggerHook="onLeave"
          triggerElement="#triggerEl"
          // indicators={true}
        >
          {(progress: 0 | 1) => {
            // This throws a forwardRef warning. Don't care
            return (
              <Navbar
                theme={progress}
                hideFooter={progress === 0 ? true : false}
                isOpaque={progress === 1 ? true : false}
              />
            );
          }}
        </Scene>
        <div id="triggerEl">
          <div className="container">
            <div className="row nav-margin">
              <div className="col-lg-2">
                <GallerySidebar
                  galleryList={galleryList}
                  activeGallery={activeGallery}
                  setActiveGallery={setActiveGallery}
                />
              </div>
              <div className="col" style={{ minHeight: "120vh" }}>
                {galleryPhotos.hasOwnProperty(activeGallery) &&
                Object.entries(galleryPhotos[activeGallery]).length > 0 ? (
                  <LightGallery
                    mode="lg-fade"
                    speed={500}
                    plugins={[
                      lgThumbnail,
                      lgZoom,
                      lgAutoplay,
                      lgFullscreen,
                      lgRotate,
                    ]}
                    elementClassNames="row"
                  >
                    {Object.entries(galleryPhotos[activeGallery]).map(
                      ([photoId, photoInfo]) => (
                        <a
                          href={photoInfo.imagePath}
                          className="col-sm-4 col-md-4 col-lg-3"
                          key={photoId}
                        >
                          <div className="gallery-item cursor-pointer">
                            <div className="gallery-image">
                              <img
                                src={photoInfo.rzImgPath}
                                alt={photoInfo.description}
                              />
                            </div>
                          </div>
                        </a>
                      )
                    )}
                  </LightGallery>
                ) : null}
              </div>
              <div className="col-lg-2">
                <GalleryInfo galleryInfo={galleryInfo} />
              </div>
            </div>
          </div>
        </div>
      </Controller>
    </div>
  );
};

export default Gallery;
