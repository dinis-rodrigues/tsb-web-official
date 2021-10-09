import { Predictions } from "../../interfaces";
import cx from "classnames";
import { Fragment } from "react";

type Props = {
  predictions: Predictions;
};

const MlPredictions = ({ predictions }: Props) => {
  return (
    <Fragment>
      <div className="output-column">
        <div className="output">
          <div
            className={cx("output-class", {
              predicted: predictions["0"].predicted,
            })}
          >
            <div className="output-label">0</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["0"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["0"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["1"].predicted,
            })}
          >
            <div className="output-label">1</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["1"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["1"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["2"].predicted,
            })}
          >
            <div className="output-label">2</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["2"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["2"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["3"].predicted,
            })}
          >
            <div className="output-label">3</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["3"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["3"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["4"].predicted,
            })}
          >
            <div className="output-label">4</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["4"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["4"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["5"].predicted,
            })}
          >
            <div className="output-label">5</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["5"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["5"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["6"].predicted,
            })}
          >
            <div className="output-label">6</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["6"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["6"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["7"].predicted,
            })}
          >
            <div className="output-label">7</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["7"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["7"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["8"].predicted,
            })}
          >
            <div className="output-label">8</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["8"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["8"].opacity})`,
              }}
            ></div>
          </div>
          <div
            className={cx("output-class", {
              predicted: predictions["9"].predicted,
            })}
          >
            <div className="output-label">9</div>{" "}
            <div
              className="output-bar"
              style={{
                height: `${predictions["9"].value}px`,
                backgroundColor: `rgba(27,188,155,${predictions["9"].opacity})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MlPredictions;
