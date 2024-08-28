import cx from "classnames";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { predict, predictionsValues, startTrain, stopTraining } from "./mlUtils";

import { Sequential } from "@tensorflow/tfjs-layers";
import { ChartValue, Predictions } from "../../interfaces";
import MlCharts from "./MlCharts";
import MlPredictions from "./MlPredictions";

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
  const [predictions, setPredictions] = useState<Predictions>(predictionsValues);

  const [firstTrain, setFirstTrain] = useState(false);
  const [chartSteps, setChartSteps] = useState(400);

  const cvx = useRef<ReactSketchCanvasRef>(null);
  return (
    <>
      <div className="row mt-3 hide-mobile">
        <h5 className="f-700">Explore this interactive example</h5>
        <p>We will train a model to predict your handwritten digits !</p>
        <div className="mt-3 mb-3">
          <span>
            <button
              type="button"
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
                  setChartSteps,
                );
              }}
            >
              Train
            </button>
          </span>
          {!stopTrain && (
            <span>
              <button
                type="button"
                className={cx("btnd btnd-warning")}
                onClick={() => stopTraining(setStopTrain)}
              >
                {"Stop train & Draw"}
              </button>
            </span>
          )}
        </div>
      </div>

      {firstTrain && (
        <div className="row">
          <div className="col-6">
            <MlCharts
              trainLoss={trainLoss}
              trainAcc={trainAcc}
              valLoss={valLoss}
              valAcc={valAcc}
              chartSteps={chartSteps}
            />
          </div>
          <div className="col-6">
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
                        if (!cvx.current) return;
                        cvx.current?.resetCanvas();
                      }}
                      onMouseUp={() => {
                        if (!cvx.current) return;
                        predict(cvx.current, myModel, setPredictions);
                      }}
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
          </div>
        </div>
      )}
    </>
  );
};

export default MlSection;
