import React from "react";
import { useDispatch } from "react-redux";

import TelegramLogin from "components/auth/TelegramLogin";
import MoldalFooter from "./common/modalFooter";

import { Link } from "react-router-dom";

import { SignUpProps } from "../components/containers/Signup";

// import UserWallet from "components/auth/UserWallet";
import { setModal } from "../store/reducer/global";

const Signup = ({
  state,
  validation,
  signup,
  formHandler,
}: // connectHandler,
// wallet,
SignUpProps) => {
  const { email, newsletter, privatePolicy } = state;
  const dispatch = useDispatch();

  const confirmButton = () => {
    dispatch(
      setModal({
        type: "confirmReg",
        email: email,
        telegramAccount: state.telegram?.username,
        text: "Confirm your information",
        confirmButton: signup,
      })
    );
  };
  return (
    <div className="signupPage">
      <div className="container">
        <div className="signupPage-container">
          <div className="accountWrapper">
            <h2>Sign up</h2>

            {state?.telegram && <TelegramLogin vert={true} />}
          </div>
          <div className="signupPage-form">
            <div
              className={`withError ${
                validation.telegram.failedValid ? "active" : ""
              }`}
            >
              <div className="emptyBlock"></div>
              <div className="errorMessage">{validation.telegram.text}</div>
            </div>

            <div
              className={`withError ${
                validation.email.failedValid ? "active" : ""
              }`}
            >
              <div className="flexCol">
                <label htmlFor="">Email</label>
                <input
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => formHandler(e.target.value, "email")}
                />
              </div>
              <div className="errorMessage">{validation.email.text.empty}</div>
            </div>
            <div className="flexRow">
              <div
                className={`checkBoxWrapper ${newsletter ? "checked" : ""}`}
                onClick={() => formHandler(!newsletter, "newsletter")}
              >
                <input type="checkbox" />
              </div>
              <label htmlFor="" className="textForCheckbox">
                I want to receive newslatters
              </label>
            </div>
            <div
              className={`withError ${
                validation.privatePolicy.failedValid ? "active" : ""
              }`}
            >
              <div className="flexRow">
                <div
                  className={`checkBoxWrapper  ${
                    privatePolicy ? "checked" : ""
                  }`}
                  onClick={() => formHandler(!privatePolicy, "privatePolicy")}
                >
                  <input type="checkbox" />
                </div>
                <label htmlFor="" className="textForCheckbox">
                  I agree to the{" "}
                  <a href="#" className="termsCheckBox">
                    Terms fo Use
                  </a>{" "}
                  and{" "}
                  <a className="termsCheckBox" href="#">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <div className="errorMessage">
                {validation.privatePolicy.text}
              </div>
            </div>
            {/*
            <div className="walletContainer">
              {wallet ? (
                <UserWallet wallets={[wallet]} />
              ) : (
                <button className="accent" onClick={connectHandler}>
                  Connect Wallet
                </button>
              )}
            </div> */}
            <button
              className={`createAccountButton ${
                privatePolicy && email && validation?.telegram
                  ? "createAccountButtonEnable"
                  : ""
              }`}
              onClick={confirmButton}
            >
              Create Account
            </button>
            <Link to="/">
              <button className="transparent">Back to main </button>{" "}
            </Link>
          </div>

          <MoldalFooter />
        </div>
      </div>
    </div>
  );
};

export default Signup;
