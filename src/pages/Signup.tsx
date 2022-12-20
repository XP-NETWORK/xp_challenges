import React from "react";

import TelegramLogin from "components/auth/TelegramLogin";
import MoldalFooter from "./common/modalFooter";

import { Link } from "react-router-dom";

import { SignUpProps } from "../components/containers/Signup";

const Signup = ({ state, validation, signup, formHandler }: SignUpProps) => {
  const { email, newsletter, privatePolicy } = state;

  return (
    <div className="signupPage">
      <div className="container">
        <div className="signupPage-container">
          <div className="accountWrapper">
            <h2>Sign up</h2>

            <TelegramLogin />
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
              <label htmlFor="">I want to receive newslatters</label>
            </div>
            <div
              className={`withError ${
                validation.privatePolicy.failedValid ? "active" : ""
              }`}
            >
              <div className="flexRow">
                <div
                  className={`checkBoxWrapper ${
                    privatePolicy ? "checked" : ""
                  }`}
                  onClick={() => formHandler(!privatePolicy, "privatePolicy")}
                >
                  <input type="checkbox" />
                </div>
                <label htmlFor="">
                  I agree to the Terms fo Use and Privacy Policy
                </label>
              </div>
              <div className="errorMessage">
                {validation.privatePolicy.text}
              </div>
            </div>

            <button className="accent">Connect Wallet</button>
            <button className="secondary" onClick={signup}>
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
