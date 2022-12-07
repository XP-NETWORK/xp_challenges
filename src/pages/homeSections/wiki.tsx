import { useRef, useEffect, useState } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { ITextBlock, TextBlock } from "../../components/elements/textBlock";

import { wiki } from "../../mockData";

import { sleep, iOS } from "../../utils";

export interface IWiki extends ITextBlock {}

const WikiSection = (props: any) => {
  const [animUrl, setUrl] = useState("");

  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;
  const noVideo =
    iOS() || /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(background, async (load) => {
      if (load) {
        const src = require("../../assets/img/wikia.webm")?.default;
        if (!noVideo) {
          const video = document.createElement("video");
          video.addEventListener("canplay", () => {
            setUrl(src);
          });
          video.addEventListener("error", (e) => {
            console.log(e, "error");
          });
          video.src = src;
          video.load();

          await sleep(3);
        }

        return {
          id: "wikiSection",
          urls: {
            desk: require("../../assets/img/home/wikia.png").default,
            mob: null && [
              require("../../assets/img/home/mob/mobThrone2.png").default,
              require("../../assets/img/home/mob/mobThrone3.png").default,
            ],
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  const background = useRef(null);

  return (
    <section
      className="homeSection wikiSection"
      id="wikiSection"
      ref={background}
    >
      <div className="sectionContainer wikiContainer">
        <h3>Find out more</h3>
        <h2>
          <span>dfiance wiki</span>
        </h2>

        <div className="container ">
          <div className={`bookBg ${noVideo ? "" : "ios"}`}>
            {animUrl && (
              <video playsInline autoPlay muted loop className="wikiAnim">
                <source src={animUrl} />
              </video>
            )}

            <div className="cardText">
              <TextBlock card={wiki} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withServices(WikiSection);
