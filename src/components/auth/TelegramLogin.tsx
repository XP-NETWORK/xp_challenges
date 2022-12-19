import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as TelegramWhite } from "../../assets/img/icons/tgWhite.svg";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";

import { setTelegramUser } from "store/reducer/global";
import { TelegramUser } from "store/types";

import UserAccount from "./UserAccount";

import { withServices, ServiceContainer } from "hocs/withServices";

import { useNavigate } from "react-router-dom";

interface TelegramLoginProps {
  serviceContainer: ServiceContainer;
}

function TelegramLogin(props: TelegramLoginProps) {
  const {
    serviceContainer: { telegram: telegramService, api },
  } = props;
  const { telegramUser } = useSelector((state: ReduxState) => ({
    telegramUser: state.global.telegramUser,
  }));
  const [scriptLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    window.__GLOBAL_VAR__ = window.__GLOBAL_VAR__ || {};
    window.__GLOBAL_VAR__.onTelegramAuth = function (
      telegramUser: TelegramUser
    ) {
      api.verifyTelegramData(telegramUser).then((res) => {
        if (res) {
          dispatch(
            setTelegramUser({
              telegramUser,
            })
          );
          telegramService.storeUser(telegramUser);
          navigate("/signup");
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
    <div className="signUpContainer">
      {!telegramUser && (
        <>
          <button className="accent" ref={button}>
            <TelegramWhite />
            Sign Up
          </button>
          <div className="authWrapper" ref={container}></div>
        </>
      )}
      <UserAccount telegramUser={telegramUser} />
    </div>
  );
}

export default withServices(TelegramLogin);
