import { useEffect, useState } from "react";

import cx from "classnames";

import { GiAnchor } from "react-icons/gi";
import { IoBulbOutline } from "react-icons/io5";
import { SP01Count } from "../../../interfaces";
import ClapButton from "../../Buttons/ClapButton";
import {
  addCountToButton,
  downloadMaterial,
  removeButtonDBListeners,
  startSPButtonDBListeners,
} from "../openSourceUtils";

const SP01 = () => {
  const [countButtons, setCountButtons] = useState<SP01Count>({
    esDownloadCount: 0,
    dcDownloadCount: 0,
    likeCount: 0,
  });

  useEffect(() => {
    startSPButtonDBListeners("sp01", setCountButtons);
    return () => {
      removeButtonDBListeners("sp01");
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
            backgroundImage: `url("${process.env.BASE_PATH}/assets/images/opensource/sp01_opensource.jpg")`,
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-2 text-center justify-content-center row">
          <div className="col-lg-10 z-inf">
            <h4 className="index-header f-700 text-white">SÃO PEDRO 01</h4>
            <hr className="divider" />
            <p className="f-medium text-white">The autonomous solar powered boat</p>

            <ClapButton
              count={countButtons.likeCount}
              onClick={() => addCountToButton(countButtons.likeCount, "likeCount", "sp01")}
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
                <li className="onsource-list-item">Printed Circuit Boards (PCBs)</li>
                {/* <li className="onsource-list-item">Source Code</li> */}
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.esDownloadCount,
                    "esDownloadCount",
                    "sp01",
                    "https://gitlab.com/tecnico.solar.boat/2023/SP01",
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
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <GiAnchor className="icon-lg" />
              </div>
              <h5 className="text-white mt-2 text-shadow">Design and Composites</h5>
              <ul className="opensource-list">
                <li className="onsource-list-item">{"Technical Designs"}</li>
                <li className="onsource-list-item">{"Lamination Guides"}</li>
                <li className="onsource-list-item">{"Molds"}</li>
              </ul>
              <button
                type="button"
                className="btnd btnd-info mt-2"
                onClick={() =>
                  downloadMaterial(
                    countButtons.dcDownloadCount,
                    "dcDownloadCount",
                    "sp01",
                    "https://tecnicosolarboat.tecnico.ulisboa.pt/OpenSource/SP01/DC/DC-SP01.zip",
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

export default SP01;
