import React, { useState } from "react";

import logo from "../../assets/img/icons/logo.png";
import { ReactComponent as Twitter } from "../../assets/img/icons/twit.svg";
import { ReactComponent as Telegram } from "../../assets/img/icons/tg.svg";

import TelegramLogin from "../../components/auth/TelegramLogin";

import Menu from "../../components/modals/menu";

type HeaderPros = {
  timeLeft?: string;
};
const period = ["days", "hours", "minutes"];

const BurgerBtn = ({
  menuOpen,
  menuHandler,
}: {
  menuOpen: boolean;
  menuHandler: any;
}) => {
  return (
    <div
      onClick={menuHandler}
      className={`burgerBtn ${menuOpen ? "close" : ""}`}
    ></div>
  );
};

//withTimer
const Header = ({ timeLeft = "30:360:21600" }: HeaderPros) => {
  const time = timeLeft.split(":");
  const [menuOpen, toggleMenu] = useState(false);

  const menuHandler = () => {
    document.body.classList.contains("showModal")
      ? document.body.classList.remove("showModal")
      : document.body.classList.add("showModal");
    toggleMenu(menuOpen ? false : true);
  };

  return (
    <header className="header" id="header">
      <img src={logo} alt="logo" className="logo" />

      <div className="flexRow">
        <nav>
          <Twitter />
          <Telegram />
        </nav>
        <div className="clock">
          <div className="flexRow">
            {time.map((amount, index) => (
              <>
                <div className="segment">
                  <strong>{amount}</strong>

                  <span>{period[index]}</span>
                </div>
                {index < time.length - 1 && <span>:</span>}
              </>
            ))}
          </div>
        </div>
        <div className="menu flexRow">
          <TelegramLogin />
          <BurgerBtn menuOpen={menuOpen} menuHandler={menuHandler} />
          {menuOpen && <Menu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
