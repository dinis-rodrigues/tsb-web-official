import { MnistData } from "./data";

import * as tf from "@tensorflow/tfjs";
import { Tensor1D } from "@tensorflow/tfjs";
import { ChartValue } from "../../interfaces";

const classNames = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

/**
 * Linear interpolate between two numbers
 * @param a
 * @param b
 * @param steps
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
    let xinit = 0;
    if (state.length <= 0) {
      isLoss ? (init = 2.5) : (init = 0);
      auxVals = linearInterpolate(init, newValue, STEPS_PER_EPOCH, 0, key);
    } else {
      // @ts-ignore
      // console.log("Curr X: ", state);
      // @ts-ignore
      // console.log("Curr Y: ", state[state.length - 1][key]);
      auxVals = linearInterpolate(
        // @ts-ignore
        state[state.length - 1][key],
        newValue,
        STEPS_PER_EPOCH,
        // @ts-ignore
        state[state.length - 1].x,
        key
      );
    }
    // console.log([...state, ...auxVals]);
    return [...state, ...auxVals];
  });
};

const updateTrainSeries = (
  newValue: number[] | number,
  setSeries: Function,
  batchNum: number,
  key: string
) => {
  setSeries((state: ChartValue[]) => {
    // console.log(state);
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
 *
 * @param setTrainLoss
 * @param setStopTrain
 */
const trainModel = async (
  setTrainLoss: Function,
  setValLoss: Function,
  setTrainAcc: Function,
  setValAcc: Function,
  setStopTrain: Function
) => {
  const data = new MnistData();
  await data.load();
  // await showExamples(data);

  const model = getModel();
  // tfvis.show.modelSummary({ name: "Model Architecture", tab: "Model" }, model);

  await train(
    model,
    data,
    setTrainLoss,
    setValLoss,
    setTrainAcc,
    setValAcc,
    setStopTrain
  );
};

// document.addEventListener("DOMContentLoaded", run);

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
 * Function to begin model training
 * @param model
 * @param data
 * @param setTrainLoss
 * @param setStopTrain
 * @returns
 */
const train = async (
  model: tf.Sequential,
  data: MnistData,
  setTrainLoss: Function,
  setValLoss: Function,
  setTrainAcc: Function,
  setValAcc: Function,
  setStopTrain: Function
) => {
  const BATCH_SIZE = 512;
  const TRAIN_DATA_SIZE = 20000;
  const TEST_DATA_SIZE = 1000;
  const STEPS_PER_EPOCH = Math.round(TRAIN_DATA_SIZE / BATCH_SIZE);

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
    epochs: 10,
    shuffle: true,
    yieldEvery: 2000,
    callbacks: [
      {
        onBatchEnd: (batch: any, logs: any) => {
          // console.log("Step Num", batch);
          batchNum += 1;

          trainLoss.push(logs.loss);
          trainAcc.push(logs.acc);
          updateTrainSeries(logs.loss, setTrainLoss, batchNum, "trainLoss");
          updateTrainSeries(logs.acc, setTrainAcc, batchNum, "trainAcc");
          setStopTrain((state: boolean) => {
            state ? (model.stopTraining = true) : (model.stopTraining = false);
          });
        },
        onEpochEnd: (epoch: number, logs: any) => {
          // console.log("On yield", auxData);
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
        },
        onYield: () => {},
      },
    ],
  });
};

/**
 * Inference on data
 * @param model
 * @param data
 * @param testDataSize
 * @returns
 */
const doPrediction = (
  model: tf.Sequential,
  data: MnistData,
  testDataSize = 500
) => {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const testData = data.nextTestBatch(testDataSize);
  const testxs = testData.xs.reshape([
    testDataSize,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    1,
  ]);

  const labels = testData.labels.argMax(-1);

  const preds = tf.argMax(model.predict(testxs) as tf.Tensor, -1);
  // console.log("here", testxs, preds.dataSync());
  testxs.dispose();
  return [preds, labels];
};

/**
 * Builds a table with test results
 * @param model
 * @param data
 */
// const showAccuracy = async (model: tf.Sequential, data: MnistData) => {
//   const [preds, labels] = doPrediction(model, data);

//   const classAccuracy = await tfvis.metrics.perClassAccuracy(
//     labels as Tensor1D,
//     preds as Tensor1D,
//     10
//   );
//   console.log(preds, labels);
//   const container = { name: "Accuracy", tab: "Evaluation" };
//   tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

//   labels.dispose();
// };

/**
 * Builds a confusion matrix of the results
 * @param model
 * @param data
 */
// const showConfusion = async (model: tf.Sequential, data: MnistData) => {
//   const [preds, labels] = doPrediction(model, data);

//   const confusionMatrix = await tfvis.metrics.confusionMatrix(
//     labels as Tensor1D,
//     preds as Tensor1D
//   );
//   const container = { name: "Confusion Matrix", tab: "Evaluation" };
//   tfvis.render.confusionMatrix(container, {
//     values: confusionMatrix,
//     tickLabels: classNames,
//   });

//   labels.dispose();
// };

export { trainModel, showExamples };
