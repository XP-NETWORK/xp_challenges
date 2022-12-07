import { RefObject } from "react";

type Ref = RefObject<Element>;
type Callback = Function | ((val: boolean) => void);
type AddRefOption = {
  observeLeave?: boolean;
};

export type ImageLoaderOptions = {
  root: any;
  rootMargin: string;
  threshold: number;
};

class ImageLoader {
  refs: { ref: Ref; cb: Callback; observeLeave: boolean }[] = [];
  fullObserveRefs: Element[] = [];
  loaded: Element[] = [];
  processing = false;

  private queue: { url: string; resolve: any }[] = [];

  observer: IntersectionObserver;

  private Observer(options?: ImageLoaderOptions) {
    return new IntersectionObserver(
      async (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          const fullOservable = this.fullObserveRefs.indexOf(entry.target) > -1;
          if (entry.isIntersecting || fullOservable) {
            const item = this.refs.find(
              (item) => item.ref.current === entry.target
            );

            const newFullObservale =
              item?.observeLeave &&
              this.fullObserveRefs.indexOf(item.ref.current!) === -1;

            if (newFullObservale) this.fullObserveRefs.push(item.ref.current!);

            if (
              item?.ref.current &&
              this.loaded.indexOf(item.ref.current) === -1
            ) {
              const res = (await item.cb(entry.isIntersecting)) as any;
              if (res) {
                await this.loadBackground(res);
                this.loaded.push(item.ref.current);
              }
            }
          }
        }
      },
      options || {
        root: null,
        rootMargin: `0px 0px ${
          window.innerWidth > 800 ? "1000" : "1500"
        }px 0px`,
        threshold: 0,
      }
    );
  }

  constructor(options?: ImageLoaderOptions) {
    this.observer = this.Observer(options);
  }

  public createObserver(options: {
    root: HTMLElement;
    rootMargin: string;
    threshold: number;
  }) {
    return new ImageLoader(options);
  }

  public addRef(ref: Ref, setState: Callback, options?: AddRefOption) {
    if (ref.current && !this.refs.find((item) => item.ref === ref)) {
      this.refs.push({
        ref,
        cb: setState,
        observeLeave: options?.observeLeave || false,
      });
      this.observer.observe(ref.current);
      ref.current.addEventListener(
        "load",
        () => ref.current && this.loaded.push(ref.current)
      );
    }
  }

  private async loadBackground(background: {
    id: string;
    urls: { desk: string | string[]; mob?: string | string[] };
  }) {
    const node = document.getElementById(background.id);

    const src =
      window.innerWidth > 800
        ? background.urls.desk
        : background.urls.mob || background.urls.desk;
    const srcArr = Array.isArray(src) ? src : [src];

    for (const src of srcArr) {
      await new Promise((resolve, reject) => {
        const image = new Image();
        let loaded = false;

        image.addEventListener("load", function () {
          loaded = true;
          console.log(node);
          resolve(loaded);
        });
        image.src = src;
        image.onerror = function () {
          reject("could not load an image");
        };
      });
    }

    node?.classList.add("visible");
  }

  async queueAdd(url: string) {
    const x = await new Promise((resolve) => {
      this.queue.push({
        url,
        resolve,
      });
    }).catch((e) => {
      console.log(e, " d");
      return "#";
    });

    return x;
  }

  load() {
    setInterval(async () => {
      if (this.processing) return;
      this.processing = true;
      while (this.queue.length) {
        await new Promise((resolve) => {
          const item = this.queue.shift();
          const image = new Image();
          image.addEventListener("load", () => {
            item?.resolve(true);
            resolve(true);
          });
          image.src = item?.url!;
          image.onerror = () => {
            item?.resolve(true);
            resolve(true);
          };
        });
      }
      this.processing = false;
    }, 500);

    return this;
  }
}

export default () => new ImageLoader();
export type { ImageLoader };
