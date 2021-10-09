import { Sequential } from "@tensorflow/tfjs-layers";
import { ApexOptions } from "apexcharts";
import { Rank, Tensor } from "@tensorflow/tfjs";
import { ChartValue, Predictions } from "../../interfaces";
import { MnistData } from "./data";
import * as tf from "@tensorflow/tfjs";
import { ReactSketchCanvas } from "react-sketch-canvas";

const predictionsValues: Predictions = {
  "0": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "1": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "2": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "3": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "4": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "5": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "6": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "7": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "8": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
  "9": {
    value: "0",
    opacity: "0",
    predicted: false,
  },
};

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
const startTrain = async (
  myModel: Sequential | null,
  setTrainLoss: Function,
  setValLoss: Function,
  setTrainAcc: Function,
  setValAcc: Function,
  setStopTrain: Function,
  setMyModel: Function,
  setChartSteps: Function
) => {
  if (myModel) myModel.dispose();
  setStopTrain(false);
  setTrainLoss([]);
  setValLoss([]);
  setTrainAcc([]);
  setValAcc([]);
  setMyModel();
  await getAndTrainModel(
    setTrainLoss,
    setValLoss,
    setTrainAcc,
    setValAcc,
    setStopTrain,
    setMyModel,
    setChartSteps
  );
};

/**
 * Linear interpolates between a nd b, step times, specifying the starting x coordinate
 * and the key value for the object
 * @param a
 * @param b
 * @param steps
 * @param xinit
 * @param key
 * @returns
 */
const linearInterpolate = (
  a: number,
  b: number,
  steps: number,
  xinit: number,
  key: string
) => {
  // points A and B, frac between 0 and 1
  let auxArr = [];
  let frac = 0;
  let newVal = 0;
  for (let i = 1; i < steps; i++) {
    frac = i / steps;
    newVal = a + (b - a) * frac;
    // auxArr.push({newVal});
    auxArr.push({ x: xinit + i, [key]: newVal });
  }
  // auxArr.push({ x: steps, [key]: b });
  return auxArr;
};

/**
 * Linear interpolates the array, updating the state
 * @param newValue
 * @param setSeries
 * @param STEPS_PER_EPOCH
 * @param key
 * @param isLoss
 */
const updateValidationSeries = (
  newValue: number,
  setSeries: Function,
  STEPS_PER_EPOCH: number,
  key: string,
  isLoss = true
) => {
  setSeries((state: ChartValue[]) => {
    let auxVals = [];
    let init = 2.5;
    // let xinit = 0;
    if (state.length <= 0) {
      isLoss ? (init = 2.5) : (init = 0);
      auxVals = linearInterpolate(init, newValue, STEPS_PER_EPOCH, 0, key);
    } else {
      auxVals = linearInterpolate(
        state[state.length - 1][key],
        newValue,
        STEPS_PER_EPOCH,
        state[state.length - 1].x,
        key
      );
    }
    return [...state, ...auxVals];
  });
};

/**
 * Updates the train series
 * @param newValue
 * @param setSeries
 * @param batchNum
 * @param key
 */
const updateTrainSeries = (
  newValue: number[] | number,
  setSeries: Function,
  batchNum: number,
  key: string
) => {
  setSeries((state: ChartValue[]) => {
    if (newValue instanceof Array) {
      let initNum = 0;
      if (state.length > 0) initNum = state[state.length - 1].x;
      let auxArr: ChartValue[] = [];
      for (let i = 0; i < newValue.length; i++) {
        auxArr.push({ x: initNum + i, [key]: newValue[i] });
      }
      return [...state, ...auxArr];
    }
    return [...state, { x: batchNum, [key]: newValue }];
  });
};

/**
 * Shows a few examples of the MNIST dataset
 * @param data
 */
const showExamples = async (data: MnistData) => {
  // Get the examples
  const examples = data.nextTestBatch(20);
  const numExamples = examples.xs.shape[0];

  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i++) {
    const imageTensor = tf.tidy(() => {
      // Reshape the image to 28x28 px
      return examples.xs
        .slice([i, 0], [1, examples.xs.shape[1]])
        .reshape([28, 28, 1]);
    });

    const canvas = document.createElement("canvas");
    canvas.width = 28;
    canvas.height = 28;
    // canvas.style = "margin: 4px;";
    // @ts-ignore
    await tf.browser.toPixels(imageTensor, canvas);
    // surface.drawArea.appendChild(canvas);

    imageTensor.dispose();
  }
};

/**
 * Get data, builds model and trains model
 * @param setTrainLoss
 * @param setValLoss
 * @param setTrainAcc
 * @param setValAcc
 * @param setStopTrain
 * @param setMyModel
 * @param setChartSteps
 */
const getAndTrainModel = async (
  setTrainLoss: Function,
  setValLoss: Function,
  setTrainAcc: Function,
  setValAcc: Function,
  setStopTrain: Function,
  setMyModel: Function,
  setChartSteps: Function
) => {
  const data = new MnistData();
  await data.load();

  const model = getModel();

  await train(
    model,
    data,
    setTrainLoss,
    setValLoss,
    setTrainAcc,
    setValAcc,
    setStopTrain,
    setMyModel,
    setChartSteps
  );
};

