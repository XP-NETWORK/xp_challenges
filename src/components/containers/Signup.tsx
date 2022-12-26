import React, { useState, useEffect } from "react";

import { SignupState, SignupValidation, TelegramUser } from "../../store/types";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../store";
import userFabric, { IWallet, User } from "store/models/user";
import { useNavigate } from "react-router";

import { withServices, ServiceContainer } from "hocs/withServices";
import { setModal } from "store/reducer/global";

const initState: SignupState = {
  telegram: undefined,
  email: "",
  newsletter: false,
  privatePolicy: false,
};

const initValid: SignupValidation = {
  telegram: {
    failedValid: false,
    text: "You have to Log in with Telegram",
  },
  email: {
    failedValid: false,
    mondatoryIf: "newsletter",
    text: {
      dublicate: "Dublicate Email",
      notemail: "Not an email",
      empty: "You have to write email if you want to receive newslatters",
    },
  },
  privatePolicy: {
    failedValid: false,
    text: "You have to check that field in order to proceed",
  },
};

export type SignUpProps = {
  telegramUser: TelegramUser | undefined;
  signup: () => void;
  state: SignupState;
  validation: SignupValidation;
  formHandler: (value: any, key: keyof SignupState) => void;
  connectHandler: () => void;
  wallet: IWallet | undefined;
};

type ContainerProps = {
  serviceContainer: ServiceContainer;
};

function Container(SignUp: React.FC<SignUpProps>) {
  function CB(props: ContainerProps) {
    const {
      serviceContainer: { api },
    } = props;
    const { telegramUser, wallet } = useSelector((state: ReduxState) => ({
      telegramUser: state.global.telegramUser,
      wallet: state.global.wallet,
    }));

    const dispatch = useDispatch();

    const [state, setState] = useState(initState);
    console.log(state,'state');
    const [validation, setValidation] = useState(initValid);

    const navigate = useNavigate();

    //handlers
    const formHandler = (value: any, key: keyof SignupState) =>
      setState({
        ...state,
        [key]: value,
      });

    const createAccountHandler = async () => {
      const data = (await validate()) as SignupValidation;

      if (
        Object.keys(data).every(
          (key) => data[key as keyof SignupValidation].failedValid === false
        ) &&
        telegramUser
      ) {
        const user = userFabric(User.getObject(telegramUser, state, wallet));
        const result = await api.signup(user);

        if (result) {
          navigate("/");
        }
      }
    };

    const validate = async () => {
      let result: SignupValidation | undefined;

      const signupstate = state;
      //validate fields

      for (const _ in validation) {
        const field = _ as keyof SignupValidation;

        const mandatoryIf = validation[field].mondatoryIf;

        const bool = Boolean(signupstate[field]);

        await new Promise((r) => {
          setValidation((state) => {
            result = {
              ...state,
              [field]: {
                ...state[field],
                failedValid: !mandatoryIf
                  ? !bool
                  : signupstate[mandatoryIf]
                  ? !bool
                  : false,
              },
            };
            r(true);
            return result;
          });
        });
      }

      return result;
    };

    //effects
    useEffect(() => {
      if (telegramUser) {
        formHandler(telegramUser, "telegram");
        setValidation((state) => ({
          ...state,
          telegram: {
            ...state.telegram,
            failedValid: false,
          },
        }));
      }
    }, [telegramUser]);

    return (
      <SignUp
        telegramUser={telegramUser}
        wallet={wallet}
        formHandler={formHandler}
        signup={createAccountHandler}
        state={state}
        validation={validation}
        connectHandler={() =>
          dispatch(
            setModal({
              type: "WalletList",
              text: "Connect your Wallet",
            })
          )
        }
      />
    );
  }

  return withServices(CB);
}

export default Container;
