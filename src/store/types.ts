export enum CardType {
  Unit = "Unit",
  Hero = "Hero",
  Spell = "Spell",
  Conjured = "Conjured",
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
  currentProject: boolean;
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
}

export enum AchivType {
  Telegram = "Telegram Community",
  Twitter = "Twitter Community",
  Bridge = "Bridge Interaction",
}

export enum ActionType {
  Telegram = "Telegram Community",
  Twitter = "Twitter Community",
  Bridge = "Bridge Interaction",
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
  type: "Error" | "WalletList" | "TwitterAuth" | "TelegramAuth" | "confirmReg";
  text?: string;
  telegramAccount?: string;
  email?: string;
  confirmButton?: any
};
