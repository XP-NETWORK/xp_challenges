import React from "react";

import { ServiceConsumer } from "./ServcieProvder";

import { ImageLoader } from "../services/imageLoader";

export interface ServiceContainer {
  imageLoader: ImageLoader;
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
