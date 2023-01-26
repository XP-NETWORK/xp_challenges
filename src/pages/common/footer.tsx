import { useRef, FC } from "react";

import { withServices } from "../../hocs/withServices";

import logo from "../../assets/img/icons/xplogoText.svg";
import FooterTelegram from "../../assets/svgs/footer/telegramFooter.svg";
import FooterTwitter from "../../assets/svgs/footer/footerTwitter.svg";

const Footer: FC = () => {
  const background = useRef(null);
  return (
    <footer className="footer" ref={background} id="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 desktopOnly">
            <div className="media ">
              <div className="top flexRow ">
                <img src={logo} alt="xpLogo" className="logo" />
                <ul className="flexRow links">
                  <li>
                    <a href="https://www.npmjs.com/package/xp.network" target="_blank">
                      XPNET JS
                    </a>
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
                <span>© {new Date().getFullYear()} XP.NETWORK Ltd. All Rights Reserved</span>
              </div>
            </div>
          </div>
          <div className="col-12 mobileOnly">
            <div className="media mobileWarper">
              <div className="bot">
                <div className="mobileContainerFlex">
                  <div className="footerFlex">
                    <img src={FooterTelegram} className="footerTelegram" alt="FooterTelegram" />
                    <img src={FooterTwitter} alt="FooterTwitter" />
                  </div>
                  <div className="footerFlex">
                    <img src={logo} alt="xpLogo" className="logo mobileXpLogo" />
                    <div className="yearFooterMobileText"> © {new Date().getFullYear()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default withServices(Footer);
