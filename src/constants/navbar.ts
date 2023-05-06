import { type IconType } from "react-icons";
import {
  GiDuck,
  GiOutbackHat,
  GiStonedSkull,
  GiSpellBook,
} from "react-icons/gi";

type NavBarItem = {
  id: string;
  icon: IconType;
  label: string;
  href: string;
  target?: string;
  disabled?: boolean;
}

export const USER_NAV_ITEMS: NavBarItem[] = [
  {
    id: "user_nav_profile",
    icon: GiDuck,
    label: "Profile",
    href: "/profile",
    disabled: true,
  },
];

export const NAV_ITEMS: NavBarItem[] = [
  {
    id: "nav_claims",
    icon: GiOutbackHat,
    label: "Claims",
    href: "/claims",
  },
  {
    id: "nav_hall_of_shame",
    icon: GiStonedSkull,
    label: "Hall of Shame",
    href: "/hall-of-shame",
    disabled: true,
  },
  {
    id: "nav_tips_n_tricks",
    icon: GiSpellBook,
    label: "Tips n' Tricks",
    href: "https://duckgame.fandom.com/wiki/Category:Tips_and_Tricks",
    target: "_blank",
  },
];
