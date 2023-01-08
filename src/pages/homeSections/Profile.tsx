import React from "react";

import Achievements from "../../components/lists/achievments/achievements";
import TelegramLogin from "components/auth/TelegramLogin";

import Container from "components/containers/Profile";

import { ProfileProps } from "components/containers/Profile";
import LeaderBoard from "./LeaderBoard";
import { ProfileDetails } from "components/profile";

const Profile = ({
  achievments,
  completedAmout,
  userData,
  telegramUserData,
}: ProfileProps) => {
  return (
    <main className="profile">
      <div className="container">
        <TelegramLogin vert={true} />
        <div className="achivementBar">
          <ProfileDetails
            current={completedAmout}
            total={achievments.length}
            telegramData={telegramUserData}
          />
        </div>
        <Achievements userAchievements={achievments} userData={userData} />
        <div className="leaderBoardHomePage">
          <LeaderBoard />
        </div>
      </div>
    </main>
  );
};

export default Container(Profile);
