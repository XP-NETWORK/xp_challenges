import React, { useState } from "react";

import logo from "../../assets/img/icons/logo.png";

import TelegramLogin from "../../components/auth/TelegramLogin";

import Menu from "../../components/modals/menu";

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
const Header = () => {
  const [menuOpen, toggleMenu] = useState(false);

  const menuHandler = () => {
    document.body.classList.contains("showModal")
      ? document.body.classList.remove("showModal")
      : document.body.classList.add("showModal");
    toggleMenu(menuOpen ? false : true);
  };

  return (
    <header className="header" id="header">
      <div className="iconBackground">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="headerContainer">
        <div className="menu flexRow">
          <TelegramLogin />
          <BurgerBtn menuOpen={menuOpen} menuHandler={menuHandler} />
          {menuOpen && <Menu close={menuHandler} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
