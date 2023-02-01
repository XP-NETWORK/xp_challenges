import { FC } from "react";
import Step1 from "../../assets/svgs/howItWorkSection/step1.png";
import Step2 from "../../assets/svgs/howItWorkSection/step2.png";
import Step3 from "../../assets/svgs/howItWorkSection/step3.png";
import ArrowLeft from "../../assets/svgs/howItWorkSection/arrowLeft.svg";
import NFTList from "../../components/lists/Nfts";
import Achievements from "../../components/lists/achievments/achievements";
import AliceCarousel from "react-alice-carousel";
import { useWindowSize } from "hooks/useSize";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "components/heroSection";
import LeaderBoard from "./LeaderBoard";
import { TelegramButtonV2 } from "components/auth/TelegramButtonV2";

export const Welcome: FC = () => {
  const size = useWindowSize();
  const ismobile = Number(size?.width) <= 800;
  const navigate = useNavigate();
  return (
    <main>
      <div className="introComposition flexCol">
        <HeroSection />
      </div>

      <NFTList />

      <section className="howItWorkSection">
        <div className="howItWorkSectionTitle" id="howItWorkSectionTitle">
          How it works
        </div>
        <div className="howItWorkSectionSubTitle">
          Winning a valuable NFT has never been so easy
        </div>
        {ismobile ? (
          <AliceCarousel
            items={[
              <div className="introTimeline-item flexCol">
                <div className="imageAssetNumber">1</div>
                <img src={Step1} alt="introTimeline-item-1" />
                <span>Join XP Challenge</span>
                <TelegramButtonV2
                  classes={"button secondary howItWorkButtonStyle"}
                />
              </div>,
              <div className="introTimeline-item flexCol">
                <div className="imageAssetNumber">2</div>

                <img src={Step2} alt="introTimeline-item-2" />
                <span>Collect achievements</span>
                <a
                  className="button secondary howItWorkButtonStyle"
                  href="#achivs"
                >
                  Go to achievements
                </a>
              </div>,
              <div className="introTimeline-item flexCol">
                <div className="imageAssetNumber">3</div>

                <img src={Step3} alt="introTimeline-item-2" />
                <span>Win an NFT</span>
                <button
                  className="secondary howItWorkButtonStyle"
                  onClick={() => navigate("/collection")}
                >
                  VIEW THE COLLECTION
                </button>
              </div>,
            ]}
            mouseTracking={true}
            disableButtonsControls={true}
            responsive={{
              0: {
                items: 1,
              },
            }}
          />
        ) : (
          <div className="introTimeline flexRow">
            <div className="introTimeline-item flexCol">
              <div className="imageAssetNumber">1</div>

              <img src={Step1} alt="introTimeline-item-1" />
              <span>Join XP Challenge</span>
              <TelegramButtonV2
                classes={"button secondary howItWorkButtonStyle"}
              />
            </div>

            <div className="progressLine bright">
              <img src={ArrowLeft} />
            </div>
            <div className="introTimeline-item flexCol">
              <div className="imageAssetNumber">2</div>
              <img src={Step2} alt="introTimeline-item-2" />

              <span>Collect achievements</span>
              <a
                className="button secondary newBackground howItWorkButtonStyle impo"
                href="#achivs"
              >
                Go to achievements
              </a>
            </div>
            <div className="progressLine bright">
              <img src={ArrowLeft} />
            </div>
            <div className="introTimeline-item flexCol">
              <div className="imageAssetNumber">3</div>
              <img src={Step3} alt="introTimeline-item-2" />
              <span>Win an NFT</span>
              <button
                className="secondary newBackground howItWorkButtonStyle impo"
                onClick={() => navigate("/collection")}
              >
                VIEW THE COLLECTION
              </button>
            </div>
          </div>
        )}
      </section>

      <Achievements />
      <div className="leaderBoardHomePage">
        <LeaderBoard />
      </div>
    </main>
  );
};
