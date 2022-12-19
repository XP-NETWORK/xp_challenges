import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "./hocs/ServcieProvder";

import { Provider } from "react-redux";

import store from "./store";

import { ServiceContainer } from "./hocs/withServices";
import { AppContainer } from "./components/containers/App";
import { Router } from "./pages/router";

import ImageLoader from "./services/imageLoader";
import Api from "./services/api";
import TelegramService from "./services/telegram";

import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "./assets/styles/fontface.css";
import "./assets/styles/animations.css";
import "./assets/styles/main.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./assets/styles/media.css";

const App = () => {
  console.log(process.env.REACT_APP_TOKEN);
  const [serviceContainer, setContainer] = useState<ServiceContainer>({
    api: Api("https://xp-challenges.herokuapp.com"), //api("http://localhost:3011"), //api("https://dfiance-api.herokuapp.com"),
    imageLoader: ImageLoader(),
    telegram: TelegramService("XpChallengeAuth12Bot"),
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    serviceContainer && setLoaded(true);
  }, [serviceContainer]);

  const router = AppContainer(Router);

  return (
    <ServiceProvider value={{ serviceContainer, setContainer }}>
      <Provider store={store}>{loaded && router({})}</Provider>
    </ServiceProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
