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
import socket from "services/socket";
import ExplorerSocket from "services/explorerSocket";
import wallet from "services/wallet";
import ErrorBoundary from "components/containers/ErrorBoundry";
import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "./assets/styles/fontface.css";
import "./assets/styles/animations.css";
import "./assets/styles/main.css";
import "react-alice-carousel/lib/alice-carousel.css";
import "./assets/styles/media.css";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import * as allChains from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";

export const config = {
  _DEFAULT_TWITTER_LINK: "https://twitter.com/CyberCityInc", //"https://twitter.com/xpnetwork_",
  _DEFAULT_BRIDGE_LINK: "https://bridge.xp.network?xpchallenge=true",
  _DEFAULT_TELEGRAM_LINK: "https://t.me/+NdWSm7De6jg5YWRk", //"https://t.me/XP_network",
  _DEFAULT_REG_BOT: "XP_CyberCity_Registrationbot",
  _TWITTER_AUTH: "https://support-bot-xp.herokuapp.com/twitterLogin",
  _WIDGET: "https://widget.xp.network", //https://widget-staging.xp.network
  _WIDGET_ID: "63bc17c8a65fd4aaf0312526",
};

const App = () => {
  const [serviceContainer, setContainer] = useState<ServiceContainer>({
    api: Api("https://xp-challenges.herokuapp.com"), //api("http://localhost:3011"), //api("https://dfiance-api.herokuapp.com"),
    imageLoader: ImageLoader(),
    telegram: TelegramService("XpChallengeAuth12Bot"), // must /setdomain to bot
    socketWrapper: socket("wss://xp-challenges.herokuapp.com"),
    explorerSocketWrapper: ExplorerSocket(
      "wss://dev-explorer-api.herokuapp.com/"
    ),
    wallet: wallet(),
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    serviceContainer && setLoaded(true);
    false &&
      window.addEventListener("keydown", (e) => {
        if (e.key === "o") {
          serviceContainer.wallet.connectMaiarExtension();
        }
      });
    // const handleBeforeUnload = () => {
    //   localStorage.removeItem("clicked");
    // };
    // window.addEventListener("beforeunload", handleBeforeUnload);
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, [serviceContainer]);

  const router = AppContainer(Router);

  return (
    <ServiceProvider value={{ serviceContainer, setContainer }}>
      <Provider store={store}>{loaded && router({})}</Provider>
    </ServiceProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const wcSupportedChains = Object.keys(allChains).map((key) => allChains[key]);

const { provider } = configureChains(wcSupportedChains, [
  walletConnectProvider({ projectId: "81963a335abea5e800ab8bd57eaee203" }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "81963a335abea5e800ab8bd57eaee203",
    version: "1",
    appName: "XP.NETWORK Multi-chain NFT bridge",
    chains: wcSupportedChains,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, wcSupportedChains);

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Web3Modal
        projectId={"81963a335abea5e800ab8bd57eaee203"}
        ethereumClient={ethereumClient}
      />
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
