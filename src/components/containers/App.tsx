import React, { FC, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useDispatch } from "react-redux";
import { setAchievements, setTelegramUser } from "store/reducer/global";

export const AppContainer = (App: FC) =>
  withServices(function Callback(props) {
    const {
      serviceContainer: { api, telegram },
    }: { serviceContainer: ServiceContainer } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
        const res = await api.getData();
        console.log(res);
        dispatch(setAchievements({ achievements: res.data }));
      })();

      const telegramUser = telegram.getUser();
      if (telegramUser) {
        dispatch(setTelegramUser({ telegramUser }));
      }
    }, []);

    return <App />;
  });
