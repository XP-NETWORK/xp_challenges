import { useRef, useEffect, useMemo } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useWindowSize } from "../../hooks/useSize";
import { ReactComponent as ScrollUp } from "../../assets/img/home/cardNext.svg";

import { Socials } from "../../components/elements/socials";

import { scrollToTheTop } from "../../utils";

import footerLogo from "../../assets/img/home/Footer_logo.png";

const Footer = (props: any) => {
  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const { width } = useWindowSize();
  const mobile = useMemo(() => width && width <= 800, [width]);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "footer",
          urls: {
            desk: require("../../assets/img/home/footerGhostBg.png").default,
            mob: [require("../../assets/img/home/mob/footerBgMob.png").default],
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  const background = useRef(null);

  return (
    <footer className="ghostBg" ref={background} id="footer">
      <div className="footerShadow"></div>
      <div className="container">
        <div className="topFooter">
          <div className="scrollUp">
            <ScrollUp onClick={scrollToTheTop} />
            <span>Scroll Up</span>
          </div>
          <div className="flexRow footerContent">
            <img src={footerLogo} alt="footerLogo" className="footerLogo" />

            <div className="footerLinks">
              <div className="flexCol">
                <h3>Game</h3>
                <ul>
                  <li className="">
                    <a href="">Play to Earn</a>
                  </li>
                  <li className="">
                    <a href="">Game Mechanics</a>
                  </li>
                  <li className="">
                    <a href="">Story</a>
                  </li>
                  <li className="">
                    <a href="">News</a>
                  </li>
                </ul>
              </div>
              <div className="flexCol">
                <h3>Cards</h3>
                <ul>
                  <li className="">
                    <a href="">Cards Collection</a>
                  </li>
                  <li className="">
                    <a href="">Deck Builder</a>
                  </li>
                  <li className="">
                    <a href="">NFT</a>
                  </li>
                </ul>
              </div>
              <div className="flexCol">
                <h3>Help</h3>
                <ul>
                  <li className="">
                    <a href="">Support</a>
                  </li>
                  <li className="">
                    <a href="">FAQ</a>
                  </li>
                  {false && (
                    <li className="">
                      <a href="">Story</a>
                    </li>
                  )}
                  <li className="">
                    <a href="">Media Kit</a>
                  </li>
                </ul>
              </div>
              <div className="flexCol">
                <h3>Socials</h3>
                <ul>
                  <li className="">
                    <a href="https://twitter.com/Dfiancegame">Twitter</a>
                  </li>
                  <li className="">
                    <a href="https://discord.gg/dfiance">Discord</a>
                  </li>

                  <li className="">
                    <a href="https://t.me/dfiance">Telegram</a>
                  </li>

                  <li className="">
                    <a href="">Medium</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bottomFooter">
          {mobile && <Socials />}
          <div className="container flexRow">
            <span className="copyRight">
              {`Ⓒ DFIANCE, ${new Date().getFullYear()}`}
            </span>

            <div className="misc flexRow">
              <a href="dada">Privacy Policy</a>
              <a href="dasd">Terms of Use</a>
            </div>

            {!mobile && <Socials />}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default withServices(Footer);
