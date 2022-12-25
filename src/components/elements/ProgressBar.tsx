import React, { useEffect, useState } from "react";

import { useWindowSize } from "../../hooks/useSize";

type ProgressBarProps = {
  current: number;
  total: number;
};

function waitForElm(element: HTMLDivElement): Promise<HTMLDivElement> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(element);
    }, 240);
  });
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const [innerBarWidth, setWidth] = useState(0);

  const size = useWindowSize();

  let bar: HTMLDivElement | undefined = undefined;

  useEffect(() => {
    if (bar && current && total) {
      waitForElm(bar).then((elm) => {
        setWidth((current * elm?.offsetWidth) / total);
      });
    }
  }, [current, total, bar, size.width]);

  return (
    <div className="progressBar ">
      <div className="barWrap flexRow">
        <div className="bar">
          <div
            className="inner"
            ref={(node) => {
              if (node) {
                bar = node;
              }
            }}
          >
            <div
              className="progress"
              style={{ width: `${innerBarWidth}px` }}
            ></div>
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
