import  {  useRef, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { Deck } from "../../components/lists/deck";

interface DeckSectionProps {
  serviceContainer: ServiceContainer
}

const DeckSection = (props: DeckSectionProps) => {
  
  const { serviceContainer } = props;
  const background = useRef(null);
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = document.getElementById("deckAnimation");
    animation?.classList.add("paused");
    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "deckContainer",
          urls: {
            desk: require("../../assets/img/home/goldenFog.png").default,
            /*mob: null && [
              require("../../assets/img/home/mob/mobThrone2.png").default,
              require("../../assets/img/home/mob/mobThrone3.png").default,
            ],*/
          },
        };
      }
    });
    serviceContainer.imageLoader.addRef(section, (visible) =>
      visible
        ? animation?.classList.remove("paused")
        : animation?.classList.add("paused")
    );
  }, [serviceContainer.imageLoader]);

  return (
    <section
      className="homeSection deckSection ghostBg"
      id="deckSection"
      ref={section}
    >
      <div
        className="sectionContainer deckContainer"
        id="deckContainer"
        ref={background}
      >
        <h3>ARE YOU READY?</h3>
        <h2>
          <span>Join the fight</span>
        </h2>
        <p>
          Be cunning, choose your strategy wisely, destroy your opponents and
          become the alpha leader. Do you have what it takes?
        </p>
        <button className="volButton">PLAY FOR FREE</button>

        <Deck />
      </div>
      <div className="ruggedLine"></div>
    </section>
  );
};

export default withServices(DeckSection);
