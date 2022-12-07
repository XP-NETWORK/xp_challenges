import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { ServiceProvider } from "./hocs/ServcieProvder";

import { Provider } from "react-redux";

import api from "./services/api";
import ImageLoader from "./services/imageLoader";
import DeckAnimator from "./services/deckAnimator";

import store from "./store";

import { ServiceContainer } from "./hocs/withServices";
import { AppContainer } from "./components/containers/App";
import { Router } from "./pages/router";

import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "./assets/styles/fontface.css";
import "./assets/styles/animations.css";
import "./assets/styles/main.css";
import "./assets/styles/cards.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./assets/styles/media.css";

const App = () => {
  const [serviceContainer, setContainer] = useState<ServiceContainer>({
    api: api("https://dfiance-api.herokuapp.com"), //api("http://localhost:3011"), //api("https://dfiance-api.herokuapp.com"),
    imageLoader: ImageLoader(),
    deck: DeckAnimator(),
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    serviceContainer.imageLoader.load();
  }, [serviceContainer.imageLoader]);

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
