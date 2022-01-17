import { ReactElement } from "react";
import { IconType } from "react-icons";

export interface NavTheme {
  color: 0 | 1 | "white" | "black";
  hideFooter?: boolean;
  switchFooterTheme?: boolean;
  isOpaque?: boolean;
}

// Public Information
export interface PublicTeam {
  [key: string]: PublicUser;
}

export interface PublicUser {
  info: PublicUserInfo;
}

export interface PublicUserInfo {
  name: string;
  position: string;
  degree: string;
  birth: string;
  department: string;
  joinedIn: string;
  leftIn?: string;
  linkedin?: string;
  description?: string;
  email?: string;
  inTeam: boolean;
  userName: string;
}

export interface DepartmentTab {
  name: string;
  active: boolean;
}

export interface ChartValue {
  x: number;
  [key: string]: number;
}

export interface Predictions {
  [key: string]: {
    predicted: boolean;
    value: string;
    opacity: string;
  };
}

export interface SponsorsOrder {
  [key: string]: Sponsor;
}

export interface Sponsor {
  order: number;
  level: string;
  name: string;
  svgString: string;
  url: string;
}

export interface ColorPickerValue {
  hex?: string;
  rgba?: Array<number>;
  hsv?: Array<number>;
}

export interface SponsorBracketsPublic {
  [key: string]: SponsorBracketPublic;
}
export interface SponsorBracketPublic {
  sponsorsBoardList: string[];
  bracketSponsors: SponsorsOrderPublic;
  name: string;
  bottomMargin: number;
  topMargin: number;
  numColumns: number;
  color?: ColorPickerValue;
}

export interface SponsorsOrderPublic {
  [key: string]: SponsorPublic;
}

export interface SponsorPublic {
  name: string;
  svgPath: string;
  url: string;
}

// Gallery
export interface PublicGallery {
  [key: string]: GalleryItem;
}
export interface GalleryItem {
  name: string;
  description?: string;
  timestamp: number;
}

export interface AllAlbumPhotos {
  [key: string]: GalleryAlbum;
}
export interface GalleryAlbum {
  [key: string]: GalleryPhoto;
}

export interface GalleryPhoto {
  imagePath: string;
  rzImgPath: string;
  description?: string;
  createdAt: number;
}

// Open source interfaces
export interface SR01Count {
  esDownloadCount: number;
  msDownloadCount: number;
  dcDownloadCount: number;
  likeCount: number;
}

export interface SR02Count {
  esDownloadCount: number;
  msDownloadCount: number;
  dcDownloadCount: number;
  likeCount: number;
}

export interface SR03Count {
  esDownloadCount: number;
  msDownloadCount: number;
  dcDownloadCount: number;
  likeCount: number;
}

export interface SM01Count {
  esDownloadCount: number;
  hpDownloadCount: number;
  dcDownloadCount: number;
  likeCount: number;
}

export interface RecruitmentFormInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  email: string;
  confirmEmail: string;
  degree: string;
  curricularYear: number;
  country: string;
  socialLink: string;
  motivation: string;
}

export interface RecruitmentDepartmentsForm {
  [key: string]: boolean;
}

export interface Departments {
  [key: string]: Department;
}

export interface Department {
  acronym: string;
  color: string;
  description: string;
  gradientColor: string;
  icon: string;
  positions: string[];
}

export interface TooltipIconItems {
  icon: ReactElement;
  tooltip: string;
  tooltipTarget: string;
  counter?: boolean;
  counterStart?: number;
  counterEnd?: number;
  counterDelay?: number;
  suffix?: string;
  duration?: number;
  title?: string;
}
