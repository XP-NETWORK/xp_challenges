import React, { ReactChild } from "react";

//import { useWindowSize } from "../hooks/useSize";

import {Header} from "./common/header";
import Footer from "./common/footer";

const Home = ({ init, children }: { init: boolean; children: ReactChild }) => {
  //const { width } = useWindowSize();

  return (
    <div
      className="homePage ghostBg"
      style={{ display: init ? "none" : "block" }}
    >
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default Home;
