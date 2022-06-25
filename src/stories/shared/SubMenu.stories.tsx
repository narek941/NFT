import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Profile from 'public/other/profile.svg';

import SubMenu from '@shared/SubMenu';
import { IDropDownItem } from '@type/general';
import DropDownLink from '@components/shared/DropDown/DropDownLink';
import CheckBox from '@shared/CheckBox';

export default {
  title: 'Shared/SubMenu',
  component: SubMenu,
} as ComponentMeta<typeof SubMenu>;
const data = [
  {
    id: 'submenu_1',
    name: 'My NFT’s',
    linkTo: '/',
  },
  {
    id: 'submenu_2',
    name: 'Profile settings',
    linkTo: '/settings',
  },
];

const submenu = data.map((items, id) => {
  return <DropDownLink key={id} items={items} onClick={undefined} />;
});

const style = {
  margin: '20px',
  maxWidth: '201px',
  width: '100%',
};
const Template: ComponentStory<typeof SubMenu> = (args) => {
  return (
    <div style={style}>
      <SubMenu {...args} />
    </div>
  );
};

const styleCheckBox = {
  marginTop: '10px',
};

export const DefaultSubMenu = Template.bind({});
DefaultSubMenu.args = {
  submenu: submenu,
  name: (
    <>
      <Profile width='14' height='14' /> My profile
    </>
  ),
};
export const BuyOptionSubMenu = Template.bind({});
BuyOptionSubMenu.args = {
  submenu: (
    <>
      <div style={styleCheckBox}>
        <CheckBox id={'buynow'} name={'buynow'} text={'Buy now'} error={null} />
      </div>
      <div style={styleCheckBox}>
        <CheckBox
          id={'auction'}
          name={'auction'}
          text={'Auction'}
          error={null}
        />
      </div>
      <div style={styleCheckBox}>
        <CheckBox
          id={'timedAuction'}
          name={'timedAuction'}
          text={'Timed Auction'}
          error={null}
        />
      </div>
    </>
  ),
  name: 'Buy option',
};
