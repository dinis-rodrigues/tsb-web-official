import { fullpageApi } from "@fullpage/react-fullpage";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  name: string;
  fullPageApi: fullpageApi | undefined;
  anchorName?: string;
  link: string;
};
const NavItem = ({ name, fullPageApi, link, anchorName }: Props) => {
  // If we are using fullpage API, then we use the api to move inbetween section
  // anchors
  // else, wewe use normal redirect links
  return fullPageApi ? (
    <Fragment>
      {anchorName ? (
        <span
          className="menu-item"
          onClick={() => fullPageApi.moveTo(anchorName, 0)}
        >
          {name}
        </span>
      ) : (
        <Link href={link} passHref>
          <span className="menu-item">{name}</span>
        </Link>
      )}
    </Fragment>
  ) : (
    <Link href={link} passHref>
      <span className="menu-item">{name}</span>
    </Link>
  );
};

export default NavItem;
