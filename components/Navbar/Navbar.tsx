import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import cx from "classnames";
import {
  IoClose,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
} from "react-icons/io5";
import logoWhite from "../../public/assets/images/tsb/TSB_oficial_white.png";
import logoBlack from "../../public/assets/images/tsb/TSB_oficial.png";

type Props = {
  theme: string;
};
const Navbar = ({ theme }: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [navLogo, setNavLogo] = useState(logoWhite);

  useEffect(() => {
    theme === "white" ? setNavLogo(logoWhite) : setNavLogo(logoBlack);
  }, [theme]);
  return (
    <div
      className={cx("navigation", {
        "menu-is-open": menuIsOpen,
        "nav-white": theme === "white",
        "nav-black": theme === "black",
      })}
    >
      <nav className={cx("navbar navbar-desktop")}>
        <div className="w-100">
          <a className={cx("navbar-brand")} href="#">
            <div
              className={cx("logo-img", {
                "active-img": theme === "white",
              })}
            >
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={"assets/images/tsb/TSB_oficial_white.png"}
                  alt=""
                  width="100px"
                  height="50px"
                />
              }
            </div>
            <div
              className={cx("logo-img", {
                "active-img": theme === "black",
              })}
            >
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={"assets/images/tsb/TSB_oficial.png"}
                  alt=""
                  width="100px"
                  height="50px"
                />
              }
            </div>

            {/* <div className="logo-container"></div> */}
          </a>
          <div className="navbar-right">
            <span className="menu-item">About</span>
            <span className="menu-item">Team</span>
            <span className="menu-item">Sponsors</span>
            <span className="menu-item">Open Source</span>
            <span className="menu-item">Recruitment</span>
            <span className="menu-item">Contact</span>
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
      <nav className="navbar-bottom">
        <div className="social">
          <ul className="social-icons mr-auto mr-lg-0 d-none d-sm-block list-none">
            <li>
              <a href="#" className="ion-icon">
                <IoLogoFacebook />
              </a>
            </li>
            <li>
              <a href="#" className="ion-icon">
                <IoLogoTwitter />
              </a>
            </li>
            <li>
              <a href="#" className="ion-icon">
                <IoLogoLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <div className={"copy d-none d-sm-block footer-text"}>
          © Técnico Solar Boat 2020.
        </div>
      </nav>
      <nav className="navbar navbar-mobile">
        <span className="close" onClick={() => setMenuIsOpen(false)}>
          <IoClose />
        </span>

        <ul className="navbar-nav navbar-nav-mobile">
          <li className="active">
            <a className="nav-link active" data-menuanchor="home" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" data-menuanchor="about" href="#about">
              About
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              data-menuanchor="experience"
              href="#experience"
            >
              Experience
            </a>
          </li>
          <li>
            <a className="nav-link" data-menuanchor="skills" href="#skills">
              Skills
            </a>
          </li>
          <li>
            <a className="nav-link" data-menuanchor="projects" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="nav-link" data-menuanchor="partners" href="#partners">
              Partners
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              data-menuanchor="testimonials"
              href="#testimonials"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a className="nav-link" data-menuanchor="news" href="#news">
              News
            </a>
          </li>
          <li>
            <a className="nav-link" data-menuanchor="contact" href="#contact">
              Contact
            </a>
          </li>
        </ul>
        <div
          className={cx("navbar-mobile-footer", {
            "text-white": theme === "black",
          })}
        >
          <p>© Denzel. 2020. All Rights Reserved.</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
