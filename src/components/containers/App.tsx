import React, { FC, useEffect } from "react";
import { withServices, ServiceContainer } from "../../hocs/withServices";
import { useDispatch } from "react-redux";
import { setAchievements, toggleInit, setProject } from "store/reducer/global";
import { IACHIEVMENT } from "store/types";

export const AppContainer = (App: FC) =>
  withServices(function Callback(props) {
    const {
      serviceContainer: { api },
    }: { serviceContainer: ServiceContainer } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(toggleInit(true));

      Promise.all([
        (async () => {
          const res = await api.getData();
          const filterdAchivs = res.achievements.filter((a: IACHIEVMENT) =>
            res.project.achievments.includes(a.achievmentNumber)
          );
          dispatch(setAchievements({ achievements: filterdAchivs }));
          dispatch(setProject({ project: res.project }));
          // dispatch(setModal({ type: "AchievmentCompleted" }));
        })(),
      ])
        .then(() => {
          dispatch(toggleInit(false));
        })
        .catch((e: any) => {
          console.log(e, "in AppContainer");
          dispatch(toggleInit(false));
        });
    }, []);

    return <App {...props} />;
  });
