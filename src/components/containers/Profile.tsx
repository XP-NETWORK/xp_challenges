import React, { FC, useEffect, useState } from "react";
import { withServices, ServiceContainer } from "../../hocs/withServices";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "store";
import { setModal, setUserData, updateProgress, setTrxModal } from "store/reducer/global";
import { AchievementsUpdateEvent } from "store/types";
import { IUserAchievments, UserData } from "store/models/user";
import { TwitterUser } from "services/twitter";
import userFabric from "store/models/user";
import { useNavigate } from "react-router";

export type ProfileProps = {
  userData: UserData | undefined;
  achievments: IUserAchievments[];
  completedAmout: number;
  telegramUserData?: any;
};

const Container = (Profile: FC<ProfileProps>) =>
  withServices(function Callback(props) {
    const {
      serviceContainer: { api, socketWrapper, explorerSocketWrapper },
    }: { serviceContainer: ServiceContainer } = props;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData, telegramUser, currentProject } = useSelector((state: ReduxState) => ({
      telegramUser: state.global.telegramUser,
      userData: state.global.userData,
      currentProject: state.global.currentProject,
    }));

    const eventHandler = (data: AchievementsUpdateEvent) => {
      console.log("SOCKETDATA ", data.achievments[0], {
        achievments: data.achievments,
        completed: data.completed,
        currentProgressNumber: data.currentProgressNumber,
      });
      console.log("-------------------------------------");

      dispatch(
        updateProgress({
          ...data,
          projectNumber: Number(data.projectNumber),
        })
      );
    };

    const trxHandler = (data: any) => {
      console.log("SOCKETDATA -trxHandler ", data);
      console.log("-------------------------------------");
      console.log({
        wallets: userData?.wallets ? userData?.wallets[0] : "No wallet",
        sender: data.senderAddress.toUpperCase(),
      });

      if (
        userData?.wallets &&
        userData?.wallets[0].address.toUpperCase() === data.senderAddress.toUpperCase()
      ) {
        dispatch(setTrxModal(true));
      }
    };

    useEffect(() => {
      (async () => {
        if (telegramUser) {
          setLoading(true);
          const user = await api.getUser(telegramUser.telegramUsername);
          let ud = user?.data;
          const params = new URLSearchParams(location.search.replace("?", ""));
          const twitterParam = params.get("twitterCred");
          const confirmedEmail = params.get("emailConfirmed");

          if (twitterParam) {
            const cred = JSON.parse(twitterParam).data as TwitterUser;
            ud = {
              ...userData,
              twitterAcountId: cred.id,
              twitterUserName: cred.username,
            };

            await api.updateTwitterAccount(userFabric(ud));
          }

          if (confirmedEmail) {
            dispatch(
              setModal({
                type: "EmailSubscribe",
                params: {
                  emailConfirmed: Boolean(confirmedEmail),
                },
              })
            );
          }

          dispatch(setUserData({ userData: ud }));
        }
        setLoading(false);
        navigate("/");
      })();
    }, [telegramUser]);

    useEffect(() => {
      console.log({ userData });
      if (userData?.telegramUsername) {
        socketWrapper.listen(userData.telegramUsername, eventHandler);
        explorerSocketWrapper.listen("incomingEvent", trxHandler);

        return () => {
          explorerSocketWrapper.mute("incomingEvent", trxHandler);
          socketWrapper.mute(userData.telegramUsername, eventHandler);
        };
      }
    }, [userData]);

    const achievments =
      userData?.projectParticipations?.find((p) => p.projectNumber === currentProject)
        ?.achievments || [];

    const completedAmout =
      achievments?.reduce((cur, acc) => {
        return cur + (acc.completed ? 1 : 0);
      }, 0) || 0;

    return loading ? (
      <div className="loader"></div>
    ) : (
      <Profile
        telegramUserData={telegramUser}
        achievments={achievments}
        completedAmout={completedAmout}
        userData={userData}
      />
    );
  });

export default Container;
