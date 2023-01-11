import { useState, FC } from "react";

import logo from "../../assets/img/icons/logo.png";

import Menu from "../../components/modals/menu";

import UserWallet from "components/auth/UserWallet";

import { useNavigate } from "react-router";

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
  const nav = useNavigate();

  const menuHandler = () => {
    document.body.classList.contains("showModal")
      ? document.body.classList.remove("showModal")
      : document.body.classList.add("showModal");
    toggleMenu(menuOpen ? false : true);
  };

  return (
    <div className="headerWrapper">
      <header className="header" id="header">
        <div className="iconBackground" onClick={() => nav("/")}>
          <img src={logo} alt="logo" className="logo" />
          <div className="XPTitleStyle">XP.CHALLENGE</div>
        </div>
        <div className="headerWrapper-right flexRow">
          <UserWallet />
          <BurgerBtn menuOpen={menuOpen} menuHandler={menuHandler} />
        </div>
        {menuOpen && <Menu close={menuHandler} />}
      </header>
    </div>
  );
};
