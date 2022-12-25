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

//decorator for timeout between function call
export const throttle = (func: any, timeout: number) => {
  let tm: any = undefined;
  return (...args: any) => {
    if (tm) return;
    func(...args);
    tm = setTimeout(() => clearTimeout(tm), timeout);
  };
};

export const truncate = function(
  fullStr: string | undefined,
  strLen: number,
  separator?: string
) {
  if (!fullStr) return;
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  const sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
};
