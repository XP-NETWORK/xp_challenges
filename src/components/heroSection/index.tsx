import { ProjectTimer } from "components/elements/ProjectTimer";
import { FC, createElement } from "react";
import { TelegramButton } from "components/auth/TelegramButton";
import "./heroSection.css";
import { useSelector } from "react-redux";
import { ReduxState } from "store";
import converb from "../../assets/img/cyberHero.png";

export const HeroSection: FC = () => {
  const { project } = useSelector((state: ReduxState) => ({
    project: state.global.project,
  }));
  return (
    <>
      <section className="heroContainer">
        <div className="heroNFTname">
          {project?.description.split("$").map((line, index) => {
            const pattern = /\[red\](.*)\[:red\]/;
            const highlightPart = line.match(pattern)?.at(0);

            const HighlightElem =
              highlightPart &&
              createElement(
                "span",
                { className: "greeting" },

                highlightPart.replaceAll(/(\[red\]|\[:red\])/gi, "")
              );

            return (
              <div key={index}>
                {line.replace(pattern, "")}
                {HighlightElem}
              </div>
            );
          })}
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
