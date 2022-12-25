import React from "react";

import { IModal } from "store/types";

import TelegramLogin from "components/auth/TelegramLogin";

import close from "../../assets/img/icons/close.svg";

import { useDispatch } from "react-redux";

import { setModal } from "store/reducer/global";

import WalletList from "components/lists/wallet";

const Modal = ({ modal }: { modal: IModal }) => {
  let body: JSX.Element = <div></div>;
  const dispatch = useDispatch();

  switch (modal.type) {
    case "TelegramAuth": {
      body = <TelegramLogin />;
      break;
    }
    case "WalletList": {
      body = <WalletList />;
      break;
    }

    default:
      break;
  }

  return (
    <>
      <div className="small-modal">
        <img
          src={close}
          alt="close"
          onClick={() => dispatch(setModal(undefined))}
        />
        <div className="modal-header">{modal.text}</div>
        <div className="modal-body">{body}</div>
      </div>
    </>
  );
};

export default Modal;
