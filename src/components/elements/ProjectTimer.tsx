import { useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "store";
import moment from "moment";
import { TimeLoader } from "components/timeLoader";
import React from "react";

const period = ["days", "hours", "MIN", "sec"];

// import { useWindowSize } from "hooks/useSize";

export const ProjectTimer: FC = () => {
  const project = useSelector((state: ReduxState) => state.global.project);
  const [tick, setTick] = useState("");
  // const timeLeft = "30:360:21600";
  const time = tick.split(":");

  // const size = useWindowSize();
  // const ismobile = Number(size?.width) <= 548;

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
        const h = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
        const s = String(Math.floor((timeDiff % (1000 * 60)) / 1000));

        setTick(`${d}:${h}:${m}:${s}`);
      }, 1000);
    }
    return () => clearInterval(int);
  }, [project]);

  return (
    <div className="clock">
      <div className="flexRow">
        {time.length > 1 ? (
          time.map((amount, index) => {
            return (
              <React.Fragment key={index}>
                <div key={index} className={`segment ${index === time.length - 1 ? "last" : ""}`}>
                  <strong>
                    {Number(amount) >= 10 ? (Number(amount) > 0 ? amount : "0") : 0 + amount}
                  </strong>

                  <span>{period[index]}</span>
                </div>

                {index !== 3 && <span  className={`${index === time.length - 2 ? "last" : ""}`}>:</span> // need to fix that
                }
              </React.Fragment>
            );
          })
        ) : (
          <TimeLoader />
        )}
      </div>
    </div>
  );
};
