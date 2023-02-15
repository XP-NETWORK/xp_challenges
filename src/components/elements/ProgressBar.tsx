import { useEffect, FC } from "react";
import { useWindowSize } from "../../hooks/useSize";

export type ProgressBarProps = {
  current: number;
  total: number;
  loc?: boolean | undefined;
};

export const ProgressBar: FC<ProgressBarProps> = ({ current, total, loc }) => {
  const size = useWindowSize();
  let bar: HTMLDivElement | undefined = undefined;
  useEffect(() => {
    if (bar && current && total) {
      /* waitForElm(bar).then((elm) => {
        //setWidth((current * elm?.offsetWidth) / total);
      });*/
    }
  }, [current, total, bar, size.width]);

  return (
    <div className="progressBar ">
      <div className={`${loc ? "secondBarWrap" : "barWrap"} flexRow`}>
        <div className="bar">
          <div
            className={`inner flexRow`}
            ref={(node) => {
              if (node) {
                bar = node;
              }
            }}
          >
            {Array(total)
              .fill(true)
              .map((_, idx) => (
                <div
                  key={`innerSegment-${idx}-${Math.random()}`}
                  className={`inner-segment ${idx === current - 1 ? "last" : ""} ${
                    idx < current ? "completed" : " completed notCompleted"
                  }`}
                ></div>
              ))}
          </div>
        </div>
        <div className="rate">
          <span>{current}</span>/{total}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
