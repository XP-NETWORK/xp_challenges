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
