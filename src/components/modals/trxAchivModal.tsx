import close from "../../assets/img/icons/close.svg";
import { useDispatch } from "react-redux";
import { setTrxModal, setModal } from "store/reducer/global";
import { ReactComponent as Frame } from "../../assets/img/icons/card-frameSimple.svg";

const TrxAchivModal = () => {
  let body: JSX.Element = <div></div>;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setTrxModal(false));
    dispatch(setModal(undefined));
  };

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
        <button className="accent some" onClick={handleClose}>
          back to achievements
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className={`small-modal mid-modal`}>
        <Frame className="cardFrame modalFrame" />
        <div className={`popupHeader empty-header`}>
          <div className="modal-header"></div>
          <img src={close} alt="close" onClick={() => dispatch(setTrxModal(false))} />
        </div>
        <div className="modal-body">{body}</div>
      </div>
    </>
  );
};

export default TrxAchivModal;
