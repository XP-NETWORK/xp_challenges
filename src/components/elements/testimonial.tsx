import * as React from "react";

export interface ITestimonial {
  picUrl: string;
  name: string;
  position: string;
  text: string;
  link: string;
}

export const TestimonialTemplate = ({ card }: { card?: ITestimonial }) => {
  card = card!;
  return (
    <div className="cardContainer">
      <div className="testimonialTemplate flexCol">
        <img
          src={card.picUrl}
          alt={`testimonialCard-${card.name}`}
          className="testimonialCard-picture"
        />
        <h3 className="upperText">{card.name}</h3>
        <span>{card.position}</span>
        <p>{card.text}</p>
        <a href={card.link} className="upperText">
          Read more
        </a>
      </div>
    </div>
  );
};
