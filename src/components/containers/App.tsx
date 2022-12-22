import React, { FC, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useDispatch } from "react-redux";
import {
  setAchievements,
  setTelegramUser,
  toggleInit,
} from "store/reducer/global";

export const AppContainer = (App: FC) =>
  withServices(function Callback(props) {
    const {
      serviceContainer: { api, telegram },
    }: { serviceContainer: ServiceContainer } = props;
    const dispatch = useDispatch();

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
      ])
        .then(() => {
          dispatch(toggleInit(false));
        })
        .catch((e: any) => {
          console.log(e, "in AppContainer");
          dispatch(toggleInit(false));
        });

      //const params = new URLSearchParams(location.search.replace("?", ""));
      //const verifier = params.get("oauth_verifier");
    }, []);

    return <App />;
  });
