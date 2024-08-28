import cx from "classnames";
import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5";
import CopyrightText from "./CopyrightText";

type Props = {
  hide: boolean;
  theme: 0 | 1 | "white" | "black";
};
const Footer = ({ hide, theme }: Props) => {
  return (
    <nav className="navbar-bottom f-medium">
      <div
        className={cx("social", {
          "footer-white": theme === "white" || theme === 0,
          "footer-black": theme === "black" || theme === 1,
          "hide-footer": hide,
        })}
      >
        <ul className="social-icons mr-auto mr-lg-0 d-none d-sm-block list-none">
          <li>
            <Link href={"https://www.facebook.com/tecnico.solarboat/"} passHref>
              <IoLogoFacebook />
            </Link>
          </li>
          <li>
            <Link href={"https://www.youtube.com/c/tecnicosolarboat/null"} passHref target="_blank">
              <IoLogoYoutube />
            </Link>
          </li>
          <li>
            <Link
              href={"https://linkedin.com/company/t%C3%A9cnico-solar-boat"}
              passHref
              target={"_blank"}
            >
              <IoLogoLinkedin />
            </Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/tecnico.solar.boat/"} passHref target={"_blank"}>
              <IoLogoInstagram />
            </Link>
          </li>
        </ul>
      </div>
      <div className={cx({ "hide-footer": hide })}>
        <CopyrightText />
      </div>
    </nav>
  );
};

export default Footer;
