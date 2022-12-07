import React from "react";

import { ReactComponent as Medium } from "../../assets/img/icons/MIcon.svg";
import { ReactComponent as Twitter } from "../../assets/img/icons/TwitterIcon.svg";
import { ReactComponent as Telegram } from "../../assets/img/icons/telegram.svg";

export const Socials = () => (
  <ul className="socials">
    <li>
      <a href="#">
        <Medium />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/Dfiancegame">
        <Twitter />
      </a>
    </li>
    <li>
      <a href="https://t.me/dfiance">
        <Telegram />
      </a>
    </li>
  </ul>
);
