import { useRef, FC } from "react";

import { withServices } from "../../hocs/withServices";

import frames from "../../assets/img/icons/bannerFrame.svg";
import logo from "../../assets/img/icons/xplogoText.svg";


const Footer: FC = () => {
  const background = useRef(null);
  return (
    <footer className="footer" ref={background} id="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bridgeBanner">
              <img src={frames} alt="banner-frame" className="frame" />
              <div className="bridgeBanner-text">
                <h3>Multichain NFT bridge</h3>
                <p>
                  XP.NETWORK enables multichain support out of the box for any
                  minted NFT, dApp or use case, allowing NFTs and funds to flow
                  freely between networks and wallets.
                </p>
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

            <div className="media">
              <div className="top flexRow">
                <img src={logo} alt="xpLogo" className="logo" />
                <ul className="flexRow links">
                  <li>
                    <a href="">XPNET JS</a>
                  </li>
                  <li>
                    <a href="">Disclaimer</a>
                  </li>
                  <li>
                    <a href="">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="">Terms of use</a>
                  </li>
                </ul>
              </div>
              <div className="bot">
                <span>
                  © {new Date().getFullYear()} XP.NETWORK Ltd. All Rights
                  Reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default withServices(Footer);
