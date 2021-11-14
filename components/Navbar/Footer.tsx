import { IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
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
        © Técnico Solar Boat {new Date().getFullYear()}
      </div>
    </nav>
  );
};

export default Footer;
