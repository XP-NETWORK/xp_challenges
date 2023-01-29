import { IModal } from "store/types";
import close from "../../assets/img/icons/close.svg";
import { ReactComponent as GreenCheck } from "../../assets/img/icons/ci_check-bold.svg";
import twitter from "../../assets/svgs/twitter.svg";
import walletConnected from "../../assets/img/icons/walletConnected.png";
import { useDispatch } from "react-redux";
import { setModal } from "store/reducer/global";
import WalletList from "components/lists/wallet";
import { config } from "../../index";
import { ConfirmRegistrationModal } from "./confirmRegistration";
import { ReactComponent as Frame } from "../../assets/img/icons/card-frameSimple.svg";
import { Subscribe } from "../auth/Subscribe";
import { truncate } from "utils";
import { BridgeWidget } from "components/bridge";
import { TelegramButton } from "components/auth/TelegramButton";
import { Avatar } from "components/elements/Avatar";
import telegramIcon from "../../assets/img/icons/connectWithTg.png";

const Modal = ({ modal }: { modal: IModal }) => {
  let body: JSX.Element = <div></div>;
  const dispatch = useDispatch();

  switch (modal.type) {
    case "TelegramAuth": {
      body = (
        <div className="TelegramButtonWrapper">
          <img src={telegramIcon} alt="telegramIcon" />
          <h2>Sign up</h2>
          <p>To continue please register with your telegram accont</p>
          <TelegramButton />
        </div>
      );
      break;
    }

    case "WalletList": {
      body = <WalletList close={() => dispatch(setModal(undefined))} />;
      break;
    }

    case "confirmReg": {
      body = (
        <ConfirmRegistrationModal
          close={() => dispatch(setModal(undefined))}
          telegramAccount={modal?.telegramAccount}
          email={modal.email}
          confirmButton={modal.confirmButton}
        />
      );
      break;
    }

    case "TwitterAuth": {
      body = (
        <div className="subscribe">
          <img src={twitter} alt="subscribeIcon" />
          <h2>Twitter</h2>
          <p>To complete the achievment please login to your twitter account</p>
          <button
            style={{ margin: "auto", marginTop: "2px" }}
            className="accent"
            onClick={() => window.open(config._TWITTER_AUTH, "_self")}
          >
            LOG IN TO TWITTER
          </button>
        </div>
      );
      break;
    }

    case "EmailSubscribe": {
      body = <Subscribe params={modal.params} />;

      break;
    }

    case "Success": {
      body = (
        <div className="successModal subscribe">
          <h2>Sign up success!</h2>
          <div className="emblem flexRow">
            <GreenCheck />
            {modal.wallet ? <img src={walletConnected} alt="walletConnected" /> : <Avatar />}
            {modal.telegramAccount ? (
              <span>@{modal.telegramAccount}</span>
            ) : modal.wallet ? (
              <span className="walletAddress"> {truncate(modal.wallet, 10)}</span>
            ) : (
              ""
            )}
          </div>
          <button className="accent" onClick={() => dispatch(setModal(undefined))}>
            Go to achievements
          </button>
        </div>
      );
      break;
    }

    case "Bridge": {
      body = (
        <div className="bridgePopUp">
          <div className="bridgePopupHeaderContainer">
            <div className="bridgeTitle">Multi-chain NFT bridge</div>
            {/* <button className="closeBridgeButton">
              <img src={CloseBridgePopupIcon} alt="closeBridgeIcon" />
      </button>*/}
          </div>
          <BridgeWidget />
        </div>
      );
      break;
    }
    
    case "AchievmentCompleted": {
      body = (
        <div className="subscribe">
          <h2>Achievment Completed</h2>
          <p>Check your transaction status in the explorer</p>
          <div className="heroButtonsSection">
            <button
              className="explorer"
              onClick={() => window.open("https://explorer.xp.network/", "_blank")}
            >
              GO to explorer
            </button>
            <button className="accent some" onClick={() => dispatch(setModal(undefined))}>
              back to achievements
            </button>
          </div>
        </div>
      );
      break;
    }
    default:
      break;
  }

  return (
    <>
      <div className="blurOver"></div>
      <div
        className={`small-modal ${
          modal.type === "Bridge"
            ? "big-modal"
            : modal.type === "AchievmentCompleted"
            ? "mid-modal "
            : ""
        }`}
      >
        <Frame className="cardFrame modalFrame" />
        <div className={`popupHeader ${!modal.text ? "empty-header" : ""}`}>
          <div className="modal-header">{modal.text}</div>
          <img src={close} alt="close" onClick={() => dispatch(setModal(undefined))} />
        </div>
        <div className="modal-body">{body}</div>
      </div>
    </>
  );
};

export default Modal;
