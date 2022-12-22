import React, { FC, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useDispatch } from "react-redux";
import {
  setAchievements,
  setTelegramUser,
  toggleInit,
} from "store/reducer/global";

//import { auth, Client } from "twitter-api-sdk";

export const AppContainer = (App: FC) =>
  withServices(function Callback(props) {
    const {
      serviceContainer: { api, telegram },
    }: { serviceContainer: ServiceContainer } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      /* const authClient = new auth.OAuth2User({
        client_id: "Nh4xMtJqBHGTuQRTVOyCPNyNi",
        callback: "http://127.0.0.1:3000/",
        scopes: ["tweet.read", "users.read", "offline.access"],
      });

     // const client = new Client(authClient);

      console.log(client, "client");*/
    }, []);

    useEffect(() => {
      dispatch(toggleInit(true));
      Promise.all([
        (async () => {
          const res = await api.getData();
          dispatch(setAchievements({ achievements: res.data }));
        })(),
        (async () => {
          const telegramUser = telegram.getUser();

          if (telegramUser) {
            const verified = await api.verifyTelegramData(telegramUser);
            verified && dispatch(setTelegramUser({ telegramUser }));
          }
        })(),
      ]).then(() => {
        dispatch(toggleInit(false));
      });
    }, []);

    return <App />;
  });
