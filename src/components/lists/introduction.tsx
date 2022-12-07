import React, { useRef, useEffect, useState } from "react";

import { introductions } from "../../mockData";

import { VolButton } from "../elements/misc";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { isSafari, iOS } from "../../utils";

export interface Introduction {
  picUrl: string;
  title: string;
  text: string;
  vidUrl?: string;
  effectPic?: string;
  effectVid?: string;
}

const Introduction = withServices(
  ({
    card: { effectPic, effectVid, picUrl, vidUrl, title, text },
    index,
    isLast,
    serviceContainer,
  }: {
    card: Introduction;
    index: number;
    isLast: boolean;
    serviceContainer: ServiceContainer;
  }) => {
    const [intersected, setIntersected] = useState(false);

    const odd = index % 2 === 0;

    const image = useRef(null);

    useEffect(() => {
      serviceContainer.imageLoader.addRef(image, setIntersected);
    }, [serviceContainer.imageLoader]);

    let effectRender: any;
    let mediaRender: any;

    if (isSafari || iOS() || !vidUrl) {
      mediaRender = (
        <img
          src={intersected ? picUrl : "#"}
          alt={`introductionCard-${index}`}
          className="introductionCard-picture"
        />
      );
    } else {
      mediaRender = (
        <video
          autoPlay
          playsInline
          muted
          loop
          className="introductionCard-video"
        >
          <source src={vidUrl} />
        </video>
      );
    }

    if ((isSafari || iOS()) && effectPic) {
      effectRender = (
        <div className="introductionCard-pictureEffect pictureEffect"></div>
      );
    } else if (effectVid) {
      effectRender = (
        <video autoPlay playsInline muted loop className="blazeAnimation">
          <source src={effectVid} />
        </video>
      );
    }

    return (
      <div
        className={`introductionCard flexRow ${odd ? "oddItem" : ""}`}
        ref={image}
      >
        <div
          className={`pictureWrapper ${effectPic ? "pure" : ""} ${
            isSafari || iOS() ? "ios" : ""
          }`}
        >
          {intersected && mediaRender}
          {intersected && effectRender}
        </div>
        <div className="cardText">
          <h3>{title}</h3>
          <p>{text}</p>
          {isLast && <VolButton classes="red" />}
        </div>
      </div>
    );
  }
);

export const Introductions = withServices((props) => {
  const data = introductions;
  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const bg = useRef(null);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(bg, (load) => {
      if (load) {
        return {
          id: "introductonSection",
          urls: {
            desk: require("../../assets/img/home/introGhostBg.png").default,
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  return (
    <div className="introductionCards" ref={bg}>
      {data.map((card, index) => (
        <Introduction
          card={card}
          key={index}
          index={index}
          isLast={index === data.length - 1}
        />
      ))}
    </div>
  );
});
