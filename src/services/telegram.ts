import { TelegramUser } from "store/types";
const SHA256 = require("crypto-js/sha256");
const HMAC_SHA256 = require("crypto-js/hmac-sha256");
const HEX = require("crypto-js/enc-hex");

class TelegramService {
  botName: string;
  private widgetUrl = "https://telegram.org/js/telegram-widget.js?21";
  private storageKey = "__XPC-TELEGRAM-USER__";
  private token: string;

  constructor(botName: string, token: string) {
    this.botName = botName;
    this.token = token;
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
        this.verify(userData);
        return userData;
      } catch (e) {
        return undefined;
      }
    }
  }

  storeUser(user: TelegramUser) {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  verify(user: TelegramUser) {
    const now = +new Date();
    const authDate = Number(user.auth_date) * 1000;

    if (now - authDate > 86400000) {
      throw new Error("Telegram verify fail");
    }

    const verificationParams: TelegramUser = { ...user };
    delete verificationParams.hash;
    const message = Object.keys(verificationParams)
      .map((key) => `${key}=${verificationParams[key as keyof TelegramUser]}`)
      .sort()
      .join("\n");
    const secretKey = SHA256(this.token); // replace with the token of my bot
    const hash = HEX.stringify(HMAC_SHA256(message, secretKey));
    if (hash !== user.hash) {
      throw new Error("Telegram verify fail");
    }
  }
}

export default (botName: string, token: string) =>
  new TelegramService(botName, token);
export { TelegramService };
