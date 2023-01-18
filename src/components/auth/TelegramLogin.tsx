import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";
import { setUserData } from "store/reducer/global";
import { TelegramUser } from "store/types";
import { withServices, ServiceContainer } from "hocs/withServices";
import { useNavigate } from "react-router-dom";
import UserWallet from "../auth/UserWallet";

interface TelegramLoginProps {
  serviceContainer: ServiceContainer;
  vert?: boolean;
}

function TelegramLogin(props: TelegramLoginProps) {
  const {
    serviceContainer: { telegram: telegramService, api },
    vert = false,
  } = props;
  const { userData } = useSelector((state: ReduxState) => ({
    userData: state.global.userData,
  }));
  const [scriptLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    window.__GLOBAL_VAR__ = window.__GLOBAL_VAR__ || {};
    window.__GLOBAL_VAR__.onTelegramAuth = function(
      telegramUser: TelegramUser
    ) {
      api.verifyTelegramData(telegramUser).then(async (res) => {
        if (res) {
          //save in LS
          telegramService.storeUser(telegramUser);
          //check if user already exist in db
          const res = await api.getUser(telegramUser.username);

          if (res) {
            dispatch(setUserData(res.data));
          } else {
            navigate("/signup");
          }

          /*dispatch(
            setTelegramUser({
              telegramUser.t,
            })
          );*/
        }
      });
    };
    setLoaded(true);
  }, []);

  useEffect(() => {
    let waitForIframe: any;
    if (scriptLoaded && container.current) {
      telegramService.loadWidget(
        container.current,
        "window.__GLOBAL_VAR__.onTelegramAuth(user)"
      );

      waitForIframe = setInterval(() => {
        const iframe = container.current?.querySelector(
          "iframe"
        ) as HTMLIFrameElement;

        if (iframe && iframe.style.width && iframe.style.height) {
          clearInterval(waitForIframe);
          button.current &&
            telegramService.insertButton(iframe, button.current);
        }
      }, 100);
    }

    return () => {
      clearInterval(waitForIframe);
    };
  }, [scriptLoaded]);

  return (
    <div className={`signUpContainer ${vert ? "vertical" : ""}`}>
      {userData?.wallets?.length ? <UserWallet /> : ""}
    </div>
  );
}

export default withServices(TelegramLogin);
