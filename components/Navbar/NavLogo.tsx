import Link from "next/link";

import { fullpageApi } from "@fullpage/react-fullpage";
import cx from "classnames";

type Props = {
  theme: 0 | 1 | "white" | "black";
  fullPageApi: fullpageApi | undefined;
};
const NavLogo = ({ theme, fullPageApi }: Props) => {
  return fullPageApi ? (
    <span
      className={cx("navbar-brand cursor-pointer h-100")}
      onClick={() => fullPageApi.moveTo("home", 0)}
    >
      <div
        className={cx("logo-img", {
          "active-img": theme === "white" || theme === 0,
        })}
      >
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.BASE_PATH}/assets/images/tsb/TSB_oficial_white.png`}
            alt=""
            width="100px"
            height="50px"
          />
        }
      </div>
      <div
        className={cx("logo-img", {
          "active-img": theme === "black" || theme === 1,
        })}
      >
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.BASE_PATH}/assets/images/tsb/TSB_oficial.png`}
            alt=""
            width="100px"
            height="50px"
          />
        }
      </div>
    </span>
  ) : (
    <Link href="/">
      <a className={cx("navbar-brand h-100")}>
        <div
          className={cx("logo-img", {
            "active-img": theme === "white" || theme === 0,
          })}
        >
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${process.env.BASE_PATH}/assets/images/tsb/TSB_oficial_white.png`}
              alt=""
              width="100px"
              height="50px"
            />
          }
        </div>
        <div
          className={cx("logo-img", {
            "active-img": theme === "black" || theme === 1,
          })}
        >
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${process.env.BASE_PATH}/assets/images/tsb/TSB_oficial.png`}
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
