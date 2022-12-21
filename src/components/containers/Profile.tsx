import React, { FC, useEffect, useState } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";
import { setUserData, updateProgress } from "store/reducer/global";

import { AchievementsUpdateEvent } from "store/types";

import { IUserAchievments } from "store/models/user";

export type ProfileProps = {
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
      if (telegramUser && !userData) {
        setLoading(true);
        api.getUser(telegramUser?.username).then((res) => {
          dispatch(
            setUserData({
              userData: res?.data,
            })
          );
          setLoading(false);
        });
      }

      false &&
        setTimeout(() => {
          dispatch(
            updateProgress({
              projectNumber: 1,
              currentProgressNumber: 4,
              achievments: [3],
            })
          );
        }, 5000);
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
      <Profile achievments={achievments} completedAmout={completedAmout} />
    );
  });

export default Container;
