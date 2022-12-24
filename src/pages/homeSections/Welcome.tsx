import React from "react";
import challangeTm1 from "../../assets/img/challangeTm1.png";
import challangeTm2 from "../../assets/img/challangeTm2.png";
import challangeTm3 from "../../assets/img/challangeTm3.png";
import { ReactComponent as TelegramWhite } from "../../assets/img/icons/tgWhite.svg";

import NFTList from "../../components/lists/Nfts";
import Achievements from "../../components/lists/achievments/achievements";
const Welcome = () => {
  return (
    <main>
      <div className="introComposition flexCol">
        <h1>
          It's time for a fair<br></br> game
        </h1>
        <div className="introTimeline flexRow">
          <div className="introTimeline-item flexCol">
            <img src={challangeTm1} alt="introTimeline-item-1" />
            <span>Join Drifters Challenge</span>
            <button className="accent">
              Join with Telegram
              <TelegramWhite />
            </button>
          </div>

          <div className="progressLine bright"></div>

          <div className="introTimeline-item flexCol">
            <img src={challangeTm2} alt="introTimeline-item-2" />
            <span>Do the achievements</span>
            <button className="secondary">Go to achievements</button>
          </div>
          <div className="progressLine"></div>
          <div className="introTimeline-item flexCol">
            <img src={challangeTm3} alt="introTimeline-item-2" />
            <span>Win the NFT</span>
            <button className="secondary">VIEW THE COLLECTION</button>
          </div>
        </div>
      </div>

      <NFTList />
      <Achievements />
    </main>
  );
};

export default Welcome;
