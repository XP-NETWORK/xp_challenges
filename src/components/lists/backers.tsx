import  {  useRef, useEffect } from "react";
import { backers } from "../../mockData";

import { withServices, ServiceContainer } from "../../hocs/withServices";

export interface IBacker {
  picUrl: string;
}

const Backer = ({ card, index }: { card: IBacker; index: number }) => {
  return (
    <div className="backersCard">
      <img src={card.picUrl} alt={`backer-card-${index}`} />
    </div>
  );
};

export const Backers = withServices((props) => {
  const data: IBacker[] = backers;

  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  const background = useRef(null);

  useEffect(() => {
    serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "aboutSection",
          urls: {
            desk: require("../../assets/img/home/AboutGhostBg.png").default,
          },
        };
      }
    });
  }, [serviceContainer.imageLoader]);

  return (
    <div className="flexRow">
      <div className="cardContainer" ref={background}>
        <div className="backersCards">
          {data.map((card, index) => (
            <Backer card={card} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
});
