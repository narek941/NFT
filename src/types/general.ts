import React, { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IChildren {
  children: ReactNode | string;
}

export interface INavigationItem {
  id?: string;
  name: string;
  linkTo: string;
  restrictId?: string;
}

export interface IOption {
  id: number;
  isActive: boolean;
  onClick: (id: number) => () => void;
  imageUrl?: string;
  text: string;
}
export interface IOptionOld {
  isActive?: boolean;
  onClick?: () => void;
  children: ReactNode | string;
}

export interface ISocialIcon {
  id?: string;
  fileName: string;
  linkTo: string;
  width: string;
  height: string;
  name: string;
}

export type UserType = 'prospect' | 'authorized' | 'visitor';

export interface metaMaskLinkType {
  browser: string;
  url: string;
}

export interface IHeading {
  children: ReactNode | string;
  className?: string;
  imageUrl?: string;
}
export interface IUser {
  children: ReactNode | string;
}
export interface IAvatar {
  edit?: boolean;
  userName?: string;
  nameImage?: string;
  imgSrc: string | undefined;
  width?: string | number;
  height?: string | number;

  size?: 's' | 'm' | 'l';
  color?: 'primary';
  className?: string;
  onUpdateUserPhoto?: () => void;
}

import { UrlObject } from 'url';

declare type Url = string | UrlObject;
export interface CustomLinkProps {
  href: Url;
  as?: Url;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  isActive: boolean;
  target?: any;
  setActive: React.Dispatch<React.SetStateAction<string | number>>;
  id: string | number;
  linkTo?: string;
  className?: string;
}

export interface INav {
  gap?: string;
  pills?: boolean;
  nav: INavItem[];
  column?: boolean;
  activeLink?: string;
  isActiveItem: string | number;

  setActive?: () => void;
}
export interface INavItem {
  linkTo: string;
  name: string;
  id: string;
}
export interface IButtonGroup {
  isActive?: boolean;

  buttonGroup: IButtonGroupItem[];
}
export interface IButtonGroupItem {
  button: ReactNode | string;
  id: string;
}

export interface IDropDown {
  options: IDropDownItem[];
  icon?: boolean;
  type?: string;
  usingValue?: boolean;
  isLoading?: boolean;
  userText?: React.ReactElement | string;
  selectedOptions?: React.ReactElement | string;
  showSearch?: boolean;
  userId?: string;
  right?: boolean;
  className?: string;
  isBorder?: boolean;
  logoutHandler?: () => void;
  handleSelectedValue?: (sortOption: Record<string, string>) => any;
  handleClick?: (
    option: ReactNode | string | number,
    name?: string,
    id?: string | number | string
  ) => void;
}
export interface IDropDownItem {
  submenu?: any;
  name: string | React.ReactElement;
  id: number | string;
  value?: string | Record<string, string>;
  linkTo?: string;
  href?: Url;
  icon?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  onClick?: () => void;
  restrictId?: string;
}

export interface ISubmenu {
  name: string | React.ReactElement;
  id: number | string;
  linkTo?: string;
  href?: Url;
}

export interface IItem {
  items: IDropDownItem[];
  name: string | React.ReactElement;
  onClick?: () => void;
}
export interface ISearch {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

export interface ILoadingWave {
  dataPercent?: string | number;
}
export interface IContainer {
  children: ReactNode | string;
  className?: string;
}
export interface ISection {
  children: ReactNode | string;
  className?: string;
  color?: 'light';
}
export interface IHero {
  header?: string;
  subHeader?: string;
}
export interface IHRComponent {
  color?: 'light';
  className?: string;
  height: string;
}

export interface IPackItem {
  id: number;
  imageUrl?: string;
  name: string;
  price: number;
  description: string;
}
export interface IPacksSubScribe {
  item: IPackItem;
  className?: string;

  onCardClick: (pack: IPackItem) => void;
  onButtonClick: (pack: IPackItem) => void;
}
export interface ICounter {
  className?: string;
  targetDate: ReactNode | string | null;
}
export interface IDateTime {
  value: string;
  type: string;
  isDanger?: boolean;
}
export interface ICarousel {
  className?: string;
  list: itemCarousel[];
}
export interface itemCarousel {
  item: ReactNode | string | null;
}
export interface IMergeNFT {
  id: string;
  name: string;
  imageUrl?: string | undefined | null;
  className?: string;
}
export interface ICardMerge {
  id: string;
  item: ICardMergeItem;
  className?: string | boolean | undefined;
  isActive: boolean | string | undefined;
  setActive: (active: string) => void;
}
export interface ICardMergeItem {
  id: string;
  name?: string;
  imageUrl?: string | undefined | null;
}

export interface ICarouselSwiper {
  className?: string;
  children: ReactNode | string;
}
export interface ICarouselScrollbar {
  className?: string;
  children: ReactNode | string;
}
export interface ICetNewNFT {
  className?: string;
  onClickMerge: () => void;
}

export interface IMergeBFTSearchProps {
  onSearch: (value) => void;
  countCard?: string | number;
  onSortChange: (value) => void;
}
export interface ISidebar {
  children: ReactNode | string;
  className?: string;
}
export interface IStickerProps {
  children: ReactNode | string;
  className?: string;
}
export interface ITabContent {
  id: string;
  activeTab: string;
  children: ReactNode | string;
  className?: string;
}

export interface INoItemsProps {
  children: ReactNode | string;
  className?: string;
  isButton?: boolean;
  callback?: Function;
}
export interface IModalWrapperProps {
  children: ReactNode | string;
  className?: string;
}
export enum PasswordErrorTypes {
  TOO_WEAK = 'too weak',
  WRONG_PASSWORD = 'wrong password',
  UNKNOWN = 'unknown',
}
export interface IPasswordErrors {
  type: PasswordErrorTypes;
  message: string;
}
