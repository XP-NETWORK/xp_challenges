import { ServiceContainer } from "../hocs/withServices";

export interface ISection {
  mobile: boolean;
  backgroundRef: React.RefObject<HTMLDivElement>;
}

export type withServicesProps = {
  serviceContainer: ServiceContainer;
};
