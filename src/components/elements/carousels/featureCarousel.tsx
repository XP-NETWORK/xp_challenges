import React from "react";
import { withAliceCarousel } from "../../../hocs/withCarousel";
import { IFeatureCard } from "../feature";

import pad from "../../../assets/img/home/mob/woodenPad1.png";

const Feature = ({ feature }: { feature: IFeatureCard }) => {
  return (
    <div className="mobileFeature">
      <img src={pad} alt="wPad" className="woodenPad" />
      <img
        src={feature.picUrl}
        alt={`mobileFeature-${feature.title}`}
        className="mobileFeature-pic"
      />
      <div className="cardText">
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
        <a href={feature.link}>Learn More</a>
      </div>
    </div>
  );
};

export const FeatureCarousel = ({ features }: { features: IFeatureCard[] }) => {
  return (
    <>
      {withAliceCarousel(
        features.map((feature, index) => (
          <Feature feature={feature} key={`FeatureMob-${index}`} />
        )),
        {
          paddingLeft: 40,
          paddingRight: 40,
          autoPlay: false,
        }
      )}
    </>
  );
};
