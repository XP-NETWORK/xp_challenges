import { TelegramUser, SignupState } from "store/types";

export type IUserAchievments = {
  achievmentNumber: number;
  progressNumber: number;
  completed: boolean;
  rewardCollected: boolean;
};

export type IWallet = {
  chain: string;
  address: string;
};

export interface UserData {
  telegramUsername: string;
  twitterUserName?: string;
  telegramUserId?: string;
  email?: string;
  twitterAcountId?: string;
  telegramFirstName?: string;
  telegramLastName?: string;
  telegramPhotoUrl?: string;
  telrgramAuthDate?: string;
  telegramHash?: string;
  newsletter?: boolean;
  wallets?: IWallet[];
  projectParticipations?: {
    projectNumber: number;
    achievments: IUserAchievments[];
  }[];
}

class User {
  data: UserData;

  constructor(user: UserData) {
    this.data = user;
  }

  static getObject(
    telegramUser: TelegramUser,
    state: SignupState,
    wallet?: IWallet
  ): UserData {
    return {
      telegramUsername: telegramUser.username,
      telegramFirstName: telegramUser.first_name,
      telegramLastName: telegramUser.last_name,
      telegramUserId: String(telegramUser.id),
      telegramHash: telegramUser.hash,
      telrgramAuthDate: new Date(Number(telegramUser.auth_date)).toString(),
      telegramPhotoUrl: telegramUser.photo_url,
      email: state.email,
      newsletter: state.newsletter,
      ...(wallet ? { wallets: [wallet] } : {}),
    };
  }
}

export default (user: UserData) => new User(user);
export { User };
