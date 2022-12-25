import React, { FC, useEffect, useState } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";
import { setUserData, updateProgress } from "store/reducer/global";

import { AchievementsUpdateEvent } from "store/types";

import { IUserAchievments, UserData } from "store/models/user";

import { TwitterUser } from "services/twitter";

import userFabric from "store/models/user";

export type ProfileProps = {
  userData: UserData | undefined;
  achievments: IUserAchievments[];
  completedAmout: number;
};

const Container = (Profile: FC<ProfileProps>) =>
  withServices(function Callback(props) {
    const {
      serviceContainer: { api, socketWrapper },
    }: { serviceContainer: ServiceContainer } = props;
    const dispatch = useDispatch();

    const { userData, telegramUser, currentProject } = useSelector(
      (state: ReduxState) => ({
        telegramUser: state.global.telegramUser,
        userData: state.global.userData,
        currentProject: state.global.currentProject,
      })
    );
    const [loading, setLoading] = useState(false);

    const eventHandler = (data: AchievementsUpdateEvent) => {
      console.log(data, "socketData");
      dispatch(updateProgress(data));
    };

    useEffect(() => {
      (async () => {
        if (telegramUser && !userData) {
          setLoading(true);
          const user = await api.getUser(telegramUser?.username);
          let userData = user?.data;

          const twitterParam = new URLSearchParams(
            location.search.replace("?", "")
          ).get("twitterCred");

          if (twitterParam) {
            const cred = JSON.parse(twitterParam).data as TwitterUser;
            userData = {
              ...userData,
              twitterAcountId: cred.id,
              twitterUserName: cred.username,
            };

            const updated = await api.updateTwitterAccount(
              userFabric(userData)
            );
            console.log(updated, "updated");
          }

          dispatch(setUserData({ userData }));
          setLoading(false);
        }
      })();
    }, [userData, telegramUser]);

    useEffect(() => {
      if (telegramUser) {
        socketWrapper.listen(telegramUser.username, eventHandler);
        return () => socketWrapper.mute(telegramUser.username, eventHandler);
      }
    }, [telegramUser]);

    const achievments =
      userData?.projectParticipations?.find(
        (p) => p.projectNumber === currentProject
      )?.achievments || [];

    const completedAmout =
      achievments?.reduce((cur, acc) => {
        return cur + (acc.completed ? 1 : 0);
      }, 0) || 0;

    return loading ? (
      <div className="loader"></div>
    ) : (
      <Profile
        userData={userData}
        achievments={achievments}
        completedAmout={completedAmout}
      />
    );
  });

export default Container;
