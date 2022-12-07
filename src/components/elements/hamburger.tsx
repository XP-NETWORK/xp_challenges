import React, { useState } from "react";
import burger from "../../assets/img/home/mob/burg.jpg";

import { Link } from "react-router-dom";

export const HamburgerMenu = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className={`burgerMenu${opened ? " toggled" : ""}`}>
      <img
        src={burger}
        alt="burger"
        onClick={() => setOpened(!opened)}
        width={32}
        height={32}
      />

      <nav className="headerMenu">
        <div className="hoverEffect">
          <Link className="headerMenu-item goldHo" to="/">
            Play &#38; Earn
          </Link>
        </div>
        <div className="hoverEffect">
          <Link className="headerMenu-item" to="/gameMechanics">
            Game Mechanics
          </Link>
        </div>
        <div className="hoverEffect">
          <a className="headerMenu-item" href="#">
            Faction Introduction
          </a>
        </div>
        <div className="hoverEffect">
          <a className="headerMenu-item" href="#">
            Community Feedback
          </a>
        </div>
      </nav>
    </div>
  );
};
