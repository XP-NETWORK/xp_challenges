import React from "react";

import { ServiceConsumer } from "./ServcieProvder";

import { Api } from "../services/api";
import { ImageLoader } from "../services/imageLoader";
import { DeckAnimator } from "../services/deckAnimator";


export interface ServiceContainer {
  api: Api;
  imageLoader: ImageLoader;
  deck: DeckAnimator
}

const withServices = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {({ serviceContainer, setContainer }: any) => (
        <Wrapped
          {...props}
          serviceContainer={serviceContainer}
          setContainer={setContainer}
        />
      )}
    </ServiceConsumer>
  );
};

export { withServices };
