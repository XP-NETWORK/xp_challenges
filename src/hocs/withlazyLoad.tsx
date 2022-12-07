import React, { useRef, useEffect } from "react";

import { withServices } from "./withServices";
import { withServicesProps } from "../pages/types";

import { ImageLoaderOptions, ImageLoader } from "../services/imageLoader";

import { ISection } from "../pages/types";

type withLazyLoadProps = withServicesProps & { mobile: boolean };

export const withLazyLoad =
  (Wrapped: React.FC<ISection>) =>
  (
    intersectionCallback: (intersected: boolean) => void,
    observerOptions?: ImageLoaderOptions
  ) =>
    withServices(function Callback(props: withLazyLoadProps) {
      const { serviceContainer, mobile } = props;
      const backgroundRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        let intersector: ImageLoader = serviceContainer?.imageLoader;
        if (observerOptions && !mobile) {
          intersector = intersector.createObserver(observerOptions);
        }

        intersector.addRef(backgroundRef, intersectionCallback, {
          observeLeave: true,
        });
      }, [serviceContainer?.imageLoader]);

      return <Wrapped backgroundRef={backgroundRef} mobile={props.mobile} />;
    });
