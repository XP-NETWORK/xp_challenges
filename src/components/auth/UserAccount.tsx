import React from "react";
import { TelegramUser } from "store/types";

const UserAccount = ({ telegramUser }: { telegramUser?: TelegramUser }) => {
  return (
    <div className={`userAccount`}>
      {telegramUser && (
        <div className="userAccount-tgWrapper flexRow">
          <span>@{telegramUser.username}</span>
          <img src={telegramUser.photo_url} alt="tgAvatar" />
        </div>
      )}
    </div>
  );
};

export default UserAccount;
