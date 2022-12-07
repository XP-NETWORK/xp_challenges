import { MouseEvent } from "react";
import { IMechanic } from "../types";

export type MechanicsCollection = {
  [x: string]: IMechanic;
};

class Battlefield {
  public load(isMobile: boolean) {
    console.log(isMobile);
    return new Promise((resolve) => {
      const background = new Image();
      background.onload = function () {
        const { width } = background;

        const boardWrapper = document.querySelector(
          ".boardWrapper"
        ) as HTMLDivElement;

        const board = document.querySelector(
          ".battlefieldBoard"
        ) as HTMLDivElement;

        const ghosts = document.querySelector(
          "#root .battlefieldBoard .ghosts"
        ) as HTMLDivElement;

        if (isMobile) {
          const w = board.offsetHeight * 1.77;
          board.style.display = "block";
          board.style.width = `${w}px`;
          board.style.height = `${board.offsetHeight}px`;

          boardWrapper.scrollBy(w / 2.8, 0);
          //background.style.width = `${w}px`;
          ghosts.style.width = `100%`;
        } else {
          const h = board.offsetHeight;

          const newWidth = (h * width) / 1080;

          ghosts.style.width = String(newWidth) + "px";
          board.style.width = `${newWidth}px`;
        }

        resolve(true);
      };
      background.onerror = function (e) {
        console.log(e);
        return resolve(true);
      };

      background.src =
        require("../../assets/img/battlefield/Battlefield_background-min.png").default;
    });
  }

  public hoverHandler() {
    return (_: MouseEvent<HTMLDivElement>, key: string) => {
      const ghost = this.getDomTarget(`.gameMechanicsPage .ghosts .ghost`, key);
      ghost.style.opacity = "1";
      const backgroud = this.getDomTarget(
        `.gameMechanicsPage .battlefieldBoard .boardBackground`,
        key
      );
      backgroud!.style.opacity = "1";
    };
  }

  public hoverOffHandler() {
    return (_: MouseEvent<HTMLDivElement>, key: string) => {
      const ghost = this.getDomTarget(`.gameMechanicsPage .ghosts .ghost`, key);
      ghost.style.opacity = "0";
      const backgroud = this.getDomTarget(
        `.gameMechanicsPage .battlefieldBoard .boardBackground`,
        key
      );
      backgroud!.style.opacity = "0";
    };
  }

  public collectify(mechanics: IMechanic[]) {
    return mechanics.reduce((obj, current) => {
      return {
        ...obj,
        [current.Location]: current,
      };
    }, {}) as MechanicsCollection;
  }

  private getDomTarget(classes: string, key: string): HTMLDivElement {
    return document.body.querySelector(
      `${
        classes +
        key
          .split(" ")
          .map((word) => (word === "&" ? ".\\&" : `.${word}`))
          .join("")
      }`
    )!;
  }
}

export default () => new Battlefield();
export type { Battlefield };
