import React, { useRef, useEffect, useState } from "react";

import { ITextBlock, TextBlock } from "../elements/textBlock";

import { world } from "../../mockData";

import { withServices, ServiceContainer } from "../../hocs/withServices";

export interface IWorld extends ITextBlock {
  picUrl: string;
}

export const World = withServices((props) => {
  const card: IWorld = world;

  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const [intersected, setIntersected] = useState(false);

  const background = useRef(null);
  const image = useRef(null);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(image, setIntersected);
    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "worldSection",
          urls: {
            desk: require("../../assets/img/home/worldGhostBg.png").default,
            mob: require("../../assets/img/home/mob/mobCastle2.png").default,
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  return (
    <div className="flexRow worldCard oddItem" ref={background}>
      <div className="wordCard-picture-wrapper">
        <img
          src={intersected ? card.picUrl : "#"}
          alt="newWorld"
          className="wordCard-picture"
          ref={image}
        />
      </div>
      <TextBlock card={card} />
    </div>
  );
});
