import { useEffect, useState } from "react";

import cx from "classnames";

import { FaCogs } from "react-icons/fa";
import { GiAnchor } from "react-icons/gi";
import { IoBulbOutline } from "react-icons/io5";
import { SR01Count } from "../../../interfaces";
import ClapButton from "../../Buttons/ClapButton";
import {
  addCountToButton,
  downloadMaterial,
  removeButtonDBListeners,
  startButtonDBListeners,
} from "../openSourceUtils";

const SR01 = () => {
  const [countButtons, setCountButtons] = useState<SR01Count>({
    esDownloadCount: 0,
    msDownloadCount: 0,
    dcDownloadCount: 0,
    likeCount: 0,
  });

  useEffect(() => {
    startButtonDBListeners("sr01", setCountButtons);
    return () => {
      removeButtonDBListeners("sr01");
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
            backgroundImage: `url("/assets/images/opensource/sr01_opensource_v2.jpg")`,
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-2 text-center justify-content-center row">
          <div className="col-lg-10 z-inf">
            <h4 className="index-header f-700 text-white">SÃO RAFAEL 01</h4>
            <hr className="divider" />
            <p className="f-medium text-white">
              Our very first prototype. Built in 2017 and improved in 2018.
            </p>

            <ClapButton
              count={countButtons.likeCount}
              onClick={() => addCountToButton(countButtons.likeCount, "likeCount", "sr01")}
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
              <h5 className="text-white index-subheader mt-2 text-shadow">Electrical Systems</h5>

              <ul className="opensource-list">
                <li className="onsource-list-item">Dual Motor Control</li>
                <li className="onsource-list-item">Electrical Scheme Documentation</li>
                <li className="onsource-list-item">Printed Circuit Boards (PCBs)</li>
                <li className="onsource-list-item">List of Materials</li>
                <li className="onsource-list-item">Source Code</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.esDownloadCount,
                    "esDownloadCount",
                    "sr01",
                    "https://gitlab.com/tecnico.solar.boat/2018",
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
              <h5 className="text-white index-subheader mt-2 text-shadow">Mechanical Systems</h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Dual Motor</li>
                <li className="onsource-list-item">Propulsion Column</li>
                <li className="onsource-list-item">Transmission System</li>
                <li className="onsource-list-item">Hydrofoils</li>
                <li className="onsource-list-item">Propeller</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.msDownloadCount,
                    "msDownloadCount",
                    "sr01",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/MS/SR01.zip",
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
              <h5 className="text-white index-subheader mt-2 text-shadow">Design and Composites</h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Female Mold</li>
                <li className="onsource-list-item">Machined Male Mold</li>
                <li className="onsource-list-item">Side Floater Mold and Stock</li>
                <li className="onsource-list-item">Water Shield</li>
                <li className="onsource-list-item">Cooling Pipes</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.dcDownloadCount,
                    "dcDownloadCount",
                    "sr01",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/CA/HullFiles.zip",
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
        </div>
      </div>
    </div>
  );
};

export default SR01;
