import React from "react";
import { useLocation } from "react-router-dom";
import { TelegramUser } from "store/types";

import { AvaratPlaceHolder } from "components/elements/avatarPlaceHolder";

const UserAccount = ({ telegramUser }: { telegramUser?: TelegramUser }) => {
  const location = useLocation();
  return (
    <div className={`userAccount`}>
      {telegramUser && (
        <div className="userAccount-tgWrapper flexRow">
          {location.pathname === "/signup" ? (
            <div className="userAccountRegText">
              Hello{" "}
              <span className="userAccountBold"> @{telegramUser.username}</span>{" "}
              you Almost <br /> there! add your email to <br /> continue
              registration
            </div>
          ) : (
            <>@{telegramUser.username}</>
          )}
          {telegramUser.photo_url ? (
            <img src={telegramUser.photo_url} alt="tgAvatar" />
          ) : (
            <AvaratPlaceHolder username={telegramUser.first_name || telegramUser.last_name}/>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccount;
