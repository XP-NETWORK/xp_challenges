import * as React from "react";

import { ITextBlock, TextBlock } from "../elements/textBlock";

export interface IFeatureCard extends ITextBlock {
  picUrl: string;
}

export const FeatureTemplate = ({
  card,
  index,
}: {
  card?: IFeatureCard;
  index?: number;
}) => {
  return (
    <div className="cardContainer">
      <div className="shineContainer">
        <div className="shine"></div>
      </div>
      <div className="featureTemplate">
        <img
          src={card?.picUrl}
          alt={`featureCard-${index}`}
          className="featureCard-picture"
        />
        <TextBlock card={card!} />
      </div>
    </div>
  );
};
