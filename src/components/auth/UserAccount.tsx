import React from "react";

import { AvaratPlaceHolder } from "components/elements/avatarPlaceHolder";
import { UserData } from "store/models/user";

const UserAccount = ({ telegramUser }: { telegramUser?: UserData }) => {
  return (
    <div className={`userAccount`}>
      {telegramUser && (
        <div className="userAccount-tgWrapper flexRow">
          {telegramUser.telegramPhotoUrl ? (
            <img src={telegramUser.telegramPhotoUrl} alt="tgAvatar" />
          ) : (
            <AvaratPlaceHolder username={telegramUser.telegramFirstName || telegramUser.telegramLastName || ""}/>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccount;
