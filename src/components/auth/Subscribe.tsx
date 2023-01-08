import React from "react";

import subscribeIcon from "../../assets/img/subscribeIcon.png";

import { ReduxState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { withServices, ServiceContainer } from "hocs/withServices";
import { setModal } from "store/reducer/global";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const Subscribe = withServices(
  ({ serviceContainer }: { serviceContainer: ServiceContainer }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [notanemail, setFail] = React.useState(false);

    const { user, project } = useSelector((state: ReduxState) => ({
      user: state.global.userData,
      project: state.global.project,
    }));

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
      console.log(res, "res");
      if (res) {
        dispatch(setModal(undefined));
      }
    };

    return (
      <div className="subscribe">
        <img src={subscribeIcon} alt="subscribeIcon" />
        <h2>Stay up to date</h2>
        <p>Subscribe to XP.NETWORK news to complete the achievement</p>
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
      </div>
    );
  }
);
