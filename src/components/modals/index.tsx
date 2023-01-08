import React from "react";

import { IModal } from "store/types";

import TelegramLogin from "components/auth/TelegramLogin";

import close from "../../assets/img/icons/close.svg";

import { useDispatch } from "react-redux";

import { setModal } from "store/reducer/global";

import WalletList from "components/lists/wallet";

import { config } from "../../index";
import { ConfirmRegistrationModal } from "./confirmRegistration";

import { ReactComponent as Frame } from "../../assets/img/icons/card-frameSimple.svg";

import { Subscribe } from "../auth/Subscribe";

const Modal = ({ modal }: { modal: IModal }) => {
  let body: JSX.Element = <div></div>;
  const dispatch = useDispatch();

  switch (modal.type) {
    case "TelegramAuth": {
      body = <TelegramLogin />;
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
        <>
          <span>
            You will be redirected to Twitter auth page and back on successful
            log in
          </span>

          <button
            className="fa fa-twitter"
            onClick={() => window.open(config._TWITTER_AUTH, "_self")}
          >
            Log In
          </button>
        </>
      );
      break;
    }

    case "EmailSubscribe": {
      body = <Subscribe />;

      break;
    }

    default:
      break;
  }

  return (
    <>
      <div className="blurOver"></div>
      <div className="small-modal">
        <Frame className="cardFrame modalFrame" />
        <div className={`popupHeader ${!modal.text ? "empty-header" : ""}`}>
          <div className="modal-header">{modal.text}</div>
          <img
            src={close}
            alt="close"
            onClick={() => dispatch(setModal(undefined))}
          />
        </div>
        <div className="modal-body">{body}</div>
      </div>
    </>
  );
};

export default Modal;
