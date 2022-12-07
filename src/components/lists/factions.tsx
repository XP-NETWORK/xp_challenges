import React, { useEffect, useMemo, useRef, useState } from "react";
import { UnitCarousel } from "../elements/carousels/unitCarousel";

import { factions } from "../../mockData";

import { useSelector } from "react-redux";

import { ReduxState } from "../../store/index";
import { ICard } from "../../store/types";

import { withServices, ServiceContainer } from "../../hocs/withServices";

export interface IFaction {
  picUrl: string;
  text: string;
  units: ICard[];
}

const Faction = withServices(
  ({
    card,
    selected,
    onSelect,
    index,
    serviceContainer,
  }: {
    card: IFaction;
    selected: number;
    onSelect: (card: IFaction) => void;
    index: number;
    serviceContainer: ServiceContainer;
  }) => {
    const [intersected, setIntersected] = useState(false);
    const image = useRef(null);

    useEffect(() => {
      serviceContainer.imageLoader.addRef(image, setIntersected);
    }, [serviceContainer.imageLoader]);

    return (
      <li
        className={`factionCard flexCol ${
          index === selected ? "selected" : ""
        }`}
        key={index}
        onClick={() => onSelect(card)}
      >
        <div className="circleWrapper">
          <img
            src={intersected ? card.picUrl : "#"}
            alt={`factionCard-${index}`}
            className="factionCard-picture"
            ref={image}
          />
        </div>
        <span className="upperText">{card.text}</span>
      </li>
    );
  }
);

export const Factions = withServices((props) => {
  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const [selectedFaction, selectFaction] = React.useState<IFaction>(
    factions[0]
  );
  const cards = useSelector((state: ReduxState) => state.cards.items);

  const data: IFaction[] = factions.map((faction) => ({
    ...faction,
    units: cards.filter(
      (card) => card.Faction?.toLowerCase() === faction.text?.toLowerCase()
    ),
  }));

  const background = useRef(null);

  useEffect(() => {
    selectFaction(data[0]);

    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "factionSection",
          urls: {
            desk: require("../../assets/img/home/factionsGhostBg.png").default,
            mob: require("../../assets/img/home/mob/mobGreyStone.png").default,
          },
        };
      }
    });
  }, [cards]);

  const selectedIndex = useMemo(
    () => data.findIndex((item) => item.text === selectedFaction.text),
    [selectedFaction, data]
  );

  return (
    <div className="factionCards" ref={background}>
      <ul className="factionList noselect flexRow">
        {data.map((card, index) => (
          <Faction
            card={card}
            index={index}
            key={index}
            selected={selectedIndex}
            onSelect={(card: IFaction) => selectFaction(card)}
          />
        ))}
      </ul>

      {data.map((item, index) => (
        <div
          className="carouselContainer"
          key={`faction-${item.text}`}
          style={{ display: index === selectedIndex ? "block" : "none" }}
          id={`carouselContainer-${index}`}
        >
          <UnitCarousel faction={item} />
        </div>
      ))}
    </div>
  );
});
