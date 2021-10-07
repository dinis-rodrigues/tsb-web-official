import React, { useState } from "react";
import { trainModel } from "../ML/script";
import { startTrain, stopTraining } from "./mlUtils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// import Chart from "react-apexcharts";
import { lineTrainOptions, lineValOptions } from "./mlUtils";
import { ChartValue } from "../../interfaces";

const MlSection = () => {
  const [trainLoss, setTrainLoss] = useState<ChartValue>();
  const [valLoss, setValLoss] = useState<ChartValue>();

  const [trainAcc, setTrainAcc] = useState<ChartValue>();
  const [valAcc, setValAcc] = useState<ChartValue>();

  const [stopTrain, setStopTrain] = useState(false);
  return (
    <div
      className="section"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <button
        onClick={() =>
          startTrain(
            setTrainLoss,
            setValLoss,
            setTrainAcc,
            setValAcc,
            setStopTrain
          )
        }
      >
        Start train
      </button>
      <button onClick={() => stopTraining(setStopTrain)}>Stop train</button>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <Chart
              options={{
                ...lineTrainOptions,
                tooltip: {
                  theme: "dark",
                  enabled: stopTrain ? true : false,
                },
              }}
              series={[
                { name: "Train Loss", data: trainLoss },
                { name: "Validation Loss", data: valLoss },
              ]}
              type="line"
              width="60%"
              height="350"
            /> */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                  dataKey="x"
                  domain={[0, 400]}
                  type="number"
                  allowDataOverflow
                  allowDuplicatedCategory={false}
                >
                  <Label
                    value="Steps"
                    offset={-5}
                    position="insideBottom"
                    fill="#FFFFFF"
                  />
                </XAxis>

                <YAxis>
                  <Label
                    value="Loss"
                    position="left"
                    offset={0}
                    angle={-90}
                    fill="#FFFFFF"
                  />
                </YAxis>
                <Tooltip />
                <Legend verticalAlign="top" />
                <Line
                  dot={false}
                  dataKey="trainLoss"
                  data={trainLoss}
                  isAnimationActive={false}
                />
                <Line
                  dot={false}
                  dataKey="valLoss"
                  data={valLoss}
                  stroke="#FF5733"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="col">
            {/* <Chart
              options={{
                ...lineValOptions,
                tooltip: {
                  theme: "dark",
                  enabled: stopTrain ? true : false,
                },
              }}
              series={[
                { name: "Train Accuracy", data: trainAcc },
                { name: "Validation Accuracy", data: valAcc },
              ]}
              type="line"
              width="60%"
              height="350"
            /> */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={400}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                  dataKey="x"
                  domain={[0, 400]}
                  type="number"
                  allowDataOverflow
                  allowDuplicatedCategory={false}
                >
                  <Label
                    value="Steps"
                    offset={-5}
                    position="insideBottom"
                    fill="#FFFFFF"
                  />
                </XAxis>
                <YAxis>
                  <Label
                    value="Accuracy"
                    position="left"
                    offset={0}
                    angle={-90}
                    fill="#FFFFFF"
                  />
                </YAxis>
                <Tooltip />
                <Legend verticalAlign="top" />
                <Line
                  dot={false}
                  dataKey="trainAcc"
                  data={trainAcc}
                  isAnimationActive={false}
                />
                <Line
                  dot={false}
                  dataKey="valAcc"
                  data={valAcc}
                  stroke="#FF5733"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MlSection;
