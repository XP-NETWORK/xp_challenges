import * as React from "react";

export interface ITextBlock {
  title: string;
  text: string;
  link: string;
  buttonText?: string;
}

export const TextBlock = ({ card }: { card: ITextBlock }) => (
  <div className="cardText">
    <h3>{card.title}</h3>
    <p>
      {card.text}
      {card?.text?.trim()?.at(-1) === "." ? "" : "."}
    </p>
    <a href={card.link} className="learMore">
      {card.buttonText ? card.buttonText : "LEARN MORE"}
    </a>
  </div>
);
