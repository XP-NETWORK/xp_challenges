import React from "react";

import metamask from "../../assets/img/icons/MetaMask.svg";
import maiar from "../../assets/img/icons/Maiar.svg";

import { useSelector, useDispatch } from "react-redux";
import { withServices, ServiceContainer } from "hocs/withServices";

import { ReduxState } from "../../store/index";

import fabric from "../../store/models/user";

import { setModal, setUserData, setWallet } from "../../store/reducer/global";

type WalletListProps = {
  serviceContainer: ServiceContainer;
  close: () => void;
};

const WalletList = ({ serviceContainer, close }: WalletListProps) => {
  const { wallet, api } = serviceContainer;
  const dispatch = useDispatch();

  const { userData } = useSelector((state: ReduxState) => ({
    userData: state.global.userData,
  }));

  const preserve = (account: any) => {
    if (account && account.chain) {
      const wallet = {
        chain: account.chain,
        address: account.address,
      };

      if (userData) {
        const updated = {
          ...userData,
          wallets: [...(userData.wallets || []), wallet],
        };

        const user = fabric(updated);
        api.updateWallet(user, account);
        dispatch(setUserData({ userData: updated }));
      } else {
        dispatch(setWallet(wallet));
      }
    } else {
      dispatch(
        setModal({
          type: "Error",
          text: "Wrong network selected",
        })
      );
    }

    close();
  };

  const metaMaskHandler = async () => {
    const account = await wallet.connectMetamask();
    preserve(account);
  };

  const maiarHandler = async () => {
    const account = await wallet.connectMaiarExtension();
    preserve(account);
  };

  return (
    <ul>
      <li onClick={metaMaskHandler}>
        <img src={metamask} alt="metamask" />
        <span>MetaMask</span>
      </li>
      <li onClick={maiarHandler}>
        <img src={maiar} alt="maiar" />
        <span>Maiar</span>
      </li>
    </ul>
  );
};

export default withServices(WalletList);
