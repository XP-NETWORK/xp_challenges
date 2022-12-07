import React, { useState, useRef, useEffect } from "react";

import { allies } from "../../mockData";

import { withServices, ServiceContainer } from "../../hocs/withServices";

export interface IAllyCard {
  picUrl: string;
  title: string;
  text: string;
}

const AllyCard = withServices(
  ({
    card,
    index,
    serviceContainer,
  }: {
    card: IAllyCard;
    index: number;
    serviceContainer: ServiceContainer;
  }) => {
    const [intersected, setIntersected] = useState(false);
    const image = useRef(null);

    useEffect(() => {
      serviceContainer.imageLoader.addRef(image, setIntersected);
    }, [serviceContainer.imageLoader]);

    return (
      <div className="allyCardWrapper">
        <div className="decorHorMobile"></div>
        <div className="allyCard flexCol">
          <div className="shineContainer">
            <div className="shine"></div>
          </div>
          <img
            src={intersected ? card.picUrl : "#"}
            alt={`allyCard-${index}`}
            className="allyCard-picture"
            ref={image}
          />

          <h3>{card.title}</h3>

          <p>{card.text}</p>
        </div>
      </div>
    );
  }
);

export const AlliesCards = withServices((props) => {
  const data: IAllyCard[] = allies;
  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const background = useRef(null);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "alliesSection",
          urls: {
            desk: require("../../assets/img/home/alliesGhostBg.png").default,
            mob: [
              require("../../assets/img/home/mob/mobThrone2.png").default,
              require("../../assets/img/home/mob/mobThrone3.png").default,
            ],
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  return (
    <div className="allyCards flexRow" ref={background}>
      {data.map((card, index) => (
        <AllyCard card={card} index={index} key={index} />
      ))}
    </div>
  );
});
