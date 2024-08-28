import { fullpageApi } from "@fullpage/react-fullpage";
import Link from "next/link";

type Props = {
  name: string;
  fullPageApi: fullpageApi | undefined;
  anchorName?: string;
  link: string;
  scrollToTop?: boolean;
  mobileClickAction?: Function;
};
const NavItem = ({
  name,
  fullPageApi,
  link,
  anchorName,
  scrollToTop = true,
  mobileClickAction = undefined,
}: Props) => {
  // If we are using fullpage API, then we use the api to move inbetween section
  // anchors
  // else, wewe use normal redirect links
  return fullPageApi ? (
    <>
      {anchorName ? (
        <span
          className="menu-item"
          onClick={() => {
            fullPageApi.moveTo(anchorName, 0);
            mobileClickAction !== undefined && mobileClickAction();
          }}
        >
          {name}
        </span>
      ) : (
        <Link href={link} passHref scroll={scrollToTop}>
          <span className="menu-item">{name}</span>
        </Link>
      )}
    </>
  ) : (
    <Link href={link} passHref scroll={scrollToTop}>
      <span className="menu-item">{name}</span>
    </Link>
  );
};

export default NavItem;
