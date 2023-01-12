import { FC, useState, useRef, useEffect } from "react";
import "./bridge.css";
import { useSelector } from "react-redux";

import { ReduxState } from "store";

import { Loader } from "components/elements/loader";
import { config } from "index";

export const BridgeWidget: FC = () => {
  const [loaded, setLoaded] = useState(false);
  const container = useRef(null);

  const iframe = useRef(null);

  const { project } = useSelector((state: ReduxState) => ({
    project: state.global.project,
  }));

  useEffect(() => {
    //const iframeContainer = container.current as HTMLDivElement | null;
    const ifr = iframe.current as HTMLIFrameElement | null;

    if (ifr) {
      ifr.addEventListener("load", () => {
        setLoaded(true);

        const script = document.createElement("script");
        script.onload = function() {
          //do stuff with the script
        };
        script.src = `${config._WIDGET}/wscript.js`;

        document.head.appendChild(script);
      });
    }
  }, [iframe]);
  //192.168.1.36
  const small = window.innerWidth <= 1600;
  return (
    <>
      <div className="bridgeContainer" ref={container}>
        <iframe
          src={`${config._WIDGET}?wid=${config._WIDGET_ID}&xpchallenge=true&projectNumber=${project?.projectNumber}`}
          ref={iframe}
          width="100%"
          style={{ display: project && loaded ? "initial" : "none" }}
          height={small ? "600px" : "700px"}
          id="xpnetWidget"
        ></iframe>
        {!loaded && <Loader />}
      </div>
    </>
  );
};
