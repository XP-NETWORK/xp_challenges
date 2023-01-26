import * as socket from "socket.io-client";

import { AchievementsUpdateEvent } from "store/types";

class Socket {
  url: string;
  socket: socket.Socket | null;

  constructor(url: string) {
    this.url = url;
    this.socket = socket.io(url, {
      path: "/socket.io",
    });
  }

  listen(id: string, cb: (event: AchievementsUpdateEvent) => void) {
    this.socket?.on(id, cb);
    // console.log("listenig to " + id);
    console.log(this.socket?.listeners(id));
  }

  mute(id: string, cb: (event: AchievementsUpdateEvent) => void) {
    this.socket?.off(id, cb);
  }

  open(url?: string) {
    this.socket = socket.io(url || this.url, {
      path: "/socket.io",
    });
    return this;
  }

  close() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }
}

export default (url: string) => new Socket(url);
export type { Socket };
