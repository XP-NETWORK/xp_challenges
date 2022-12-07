import React from "react";
import BattefieldBoard from "../components/board/battlefield";
import Header from "./common/header";

import "../assets/styles/battlefield.css";

const GameMechanics = () => {
  return (
    <div className="gameMechanicsPage">
      <Header />
      <BattefieldBoard />
    </div>
  );
};

export default GameMechanics;
