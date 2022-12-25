import React from "react";

import Achievements from "../../components/lists/achievments/achievements";
import TelegramLogin from "components/auth/TelegramLogin";
import ProgressBar from "components/elements/ProgressBar";

import Container from "components/containers/Profile";

import { ProfileProps } from "components/containers/Profile";

const Profile = ({ achievments, completedAmout, userData }: ProfileProps) => {
  return (
    <main className="profile">
      <div className="container">
        <TelegramLogin vert={true} />
        <div className="achivementBar">
          <ProgressBar current={completedAmout} total={achievments.length} />
        </div>
        <Achievements userAchievements={achievments} userData={userData} />
      </div>
    </main>
  );
};

export default Container(Profile);
