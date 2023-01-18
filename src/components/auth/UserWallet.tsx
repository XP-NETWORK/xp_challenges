import React, { useState, useEffect, useCallback } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { truncate } from "../../utils";
import { /*useDispatch,*/ useSelector } from "react-redux";
//import { setModal } from "store/reducer/global";
import { ReduxState } from "store";

const UserWallet = () => {
  const userData = useSelector((state: ReduxState) => state.global.userData);

  const wallets = userData?.wallets;

  const fullAddress = wallets?.at(0)?.address;
  const address = truncate(fullAddress, 14) || "";
  const [show, setShow] = useState(false);
  //const dispatch = useDispatch();

  const handler = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handler);
    return () => document.body.removeEventListener("click", handler);
  }, []);

  return (
    <div className={`userWalletWrapper ${show ? "showDD" : ""}`}>
      <div className="userWallet flexRow">
        <span>{address.toLocaleLowerCase()}</span>
        {fullAddress && (
          <Jazzicon diameter={22} seed={jsNumberForAddress(fullAddress)} />
        )}
        {/*<Blockies
          seed={address}
          size={10}
          scale={3}
          color="#e92163"
          bgColor="#1d0e0e"
          spotColor="#47fb00"
          className="identicon"
    />*/}
      </div>
      {/*
      <div className="userWallet-dropdown">
        <ul>
          {wallets.slice(1).map((wallet, index) => {
            const address = truncate(wallet.address, 13) || "";
            return (
              <li key={wallet.chain + index} className="userWalletItem">
                <span>{address}</span>
                <Blockies
                  seed={address}
                  size={10}
                  scale={3}
                  color="#e92163"
                  bgColor="#1d0e0e"
                  spotColor="#47fb00"
                  className="identicon"
                />
              </li>
            );
          })}
        </ul>
       {false && <button
          className="accent"
          onClick={() => {
            dispatch(
              setModal({
                type: "WalletList",
                text: "Connect new Wallet",
              })
            );
          }}
        >
          Add wallet
        </button>}
        </div>*/}
    </div>
  );
};

export default UserWallet;
