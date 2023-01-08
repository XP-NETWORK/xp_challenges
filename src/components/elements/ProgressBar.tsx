import { useEffect, useState, FC } from "react";

import { useWindowSize } from "../../hooks/useSize";

export type ProgressBarProps = {
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

export const ProgressBar: FC<ProgressBarProps> = ({ current, total }) => {
  const [innerBarWidth, setWidth] = useState(0);
  console.log(innerBarWidth);

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
            className={`inner flexRow ${current === 0? 'empty': ''}`}
            ref={(node) => {
              if (node) {
                bar = node;
              }
            }}
          >
            {Array(total).fill(true).map((_, idx) => <div key={`innerSegment-${idx}-${Math.random()}`} className={`inner-segment ${idx === current - 1? 'last': ''} ${idx < current? 'completed': ''}`}></div>)}
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
