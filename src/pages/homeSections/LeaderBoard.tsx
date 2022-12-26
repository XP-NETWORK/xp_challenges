import React, { useEffect } from "react";
import { withServices, ServiceContainer } from "hocs/withServices";

import { setLeaders } from "store/reducer/global";

import { useDispatch, useSelector } from "react-redux";

import { ReduxState } from "../../store/index";

import ProgressBar from "../../components/elements/ProgressBar";

type Props = {
  serviceContainer: ServiceContainer;
};

const Board = ({ serviceContainer }: Props) => {
  const Dispatch = useDispatch();
  const { leaders, achievements } = useSelector((state: ReduxState) => ({
    leaders: state.global.leaders,
    achievements: state.global.achievements,
  }));

  const { api } = serviceContainer;

  useEffect(() => {
    (async () => {
      const leaders = await api.getBoard();
      if (leaders) {
        Dispatch(setLeaders(leaders));
      }
    })();
  }, []);

  return (
    <div className="leaderBoard">
      <h2>LEADERBOARD</h2>
      <p>Try to complete all the tastks</p>

      <div className="leaderBoard-pannel">
        {false && <input type="text" />}
        <ul>
          {leaders?.map((leader, index) => (
            <li key={index + leader.user} className="flexRow">
              <div className="leaderBoard-user flexRow">
                {leader.avatar ? (
                  <img src={leader.avatar} alt={"avatar" + index} />
                ) : (
                  <div className="avatarPlaceholder"></div>
                )}
                <span>@{leader.user}</span>
              </div>
              <div className="leaderBoard-progress">
                <ProgressBar
                  current={leader.comp}
                  total={achievements.length}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withServices(Board);
