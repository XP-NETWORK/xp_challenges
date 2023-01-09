import { FC } from "react";
import "./bridge.css";
import { useSelector } from "react-redux";

import { ReduxState } from "store";

export const BridgeWidget: FC = () => {
  const { project } = useSelector((state: ReduxState) => ({
    project: state.global.project,
  }));

  const small = window.innerWidth <= 1600;
  return (
    <>
      <div className="bridgeContainer">
        {project && (
          <iframe
            src={`https://widget-staging.xp.network?wid=63bc17c8a65fd4aaf0312526&xpchallenge=true&projectNumber=${project.projectNumber}`}
            width="100%"
            height={small ? "600px" : "700px"}
            id="xpnetWidget"
          ></iframe>
        )}
        <script src="https://widget-staging.xp.network/wscript.js"></script>
      </div>
    </>
  );
};
