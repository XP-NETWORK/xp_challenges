import React, { FC, useEffect } from "react";

import { withServices, ServiceContainer } from "../../hocs/withServices";

import { useDispatch } from "react-redux";

import { loadCards } from "../../store/reducer/cards";
import { loadMechanics } from "../../store/reducer/mechanics";

export const AppContainer = (App: FC) =>
  withServices(function Callback(props) {
    const { serviceContainer }: { serviceContainer: ServiceContainer } = props;
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
        const res = await serviceContainer.api.getCards();
        dispatch(
          loadCards({
            cards: res.cards,
            abilities: res.abilities,
          })
        );
        dispatch(
          loadMechanics({
            mechanics: res.mechanics,
          })
        );
      })();
    }, [serviceContainer.api]);

    return <App />;
  });
