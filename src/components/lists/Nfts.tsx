/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition */

import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

import pic from "../../assets/img/Rectangle 20.png";

const NFTList = () => {
  const [central, setCentral] = useState(0);
  console.log(central);
  const carousel = useRef<AliceCarousel | null>(null);

  const mock = [
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
    {
      src: pic,
    },
  ];

  const nfts = mock.map((item, idx) => (
    <div style={{ position: "relative" }}>
      <img
        src={item.src}
        className={`nft ${idx === central ? "central" : ""}`}
      />
      <span style={{ position: "absolute" }}>{Math.random()}</span>
    </div>
  ));

  return (
    <div className="nftList">
      <div className="controls flexRow">
        <button
          className="secondary"
          onClick={() => carousel.current?.slidePrev()}
        >
          prev
        </button>
        <button
          className="accent"
          onClick={() => carousel.current?.slideNext()}
        >
          next
        </button>
      </div>
      <AliceCarousel
        onInitialized={(e) => {
          //const c = document.querySelector(".alice-carousel") as HTMLDivElement;
          //c.style.perspective = "1200px";

          const elemetnsOnScreen = document.querySelectorAll(
            ".alice-carousel__wrapper .alice-carousel__stage-item.__active"
          );

          for (let i = 0; i < elemetnsOnScreen.length; i++) {
            const element = elemetnsOnScreen[i] as HTMLDivElement;

            element.style.transform =
              "perspective(1200px) rotateY(" + (i < 1 - 1 ? 40 : -40) + "deg)";
          }
        }}
        onSlideChange={(e) => {
          const x = document.querySelectorAll(
            ".alice-carousel__wrapper .alice-carousel__stage-item.__active"
          );
        }}
        infinite={true}
        ref={(node) => {
          if (node) {
            carousel.current = node;
          }
        }}
        mouseTracking={false}
        disableDotsControls={true}
        disableButtonsControls={true}
        items={nfts}
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
  );
};

export default NFTList;
