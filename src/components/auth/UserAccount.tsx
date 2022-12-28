import React from "react";
import { useLocation } from "react-router-dom";
import { TelegramUser } from "store/types";

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
            <div className="avatarPlaceholder"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccount;
