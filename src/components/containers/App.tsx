import React, { FC, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

//import { useDispatch } from "react-redux";

export const AppContainer = (App: FC) =>
  withServices(function Callback(props) {
    const { serviceContainer }: { serviceContainer: ServiceContainer } = props;
    console.log(serviceContainer, "serviceContainer");
    //const dispatch = useDispatch();

    useEffect(
      () => {
        (async () => null)();
      },
      [
        /*serviceContainer.api*/
      ]
    );

    return <App />;
  });
