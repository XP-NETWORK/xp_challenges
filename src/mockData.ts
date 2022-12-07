import { IFeatureCard } from "./components/elements/feature";
import { Introduction } from "./components/lists/introduction";
import { IMechanic } from "./components/lists/mechanics";
import { IFaction } from "./components/lists/factions";
import { IWorld } from "./components/lists/world";
import { IAllyCard } from "./components/lists/allies";
import { ITestimonial } from "../src/components/elements/testimonial";
import { IBacker } from "../src/components/lists/backers";
import { IDeckCard } from "../src/components/lists/deck";
import { IWiki } from "./pages/homeSections/wiki";

import feature1 from "./assets/img/lists/features/features1.png";
import feature2 from "./assets/img/lists/features/features2.png";
import feature3 from "./assets/img/lists/features/features3.png";
import feature4 from "./assets/img/lists/features/features4.png";

import intro1 from "./assets/img/lists/intorductions/intro1.png";
import intro2 from "./assets/img/lists/intorductions/intro2.png";
import intro2Vid from "./assets/Choose your army and build your strategic skills.webm";
import intro3 from "./assets/img/lists/intorductions/intro3.png";
import intro3Vid from "./assets/Collect resources to fuel your succes.webm";

import introEffectVid from "./assets/glowing smoke_VP9.webm";
import introEffectImg from "./assets/img/lists/intorductions/introEffect4.png";

import mechanic1 from "./assets/img/lists/mechanics/mechanic1.png";

import infernal from "./assets/img/lists/factions/Infernal.png";
import Ephemeral from "./assets/img/lists/factions/Ephemeral.png";
import Celestial from "./assets/img/lists/factions/Celestial.png";
import Factionless from "./assets/img/lists/factions/Factionless.png";

import ethermeria from "./assets/img/lists/worlds/Ephemeria.png";

import guildwars from "./assets/img/lists/allies/Guild Wars Illustration.png";
import guild from "./assets/img/lists/allies/Guilds Illustration.png";
import tournaments from "./assets/img/lists/allies/Tournaments.png";

import avatar from "./assets/img/lists/testimonials/Avatar.png";

import facebook from "./assets/img/lists/backers/facebook.svg";
import nvidia from "./assets/img/lists/backers/nvidia.svg";
import amd from "./assets/img/lists/backers/AMD_Logo 1.svg";
import coinbase from "./assets/img/lists/backers/Coinbase 1.svg";

import microsoft from "./assets/img/lists/backers/Group 2181.svg";
import valve from "./assets/img/lists/backers/Valve_Software.svg";
import bsc from "./assets/img/lists/backers/Group.svg";
import opensea from "./assets/img/lists/backers/OpenSea-Full-Logo (light) 1.svg";

export const features: IFeatureCard[] = [
  {
    picUrl: feature1,
    title: "Ownership",
    text: "Dfiance game assets are semi-NFTs or NFTs that are associated with the player’s blockchain address. As a player, you own your assets and are free to trade, move them to other chains or do as you please with them. ",
    link: "www.google.com",
  },
  {
    picUrl: feature2,
    title: "Play, Earn, Own",
    text: "Play the game, win battles and earn resources. Use your loot to upgrade your cards, unlock abilities, improve your gameplay or more. Alternatively, you can sell your resources on the marketplace to other players.",
    link: "www.google.com",
  },
  {
    picUrl: feature3,
    title: "Tokenless",
    text: "In order to ensure fair gameplay and to reduce entry barriers, Dfiance does not require players to buy, own or stake a token in order to play the game. This way we also ensure that cards and other assets are not limited only to token holders.",
    link: "www.google.com",
  },
  {
    picUrl: feature4,
    title: "Gasless",
    text: "Dfiance uses a private blockchain which allows us to save players thousands of dollars in transaction fees. Don’t bother yourself with gas - simply signup and join the epic journey",
    link: "www.google.com",
  },
];

