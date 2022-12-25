export enum CardType {
  Unit = "Unit",
  Hero = "Hero",
  Spell = "Spell",
  Conjured = "Conjured",
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
  currentProgressNumber: number;
};

export type IModal = {
  type: "Error" | "WalletList" | "TwitterAuth" | "TelegramAuth";
  text?: string;
};
