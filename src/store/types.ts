export enum CardType {
  Unit = "Unit",
  Hero = "Hero",
  Spell = "Spell",
  Conjured = "Conjured",
}

export enum Factions {
  Infernal = "Infernal",
  Ephemeral = "Ephemeral",
  Celestial = "Celestial",
}

export enum Rows {
  Artillery = "Artillery",
  Brawler = "Brawler",
  Ranged = "Ranged",
}

export enum Rarity {
  Basic = "Basic",
  Simple = "Simple",
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  Epic = "Epic",
  Legendary = "Legendary",
  Mythic = "Mythic",
}

export interface ICard {
  _id: string;
  Name_EN: string;
  Description_EN: string;
  Img: string;
  Type: CardType;
  Faction: Factions;
  ID: number;
  Rarity: Rarity;
  "Base Power": number;
  Row: Rows;
  Quote_EN: string;
  Decklimit: number;
  Introduced: boolean;
  Ability: string;
  "Ability Unlock lvl": number;
  Animated: boolean;
  Cut: boolean;
  "Voice File": string;
  "Effect File": string;
  "L1 Image file": string;
  "Animation File": string;
  abilityData?: IAbility;
}
/////////////////////////////////////////
export interface IAbility {
  _id: string;
  Name: string;
  "Target Card Type": string;
  Description: string;
}

export interface IMechanic {
  Location: string;
  Outline: string;
  Text: string;
}