export const introductions: Introduction[] = [
  {
    picUrl: intro1,
    title: "Claim your free deck",
    text: "Dfiance allows all players a fair start. No bonuses, no special cards for special people, no minting, no gas wars, no limits. Everyone gets their initial randomized deck completely for free and can start playing immediately. Upgrading your deck by acquiring new cards can be done through earned in-game resources.",
    effectPic: introEffectImg,
    effectVid: introEffectVid,
  },
  {
    picUrl: intro2,
    vidUrl: intro2Vid,
    title: "Choose your army and build your strategic skills",
    text: "Choose which side you fight for from three different factions. Decide your battle strategy, collect and upgrade cards, abilities, war machines and even own your battleground NFT and earn resources from every battle that happens on your battlefield.",
  },
  {
    picUrl: intro3,
    vidUrl: intro3Vid,
    title: "Collect resources to fuel your success",
    text: "In-game resources are used to upgrade existing cards & abilities, unlock features, bet against other players, acquire new assets (cards, machines, abilities, battlegrounds), upgrade your war and harvesting machines or simply sell your hard-earned resources on the marketplace. ",
  },
];

export const mechanics: IMechanic[] = [
  {
    picUrl: mechanic1,
    points: [
      {
        text: "more than 300 unique characters",
        title: "300",
      },
      {
        text: "over 20 regions with an unrivaled history",
        title: "20",
      },
      {
        text: "over 100 extraordinary & unique battlegrounds",
        title: "100",
      },
    ],
  },
];

export const factions: IFaction[] = [
  {
    picUrl: infernal,
    text: "infernal",
    units: [],
  },

  {
    picUrl: Ephemeral,
    text: "Ephemeral",
    units: [],
  },

  {
    picUrl: Celestial,
    text: "celestial",
    units: [],
  },

  {
    picUrl: Factionless,
    text: "factionless",
    units: [],
  },
];

export const world: IWorld = {
  picUrl: ethermeria,
  title: "Introducing Ephemeria",
  text: "Ephemeria is at the center of Dfiance. It is the land invaded by both Infernals and Celestial forces. Ephemeria is a rough world, with ice-cold caverns and burning hot deserts. Explore the world, find the different battlegrounds where battles are likely to happen, deploy energy harvesters and learn the history of the world.",
  link: "www.google.com",
  buttonText: "OPEN MAP",
};

export const allies: IAllyCard[] = [
  {
    picUrl: guild,
    title: "GuildS",
    text: "Create or join a guild, and work together with others in order to unlock powerful guild perks.",
  },
  {
    picUrl: tournaments,
    title: "Tournaments",
    text: "Tournaments are friendly games played against other guild members. The winner takes all.",
  },
  {
    picUrl: guildwars,
    title: "Guild Wars",
    text: "Challenge other guilds and battle each other for exclusive perks and unique guild rewards.",
  },
];

export const testimonials: ITestimonial[] = [
  {
    picUrl: avatar,
    name: "SHNIP SHNAP-SHNAPY",
    link: "www.google.com",
    position: "Founder at Rabbit Labs",
    text: "At consectetur lorem donec massa sapien. Sed tempus urna et pharetra pharetra massa massa ultricies. Neque vitae tempus quam pellentesque nec nam aliquam sem et. Et leo duis ut diam quam nulla.",
  },
  {
    picUrl: avatar,
    name: "SHNIP SHNAP-SHNAPY",
    link: "www.google.com",
    position: "Founder at Rabbit Labs",
    text: "At consectetur lorem donec massa sapien. Sed tempus urna et pharetra pharetra massa massa ultricies.",
  },
];

export const backers: IBacker[] = [
  {
    picUrl: facebook,
  },
  {
    picUrl: nvidia,
  },
  {
    picUrl: amd,
  },
  {
    picUrl: coinbase,
  },
  {
    picUrl: microsoft,
  },
  {
    picUrl: valve,
  },
  {
    picUrl: bsc,
  },
  {
    picUrl: opensea,
  },
];

export const deck: IDeckCard[] = [];

export const wiki: IWiki = {
  title: "Encyclopedia",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  buttonText: "OPEN WIKI",
  link: "www.google.com",
};
