import React from "react";

import { ICard } from "../../../store/types";

import { useWindowSize } from "../../../hooks/useSize";

export const CardInfo = ({ card }: { card: ICard }) => {
  const { width } = useWindowSize();

  const mobile = Number(width) <= 480;

  return (
    <div className="deckCard-infoCard">
      {mobile && <div className="deckCard-infoCard-Close"></div>}
      <div className="deckCard-infoCard-textWrapper">
        {!mobile && <div className="deckCard-infoCard-Close"></div>}
        <h5>{card.Type}</h5>
        <h3>{card.Name_EN}</h3>
        <q>"{card.Quote_EN}"</q>
        <p>{card.Description_EN}</p>
        {card.Ability && (
          <>
            <div className="deckCard-infoCard-ability">
              Ability<b>:</b>
              <span>{card.Ability}</span>
              <div className="deckCard-infoCard-SpellPic">
                <div className={`cardSpellShutter ${card.Rarity || ""}`}>
                  <div
                    className={`cardSymbol spellSymbol ${card.Ability || ""}`}
                  ></div>
                </div>
              </div>
            </div>
            <p>{card.abilityData?.Description}</p>
          </>
        )}

        <div className="deckCard-infoCard-stats">
          <div className="level">
            Level<b>:</b>
            <span>1</span>
          </div>

          <div className="exp">
            XP<b>:</b>
            <span className="left">500</span> <b>/</b>
            <span className="right">500</span>
          </div>
        </div>

        <div className="deckCard-infoCard-rarity">
          Rarity<b>:</b>
          <span>{card.Rarity}</span>
        </div>
        <div className="deckCard-infoCard-dimonds">
          {[...new Array(9).keys()].slice(1).map((idx: number) => {
            return (
              <div className="dimondWrapper" key={`dimond-${idx}`}>
                <div
                  className={`powerDimond ${
                    idx <= card["Base Power"] ? "" : "empty"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
