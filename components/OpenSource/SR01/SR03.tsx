import { useEffect, useState } from "react";

import cx from "classnames";

import { FaCogs } from "react-icons/fa";
import { GiAnchor } from "react-icons/gi";
import { IoBulbOutline } from "react-icons/io5";
import { SR02Count } from "../../../interfaces";
import ClapButton from "../../Buttons/ClapButton";
import {
  addCountToButton,
  downloadMaterial,
  removeButtonDBListeners,
  startButtonDBListeners,
} from "../openSourceUtils";

const SR03 = () => {
  const [countButtons, setCountButtons] = useState<SR02Count>({
    esDownloadCount: 0,
    msDownloadCount: 0,
    dcDownloadCount: 0,
    likeCount: 0,
  });

  useEffect(() => {
    startButtonDBListeners("sr03", setCountButtons);
    return () => {
      removeButtonDBListeners("sr03");
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
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/opensource/sr03_opensource.jpeg")`,
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-2 text-center justify-content-center row">
          <div className="col-lg-10 z-inf">
            <h4 className="index-header f-700 text-white">SÃO RAFAEL 03</h4>
            <hr className="divider" />
            <p className="f-medium text-white">
              High quality hull, hydrofoils, in-house solar panels and much more in this incredibly
              done Portuguese solar powered boat.
            </p>

            <ClapButton
              count={countButtons.likeCount}
              onClick={() => addCountToButton(countButtons.likeCount, "likeCount", "sr03")}
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
              <h5 className="text-white mt-2 text-shadow">Electrical Systems</h5>

              <ul className="opensource-list">
                <li className="onsource-list-item">Battery Management System</li>
                <li className="onsource-list-item">Electrical Schematic</li>
                <li className="onsource-list-item">Documentation</li>
                <li className="onsource-list-item">Printed Circuit Boards (PCBs)</li>
                <li className="onsource-list-item">Source Code</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.esDownloadCount,
                    "esDownloadCount",
                    "sr03",
                    "https://gitlab.com/tecnico.solar.boat/2023/SR03",
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
              <h5 className="text-white mt-2 text-shadow">Mechanical Systems</h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Hydrofoil Design</li>
                <li className="onsource-list-item">Propeller Design</li>
                <li className="onsource-list-item">Transmission System</li>
                <li className="onsource-list-item">CAD Models</li>
                <li className="onsource-list-item">Propulsion Column (coming soon)</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.msDownloadCount,
                    "msDownloadCount",
                    "sr03",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SR03/SM/SM-SR03.zip",
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
              <h5 className="text-white mt-2 text-shadow">Design and Composites</h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Male Mold</li>
                <li className="onsource-list-item">Hull Design</li>
                <li className="onsource-list-item">Hull Female Mold</li>
                <li className="onsource-list-item">{"Structure & Composite Assembly"}</li>
                <li className="onsource-list-item">{"List of Materials"}</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.dcDownloadCount,
                    "dcDownloadCount",
                    "sr03",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SR03/DC/DC-SR03.zip",
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

export default SR03;
