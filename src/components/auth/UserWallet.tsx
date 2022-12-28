import React, { useState, useEffect, useCallback } from "react";

import Blockies from "react-blockies";

import { truncate } from "../../utils";

import { useDispatch } from "react-redux";
import { setModal } from "store/reducer/global";

const UserWallet = ({
  wallets,
}: {
  wallets: { chain: string; address: string }[];
}) => {
  const address = truncate(wallets?.at(0)?.address, 13) || "";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handler = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handler);
    return () => document.body.removeEventListener("click", handler);
  }, []);

  return (
    <div
      className={`userWalletWrapper ${show ? "showDD" : ""}`}
      onClick={(e) => {
        setShow(true);
        e.stopPropagation();
      }}
    >
      <div className="userWallet flexRow">
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
      </div>

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
      </div>
    </div>
  );
};

export default UserWallet;
