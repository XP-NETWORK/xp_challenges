import * as React from "react";
import { AvaratPlaceHolder } from "./avatarPlaceHolder";
import { useSelector } from "react-redux";
import { ReduxState } from "store";

export const Avatar = () => {
  const userData = useSelector((state: ReduxState) => state.global.userData);

  const [error, setError] = React.useState(
    !userData?.telegramPhotoUrl ? true : false
  );

  return (
    <>
      {!error ? (
        <div className={"userFrameCi"}>
          <img
            src={userData?.telegramPhotoUrl}
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <div className="userFrameCi">
          {userData?.telegramUsername && (
            <AvaratPlaceHolder username={userData?.telegramUsername} />
          )}
        </div>
      )}
    </>
  );
};
