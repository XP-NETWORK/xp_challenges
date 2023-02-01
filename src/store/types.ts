export enum CardType {
  Unit = "Unit",
  Hero = "Hero",
  Spell = "Spell",
  Conjured = "Conjured",
}
export interface NFT {
  name: string
  image: string
}
export interface IPROJECT {
  projectNumber: number;
  name: string;
  description: string;
  collectionChain: string;
  collectionAddress: string;
  startDate: string;
  endDate: string;
  twitterPostId: string;
  twitterPartnerId: string;
  coverImage: string;
  currentProject: boolean;
  nfts: NFT[]
}

export interface ILeader {
  user: string;
  comp: number;
  avatar: string;
}

export interface IACHIEVMENT {
  achievmentNumber: number;
  name: AchivType;
  description: string;
  progressBarLength: number;
  rewardAmount: number;
  link?: string;
  miniIcon?: string | undefined
}

export enum AchivType {
  Telegram = "Telegram Community",
  Twitter = "Twitter Community",
  Bridge = "Bridge Interaction",
  Subscribe = "Subscribe",
}

export enum ActionType {
  Telegram = "Telegram Community",
  Twitter = "Twitter Community",
  Bridge = "Bridge Interaction",
  Subscribe = "Subscribe",
}

export type TelegramUser = {
  auth_date: bigint;
  first_name: string;
  id: bigint;
  last_name: string;
  photo_url: string;
  username: string;
  hash?: string;
};

export type SignupState = {
  telegram: TelegramUser | undefined;
  email: string;
  newsletter: boolean;
  privatePolicy: boolean;
};

export type EmailValidFail = {
  dublicate: string;
  notemail: string;
  empty: string;
};

export type FieldValidation<text> = {
  text: text;
  failedValid: boolean;
  mondatoryIf?: keyof SignupState;
};

export type SignupValidation = {
  telegram: FieldValidation<string>;
  email: FieldValidation<EmailValidFail>;
  privatePolicy: FieldValidation<string>;
};

export type AchievementsUpdateEvent = {
  projectNumber: number;
  achievments: number[];
  currentProgressNumber: number & number[];
  completed?: boolean[];
};

export type IModal = {
  type:
  | "Error"
  | "WalletList"
  | "TwitterAuth"
  | "TelegramAuth"
  | "confirmReg"
  | "EmailSubscribe"
  | "Success"
  | "AchievmentCompleted"
  | "Bridge";
  text?: string;
  wallet?: string;
  telegramAccount?: string;
  telegramPic?: string;
  email?: string;
  params?: {
    [x: string]: boolean;
  };
  confirmButton?: any;
  achievmentNumber?: number
};
