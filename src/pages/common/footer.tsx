import { useRef, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

//import { useWindowSize } from "../../hooks/useSize";

const Footer = (props: any) => {
  const { serviceContainer }: { serviceContainer: ServiceContainer } = props;

  //const { width } = useWindowSize();

  useEffect(() => {
    /*serviceContainer.imageLoader.addRef(background, (load) => {
      if (load) {
        return {
          id: "footer",
          urls: {
            desk: require("../../assets/img/home/footerGhostBg.png").default,
            mob: [require("../../assets/img/home/mob/footerBgMob.png").default],
          },
        };
      }
    });*/
  }, [serviceContainer.imageLoader]);

  const background = useRef(null);

  return <footer className="footer" ref={background} id="footer"></footer>;
};

export default withServices(Footer);
