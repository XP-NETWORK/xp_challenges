import { useEffect, useState, useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { ReduxState } from "../../store";

import { useWindowSize } from "../../hooks/useSize";

import Battlefield from "../../store/models/battlefield";

const battlefield = Battlefield();

const BattefieldBoard = () => {
  const [mainBgLoaded, setLoaded] = useState("");
  const { width } = useWindowSize();
  const isMobile = useMemo(() => Number(width) <= 480, [width]);

  const mechanicsCollection = battlefield.collectify(
    useSelector((state: ReduxState) => state.mechanics.items)
  );

  useEffect(() => {
    battlefield.load(isMobile).then(() => setLoaded("loaded"));
  }, [width]);

  const onHoverOn = useCallback(battlefield.hoverHandler(), [width]);
  const onHoverOff = useCallback(battlefield.hoverOffHandler(), [width]);

  const getText = (location: string) => {
    return (
      <div className="ghostTextWrapper felxCol">
        <h5>{mechanicsCollection[location]?.Location}</h5>
        <p>{mechanicsCollection[location]?.Text}</p>
      </div>
    );
  };

  const renderElement = (location: string) => {
    return <div className={`${location} boardBackground`}></div>;
  };

  const renderGhost = (location: string) => {
    return (
      <div
        className={`ghost ${location}`}
        onMouseEnter={
          isMobile ? () => undefined : (e) => onHoverOn(e, location)
        }
        onMouseLeave={
          isMobile ? () => undefined : (e) => onHoverOff(e, location)
        }
      >
        {getText(location)}
      </div>
    );
  };

  return (
    <div className="boardWrapper">
      <div className="battlefieldBoard">
        <div
          className={`battlefieldBackground boardBackground ${mainBgLoaded}`}
        ></div>
        {renderElement("Deployable Cards")}
        {renderElement("Deck")}
        {renderElement("Graveyard")}
        {renderElement("Turn Button & Score")}
        {renderElement("Leader Avatar")}
        {renderElement("Artillery Row")}
        {renderElement("Ranged Row")}
        {renderElement("Brawler Row")}
        {renderElement("Left Flank")}
        {renderElement("Right Flank")}
        {renderElement("War Machine")}
        {renderElement("Opponent Deployable Cards")}
        {renderElement("Opponent Deck")}
        {renderElement("Opponent War Machine")}
        {renderElement("Opponent Graveyard")}
        {renderElement("Opponent Leader Avatar")}
        {renderElement("Opponent Artillery Row")}
        {renderElement("Opponent Ranged Row")}
        {renderElement("Opponent Brawler Row")}
        {renderElement("Opponent Left Flank")}
        {renderElement("Opponent Right Flank")}

        <div className="ghosts">
          {renderGhost("Deployable Cards")}
          {renderGhost("Deck")}
          {renderGhost("Graveyard")}
          {renderGhost("Turn Button & Score")}
          {renderGhost("Leader Avatar")}
          {renderGhost("Artillery Row")}
          {renderGhost("Ranged Row")}
          {renderGhost("Brawler Row")}
          {renderGhost("Left Flank")}
          {renderGhost("Right Flank")}
          {renderGhost("War Machine")}
          {renderGhost("Opponent Deployable Cards")}
          {renderGhost("Opponent Deck")}
          {renderGhost("Opponent War Machine")}
          {renderGhost("Opponent Graveyard")}
          {renderGhost("Opponent Leader Avatar")}
          {renderGhost("Opponent Artillery Row")}
          {renderGhost("Opponent Ranged Row")}
          {renderGhost("Opponent Brawler Row")}
          {renderGhost("Opponent Left Flank")}
          {renderGhost("Opponent Right Flank")}
        </div>
      </div>
    </div>
  );
};

export default BattefieldBoard;
