import React, { useRef, useEffect /*, useState, useCallback*/ } from "react";

import { IFaction } from "../../lists/factions";

import { ICard } from "../../../store/types";

import { CardImage } from "../card/card";

import { withAliceCarousel } from "../../../hocs/withCarousel";

import { deckCardFabric } from "../../../store/models/card";

import { CardInfo } from "../card/cardInfo";

import { useDispatch } from "react-redux";

import { toggleCardInfo } from "../../../store/index";

const Card = ({ unit }: { unit: ICard }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const element = cardRef?.current as HTMLDivElement;

    if (element) {
      const card = deckCardFabric(unit, element);
      const rightClick = async (e: Event) => {
        const closePopuo = card.rightClickHandler({ yOffset: 50 });

        dispatch(toggleCardInfo(unit.ID));
        await closePopuo(e);
        const event = new MouseEvent("mouseup", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        element.dispatchEvent(event);
        dispatch(toggleCardInfo(0));
      };

      element.addEventListener("contextmenu", rightClick);

      window.innerWidth <= 480 && element.addEventListener("click", rightClick);

      return () => element?.removeEventListener("contextmenu", rightClick);
    }
  }, [unit, cardRef]);

  return (
    <div
      className={`unitCard flexCol`}
      key={`unitCard-${unit.ID}`}
      ref={cardRef}
    >
      <CardImage
        unit={unit}
        observedLazy={false}
        alt={"unitCarousel"}
        className=""
      />
      <CardInfo card={unit} />

      <p className="upperText">{unit.Name_EN}</p>
    </div>
  );
};

export const UnitCarousel = ({ faction }: { faction: IFaction }) => {
  /* const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  console.log(dir);

  useEffect(() => {
    const d = setInterval(() => {
      setDir(dir === "ltr" ? "rtl" : "ltr");
    }, 3000);

    return () => clearInterval(d);
  }, [faction]);*/

  return (
    <>
      {withAliceCarousel(
        faction.units
          .filter((unit) => unit.Img)
          .map((unit) => <Card unit={unit} key={`Card-${unit.ID}`} />),
        {
          autoPlay: true,
        }
      )}
    </>
  );
};
