import React from "react";

import { HamburgerMenu } from "../../components/elements/hamburger";
import headerLogo from "../../assets/img/icons/logoSmall.png";
import headerLogoMob from "../../assets/img/icons/logoMob.png";

import { VolButton } from "../../components/elements/misc";

import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useSize";

const Header = () => {
  const { width } = useWindowSize();
  const mobile = Number(width) <= 800;
  return (
    <header className="ghostBg">
      <div className="container">
        <div className="headerContainer flexRow">
          <div className="burgerWrapper">
            {mobile && <HamburgerMenu />}
            <div className="logo">
              <img src={mobile ? headerLogo : headerLogoMob} alt="smallLogo" />
            </div>
          </div>

          <nav className="headerMenu flexRow">
            <div className="hoverEffect">
              <Link to="/" className="headerMenu-item">
                Play &#38; Earn
              </Link>
            </div>
            <div className="hoverEffect">
              <a href="#mechanicSectionAnchor" className="headerMenu-item">
                Game Mechanics
              </a>
            </div>
            <div className="hoverEffect">
              <a className="headerMenu-item" href="#factionSectionAnchor">
                Faction Introduction
              </a>
            </div>
            <div className="hoverEffect">
              <a className="headerMenu-item" href="#communitySectionAnchor">
                Community Feedback
              </a>
            </div>
          </nav>
          <VolButton classes="red" />
        </div>
      </div>
      <div className="ruggedLine"></div>
    </header>
  );
};

export default Header;
