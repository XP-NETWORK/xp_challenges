import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { ReduxState } from "store";

import moment from "moment";

const period = ["days", "hours", "min", "sec"];

import { useWindowSize } from "hooks/useSize";

const Timer = () => {
  const project = useSelector((state: ReduxState) => state.global.project);
  const [tick, setTick] = useState("");
  // const timeLeft = "30:360:21600";
  const time = tick.split(":");

  const size = useWindowSize();
  const ismobile = Number(size?.width) <= 548;

  useEffect(() => {
    let int: any;
    if (project) {
      // const endDate = new Date(project?.endDate);
      const time = moment(project?.endDate);
      int = setInterval(async () => {
        const timeDiff =
          time.toDate().getTime() -
          moment()
            .toDate()
            .getTime();

        if (timeDiff <= 0) {
          //clearInterval(int);
          //const res = await container?.cosmos?.getBalance();
          //res?.balancesList && dispatch(setBalances(res?.balancesList));
          //return setTick("Completed");
        }

        const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const m = String(
          Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        );
        const s = String(Math.floor((timeDiff % (1000 * 60)) / 1000));

        setTick(`${d}:${h}:${m}:${s}`);
      }, 1000);
    }
    return () => clearInterval(int);
  }, [project]);

  return (
    <div className="clock">
      <div className="flexRow">
        {time.map((amount, index) => (
          <>
            <div
              className={`segment ${index === time.length - 1 ? "last" : ""}`}
            >
              <strong>{amount}</strong>

              <span>{period[index]}</span>
            </div>
            {index < time.length - (ismobile ? 2 : 1) && <span>:</span>}
          </>
        ))}
      </div>
    </div>
  );
};

export default Timer;
