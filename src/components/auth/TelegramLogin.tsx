import React, { useEffect, useState, useRef } from "react";
import { ReactComponent as TelegramWhite } from "../../assets/img/icons/tgWhite.svg";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";

import { setTelegramUser, setUserData } from "store/reducer/global";
import { TelegramUser } from "store/types";

import UserAccount from "./UserAccount";

import { withServices, ServiceContainer } from "hocs/withServices";

import { useNavigate } from "react-router-dom";

interface TelegramLoginProps {
  serviceContainer: ServiceContainer;
  vert?: boolean;
}

function TelegramLogin(props: TelegramLoginProps) {
  const {
    serviceContainer: { telegram: telegramService, api },
    vert = false,
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

          dispatch(
            setTelegramUser({
              telegramUser,
            })
          );
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
