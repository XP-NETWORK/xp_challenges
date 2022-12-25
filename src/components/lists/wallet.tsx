import React from "react";

import metamask from "../../assets/img/icons/MetaMask.svg";
import maiar from "../../assets/img/icons/Maiar.svg";

import { withServices } from "hocs/withServices";

const WalletList = () => {
  return (
    <ul>
      <li>
        <img src={metamask} alt="metamask" />
        <span>MetaMask</span>
      </li>
      <li>
        <img src={maiar} alt="maiar" />
        <span>Maiar</span>
      </li>
    </ul>
  );
};

export default withServices(WalletList);
