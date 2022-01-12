import React, { useEffect, useState } from "react";

import cx from "classnames";

import { IoBulbOutline } from "react-icons/io5";
import { FaCogs } from "react-icons/fa";
import { GiAnchor } from "react-icons/gi";
import ClapButton from "../../Buttons/ClapButton";
import {
  addCountToButton,
  downloadMaterial,
  removeButtonDBListeners,
  startButtonDBListeners,
} from "../openSourceUtils";
import { SR02Count } from "../../../interfaces";

const SR02 = () => {
  const [countButtons, setCountButtons] = useState<SR02Count>({
    esDownloadCount: 0,
    msDownloadCount: 0,
    dcDownloadCount: 0,
    likeCount: 0,
  });

  useEffect(() => {
    startButtonDBListeners("sr02", setCountButtons);
    return () => {
      removeButtonDBListeners("sr02");
    };
  }, []);
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="bg-changer">
        <div
          className={cx("section-bg active")}
          style={{
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/opensource/sr02_opensource.jpeg")`,
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-2 text-center justify-content-center row">
          <div className="col-lg-10 z-inf">
            <h4 className="index-header f-700 text-white">SÃO RAFAEL 02</h4>
            <hr className="divider" />
            <p className="f-medium text-white">
              {
                "The master piece of engineering :) that reached the 2nd place in the Monaco Solar & Energy Challenge 2019."
              }
            </p>

            <ClapButton
              count={countButtons.likeCount}
              onClick={() =>
                addCountToButton(countButtons.likeCount, "likeCount", "sr02")
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="item-card p-3">
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <IoBulbOutline className="icon-lg" />
                {/* <SiAtom className="icon-lg" /> */}
              </div>
              <h5 className="text-white mt-2 text-shadow">
                Electrical Systems
              </h5>

              <ul className="opensource-list">
                <li className="onsource-list-item">
                  Battery Management System
                </li>
                <li className="onsource-list-item">Electrical Schematic</li>
                <li className="onsource-list-item">Documentation</li>
                <li className="onsource-list-item">
                  Printed Circuit Boards (PCBs)
                </li>
                <li className="onsource-list-item">Source Code</li>
              </ul>
              <button
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.esDownloadCount,
                    "esDownloadCount",
                    "sr02",
                    "https://gitlab.com/tecnico.solar.boat/2019"
                  )
                }
              >
                {" "}
                Download
              </button>
              <div>
                <span className="opensource-downloads">
                  {countButtons.esDownloadCount} Downloads
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="item-card p-3">
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info ">
                <FaCogs className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow">
                Mechanical Systems
              </h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Improved Dual Motor</li>
                <li className="onsource-list-item">
                  Inboard Propulsion Column
                </li>
                <li className="onsource-list-item">
                  Electrical and Mechanical Hydrofoil Control
                </li>
                <li className="onsource-list-item">Hydrofoils</li>
                <li className="onsource-list-item">Propeller</li>
              </ul>
              <button
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.msDownloadCount,
                    "msDownloadCount",
                    "sr02",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SR02/MS/MS_TSB_OpenSource.zip"
                  )
                }
              >
                {" "}
                Download
              </button>
              <div>
                <span className="opensource-downloads">
                  {countButtons.msDownloadCount} Downloads
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="item-card p-3">
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <GiAnchor className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow">
                Design and Composites
              </h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Male Mold</li>
                <li className="onsource-list-item">Hull</li>
                <li className="onsource-list-item">Floaters</li>
                <li className="onsource-list-item">Seat</li>
              </ul>
              <button
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.dcDownloadCount,
                    "dcDownloadCount",
                    "sr02",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SR02/CA/CA_TSB_OpenSource.zip"
                  )
                }
              >
                {" "}
                Download
              </button>
              <div>
                <span className="opensource-downloads">
                  {countButtons.dcDownloadCount} Downloads
                </span>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-2"></div>

          <div className="col-lg-2"></div> */}
        </div>
      </div>
    </div>
  );
};

export default SR02;
