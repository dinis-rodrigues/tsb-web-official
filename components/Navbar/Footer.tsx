import Link from "next/link";
import { IoLogoFacebook, IoLogoYoutube, IoLogoLinkedin } from "react-icons/io5";
import CopyrightText from "./CopyrightText";

const Footer = () => {
  return (
    <nav className="navbar-bottom f-medium">
      <div className="social">
        <ul className="social-icons mr-auto mr-lg-0 d-none d-sm-block list-none">
          <li>
            <Link href={"https://www.facebook.com/tecnico.solarboat/"} passHref>
              <a target={"_blank"} className="ion-icon">
                <IoLogoFacebook />
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={"https://www.youtube.com/c/tecnicosolarboat/null"}
              passHref
            >
              <a target={"_blank"} className="ion-icon">
                <IoLogoYoutube />
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={"https://pt.linkedin.com/company/t%C3%A9cnico-solar-boat"}
              passHref
            >
              <a target={"_blank"} className="ion-icon">
                <IoLogoLinkedin />
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <CopyrightText />
    </nav>
  );
};

export default Footer;
