import { ProjectTimer } from "components/elements/ProjectTimer";
import { FC } from "react";
import { TelegramButton } from "components/auth/TelegramButton";
import "./heroSection.css";
import { useSelector } from "react-redux";
import { ReduxState } from "store";
import converb from "./converb.png";

export const HeroSection: FC = () => {
  const { project } = useSelector((state: ReduxState) => ({
    project: state.global.project,
  }));
  console.log(project);
  return (
    <>
      <section className="heroContainer">
        <div className="heroNFTname">
          {"OKC nft"} <br /> collection <br /> giveaway
        </div>
        <div className="heroCollectionStyle">
          <img src={converb} alt="nftCollectionName" />
        </div>
        <div className="heroButtonsSection">
          <TelegramButton />
          <button
            onClick={() => {
              location.hash = "#howItWorkSectionTitle";
            }}
            className="howWorkButtonStyle"
          >
            <p className="HOWITWORKS">HOW IT WORKS</p>
          </button>
        </div>
        <div className="heroTimeContainer">
          <ProjectTimer />
        </div>
      </section>
    </>
  );
};
