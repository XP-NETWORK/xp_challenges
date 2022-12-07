import { IDeckCard } from "../components/lists/deck";


class DeckAnimator {
  private a = 404;
  element: HTMLElement | undefined;
  card: IDeckCard | undefined;
  private cardClickStop = false;

  public caclTheta(data: IDeckCard[]) {
    const theta: number[] = [];

    const frags = 360 / data.length;

    for (let i = 0; i <= data.length; i++) {
      theta.push((frags / 180) * i * Math.PI);
    }

    return theta;
  }

  public calcSize = (rx: number) => ({
    height: rx * 2 + this.a,
    width: rx * 2 + this.a,
  });

  public calcX = (rx: number, theta: number) =>
    Math.round(rx * Math.cos(theta));
  public calcY = (rx: number, theta: number) =>
    Math.round(rx * Math.sin(theta));
  public calcZ = (index: number, length: number) => length - Math.abs(index);
  public calcAngle = (index: number, length: number) =>
    -index * (360 / length) - 270;

  public stopDeckAnimation(cardClickStop?: boolean) {
    const animation = document.getElementById("deckAnimation");

    if (cardClickStop) {
      this.cardClickStop = cardClickStop;
    }

    if (!animation?.classList.contains("paused"))
      animation?.classList.add("paused");
  }

  public startDeckAnimation(cardClickStart?: boolean) {
    const animation = document.getElementById("deckAnimation");

    if (this.cardClickStop && !cardClickStart) return;

    this.cardClickStop = false;

    //false &&
    animation?.classList.contains("paused") &&
      animation?.classList.remove("paused");
  }
}

export default () => new DeckAnimator();
export type { DeckAnimator };
