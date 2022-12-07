import React, {
  ReactChild,
  ReactChildren,
  useRef,
  useEffect,
  useState,
} from "react";
import { ICard } from "../../../store/types";

import { getFrameType } from "../../../utils";

import { withServices, ServiceContainer } from "../../../hocs/withServices";

import { CardType } from "../../../store/types";

export const CardWrapper = withServices(
  ({
    card,
    children,
    serviceContainer,
  }: {
    card: ICard;
    children: ReactChild | ReactChildren;
    serviceContainer: ServiceContainer;
  }) => {
    const [url, setState] = useState("");

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    useEffect(() => {
      getFrameType(card).then((src) => setState(String(src)));
    }, [card]);

    const [intersectedFrame, setIntersectedFrame] = useState(false);

    //const [intersected, setIntersected] = useState(false);
    // const [intersected, setIntersected] = useState(false);
    const frame = useRef(null);
    /*const rowSymbol = useRef(null);
    const spellSymboll = useRef(null);
    const cardSpellShutter = useRef(null);*/

    useEffect(() => {
      serviceContainer.imageLoader.addRef(frame, setIntersectedFrame);
    }, [serviceContainer.imageLoader]);

    return (
      <div className={`cardWrapper`}>
        <div
          className="cardFrame"
          ref={frame}
          style={{
            backgroundImage: `url(${intersectedFrame && url ? url : "#"})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className={`cardSymbol rowSymbol ${card.Row || ""}`}></div>
        <div
          className={`cardSymbol spellSymbol ${
            card.Type === CardType.Spell ? "Default" : card.Ability || ""
          }`}
        ></div>
        {<div className={`cardSpellShutter ${card.Rarity || "Basic"}`}></div>}
        <span
          className={`cardBasePower ${
            card["Base Power"] > 9 ? "longDigit" : ""
          }`}
        >
          {card["Base Power"]}
        </span>

        {(card.Ability || card["Base Power"]) && (
          <span className="cardLevel">1</span>
        )}
        {true && (
          <div className={`hoverBlock ghostBg ${isSafari ? "safari" : ""}`}>
            <h5 className="trancentredX">{card.Name_EN}</h5>
            <div className="hoverBlock-text trancentredX">
              <span>{card.Ability}</span>
              <p>{card.abilityData?.Description}</p>
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
);
