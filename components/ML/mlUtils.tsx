import { ApexOptions } from "apexcharts";
import { trainModel } from "./script";

const lineTrainOptions: ApexOptions = {
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#16aaff", "#FF5733"],
  stroke: {
    width: 1,
  },
  title: {
    text: "Loss Evolution",
    align: "left",
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
    labels: {
      formatter: (value: number) => {
        return Number(value).toFixed(2).toString();
      },
    },
    tickAmount: 4,
  },
  xaxis: {
    tickAmount: 10,
    min: 0,
  },
  tooltip: {
    theme: "dark",
  },
};

const lineValOptions: ApexOptions = {
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#16aaff", "#FF5733"],
  stroke: {
    width: 1,
  },
  title: {
    text: "Loss Evolution",
    align: "left",
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
    min: 0,
    max: 1,
    labels: {
      formatter: (value: number) => {
        return Number(value).toFixed(2).toString();
      },
    },
    tickAmount: 4,
  },

  xaxis: {
    tickAmount: 10,
    min: 0,
  },
  tooltip: {
    theme: "dark",
  },
};

/**
 * Stops training, by updating the state
 * @param stopTrain
 * @param setStopTrain
 */
const stopTraining = (setStopTrain: Function) => {
  setStopTrain(true);
};
/**
 * Starts training the model, clears the graph as well
 * @param setTrainLoss
 * @param setStopTrain
 */
const startTrain = (
  setTrainLoss: Function,
  setValLoss: Function,
  setTrainAcc: Function,
  setValAcc: Function,
  setStopTrain: Function
) => {
  setStopTrain(false);
  setTrainLoss([]);
  setValLoss([]);
  setTrainAcc([]);
  setValAcc([]);
  trainModel(setTrainLoss, setValLoss, setTrainAcc, setValAcc, setStopTrain);
};

export { lineTrainOptions, lineValOptions, startTrain, stopTraining };
