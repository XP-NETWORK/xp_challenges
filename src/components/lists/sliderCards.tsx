import React, {
  ReactChild,
  ReactChildren,
  Children,
  isValidElement,
  cloneElement,
  useState,
} from "react";

import { ITestimonial } from "../elements/testimonial";

import { IFeatureCard } from "../elements/feature";

const SliderCard = ({
  children,
  card,
  index,
  selectedCard,
}: {
  children: ReactChild | ReactChildren;
  card: IFeatureCard | ITestimonial;
  index: number;
  selectedCard: number;
}) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement<any>(child, { card, index });
    }
    return child;
  });

  const selected = selectedCard === index;

  return (
    <div className={`sliderCard ${selected ? "selected" : ""}`}>
      {childrenWithProps}
    </div>
  );
};

export const SliderCards = ({
  cards,
  children,
}: {
  cards: IFeatureCard[] | ITestimonial[];
  children: ReactChild | ReactChildren;
}) => {
  const data = cards;

  const [selectedCard, setCard] = useState(0);

  const onClickSliderCardButton = (denom: number) => {
    let newIdx = selectedCard + denom;

    if (newIdx < 0) {
      newIdx = data.length - 1;
    }

    if (newIdx > data.length - 1) {
      newIdx = 0;
    }

    setCard(newIdx);
  };

  return (
    <div className="container">
      <div
        className={"sliderCardButton sliderCardButton-prev fancyArrow"}
        onClick={() => onClickSliderCardButton(-1)}
      />
      <div className="sliderCards">
        {data.map((card, index) => (
          <SliderCard
            card={card}
            index={index}
            key={index}
            selectedCard={selectedCard}
          >
            {children}
          </SliderCard>
        ))}
      </div>
      <div
        className="sliderCardButton sliderCardButton-next fancyArrow"
        onClick={() => onClickSliderCardButton(1)}
      />
    </div>
  );
};
