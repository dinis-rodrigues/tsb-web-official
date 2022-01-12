import { useState } from "react";
import cx from "classnames";
import { IoClose } from "react-icons/io5";
import { fullpageApi } from "@fullpage/react-fullpage";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import Footer from "./Footer";
import CopyrightText from "./CopyrightText";

type Props = {
  theme: 0 | 1 | "white" | "black";
  fullPageApi?: fullpageApi | undefined;
  changeAll?: boolean;
};
const Navbar = ({ theme, fullPageApi, changeAll = true }: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div
      id={"navigation"}
      className={cx("navigation", {
        "menu-is-open": menuIsOpen,
        "nav-white": theme === "white" || theme === 0,
        "nav-black": theme === "black" || theme === 1,
      })}
    >
      <nav
        className={cx("navbar navbar-desktop")}
        style={{ position: "fixed" }}
      >
        <div className="w-100 h-100 d-flex align-items-center">
          <NavLogo theme={theme} fullPageApi={fullPageApi} />

          <div className="navbar-right">
            <NavItem
              name={"About"}
              fullPageApi={fullPageApi}
              link={"/#about"}
              anchorName={"about"}
            />
            <NavItem
              name={"Team"}
              fullPageApi={fullPageApi}
              link={"/#team"}
              anchorName={"team"}
            />
            <NavItem
              name={"Sponsors"}
              fullPageApi={fullPageApi}
              link={"/#sponsors"}
              anchorName={"sponsors"}
            />
            <NavItem
              name={"Gallery"}
              fullPageApi={fullPageApi}
              link={"/gallery"}
            />
            <NavItem
              name={"Open Source"}
              fullPageApi={fullPageApi}
              link={"/opensource"}
            />
            <NavItem
              name={"recruitment"}
              fullPageApi={fullPageApi}
              link={"/recruitment"}
            />
            <NavItem
              name={"Contact"}
              fullPageApi={fullPageApi}
              link={"/#contact"}
              anchorName={"contact"}
            />
          </div>

          <button
            className="toggler"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
          </button>
        </div>
      </nav>

      <Footer />

      <nav className="navbar navbar-mobile">
        <span className="close" onClick={() => setMenuIsOpen(false)}>
          <IoClose />
        </span>

        <ul className="navbar-nav navbar-nav-mobile">
          <li>
            <NavItem
              name={"About"}
              fullPageApi={fullPageApi}
              link={"/#about"}
              anchorName={"about"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
          <hr />
          <li>
            <NavItem
              name={"Team"}
              fullPageApi={fullPageApi}
              link={"/#team"}
              anchorName={"team"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
          <hr />
          <li>
            <NavItem
              name={"Sponsors"}
              fullPageApi={fullPageApi}
              link={`${process.env.BASE_PATH}/#sponsors`}
              anchorName={"sponsors"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
          <hr />
          <li>
            <NavItem
              name={"Gallery"}
              fullPageApi={fullPageApi}
              link={"/gallery"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
          <hr />
          <li>
            <NavItem
              name={"Open Source"}
              fullPageApi={fullPageApi}
              link={"/opensource"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
          <hr />
          <li>
            <NavItem
              name={"recruitment"}
              fullPageApi={fullPageApi}
              link={"/recruitment"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
          <hr />
          <li>
            <NavItem
              name={"Contact"}
              fullPageApi={fullPageApi}
              link={"/#contact"}
              anchorName={"contact"}
              mobileClickAction={() => setMenuIsOpen(false)}
            />
          </li>
        </ul>
        <div
          className={cx("navbar-mobile-footer", {
            "text-white": theme === "black",
            "text-black": theme === "white",
          })}
        >
          <CopyrightText />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
