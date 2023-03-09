import React from "react";
import metamask from "../../assets/img/icons/MetaMask.svg";
import maiar from "../../assets/img/icons/Maiar.svg";
import { useSelector, useDispatch } from "react-redux";
import { withServices, ServiceContainer } from "hocs/withServices";
import { ReduxState } from "../../store/index";
import fabric from "../../store/models/user";
import { setModal, setUserData, setWallet } from "../../store/reducer/global";
import { ReactComponent as WalletIcon } from "../../assets/img/icons/teenyicons_wallet-alt-outline.svg";
import { useWeb3Modal } from "@web3modal/react";

type WalletListProps = {
  serviceContainer: ServiceContainer;
  close: () => void;
};

const WalletList = ({ serviceContainer, close }: WalletListProps) => {
  const { wallet, api } = serviceContainer;
  const dispatch = useDispatch();
  const { open } = useWeb3Modal();

  const { userData } = useSelector((state: ReduxState) => ({
    userData: state.global.userData,
  }));

  const preserve = async (account: any) => {
    if (account) {
      const wallet = {
        chain: account?.chain ? account?.chain : undefined,
        address: account?.address,
      };

      if (userData) {
        const updated = {
          ...userData,
          wallets: [...(userData.wallets || []), wallet],
        };

        const user = fabric(updated);
        await api.updateWallet(user, account);
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
    dispatch(
      setModal({
        type: "Success",
        wallet: account?.address,
      })
    );
  };

  const metaMaskHandler = async () => {
    const userAgent = navigator.userAgent;
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
      await open();
    } else {
      const account = await wallet.connectMetamask();
      preserve(account);
    }
  };

  const maiarHandler = async () => {
    const account = await wallet.connectMaiarExtension();
    preserve(account);
  };

  return (
    <>
      <WalletIcon className="walletIcon" />
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
    </>
  );
};

export default withServices(WalletList);
