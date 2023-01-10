import { FC, useState, useRef, useEffect } from "react";
import "./bridge.css";
import { useSelector } from "react-redux";

import { ReduxState } from "store";

import { Loader } from "components/elements/loader";

export const BridgeWidget: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const iframe = useRef(null);

  const { project } = useSelector((state: ReduxState) => ({
    project: state.global.project,
  }));

  useEffect(() => {
    const ifr = iframe.current as HTMLIFrameElement | null;

    if (ifr) {
      ifr.addEventListener("load", () => {
        console.log("load");
        setLoaded(true);
      });
    }
  }, [iframe]);

  const small = window.innerWidth <= 1600;
  return (
    <>
      <div className="bridgeContainer">
        <iframe
          src={`https://widget-staging.xp.network?wid=63bc17c8a65fd4aaf0312526&xpchallenge=true&projectNumber=${project?.projectNumber}`}
          ref={iframe}
          width="100%"
          style={{ display: project && loaded ? "initial" : "none" }}
          height={small ? "600px" : "700px"}
          id="xpnetWidget"
        ></iframe>
        {!loaded && <Loader />}

        <script src="https://widget-staging.xp.network/wscript.js"></script>
      </div>
    </>
  );
};
