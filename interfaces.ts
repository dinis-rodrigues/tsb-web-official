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
