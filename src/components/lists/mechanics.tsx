import React, { useState, useRef, useEffect, useMemo } from "react";

import { mechanics } from "../../mockData";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useWindowSize } from "../../hooks/useSize";

import BattefieldBoard from "../board/battlefield";

export interface IMechanic {
  picUrl: string;
  points: {
    title: string;
    text: string;
  }[];
}

const Mechanic = withServices(
  ({
    card,
    index,
    serviceContainer,
  }: {
    card: IMechanic;
    index: number;
    serviceContainer: ServiceContainer;
  }) => {
    const [intersected, setIntersected] = useState(false);
    const image = useRef(null);

    const { width } = useWindowSize();

    const isMobile = useMemo(() => width && width <= 800, [width]);

    useEffect(() => {
      serviceContainer.imageLoader.addRef(image, setIntersected);
    }, [serviceContainer.imageLoader]);

    return (
      <div className={`mechanicCard flexCol`}>
        <div className={isMobile ? "container" : ""}>
          <div className="gameMechanicsPage noselect">
            <BattefieldBoard />
          </div>

          {false && (
            <img
              ref={image}
              src={intersected ? card.picUrl : "#"}
              alt={`mechanicCard-${index}`}
              className="mechanicCard-picture"
            />
          )}
        </div>

        <ul className="mechanicPoints flexRow">
          {card.points.map((point, indexPoint) => (
            <li key={`mechanicPoint-${indexPoint}`} className="mechanicPoint">
              <h2>{point.title}</h2>
              <p>{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export const Mechanics = withServices((props) => {
  const data: IMechanic[] = mechanics;

  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const background = useRef(null);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "mechanicSection",
          urls: {
            desk: require("../../assets/img/home/mechanicsGhostBg.png").default,
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  return (
    <div className="mechanicCards" ref={background}>
      {data.map((item, index) => (
        <Mechanic card={item} key={index} index={index} />
      ))}
    </div>
  );
});
