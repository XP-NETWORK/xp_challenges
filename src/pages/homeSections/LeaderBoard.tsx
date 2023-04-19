import React, { useEffect, useState } from "react";
import { withServices, ServiceContainer } from "hocs/withServices";
import { setLeaders } from "store/reducer/global";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../store/index";
import ProgressBar from "../../components/elements/ProgressBar";
import searchSVG from "../../assets/svgs/Leaderboard/searchLeaderboard.svg";
import { ILeader } from "store/types";
import { AvaratPlaceHolder } from "../../components/elements/avatarPlaceHolder";
import noMatchSearch from "../../assets/img/noMatchSearch.png";
import "./index.css";
type Props = {
  serviceContainer: ServiceContainer;
};

const Board = ({ serviceContainer }: Props) => {
  const Dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState<string>("");
  const [topUser, setTopUser] = useState<ILeader[]>();
  const [badAvatars, setBad] = useState<number[]>([]);
  const { achievements } = useSelector((state: ReduxState) => ({
    achievements: state.global.achievements,
  }));

  const { api } = serviceContainer;

  useEffect(() => {
    (async () => {
      const leaders = await api.getBoard();
      if (leaders) {
        Dispatch(setLeaders(leaders));
      }
      const getTopTwo = leaders
        ? leaders
            .map((n) => n)
            ?.sort((a: ILeader, b: ILeader) => {
              return b.comp - a.comp;
            })
            ?.map((n: any, i: any) => {
              if ((i === 0 || i === 1) && Number(n.comp) > 0) {
                return Object.assign({}, n, { top: true });
              } else {
                return n;
              }
            })
        : [];

      setTopUser(getTopTwo);
    })();
  }, []);

  const search = topUser
    ? topUser?.filter((n) => n.user.toLowerCase().includes(`${searchUser?.toLowerCase()}`))
    : [];

  const onChangeSearch = (e: any) => {
    const { value } = e.target;
    setSearchUser(value);
  };

  // console.log(badAvatars);

  return (
    <div className="leaderBoard">
      <h2>Leaderboard</h2>
      <p>Compete with our top performers</p>
      <div className="searchContainer">
        <img src={searchSVG} alt="searchSVG" />
        <input
          type="search"
          placeholder="Search user"
          className="inputSearchStyle"
          onChange={onChangeSearch}
          value={searchUser}
        />
      </div>

      <div className="leaderBoard-pannel">
        <div className={search.length ? "wrapperLeaderBoard" : ""}>
          {search.length ? (
            search
              ?.sort((a: any, b: any) => {
                return b?.comp - a?.comp;
              })
              ?.map((leader: any, index) => (
                <div
                  key={index + leader.user}
                  className={`${leader?.top ? "topLeaders" : ""} participant`}
                >
                  <div className="participantFlex">
                    {leader.avatar && !badAvatars.includes(index) ? (
                      <img
                        src={leader.avatar}
                        alt={"avatar" + index}
                        className="avatarBox"
                        onError={() => {
                          console.log(index);
                          setBad([...badAvatars, index]);
                        }}
                      />
                    ) : (
                      <AvaratPlaceHolder username={leader.user} />
                    )}
                    <div className="userNameText">@{leader.user}</div>
                  </div>

                  <div className="leaderBoard-progress">
                    <ProgressBar current={leader.comp} total={achievements.length} loc={true} />
                  </div>
                </div>
              ))
          ) : (
            <div className="noMatchContainer">
              <img className="noMatchSearch" src={noMatchSearch} alt="noMatchSearch" />
              <p className="noMatchSearch">Your Search does not match anything we've got</p>
              <button onClick={(e) => onChangeSearch(e)} className="noMatchSearch b">
                BACK TO LEADERBOARD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withServices(Board);
