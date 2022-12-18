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
}

export enum AchivType {
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
