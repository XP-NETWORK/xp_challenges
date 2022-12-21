import React, { useRef, useEffect, useState } from "react";

import { useWindowSize } from "../../hooks/useSize";

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const [innerBarWidth, setWidth] = useState(0);

  const size = useWindowSize();

  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bar.current && current && total) {
      setTimeout(() => {
        const barWidth = bar.current?.clientWidth;
        setWidth((current * barWidth!) / total);
      }, 10);
    }
  }, [current, total, bar, size.width]);

  return (
    <div className="progressBar ">
      <div className="barWrap flexRow">
        <div className="bar">
          <div className="inner" ref={bar}>
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
