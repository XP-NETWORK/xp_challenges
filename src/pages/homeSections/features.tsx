import React from "react";

import { ITextBlock } from "../../components/elements/textBlock";

import { FeatureCarousel } from "../../components/elements/carousels/featureCarousel";
import { SliderCards } from "../../components/lists/sliderCards";
import { FeatureTemplate } from "../../components/elements/feature";

import { features } from "../../mockData";

import { ISection } from "../types";

import { withLazyLoad } from "../../hocs/withlazyLoad";

export interface IWiki extends ITextBlock {}

interface IFeatureSection extends ISection {}

const FeatureSection = (props: IFeatureSection) => {
  const { mobile, backgroundRef } = props;

  const clickHandler = () => {
    console.log("d");
    const shine = backgroundRef.current?.querySelector(
      ".shineContainer"
    ) as HTMLDivElement;

    shine.classList.add("activeAnimation");
  };

  return (
    <section
      className="homeSection featureSection ghostBg"
      ref={backgroundRef}
      onClick={clickHandler}
    >
      <div className="sectionContainer featuresContainer">
        <h2>
          <span>FEATURES</span>
        </h2>
        {mobile && <FeatureCarousel features={features} />}
        <SliderCards cards={features}>
          <FeatureTemplate />
        </SliderCards>
      </div>
      <div className="ruggedLine"></div>
    </section>
  );
};

export default withLazyLoad(FeatureSection as React.FC)(
  (intersected) => {
    const furtherArrow = document.querySelector(
      "body main .further"
    ) as HTMLImageElement;

    const scrollUpArrow = document.querySelector(
      "footer .scrollUp"
    ) as HTMLImageElement;

    if (intersected || window.scrollY > 1000) {
      furtherArrow.style.display = "none";
      scrollUpArrow.classList.add("vis");
    } else {
      furtherArrow.style.display = "block";
      scrollUpArrow.classList.remove("vis");
    }
  },
  {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0,
  }
);
