import { ProjectTimer } from "components/elements/ProjectTimer";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import ExampleImage from "../../assets/img/heroSection/drifters.png";
import { ReactComponent as TelegramWhite } from "../../assets/img/icons/tgWhite.svg";

import "./heroSection.css";

// interface IHeroSection {
//     image: String;
//     time: Number | String;
//     name: String;
// }

export const HeroSection: FC = () => {
  const navigate = useNavigate();

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
          <button className="accent" onClick={() => navigate("/signup")}>
            Connect with Telegram
            <TelegramWhite />
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
