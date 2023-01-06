import { useState, FC } from "react";

import logo from "../../assets/img/icons/logo.png";


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
export const Header: FC = () => {
  const [menuOpen, toggleMenu] = useState(false);

  const menuHandler = () => {
    document.body.classList.contains("showModal")
      ? document.body.classList.remove("showModal")
      : document.body.classList.add("showModal");
    toggleMenu(menuOpen ? false : true);
  };

  return (
    <div className="headerWrapper">
      <header className="header" id="header">
        <div className="iconBackground">
          <img src={logo} alt="logo" className="logo" />
          <div className="XPTitleStyle">XP.CHALLENGE</div>
        </div>
        <BurgerBtn menuOpen={menuOpen} menuHandler={menuHandler} />
            {menuOpen && <Menu close={menuHandler} />}
      </header>
    </div>
  );
};
