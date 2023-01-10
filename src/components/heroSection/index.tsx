import { ProjectTimer } from "components/elements/ProjectTimer";
import { FC } from "react";

import ExampleImage from "../../assets/img/heroSection/drifters.png";

import { TelegramButton } from "components/auth/TelegramButton";

import "./heroSection.css";

export const HeroSection: FC = () => {
  return (
    <>
      <section className="heroContainer">
        <div className="heroNFTname">
          Drifters <br /> NFT collection <br /> giveaway
        </div>
        <div className="heroCollectionStyle">
          <img src={ExampleImage} alt="nftCollectionName" />
        </div>
        <div className="heroButtonsSection">
          <TelegramButton />
          <button className="howWorkButtonStyle">HOW IT WORKS</button>
        </div>
        <div className="heroTimeContainer">
          <ProjectTimer />
        </div>
      </section>
    </>
  );
};
