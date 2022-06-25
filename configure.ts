import uniqid from 'uniqid';
import {
  INavigationItem,
  metaMaskLinkType,
  IDropDownItem,
  INavItem,
} from 'src/types/general';
import { ISocialIcon } from 'src/types/general';
import Profile from 'public/other/profile.svg';
import Payments from 'public/other/payments.svg';
import Currency from 'public/other/currency.svg';
import Star from 'public/other/star.svg';
import redeemNFT from 'public/other/redeemNFT.svg';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

export const menuOption: Array<IDropDownItem> = [
  {
    id: '1',
    name: 'Price High to Low',
    value: {
      sort: 'price',
      order: 'desc',
    },
  },
  {
    id: '2',
    name: 'Price Low to High',
    value: {
      sort: 'price',
      order: 'asc',
    },
  },
  {
    id: '3',
    name: 'Rarity Score Low to High',
    value: {
      sort: 'rarity',
      order: 'asc',
    },
  },
  {
    id: '4',
    name: 'Rarity Score High to Low',
    value: {
      sort: 'rarity',
      order: 'desc',
    },
  },
  {
    id: '5',
    name: 'Creation date Low to High',
    value: {
      sort: 'createdAt',
      order: 'asc',
    },
  },
  {
    id: '6',
    name: 'Creation date High to Low',
    value: {
      sort: 'createdAt',
      order: 'desc',
    },
  },
  {
    id: '7',
    name: 'Most liked High to Low',
    value: {
      sort: 'likes',
      order: 'desc',
    },
  },
  {
    id: '8',
    name: 'Most liked Low to High ',
    value: {
      sort: 'likes',
      order: 'asc',
    },
  },
];

export const getMenuHeader = (
  connectedStatus: boolean = false,
  dispatchFunction: any
): Array<IDropDownItem> => [
  {
    id: '1',
    name: ' My profile',
    linkTo: '/my-profile',
    icon: Profile,
    submenu: [
      {
        id: '1',
        name: 'My NFTs',
        linkTo: '/my-profile?tab=my-nfts',
      },
      {
        id: '2',
        name: 'My Packs',
        linkTo: '/my-profile?tab=my-packs',
      },
      {
        id: '3',
        name: 'Liked NFTs',
        linkTo: '/my-profile?tab=liked-nfts',
      },
      {
        id: '4',
        name: 'Profile settings',
        linkTo: '/settings',
      },
    ],
  },
  {
    id: '2',
    name: `Payments`,
    linkTo: '/payments',
    icon: Payments,
    submenu: [
      {
        id: '3',
        name: connectedStatus ? 'My Wallet' : 'Connect wallet',
        linkTo: '',
        onClick: async () => {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider
              .send('eth_requestAccounts', [])
              .then((res: string[]) => {
                dispatchFunction(res[0]);
              })
              .catch((error) => {
                if (error.code === 4001) {
                  toast.warn('Connect request was rejected by user');
                } else {
                  toast.error('Metamask: something went wrong.');
                }
              });
          } else {
            window.open('https://metamask.io/download/', '_blank');
          }
        },
      },
    ],
  },

  {
    id: '4',
    name: `Withdraw NFTs`,
    linkTo: '/my-profile#my-nfts',
    icon: Star,
  },

  {
    id: '5',
    name: `NFTs with utilities`,
    linkTo: '/redeem',
    icon: redeemNFT,
    restrictId: 'UTILITIES',
  },
];

export const menuHeader: Array<IDropDownItem> = [
  {
    id: '1',
    name: ' My profile',
    linkTo: '/my-profile',
    icon: Profile,
    submenu: [
      {
        id: '1',
        name: 'My NFTs',
        linkTo: '/my-profile?tab=my-nfts',
      },
      {
        id: '2',
        name: 'My Packs',
        linkTo: '/my-profile?tab=my-packs',
      },
      {
        id: '3',
        name: 'Liked NFTs',
        linkTo: '/my-profile?tab=liked-nfts',
      },
      {
        id: '4',
        name: 'Profile settings',
        linkTo: '/settings',
      },
    ],
  },
  {
    id: '2',
    name: `Payments`,
    linkTo: '/payments',
    icon: Payments,
    submenu: [
      {
        id: '1',
        name: 'Payment methods',
        linkTo: '/payments',
      },
      {
        id: '2',
        name: 'Manage payments',
        linkTo: '/payments',
      },
      {
        id: '3',
        name: 'Connect wallet',
        linkTo: '',
      },
    ],
  },
  {
    id: '4',
    name: `Withdraw NFTs`,
    linkTo: '/my-profile#my-nfts',
    icon: Star,
  },

  {
    id: '5',
    name: `NFTs with utilities`,
    linkTo: '/redeem',
    icon: redeemNFT,
  },
];

export const sidebarSettings: Array<INavItem> = [
  {
    id: '1',
    name: `Profile Settings`,
    linkTo: '#profile',
  },
  {
    id: '2',
    name: `Security Settings`,
    linkTo: '#security',
  },
  {
    id: '3',
    name: `Notifications Settings`,
    linkTo: '#notifications',
  },
];
export const menu: Array<INavItem> = [
  {
    id: '1',
    name: `Settings`,
    linkTo: '#profile',
  },
  {
    id: '3',
    name: `Notifications`,
    linkTo: '#notifications',
  },
];

export const navigationList: Array<INavigationItem> = [
  {
    id: uniqid(),
    name: 'Home',
    linkTo: '/',
  },
  {
    id: uniqid(),
    name: 'Buy',
    linkTo: '/buy',
    restrictId: 'DROP',
  },
  {
    id: uniqid(),
    name: 'Packs',
    linkTo: '/packs',
    restrictId: 'PACKS',
  },
  {
    id: uniqid(),
    name: 'Collections',
    linkTo: '/collection',
    restrictId: 'COLLECTIONS',
  },
];

export const socialIconsList: Array<ISocialIcon> = [
  {
    id: uniqid(),
    name: 'facebook',
    fileName: 'facebook.svg',
    linkTo: 'https://facebook.com',
    width: '18',
    height: '18',
  },
  {
    id: uniqid(),
    name: 'twitter',
    fileName: 'twitter.svg',
    linkTo: 'https://twitter.com',
    width: '18',
    height: '18',
  },
  {
    id: uniqid(),
    name: 'instagram',
    fileName: 'instagram.svg',
    linkTo: 'https://instagram.com',
    width: '18',
    height: '18',
  },
  {
    id: uniqid(),
    name: 'youtube',
    fileName: 'youtube.svg',
    linkTo: 'https://youtube.com',
    width: '18',
    height: '18',
  },
];

export const PASSWORD_LENGTH_MIN = 8;
export const PASSWORD_LENGTH_MAX = 50;
export const PASSWORD_LENGTH_MAX_256 = 256;
export const USERNAME_LENGTH_MIN = 3;
export const USERNAME_LENGTH_MAX = 128;
export const DISPLAYNAME_LENGTH_MIN = 3;
export const DISPLAYNAME_LENGTH_MAX = 128;
export const MAX_UPLOAD_PHOTO_SIZE = 20;

export const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

//Should have 1 lowercase letter, 1 uppercase letter, 1 number
export const passwordRegex =
  /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{1,}$/;

export const emailRegex =
  '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';

export const metaMaskLinks: Array<metaMaskLinkType> = [
  {
    browser: 'chrome',
    url: 'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn',
  },
  {
    browser: 'brave',
    url: 'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn',
  },
  {
    browser: 'firefox',
    url: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
  },
  {
    browser: 'edge-chromium',
    url: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US',
  },
];
