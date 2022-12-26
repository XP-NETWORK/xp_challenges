import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Home } from "../../assets/img/icons/HOME.svg";
import { ReactComponent as Leader } from "../../assets/img/icons/trophy-star.svg";
import { ReactComponent as Collection } from "../../assets/img/icons/.svg";
import { ReactComponent as History } from "../../assets/img/icons/clock-rotate-left.svg";
import { ReactComponent as Upcoming } from "../../assets/img/icons/wand-magic-sparkles.svg";
import { ReactComponent as FAQ } from "../../assets/img/icons/message-question.svg";

import MoldalFooter from "pages/common/modalFooter";

const Menu = ({ close }: { close: any }) => {
  return (
    <div className="menuModal customModal">
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <nav>
              <div className="row">
                <div className="col-6">
                  <ul className="links first">
                    <Link to="/">
                      <li>
                        <Home className="menuItemIcon" />
                        HOME
                      </li>
                    </Link>
                    <Link to="/leaderboard" onClick={() => close()}>
                      <li>
                        <Leader className="menuItemIcon" />
                        LEADERBOARD
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <Collection className="menuItemIcon" />
                        COLLECTION
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="links">
                    <Link to="/">
                      <li>
                        {" "}
                        <History className="menuItemIcon" />
                        HISTORY
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <Upcoming className="menuItemIcon" />
                        UPCOMING
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <FAQ className="menuItemIcon" />
                        FAQ
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="bottomContainer">
              <div className="banner">
                <div className="bridgeBanner-text">
                  <h3>Multichain NFT bridge</h3>
                  <p>Seamlessly move assets between chains</p>
                  <a
                    href="https://bridge.xp.network/"
                    className="button accent"
                    rel="norefferer"
                    target="_blank"
                  >
                    DISCOVER BRIDGE
                  </a>
                </div>
              </div>

              <MoldalFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
