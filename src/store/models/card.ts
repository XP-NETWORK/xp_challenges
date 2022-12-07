/* eslint-disable no-case-declarations, @typescript-eslint/no-unused-vars, no-var, @typescript-eslint/ban-ts-comment */
import { IDeckCard } from "../../components/lists/deck";
import { DeckAnimator } from "../../services/deckAnimator";

import { getCardOffset, debounce } from "../../utils";

//let prevOffset: number | undefined = undefined;

function convertToAngle(matrix: string) {
  var values = matrix.split("(")[1],
    values = values.split(")")[0],
    //@ts-ignore
    values = values.split(",");

  const sin = values[1]; // 0.5

  return Math.round(Math.asin(+sin) * (180 / Math.PI));
}

const moveHandler = (_angle: number) =>
  debounce(function (e: MouseEvent) {
    const box = document.getElementById("deckAnimation") as HTMLDivElement;
    const wrapper = box.parentElement as HTMLDivElement;
    const boxBoundingRect = box.getBoundingClientRect();

    const boxCenter = {
      x: boxBoundingRect.left + boxBoundingRect.width / 2,
      y: boxBoundingRect.top + boxBoundingRect.height / 2,
    };

    const angle = Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y));

    const intPart = Math.trunc(angle);

    const newAngle = _angle + angle;

    console.log(_angle, angle);
    box.style.transform = `translateX(-50%) rotate(${_angle}deg)`;
    box.style.animation = "none";
    box.style.transform = `translateX(-50%) rotate(${newAngle}deg) `;
  }, 3);

class DeckCard {
  data: IDeckCard;
  element: HTMLElement;
  rx = 0;
  cb: EventListenerOrEventListenerObject | undefined;

  constructor(card: IDeckCard, element: HTMLElement) {
    this.data = card;

    this.element = element;
  }

  leftMouseUp(element: HTMLDivElement) {
    return () => {
      //prevOffset = undefined;
      element.classList.remove("dragOn");

      this.cb && element.removeEventListener("mousemove", this.cb);
    };
  }

  leftMouseDown(element: HTMLDivElement) {
    return () => {
      element?.classList.remove("popOut");
      //const deck = document.getElementById("deckAnimation") as HTMLDivElement;
      element.classList.add("dragOn");

      const box = document.getElementById("deckAnimation") as HTMLDivElement;
      const matrix = getComputedStyle(box).getPropertyValue("transform");
      const currenAngle = convertToAngle(matrix);

      this.cb = moveHandler(currenAngle);

      element.addEventListener("mousemove", this.cb);
    };
  }

  setRx(rx: number) {
    this.rx = rx;
  }

  positionSelf(rx: number, mobile: boolean) {
    const styles = this.element?.style;

    styles && (styles.top = rx - this.data.coord!.yCoord + "px");
    styles &&
      (styles.left =
        rx * (mobile ? 1.015 : 1.006) + this.data.coord!.xCoord + "px");
    styles && (styles.transform = `rotate(${this.data.coord?.angle}deg)`);

    styles && (styles.zIndex = String(this.data.coord?.zCoord));
  }

  enterHandler(deckAnimation: DeckAnimator) {
    return () => {
      const frames = `
        
      @keyframes popOut {
        from {
          
          
          transform: rotate(${
            this.data.coord?.angle
          }deg) scale(0.95) translateY(0);
        }
        to {
          transform: rotate(${
            this.data.coord?.angle
          }deg) scale(1.05) translateY(-${getCardOffset()}%);
          
          z-index: 999;
          
        }
  
      }
      `;

      document.getElementById("dynamicFrames")?.remove();
      const _s = document.createElement("style");
      _s.id = "dynamicFrames";
      _s.innerHTML = frames;
      document.head.appendChild(_s);
      this.element?.classList.add("popOut");

      deckAnimation.stopDeckAnimation();
    };
  }

