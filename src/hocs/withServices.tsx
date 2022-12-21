import { FC } from "react";

import { ServiceConsumer } from "./ServcieProvder";

import { ImageLoader } from "../services/imageLoader";
import { Api } from "../services/api";
import { TelegramService } from "../services/telegram";
import { Socket } from "../services/socket";

export interface ServiceContainer {
  imageLoader: ImageLoader;
  api: Api;
  telegram: TelegramService;
  socketWrapper: Socket;
}

const withServices = (Wrapped: FC<any>) => {
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
