import { useEffect, useState, useRef } from "react";
import { ICard } from "../../../store/types";

import { CardWrapper } from "./cardWrapper";

import { withServices, ServiceContainer } from "../../../hocs/withServices";

import { useSelector } from "react-redux";
import { ReduxState } from "../../../store";

import { deckCardFabric } from "../../../store/models/card";
//const base = process.env["CARD_ANIMATION_BASE"];

export const CardImage = withServices(
  ({
    unit,
    observedLazy,
    alt,
    className,
    serviceContainer,
  }: {
    unit: ICard;
    observedLazy: boolean;
    alt: string;
    className: string;
    serviceContainer: ServiceContainer;
  }) => {
    const cardInfoShow = useSelector(
      (state: ReduxState) => state.global.cardInfoShow
    ) as number;

    const [url, setUrl] = useState<string>(observedLazy ? "#" : unit.Img);
    //const [videoSrc, setVideoLoaded] = useState<string>("");
    //const isIntersected = useSelector((state: ReduxState) => state.global.deck);
    const [isVisible, setIsVisible] = useState();

    const callBackWhenObserver = (entries: any) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const callBackWhenLoaded = function (event: Event) {
      const target = event.target as HTMLDivElement;
      target.classList.add("loadedImage");
    };

    const cardRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(callBackWhenObserver, {
        root: document.getElementById("deckCards"),
        rootMargin: "0px 0px 100px 100px",
        threshold: 0,
      });

      const currentTarget = cardRef.current as HTMLImageElement | null;

      if (currentTarget) {
        observer.observe(currentTarget);
        currentTarget.addEventListener("load", callBackWhenLoaded);
        //loadedImage
      }
      return () => {
        if (currentTarget) {
          observer.unobserve(currentTarget);
          currentTarget.removeEventListener("load", callBackWhenLoaded);
        }
      };
    }, [cardRef]);

    useEffect(() => {
      if (
        cardInfoShow &&
        cardInfoShow === unit.ID &&
        cardRef.current?.closest(".menuOpen")
      ) {
        const image = document.querySelector(
          "#portal .cardWrapper > img"
        ) as HTMLImageElement;

        const card = deckCardFabric(unit, image);
        const video = document.createElement("video");
        const { onerror, onload, load } = card.loadVideo(video);
        video.addEventListener("loadeddata", onload);
        video.addEventListener("error", onerror);
        load(video);
      }
    }, [cardInfoShow]);

    useEffect(() => {
      if (observedLazy && isVisible && url === "#") {
        serviceContainer.imageLoader
          .queueAdd(unit.Img)
          .then(() => setUrl(unit.Img));
      }
    }, [isVisible]);

    return (
      <CardWrapper card={unit}>
        <img
          src={url}
          alt={`${alt}-${unit.ID}`}
          loading={observedLazy ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          ref={cardRef}
          className={className}
        />
      </CardWrapper>
    );
  }
);