  leaveHandler(deckAnimation: DeckAnimator) {
    return () => {
      //false &&
      this.element?.classList.remove("popOut");

      deckAnimation.startDeckAnimation();
    };
  }

  rightClickCancel(deckAnimation?: DeckAnimator) {
    const deck = typeof deckAnimation !== "undefined";
    document.body.classList.remove("freezeBodyScroll");

    document
      .querySelectorAll("#portal .deckCard-infoCard-Close")
      .forEach((el: Element) => {
        const new_element = el.cloneNode(true);
        el.parentNode?.replaceChild(new_element, el);
      });

    document.getElementById("portal")?.classList.remove("active");
    document
      .querySelector(`#portal ${deck ? ".deckCard" : ".unitCard"}`)
      ?.remove();

    deck && this.positionSelf(this.rx, window.innerWidth <= 800);

    this.element.style.display = deck ? "block" : "flex";
    this.element?.classList.remove("menuOpen");
    deckAnimation?.startDeckAnimation(true);
  }

  rightClickHandler(
    { yOffset }: { yOffset: number },
    deckAnimation?: DeckAnimator
  ) {
    const mobile = window.innerWidth <= 800;
    return async (e: Event) =>
      new Promise((r) => {
        this.element?.classList.add("menuOpen");
        //this.data.coord?.zCoord
        const infoElement = this.element?.querySelector(
          ".deckCard-infoCard"
        ) as HTMLDivElement;
        if (infoElement) {
          infoElement.style.zIndex = "-1";
          this.element.style.top = "";
          this.element.style.left = "";
          this.element.style.transform = "";
          const cloneCard = this.element.cloneNode(true) as HTMLDivElement;
          this.element.style.display = "none";
          cloneCard.style.left = mobile ? "0" : "50%";
          cloneCard.style.right = mobile ? "0" : "";
          cloneCard.style.top = mobile ? "" : "50%";
          cloneCard.style.transform = mobile
            ? ""
            : `translate(-162%, -${yOffset}%) rotate(0deg)`;

          cloneCard.classList.remove("popOut");
          document.getElementById("portal")?.appendChild(cloneCard);
          document.getElementById("portal")?.classList.add("active");

          document
            .querySelectorAll("#portal .deckCard-infoCard-Close")
            .forEach((el) => {
              const div = el as HTMLDivElement;
              div.addEventListener("click", (e) => {
                if (e.target !== div) return;
                e.stopPropagation();
                this.rightClickCancel(deckAnimation);
                r(true);
                //mobile && document.getElementById("deckCards")?.scrollIntoView();
              });
            });

          deckAnimation?.stopDeckAnimation(true);
          mobile && document.body.classList.add("freezeBodyScroll");
        }
        e.preventDefault();
      });
  }

  loadVideo(video: HTMLVideoElement) {
    const animSrc = this.data["Animation File"];

    return {
      onload: () => {
        this.element.style.display = "none";
        console.log("loadeddata");
        const parent = this.element.parentElement;
        parent
          ?.querySelectorAll("div.videoContainer")
          .forEach((el) => el.remove());

        //const video = document.createElement("video");
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const container = document.createElement("div");
        container.classList.add("videoContainer");
        const source = document.createElement("source");
        source.src = animSrc;
        source.type = "video/mp4";
        video.appendChild(source);

        container.appendChild(video);
        parent?.appendChild(container);
        video.play();
        setTimeout(() => video.classList.add("loadedImage"), 350);
        //video.classList.add("loadedImage");
      },
      onerror: (e: any) => {
        console.log(e.message, "e");
        this.element.style.display = "initial";
      },
      load: (video: HTMLVideoElement) => {
        console.log(animSrc, "animSrc");
        video.setAttribute("src", animSrc);
        video.load();
      },
    };
  }
}

export const deckCardFabric = (card: IDeckCard, element: HTMLElement) =>
  new DeckCard(card, element);

export default DeckCard;
export type { DeckCard };
