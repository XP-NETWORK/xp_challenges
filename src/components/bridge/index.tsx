import { FC } from "react";
import "./bridge.css";

export const BridgeWidget: FC = () => {
  return (
    <>
      <div className="bridgeContainer">
        <iframe
          src="https://widget-staging.xp.network?wid=63bc17c8a65fd4aaf0312526"
          width="100%"
          height="100%"
          id="xpnetWidget"
        ></iframe>
        <script src="https://widget-staging.xp.network/wscript.js"></script>
      </div>
    </>
  );
};
