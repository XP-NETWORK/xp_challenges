import React, { useEffect } from "react";
import { SliderCards } from "../components/lists/sliderCards";
import { Introductions } from "../components/lists/introduction";
import { Mechanics } from "../components/lists/mechanics";
import { Factions } from "../components/lists/factions";
import { World } from "../components/lists/world";
import { AlliesCards } from "../components/lists/allies";
import { Backers } from "../components/lists/backers";

import { TestimonialTemplate } from "../components/elements/testimonial";
import { VolButton } from "../components/elements/misc";

import bigLogo from "../assets/img/icons/bigLogo.png";
import further from "../assets/img/icons/goDown.png";

import { testimonials } from "../mockData";

import { useWindowSize } from "../hooks/useSize";

import { TestimonialCarousel } from "../components/elements/carousels/testimonialCarousel";

import WikiSection from "./homeSections/wiki";
import DeckSection from "./homeSections/deck";
import FeatureSection from "./homeSections/features";

import Header from "./common/header";
import Footer from "./common/footer";

import logoA from "../assets/img/logoA.webm";
import logoMP4 from "../assets/img/logoMP4.mp4";

import { iOS, isSafari } from "../utils";

const Home = () => {
  const { width } = useWindowSize();
  const mobile = Number(width) <= 800;

  const isIOS = iOS();

  useEffect(() => {
    setTimeout(() => {
      const doc = document.documentElement;
      const scroll =
        (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      if (scroll > 700) {
        const furtherArrow = document.querySelector(
          "body main .further"
        ) as HTMLImageElement;
        furtherArrow.style.display = "none";
      }
    }, 1000);
  }, []);

  return (
    <div className="homePage noselect">
      <Header />
      <main>
        <div className="further">
          <img src={further} alt="further" />
          <img src={further} alt="further" />
          <img src={further} alt="further" />
        </div>
        <section className={`homeSection mainSection ghostBg noselect`}>
          <div className="textComposition ">
            <div className="container">
              <div className="welcomePart flexCol">
                {isSafari || isIOS ? (
                  <img src={bigLogo} alt="bigLogo" className="mainLogo" />
                ) : (
                  <video autoPlay muted loop playsInline>
                    <source src={logoMP4} type="video/quicktime" />
                    <source src={logoA} type="video/webm" />
                  </video>
                )}

                {/*false && <video
                  preload="yes"
                  autoPlay
                  playsInline
                  muted
                  loop
                  width="100%"
                  height="auto"
       
                >
          
                  <source src={vd} type='video/webm;codecs="vp8, vorbis"' />
                </video>*/}

                <h1>JOIN THE EPIC BATTLE</h1>
                <p>
                  Dfiance is a fantasy PVP strategy card game powered by
                  blockchain technology
                </p>
                <VolButton />
              </div>
            </div>
          </div>

          <div className="bgEffect"></div>
          <div className="bgEffect bgEffect2"></div>
        </section>

        <FeatureSection mobile={mobile} />

        <section
          className="homeSection introductonSection ghostBg"
          id="introductonSection"
        >
          <div className="sectionContainer introductonsContainer">
            <h2>
              {mobile ? (
                <span className="double">
                  INTRODUCTION <br /> TO THE GAME
                </span>
              ) : (
                <span>INTRODUCTION TO THE GAME</span>
              )}
            </h2>
            <div className="container">
              <Introductions />
            </div>
          </div>
          <div className="ruggedLine"></div>
        </section>

        <section
          className="homeSection mechanicSection ghostBg"
          id="mechanicSection"
        >
          <div className="sectionContainer mechanicsContainer">
            <h2>
              <span>Game mechanics</span>
            </h2>
            <p>
              Collect rare cards, build your deck and dominate the battlefield
            </p>
            <Mechanics />
          </div>
        </section>
        <span id="mechanicSectionAnchor"></span>

        <section
          className="homeSection factionSection ghostBg"
          id="factionSection"
        >
          <div className="sectionContainer factionContainer">
            <h3>3 unique factions</h3>
            <h2>
              <span>FACTION INTRODUCTION</span>
            </h2>
            <p>Who will YOU fight for?</p>

            <Factions />
          </div>
          <span id="factionSectionAnchor"></span>
        </section>

        <section className="homeSection worldSection ghostBg" id="worldSection">
          <div className="sectionContainer worldContainer">
            <h3>A new world</h3>
            <h2>
              <span>EXPLORE EPHEMERIA</span>
            </h2>
            <div className="container">
              <World />
            </div>
          </div>
        </section>

        <section className="homeSection alliesSection">
          <div className="sectionContainer alliesContainer">
            <h3>Choose your ALLIES</h3>
            <h2>
              <span>
                Guilds, Tournaments <br></br> &#38; Guild Wars{" "}
              </span>
            </h2>

            <div className="alliesCradsWrapper ghostBg" id="alliesSection">
              <div className="decorHor"> </div>
              <div className={mobile ? "" : "container"}>
                <AlliesCards />
              </div>
            </div>
          </div>
        </section>

        <section className="homeSection communitySection">
          <div className="sectionContainer communityContainer">
            <h3>We value your opinion</h3>

            <h2>
              {!mobile ? (
                <span>
                  COMMUNITY TALKS<br></br> ABOUT THE GAME
                </span>
              ) : (
                <span>
                  COMMUNITY <br></br> TALKS ABOUT <br></br> THE GAME
                </span>
              )}
            </h2>

            {mobile && <TestimonialCarousel testimonials={testimonials} />}
            <SliderCards cards={testimonials}>
              <TestimonialTemplate />
            </SliderCards>
          </div>
        </section>

        <WikiSection />
        <span id="communitySectionAnchor"></span>

        {false && (
          <section
            className="homeSection aboutSection ghostBg"
            id="aboutSection"
            style={{ display: "none" }}
          >
            <div className="sectionContainer aboutContainer">
              <h3>ABOUT US</h3>
              <h2>
                <span>IN THE MEDIA</span>
              </h2>
              <Backers />
            </div>
          </section>
        )}

        <DeckSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
