/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition   */
/* eslint-disable @typescript-eslint/ban-ts-comment   */

import { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";

import { importAll } from "../../utils";

const NFTList = () => {
  const [central, setCentral] = useState(0);
  const [pics, setPics] = useState<string[]>([]);
  const carousel = useRef<AliceCarousel | null>(null);

  const mock = pics.map((pic) => ({ src: pic }));

  const nfts = mock.map((item) => (
    <div className="nftWrapper">
      <img src={item.src} className={`nft`} />
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
        infinite={true}
        ref={(node) => {
          if (node) {
            carousel.current = node;
          }
        }}
        mouseTracking={false}
        disableDotsControls={true}
        disableButtonsControls={true}
        autoPlay={true}
        items={nfts}
        animationDuration={10 * 1000}
        autoPlayInterval={1}
        autoWidth={true}
        autoPlayStrategy="none"
      />
    </div>
  );
};

export default NFTList;
