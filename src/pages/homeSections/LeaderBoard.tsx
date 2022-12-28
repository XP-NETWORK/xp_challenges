/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
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
  const [searchUser, setSearchUser] = useState<string>("");
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

  let search = leaders
    ? leaders?.filter((n) => n.user.toLowerCase().includes(`${searchUser?.toLowerCase()}`))
    : [];

  const onChangeSearch = (e: any) => {
    const { value } = e.target;
    setSearchUser(value);
  };
  return (
    <div className="leaderBoard">
      <h2>LEADERBOARD</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and <br />
        typesetting industry.
      </p>
      <input type="search" onChange={onChangeSearch} />
      <div className="leaderBoard-pannel">
        {false && <input type="text" />}
        <ul>
          {search?.map((leader, index) => (
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
