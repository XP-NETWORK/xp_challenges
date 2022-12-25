import { TelegramUser } from "store/types";

const ONE_DAY = 86_400_000;

class TelegramService {
  botName: string;
  private widgetUrl = "https://telegram.org/js/telegram-widget.js?21";
  private storageKey = "__XPC-TELEGRAM-USER__";

  constructor(botName: string) {
    this.botName = botName;
  }

  loadWidget(container: HTMLDivElement, callback: string) {
    const script = document.createElement("script");
    script.setAttribute("data-telegram-login", this.botName);
    script.setAttribute("data-size", "large");
    script.setAttribute(
      "data-onauth",
      callback
      //"window.__GLOBAL_VAR__.onTelegramAuth(user)"
    );
    script.setAttribute("data-request-access", "write");
    script.src = this.widgetUrl;

    container?.appendChild(script);
  }

  insertButton(iframe: HTMLIFrameElement, button: HTMLButtonElement) {
    iframe.style.width = button?.offsetWidth + "px";
    iframe.style.height = button?.offsetHeight + "px";
    iframe.setAttribute(
      "style",
      `overflow: hidden; border: none; width: ${button?.offsetWidth}px; height: ${button?.offsetHeight}px;`
    );
  }

  getUser(): TelegramUser | undefined {
    const user = localStorage.getItem(this.storageKey);
    if (user) {
      try {
        const userData = JSON.parse(user);
        return this.verify(userData);
      } catch (e) {
        console.log(e, "e");
        return undefined;
      }
    }
  }

  storeUser(user: TelegramUser) {
    if (localStorage.getItem(this.storageKey)) {
      localStorage.removeItem(this.storageKey);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  verify(user: TelegramUser) {
    const now = +new Date();
    const authDate = Number(user.auth_date) * 1000;

    if (now - authDate > ONE_DAY) {
      throw new Error("Telegram verify fail:expired");
    }

    return user;
  }
}

export default (botName: string) => new TelegramService(botName);
export { TelegramService };
