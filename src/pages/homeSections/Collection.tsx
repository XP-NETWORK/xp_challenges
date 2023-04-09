/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-constant-condition   */
/* eslint-disable @typescript-eslint/ban-ts-comment   */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "store/reducer/global";
import { importAll } from "../../utils";
import { ReduxState } from "store";
import { NFT } from "store/types";

const Collection = () => {
  const [pics, setPics] = useState<NFT[]>([]);

  const { telegramUser, project } = useSelector((state: ReduxState) => ({
    telegramUser: state.global.telegramUser,
    project: state.global.project,
  }));

  useEffect(() => {
    //@ts-ignore
    const images: string[] = importAll(
      //@ts-ignore
      require.context("../../assets/img/nfts", false, /\.(png|jpe?g|svg)$/)
    );
    const dublicate: string[] = [];

    setPics(
      project
        ? project?.nfts?.filter((item: NFT) => {
            if (dublicate?.includes(item.name)) return false;
            dublicate?.push(item.name);
            return true;
          })
        : [
            {
              name: "sample",
              image: "",
            },
          ]
    );
  }, [project]);

  const dispatch = useDispatch();

  return (
    <div className="collection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="collectionHeader">Collection</h2>
            <p>Try to complete all the tasks</p>
            {!telegramUser?.telegramUsername && (
              <button
                className="secondary newBackground"
                onClick={() => {
                  dispatch(
                    setModal({
                      type: "TelegramAuth",
                    })
                  );
                }}
              >
                Get started
              </button>
            )}
            <div className="row">
              {pics.map((pic, index) => {
                return (
                  <div
                    key={`collection-${index}`}
                    className="collection-item col-12 col-md-6 col-lg-4 col-xl-3"
                  >
                    <div className="picWrapper">
                      <img src={pic.image} alt={`collection-${index}`} />
                      <span>{project ? pic.name : "@tyshh"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
