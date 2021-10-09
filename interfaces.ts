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
