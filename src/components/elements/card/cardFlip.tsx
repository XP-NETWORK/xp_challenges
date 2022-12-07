import React, { ReactChild, ReactChildren } from "react";

type CardFlipProps = {
  children: ReactChild[] | ReactChildren[];
};

export const CardFlip = (props: CardFlipProps) => {
  return (
    <div className="cardFlip">
      <div className="cardFlip-inner">
        <div className="front">{props.children}</div>
        <div className="back"></div>
      </div>
    </div>
  );
};
