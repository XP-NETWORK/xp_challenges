/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition   */
/* eslint-disable @typescript-eslint/ban-ts-comment   */

import { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";

import { throttle } from "../../utils";
import pic from "../../assets/img/Rectangle 20.png";

import back from "../../assets/img/icons/btnForward.svg";
import forward from "../../assets/img/icons/btnBack.svg";

function importAll(r: any) {
  return r.keys().map(r);
}

function move(index: number) {
  setTimeout(() => {
    const elemetnsOnScreen = document.querySelectorAll(
      ".alice-carousel__wrapper .alice-carousel__stage-item.__active"
    );
    console.log(elemetnsOnScreen.length);
    const offset = Math.floor(elemetnsOnScreen.length / 2);
    const center = index + offset; //11

    // center = center > max ? 0 : center;//10

    for (let i = 0; i < elemetnsOnScreen.length; i++) {
      const element = elemetnsOnScreen[i] as HTMLDivElement;
      const globalIndex = index + i; //9,10,11,12,13

      const diffOp = 1 / Math.exp(Math.abs(center - globalIndex)) + 0.4;
      const diff = 1 / Math.exp(Math.abs(center - globalIndex)) + 0.6;

      switch (true) {
        case globalIndex < center: {
          element.style.transform = `perspective(1200px) rotateY(50deg) scale(${diff})`;
          element.style.opacity = diffOp.toString();
          break;
        }
        case globalIndex === center:
          element.style.transform = "perspective(1200px) rotateY(0)";
          element.style.opacity = "1";
          break;
        default: {
          element.style.transform = `perspective(1200px) rotateY(-50deg) scale(${diff})`;
          element.style.opacity = diffOp.toString();
        }
      }
    }
  }, 10);
}

const NFTList = () => {
  const [central, setCentral] = useState(0);
  const [pics, setPics] = useState<string[]>([]);
  const carousel = useRef<AliceCarousel | null>(null);

  const mock = pics.map((pic) => ({ src: pic }));

  const nfts = mock.map((item, idx) => (
    <div className="nftWrapper">
      <img
        src={item.src}
        className={`nft ${idx === central ? "central" : ""}`}
      />
    </div>
  ));

  useEffect(() => {
    //@ts-ignore
    const images = importAll(
      //@ts-ignore
      require.context("../../assets/img/nfts", false, /\.(png|jpe?g|svg)$/)
    );
    setPics(images);
  }, []);

  return (
    <div className="nftList">
      <AliceCarousel
        onInitialized={(e) => {
          move(e.item);
        }}
        onSlideChange={(e) => {
          e.item !== mock.length - 2 && move(e.item - 1);
          e.item !== mock.length - 1 && move(e.item);
        }}
        onSlideChanged={(e) => {
          (e.item === 0 || e.item === mock.length - 1) && move(e.item);
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
            items: 3,
          },

          1400: {
            items: 5,
          },

          2000: {
            items: 7,
          },
        }}
      />
      <div className="controls flexRow">
        <img
          src={back}
          alt="pic2"
          onClick={() => throttle(carousel.current?.slidePrev, 1000)()}
        />
        <img
          src={forward}
          alt="pic1"
          onClick={() => throttle(carousel.current?.slideNext, 1000)()}
        />
      </div>
    </div>
  );
};

export default NFTList;
