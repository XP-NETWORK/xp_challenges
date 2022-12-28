import { FC } from "react";
import "../../assets/styles/modals.css";

interface IRegistrationModal {
  telegramAccount: string | undefined;
  email: string | undefined;
  confirmButton: any;
  close: () => void;
}

export const ConfirmRegistrationModal: FC<IRegistrationModal> = ({
  close,
  telegramAccount,
  confirmButton,
  email,
}) => {
  const closePopUpSuccess = () => {
    confirmButton();
    close();
  };
  return (
    <>
      <div>
        <article className="popupBody">
          <div className="firstInnerHeader">
            <div className="popupInnerHeaders">Telegram account</div>
            <div>@{telegramAccount}</div>
          </div>
          <div className="secondInnerHeader">
            <div className="popupInnerHeaders">Email</div>
            <div>{email}</div>
          </div>
        </article>
        <section className="popupButton">
          <button
            className="innerClosePopup popupButtonsSection"
            onClick={close}
          >
            CANCEL
          </button>
          <button
            className="innerConfirmPopup popupButtonsSection"
            onClick={closePopUpSuccess}
          >
            CONFIRM
          </button>
        </section>
      </div>
    </>
  );
};
