import { useEffect, useState } from "react";

import cx from "classnames";

import { GiAnchor } from "react-icons/gi";
import { IoBulbOutline } from "react-icons/io5";
import { SiAtom } from "react-icons/si";
import { SM01Count } from "../../../interfaces";
import ClapButton from "../../Buttons/ClapButton";
import {
  addCountToButton,
  downloadMaterial,
  removeButtonDBListeners,
  startSMButtonDBListeners,
} from "../openSourceUtils";

const SM01 = () => {
  const [countButtons, setCountButtons] = useState<SM01Count>({
    esDownloadCount: 0,
    hpDownloadCount: 0,
    dcDownloadCount: 0,
    likeCount: 0,
  });

  useEffect(() => {
    startSMButtonDBListeners("sm01", setCountButtons);
    return () => {
      removeButtonDBListeners("sm01");
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
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/opensource/sm01_opensource.jpeg")`,
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-2 text-center justify-content-center row">
          <div className="col-lg-10 z-inf">
            <h4 className="index-header f-700 text-white">SÃO MIGUEL 01</h4>
            <hr className="divider" />
            <p className="f-medium text-white">
              The sensational hydrogen combined with the most eco-friendly cockpit ever is here.
            </p>

            <ClapButton
              count={countButtons.likeCount}
              onClick={() => addCountToButton(countButtons.likeCount, "likeCount", "sm01")}
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
                    "sm01",
                    "https://gitlab.com/tecnico.solar.boat/2023/SM01",
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
                <SiAtom className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow">{"FC & Hydrogen"}</h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">Hydrogen Admission System</li>
                <li className="onsource-list-item">Air Admission System</li>
                <li className="onsource-list-item">Cooling System</li>
                <li className="onsource-list-item">Simulations</li>
                <li className="onsource-list-item">List of Material</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.hpDownloadCount,
                    "hpDownloadCount",
                    "sm01",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SM01/SM/SM-SM01.zip",
                  )
                }
              >
                {" "}
                Download
              </button>
              <div>
                <span className="opensource-downloads">
                  {countButtons.hpDownloadCount} Downloads
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
                <li className="onsource-list-item">{"Struture & Composite Assembly"}</li>
                <li className="onsource-list-item">{"List of Materials"}</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.dcDownloadCount,
                    "dcDownloadCount",
                    "sm01",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SM01/DC/DC-SM01.zip",
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

export default SM01;
