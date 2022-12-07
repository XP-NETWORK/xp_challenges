import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ICard } from "../../store/types";
import { ReduxState } from "../../store";

import { CardImage } from "../elements/card/card";

import { useWindowSize } from "../../hooks/useSize";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { deckCardFabric } from "../../store/models/card";
import { DeckAnimator } from "../../services/deckAnimator";

import { CardInfo } from "../elements/card/cardInfo";

import { toggleCardInfo } from "../../store/index";

export interface IDeckCard extends ICard {
  coord?: {
    angle: number;
    zCoord: number;
    yCoord: number;
    xCoord: number;
  };
}

const DeckCard = ({
  card,
  rx,
  mobile,
  deckAnimation,
}: {
  card: IDeckCard;
  rx: number;
  mobile: boolean;
  deckAnimation: DeckAnimator;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const element = cardRef?.current as HTMLDivElement;

    if (element) {
      const deckCard = deckCardFabric(card, element);
      deckCard.setRx(rx);
      deckCard.positionSelf(rx, mobile);

      const mouseEnter = deckCard.enterHandler(deckAnimation);
      const mouseLave = deckCard.leaveHandler(deckAnimation);

      const rightClick = async (e: Event) => {
        dispatch(toggleCardInfo(card.ID));
        const popup = deckCard.rightClickHandler(
          { yOffset: 82 },
          deckAnimation
        );
        await popup(e);
        dispatch(toggleCardInfo(0));
      };
      //const mouseDown = deckCard.leftMouseDown(element);
      //const mouseUp = deckCard.leftMouseUp(element);

      element.addEventListener("mouseenter", mouseEnter);
      element.addEventListener("mouseleave", mouseLave);
      element.addEventListener("contextmenu", rightClick);
      mobile && element.addEventListener("click", rightClick);
      //!mobile && element.addEventListener("mousedown", mouseDown);
      //!mobile && element.addEventListener("mouseup", mouseUp);

      return () => {
        element.removeEventListener("mouseenter", mouseEnter);
        element.removeEventListener("mouseleave", mouseLave);
        element.removeEventListener("contextmenu", rightClick);
        //element.removeEventListener("mousedown", mouseDown);
        //element.removeEventListener("mouseup", mouseUp);
      };
    }
  }, [card, cardRef, mobile]);

  return (
    <div className="deckCard" ref={cardRef}>
      <CardImage
        unit={card}
        observedLazy={true}
        alt="deckCard"
        className="deckCard-picture"
      />

      <CardInfo card={card} />
    </div>
  );
};

export const Deck = withServices((props) => {
  const [data, setData] = useState<IDeckCard[]>([]);
  const [rx, setRx] = useState(0);
  const [theta, setTheta] = useState<number[]>([]);
  const deckContainer = useRef<HTMLDivElement>(null);
  const cards = useSelector((state: ReduxState) => state.cards.items);
  const { width } = useWindowSize();
  const mobile = width ? width <= 480 : false;

  const {
    serviceContainer: { deck: deckAnimation },
  }: { serviceContainer: ServiceContainer } = props;

  useEffect(() => setData(cards.filter((card) => card.Img)), [cards]);

  useEffect(() => {
    if (data.length) {
      setRx((mobile ? 20 : 40) * data.length);
      setTheta(deckAnimation.caclTheta(data));
    }
  }, [data, mobile, deckAnimation]);

  return (
    <div className="deckCards" id="deckCards">
      <div
        id="deckAnimation"
        className="animationContainer"
        style={deckAnimation.calcSize(rx)}
        ref={deckContainer}
      >
        {Array.isArray(data) &&
          data.map((card, index) => {
            const coord = {
              angle: deckAnimation.calcAngle(index, data.length),
              zCoord: deckAnimation.calcZ(index, data.length),
              yCoord: deckAnimation.calcY(rx, theta[index]),
              xCoord: deckAnimation.calcX(rx, theta[index]),
            };

            return (
              <DeckCard
                card={{
                  ...card,
                  coord,
                }}
                rx={rx}
                mobile={mobile}
                key={`deckCard-${card._id}`}
                deckAnimation={deckAnimation}
              />
            );
          })}
      </div>
    </div>
  );
});
