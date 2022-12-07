/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */

import React, { useState, useEffect, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

interface Options {
  paddingLeft?: number;
  paddingRight?: number;
  dir?: "ltr" | "rtl";
  autoPlay: boolean;
}

export const withAliceCarousel = (items: any[], options?: Options) => {
  const itemPadding = window.innerWidth < 480 ? 55 : 0;
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [animate, setAnimate] = useState<boolean>(true);

  const carousel = useRef(null);

  const carousel1 = useRef<AliceCarousel | null>(null);

  const tabSwitchHandle = (ev: Event) => {
    if (document.visibilityState === "visible") {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  };

  useEffect(() => {
    if (carousel.current) {
      const _carousel = carousel.current as HTMLDivElement;
      const observer = new IntersectionObserver(
        async (entries: IntersectionObserverEntry[]) => {
          for (const entry of entries) {
            setAnimate(entry.isIntersecting);
            entry.isIntersecting && carousel1.current?.slideNext(null);
          }
        },
        { root: null, rootMargin: "500px 0px 500px 0px", threshold: 0 }
      );
      observer.observe(carousel.current);
    }

    document.addEventListener("visibilitychange", tabSwitchHandle);

    return () =>
      document.removeEventListener("visibilitychange", tabSwitchHandle);
  }, [carousel.current]);

  /*useEffect(() => {
    options?.autoPlay &&
      document.querySelectorAll(".alice-carousel__stage").forEach((el) => {
        const div = el as HTMLDivElement;

        let xOffset: number;

        false &&
          div.addEventListener("mousedown", (e) => {
            const offsett = div.style.transform
              .match(/\S+\((\S+)(px.+)/)
              ?.at(1);
            const number = offsett && Number(offsett);
            if (number) {
              xOffset = number;
              // setAnimate(false);
              console.log(xOffset, "xOffset");
            }
          });
        //20955

        false &&
          div.addEventListener("mouseup", (e) => {
            const offsett = div.style.transform
              .match(/\S+\((\S+)(px.+)/)
              ?.at(1);
            const number = offsett && Number(offsett);

            //div.style.transform = `translate3d(-${number}px, 0px, 0px)`;
            //div.style.cssText = `transition: transform 0ms ease 0ms; transform: translate3d(-${number}px, 0px, 0px)`;
            setAnimate(true);
            setTimeout(() => {
              number && number > xOffset ? setDir("rtl") : setDir("ltr");
            }, 8000);
          });
      });
  }, []);*/

  return (
    <div className="unitCarousel" ref={carousel}>
      <div className="flexRow">
        <AliceCarousel
          infinite={true}
          ref={(node) => {
            if (node) {
              carousel1.current = node;
            }
          }}
          mouseTracking={true}
          disableButtonsControls
          autoPlay={animate}
          animationDuration={animate ? 10 * 800 : undefined}
          autoPlayInterval={animate ? 50 : undefined}
          animationEasingFunction="linear"
          //autoPlayDirection={dir}
          disableDotsControls={true}
          autoPlayStrategy="none"
          paddingLeft={options?.paddingLeft || itemPadding}
          paddingRight={options?.paddingRight || itemPadding}
          items={items}
          responsive={{
            0: {
              items: 1,
            },
            480: {
              items: 2,
            },
            800: {
              items: 3,
            },
            1124: {
              items: 4,
            },
            1650: {
              items: 5,
            },
            2000: {
              items: 6,
            },
          }}
        />
      </div>
    </div>
  );
};
