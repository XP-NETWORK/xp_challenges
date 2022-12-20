import React from "react";

import { ReactComponent as Logo } from "../../assets/img/icons/xplogoText.svg";
import { ReactComponent as Twitter } from "../../assets/img/icons/twit.svg";
import { ReactComponent as Telegram } from "../../assets/img/icons/tg.svg";

const MoldalFooter = () => {
  return (
    <div className="footer flexRow">
      <div className="links">
        <Twitter />
        <Telegram />
      </div>
      <div className="logo">
        <Logo />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default MoldalFooter;
