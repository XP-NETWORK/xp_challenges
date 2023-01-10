/* eslint-disable @typescript-eslint/ban-ts-comment  */

/* eslint-disable no-constant-condition  */

/* eslint-disable @typescript-eslint/no-unused-vars  */

import React, { useEffect } from "react";

import subscribeIcon from "../../assets/img/subscribeIcon.png";

import { ReduxState } from "../../store";
import { useSelector } from "react-redux";
import { withServices, ServiceContainer } from "hocs/withServices";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const Subscribe = withServices(
  ({ serviceContainer }: { serviceContainer: ServiceContainer }) => {
    const [email, setEmail] = React.useState("");
    const [notanemail, setFail] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [confirmed, setConfirm] = React.useState(false);

    const { user, project, justCompleted } = useSelector(
      (state: ReduxState) => ({
        user: state.global.userData,
        project: state.global.project,
        justCompleted: state.global.justCompleted,
      })
    );

    useEffect(() => {
      return () =>
        document.querySelector(".small-modal")?.classList.remove("confirmed");
    }, []);

    useEffect(() => {
      if (justCompleted.includes(17)) {
        setConfirm(true);
      }
    }, [justCompleted]);

    useEffect(() => {
      if (confirmed) {
        document.querySelector(".small-modal")?.classList.add("confirmed");
      }
    }, [confirmed]);

    const subscribeHandler = async () => {
      if (!validateEmail(email)) {
        return setFail(true);
      }
      setFail(false);
      const res =
        user &&
        project &&
        (await serviceContainer.api.sendEmail(
          email,
          user,
          project.projectNumber
        ));

      if (res) {
        setSuccess(true);
        //dispatch(setModal(undefined));
      }
    };

    const content = !confirmed ? (
      <div className="subscribe">
        <img src={subscribeIcon} alt="subscribeIcon" />
        {success ? <h2>Thank you!</h2> : <h2>Stay up to date</h2>}
        {success ? (
          <p>
            A magic link has been sent to your email to confirm your email
            address
          </p>
        ) : (
          <p>Subscribe to XP.NETWORK news to complete the achievement</p>
        )}
        {!success && (
          <div className={`inputWrapper flexRow ${notanemail ? "failed" : ""}`}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={subscribeHandler}>Subscribe</button>
            <span>Not an email</span>
          </div>
        )}
      </div>
    ) : (
      <div className="subscribeConfirm">Email confirmed</div>
    );

    return content;
  }
);
