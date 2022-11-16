import { Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { ChartValue } from "../../interfaces";

type Props = {
  trainLoss: ChartValue | undefined;
  trainAcc: ChartValue | undefined;
  valLoss: ChartValue | undefined;
  valAcc: ChartValue | undefined;
  chartSteps: number;
};
const MlCharts = ({
  trainLoss,
  trainAcc,
  valLoss,
  valAcc,
  chartSteps,
}: Props) => {
  return (
    <Fragment>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              className=""
              width={500}
              height={150}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 10,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="x"
                domain={[0, chartSteps]}
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

              <YAxis domain={[0, 3]}>
                <Label
                  value="Loss"
                  position="center"
                  angle={-90}
                  fill="#FFFFFF"
                />
              </YAxis>
              {trainLoss && (
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (value) return [parseFloat(value.toFixed(3)), name];
                    return [0, ""];
                  }}
                  allowEscapeViewBox={{ x: true, y: true }}
                  labelClassName={"d-none"}
                />
              )}
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
        <div className="col-md-6">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              width={500}
              height={150}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 10,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="x"
                domain={[0, chartSteps]}
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
              <YAxis domain={[0, 1]}>
                <Label
                  value="Accuracy"
                  position="center"
                  angle={-90}
                  fill="#FFFFFF"
                />
              </YAxis>
              {trainAcc && (
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (value) return [parseFloat(value.toFixed(3)), name];
                    return [0, ""];
                  }}
                  allowEscapeViewBox={{ x: false, y: true }}
                  labelClassName={"d-none"}
                />
              )}
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
    </Fragment>
  );
};

export default MlCharts;
