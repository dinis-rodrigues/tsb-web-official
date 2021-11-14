/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-prototype-builtins */
import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import GallerySidebar from "../components/Gallery/GallerySidebar";
import GalleryInfo from "../components/Gallery/GalleryInfo";
import { Controller, Scene } from "react-scrollmagic";

import {
  getGalleryList,
  getGalleryPhotos,
} from "../components/Gallery/galleryUtils";

import Navbar from "../components/Navbar/Navbar";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { AllAlbumPhotos, GalleryItem } from "../interfaces";
import GalleryHeader from "../components/Gallery/GalleryHeader";

const Gallery: NextPage = () => {
  const [galleryInfo, setGalleryInfo] = useState<GalleryItem>();
  const [galleryList, setGalleryList] = useState<[string, GalleryItem][]>([]);
  const [activeGallery, setActiveGallery] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<AllAlbumPhotos>({});
  const [navTheme, setNavTheme] = useState<"white" | "black">("white");
  useEffect(() => {
    getGalleryList(setGalleryList, setGalleryInfo, setActiveGallery);
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
        <title>Técnico Solar Boat</title>
      </Head>

      <Navbar theme={navTheme} />
      <GalleryHeader />

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
              <SimpleReactLightbox>
                <SRLWrapper>
                  <div className="row">
                    {galleryPhotos.hasOwnProperty(activeGallery) &&
                    Object.entries(galleryPhotos[activeGallery]).length > 0
                      ? Object.entries(galleryPhotos[activeGallery]).map(
                          ([photoId, photoInfo]) => (
                            <div
                              className="col-sm-4 col-md-4 col-lg-3"
                              key={photoId}
                            >
                              <div className="gallery-item">
                                <div className="gallery-image">
                                  <a href={photoInfo.imagePath}>
                                    <img
                                      src={photoInfo.rzImgPath}
                                      alt={photoInfo.description}
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>
                </SRLWrapper>
              </SimpleReactLightbox>
            </div>
            <div className="col-lg-2">
              <GalleryInfo galleryInfo={galleryInfo} />
            </div>
            <Controller>
              <Scene
                offset={-100}
                triggerHook="onLeave"
                triggerElement="#triggerEl"
                // indicators={true}
              >
                {(progress: number) => {
                  progress === 1 ? setNavTheme("black") : setNavTheme("white");
                  return <Fragment></Fragment>;
                }}
              </Scene>
            </Controller>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
