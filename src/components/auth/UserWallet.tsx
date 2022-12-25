import React from "react";

import Blockies from "react-blockies";

import { truncate } from "../../utils";

const UserWallet = ({
  wallets,
}: {
  wallets: { chain: string; address: string }[];
}) => {
  const address = truncate(wallets?.at(0)?.address, 13) || "";
  console.log("ds");
  const showDropDown = wallets.length > 1;

  return (
    <div className={`userWalletWrapper ${showDropDown ? "showDD" : ""}`}>
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
      </div>
    </div>
  );
};

export default UserWallet;
