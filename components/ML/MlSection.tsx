import React, { Fragment, useRef, useState } from "react";
import { predict } from "./mlUtils";
import { predictionsValues, startTrain, stopTraining } from "./mlUtils";
import { ReactSketchCanvas } from "react-sketch-canvas";
import cx from "classnames";

import { ChartValue, Predictions } from "../../interfaces";
import { Sequential } from "@tensorflow/tfjs-layers";
import { Box, Slider } from "@mui/material";
import MlPredictions from "./MlPredictions";
import MlCharts from "./MlCharts";

type Props = {
  setToggleMl: Function;
};

const MlSection = ({ setToggleMl }: Props) => {
  const [myModel, setMyModel] = useState<Sequential | null>(null);
  const [trainLoss, setTrainLoss] = useState<ChartValue>();

  const [valLoss, setValLoss] = useState<ChartValue>();

  const [trainAcc, setTrainAcc] = useState<ChartValue>();
  const [valAcc, setValAcc] = useState<ChartValue>();

  const [stopTrain, setStopTrain] = useState(true);
  const [predictions, setPredictions] =
    useState<Predictions>(predictionsValues);

  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [firstTrain, setFirstTrain] = useState(false);
  const [chartSteps, setChartSteps] = useState(400);

  const cvx = useRef<ReactSketchCanvas>(null);
  return (
    <Fragment>
      <div className="row mt-3">
        <h5 className="f-700">Explore this interactive example</h5>
        <p>We will train a model in order to predict handwritten digits</p>
        <div className="mt-3 mb-3">
          <span>
            <button
              className={cx("btnd btnd-success", { "d-none": !stopTrain })}
              onClick={() => {
                setFirstTrain(true);
                setToggleMl(true);
                startTrain(
                  myModel,
                  setTrainLoss,
                  setValLoss,
                  setTrainAcc,
                  setValAcc,
                  setStopTrain,
                  setMyModel,
                  setChartSteps
                );
              }}
            >
              Train
            </button>
          </span>
          <span>
            <button
              className={cx("btnd btnd-warning", { "d-none": stopTrain })}
              onClick={() => stopTraining(setStopTrain)}
            >
              Stop train
            </button>
          </span>
          <span>
            <button
              className={cx("btnd btnd-outline-secundary")}
              onClick={() => setAdvancedOptions(!advancedOptions)}
            >
              {!advancedOptions ? "Advanced Options" : "Hide Options"}
            </button>
          </span>
          {advancedOptions && (
            <Fragment>
              <span
                style={{ display: "inline-block", verticalAlign: "bottom" }}
              >
                <Box sx={{ width: "50px" }}>
                  <Slider
                    size="small"
                    // value={typeof value === "number" ? value : 0}
                    // onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => "Batch Size: " + value}
                  />
                </Box>
              </span>
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "bottom",
                  marginLeft: "2rem",
                }}
                className=""
              >
                <Box sx={{ width: "50px" }}>
                  <Slider
                    size="small"
                    // value={typeof value === "number" ? value : 0}
                    // onChange={handleSliderChange}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => "Batch: " + value}
                  />
                </Box>
              </span>
            </Fragment>
          )}
        </div>
      </div>

      {firstTrain && (
        <Fragment>
          <MlCharts
            trainLoss={trainLoss}
            trainAcc={trainAcc}
            valLoss={valLoss}
            valAcc={valAcc}
            chartSteps={chartSteps}
          />
          <div className="row mt-2">
            <div className="col-md">
              <div className="input-column">
                <div className="input-container">
                  <div className="input-label">
                    Draw (0-9) here <span className="arrow">⤸</span>
                  </div>
                  <div
                    className={"canvas-container"}
                    onMouseEnter={() => {
                      // e.preventDefault();
                      cvx.current?.resetCanvas();
                    }}
                    onMouseUp={() =>
                      predict(cvx.current, myModel, setPredictions)
                    }
                    style={{ height: "100px", width: "100px" }}
                  >
                    <ReactSketchCanvas
                      className="canvas-board"
                      width="100px"
                      height="100px"
                      strokeWidth={10}
                      strokeColor="white"
                      canvasColor={"rgba(0,0,0,0)"}
                      ref={cvx}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <MlPredictions predictions={predictions} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MlSection;
