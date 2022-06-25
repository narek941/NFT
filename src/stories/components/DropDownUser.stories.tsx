import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DropDownUser from '@components/DropDownUser';

import Avatar from '@components/shared/Avatar';

const imgSrc = '/other/user.svg';
const user = (
  <Avatar imgSrc={imgSrc} width={48} height={48} size='s' color='primary' />
);
import Profile from 'public/other/profile.svg';
import Payments from 'public/other/payments.svg';
import Currency from 'public/other/currency.svg';
import Star from 'public/other/star.svg';
import redeemNFT from 'public/other/redeemNFT.svg';

import { IDropDownItem } from '@type/general';

const menuHeader: Array<IDropDownItem> = [
  {
    id: '1',
    name: 'My profile',

    icon: Profile,
    submenu: [
      {
        id: 'submenu_1',
        name: 'My NFT’s',
        linkTo: '/my-profile?tab=my-nfts',
      },
      {
        id: 'submenu_2',
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
        id: 'submenu_1',
        name: 'Payment methods',
        linkTo: '/payment',
      },
      {
        id: 'submenu_2',
        name: 'Manage payments',
        linkTo: '/payment',
      },
      {
        id: 'submenu_3',
        name: 'Connect wallet',
        linkTo: '/payment',
      },
    ],
  },
  {
    id: '3',
    name: `Claim rewards`,
    linkTo: '#claimRewards',
    icon: Currency,
  },
  {
    id: '4',
    name: `Claim NFT’s`,
    linkTo: '#ClaimNFT',
    icon: Star,
  },

  {
    id: '5',
    name: `Redeem NFT’s`,
    linkTo: '#redeemNFT',
    icon: redeemNFT,
  },
];

export default {
  title: 'Components/DropDownUser',
  component: DropDownUser,
} as ComponentMeta<typeof DropDownUser>;

const getOptions = (options) =>
  options.map((item) => ({
    id: item.id,
    linkTo: item.linkTo,
    name: (
      <>
        <item.icon width='18' height='18' />
        {item.name}
      </>
    ),
    submenu: item.submenu,
  }));
const style = {
  margin: '20px auto',
  maxWidth: '50px',
  width: '100%',
};
const Template: ComponentStory<typeof DropDownUser> = (args) => (
  <div style={style}>
    <DropDownUser {...args} />
  </div>
);

export const DefaultDropDownUser = Template.bind({});
DefaultDropDownUser.args = {
  options: getOptions(menuHeader),
  userText: user,
};

export const RightDropDownUser = Template.bind({});
RightDropDownUser.args = {
  options: getOptions(menuHeader),
  userText: user,
  right: true,
};
