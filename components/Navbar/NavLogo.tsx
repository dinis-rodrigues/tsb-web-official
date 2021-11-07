import Link from "next/link";

import cx from "classnames";
import { fullpageApi } from "@fullpage/react-fullpage";

type Props = {
  theme: "white" | "black";
  fullPageApi: fullpageApi | undefined;
};
const NavLogo = ({ theme, fullPageApi }: Props) => {
  return fullPageApi ? (
    <span
      className={cx("navbar-brand cursor-pointer")}
      onClick={() => fullPageApi.moveTo("home", 0)}
    >
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
    </span>
  ) : (
    <Link href="/">
      <a className={cx("navbar-brand")}>
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
      </a>
    </Link>
  );
};

export default NavLogo;
