/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { withServices, ServiceContainer } from "hocs/withServices";

import { setLeaders } from "store/reducer/global";

import { useDispatch, useSelector } from "react-redux";

import { ReduxState } from "../../store/index";

import ProgressBar from "../../components/elements/ProgressBar";

import searchSVG from "../../assets/svgs/Leaderboard/searchLeaderboard.svg";
import { ILeader } from "store/types";

import {AvaratPlaceHolder} from '../../components/elements/avatarPlaceHolder'

type Props = {
  serviceContainer: ServiceContainer;
};

const Board = ({ serviceContainer }: Props) => {
  const Dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState<string>("");
  const [topUser, setTopUser] = useState<ILeader[]>();
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
      let getTopTwo = leaders
        ? leaders
            .map((n) => n)
            ?.sort((a: ILeader, b: ILeader) => {
              return b.comp - a.comp;
            })
            ?.map((n: any, i: any) => {
              if (i === 0 || i === 1) {
                return Object.assign({}, n, { top: true });
              } else {
                return n;
              }
            })
        : [];

      setTopUser(getTopTwo);
    })();
  }, []);

  let search = topUser
    ? topUser?.filter((n) =>
        n.user.toLowerCase().includes(`${searchUser?.toLowerCase()}`)
      )
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
      <div className="searchContainer">
        <img src={searchSVG} alt="searchSVG" />
        <input
          type="search"
          placeholder="Search user"
          className="inputSearchStyle"
          onChange={onChangeSearch}
        />
      </div>

      <div className="leaderBoard-pannel">
        {false && <input type="text" />}
        <ul>
          {search
            ?.sort((a: any, b: any) => {
              return b?.comp - a?.comp;
            })
            ?.map((leader: any, index) => (
              <li
                key={index + leader.user}
                className={`flexRow  ${leader?.top ? "topLeaders" : ""}`}
              >
                <div className={`leaderBoard-user flexRow`}>
                  {leader.avatar ? (
                    <img src={leader.avatar} alt={"avatar" + index} />
                  ) : (
                    <AvaratPlaceHolder username={ leader.user}/>
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
