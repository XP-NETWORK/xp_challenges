import { ProjectTimer } from "components/elements/ProjectTimer";
import { FC } from "react";
import { saveTelegramUniqueId } from "utils";
import { v4 as uuidv4 } from "uuid";

import ExampleImage from "../../assets/img/heroSection/drifters.png";

import "./heroSection.css";

// interface IHeroSection {
//     image: String;
//     time: Number | String;
//     name: String;
// }

export const HeroSection: FC = () => {
  const unique = uuidv4()
  const openInNewTab = () => {
    window.open(
      `https://t.me/challengeRegestrationBot/?start=${unique}`,
      "_blank",
      "noreferrer"
    );
    saveTelegramUniqueId(unique)
  };
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
          <button className="accent" onClick={openInNewTab}>
            Connect with Telegram
          </button>
          <button className="howWorkButtonStyle">HOW IT WORKS</button>
        </div>
        <div className="heroTimeContainer">
          <ProjectTimer />
        </div>
      </section>
    </>
  );
};
