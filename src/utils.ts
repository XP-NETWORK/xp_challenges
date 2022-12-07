import { ICard, CardType } from "./store/types";

export const debounce = (cb: (...args: any) => void, delay: number) => {
  let tm: any;

  return (...args: any) => {
    tm && clearTimeout(tm);
    tm = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export const scrollToTheTop = () =>
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);

const frames: {
  [key: string]: string;
} = {};

export const getFrameType = async (card: ICard) => {
  let path = "";

  switch (card.Type) {
    case CardType.Conjured: {
      path = `${card.Type}/${card.Faction}`;

      break;
    }

    default: {
      path = `${card.Type}/${card.Faction}/${card.Rarity}`;
    }
  }

  if (path.indexOf("undefined") > -1) return;

  if (frames[path]) return frames[path];

  return await new Promise((resolve) =>
    import("./assets/img/lists/frames/" + path + ".png")
      .then((image: any) => {
        frames[path] = image.default;
        resolve(image.default);
      })
      .catch((error: any) => {
        console.log(error);
        resolve(undefined);
      })
  );
};

export const getCardOffset = () => {
  switch (true) {
    case window.innerWidth < 1425: {
      return "15";
    }
    case window.innerWidth < 1215: {
      return "2";
    }
    default:
      return "30";
  }
};

export function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);

export const sleep = (tm: number) =>
  new Promise((r) => setTimeout(r, tm * 1000));