/**
 * Builds a simple sequential neural network for MNIST dataset
 * @returns model
 */
const getModel = () => {
  const model = tf.sequential();

  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const IMAGE_CHANNELS = 1;

  // In the first layer of our convolutional neural network we have
  // to specify the input shape. Then we specify some parameters for
  // the convolution operation that takes place in this layer.
  model.add(
    tf.layers.conv2d({
      inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: "relu",
      kernelInitializer: "varianceScaling",
    })
  );

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

  // Repeat another conv2d + maxPooling stack.
  // Note that we have more filters in the convolution.
  model.add(
    tf.layers.conv2d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: "relu",
      kernelInitializer: "varianceScaling",
    })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten());

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  const NUM_OUTPUT_CLASSES = 10;
  model.add(
    tf.layers.dense({
      units: NUM_OUTPUT_CLASSES,
      kernelInitializer: "varianceScaling",
      activation: "softmax",
    })
  );

  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
};

/**
 * Trains models, updating all Train and Validation series
 * @param model
 * @param data
 * @param setTrainLoss
 * @param setValLoss
 * @param setTrainAcc
 * @param setValAcc
 * @param setStopTrain
 * @param setMyModel
 * @param setChartSteps
 * @returns
 */
const train = async (
  model: tf.Sequential,
  data: MnistData,
  setTrainLoss: Function,
  setValLoss: Function,
  setTrainAcc: Function,
  setValAcc: Function,
  setStopTrain: Function,
  setMyModel: Function,
  setChartSteps: Function
) => {
  const BATCH_SIZE = 64;
  const TRAIN_DATA_SIZE = 6000;
  const TEST_DATA_SIZE = 500;
  const STEPS_PER_EPOCH = Math.round(TRAIN_DATA_SIZE / BATCH_SIZE);
  const EPOCHS = 10;

  setChartSteps(EPOCHS * STEPS_PER_EPOCH);

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
  });

  const [testXs, testYs] = await tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]), d.labels];
  });

  const trainLoss: number[] = [];
  const trainAcc: number[] = [];
  let batchNum = 0;

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: EPOCHS,
    shuffle: true,
    yieldEvery: 2000,
    callbacks: [
      {
        onBatchEnd: (batch: any, logs: any) => {
          batchNum += 1;

          trainLoss.push(logs.loss);
          trainAcc.push(logs.acc);
          updateTrainSeries(logs.loss, setTrainLoss, batchNum, "trainLoss");
          updateTrainSeries(logs.acc, setTrainAcc, batchNum, "trainAcc");
          setStopTrain((state: boolean) => {
            state ? (model.stopTraining = true) : (model.stopTraining = false);
            setMyModel(model);
            return state;
          });
        },
        onEpochEnd: (epoch: number, logs: any) => {
          // updateTrainSeries(trainLoss, setTrainLoss, batchNum, "trainLoss");
          // updateTrainSeries(trainAcc, setTrainAcc, batchNum, "trainAcc");
          trainLoss.length = 0;
          trainAcc.length = 0;
          updateValidationSeries(
            logs.val_loss,
            setValLoss,
            STEPS_PER_EPOCH,
            "valLoss"
          );
          updateValidationSeries(
            logs.val_acc,
            setValAcc,
            STEPS_PER_EPOCH,
            "valAcc",
            false
          );
        },
        onTrainEnd: () => {
          setStopTrain(true);
          setMyModel(model);
        },
        onYield: () => {},
      },
    ],
  });
};

/**
 * Get image from url
 * @param url
 * @returns
 */
const load = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.src = url;
    im.onload = () => {
      resolve(im);
    };
  });
};

/**
 * Inference on trained model, gets image from canvas
 * @param cvx
 * @param myModel
 * @param setPredictions
 * @returns
 */
const predict = async (
  cvx: ReactSketchCanvas | null,
  myModel: Sequential | null,
  setPredictions: Function
) => {
  if (!cvx || !myModel) return;
  const imgPath = await cvx.exportImage("png");
  const image = await load(imgPath);
  // const nimage = tf.browser.fromPixels(image);
  const gray = tf.browser
    .fromPixels(image)
    .resizeBilinear([28, 28])
    .mean(2)
    .toInt()
    .expandDims(0)
    .expandDims(-1);

  const pred = myModel.predict(gray) as Tensor<Rank>;

  const predictedDist = pred.dataSync();
  const predictedDistArr = Array.from(predictedDist);

  const predictedNumArr = tf.argMax(pred, -1).dataSync();
  const predictedNum = Array.from(predictedNumArr)[0];

  const predictionsObj: Predictions = {};

  predictedDistArr.forEach((value, idx) => {
    predictionsObj[idx.toString()] = {
      value: Math.round(value * 100).toFixed(2),
      opacity: value.toFixed(2),
      predicted: false,
    };
  });

  predictionsObj[predictedNum.toString()].predicted = true;

  setPredictions(predictionsObj);
};

export {
  lineTrainOptions,
  lineValOptions,
  startTrain,
  stopTraining,
  predictionsValues,
  getAndTrainModel,
  showExamples,
  predict,
};
