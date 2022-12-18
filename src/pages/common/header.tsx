import React from "react";

import logo from "../../assets/img/icons/logo.png";
import { ReactComponent as Twitter } from "../../assets/img/icons/twit.svg";
import { ReactComponent as Telegram } from "../../assets/img/icons/tg.svg";
//import { ReactComponent as TelegramWhite } from "../../assets/img/icons/tgWhite.svg";
import { ReactComponent as Hamburger } from "../../assets/img/icons/hamburger.svg";

import TelegramLogin from "../../components/auth/TelegramLogin";

type HeaderPros = {
  timeLeft?: string;
};
const period = ["days", "hours", "minutes"];

//withTimer
const Header = ({ timeLeft = "30:360:21600" }: HeaderPros) => {
  const time = timeLeft.split(":");

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
          <Hamburger />
        </div>
      </div>
    </header>
  );
};

export default Header;
