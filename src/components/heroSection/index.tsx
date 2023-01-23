import { ProjectTimer } from "components/elements/ProjectTimer";
import { FC } from "react";
import ExampleImage from "../../assets/img/heroSection/drifters.png";
import { TelegramButton } from "components/auth/TelegramButton";
import "./heroSection.css";
import { useSelector } from "react-redux";
import { ReduxState } from "store";

export const HeroSection: FC = () => {
  const { project } = useSelector((state: ReduxState) => ({
    project: state.global.project,
  }));

  return (
    <>
      <section className="heroContainer">
        <div className="heroNFTname">
          {project ? project.name : ""} <br /> NFT collection <br /> giveaway
        </div>
        <div className="heroCollectionStyle">
          <img src={project ? project?.coverImage : ExampleImage} alt="nftCollectionName" />
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
