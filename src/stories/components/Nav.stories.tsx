import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Nav from '@components/Nav';

export default {
  title: 'Components/Nav',
  component: Nav,
} as ComponentMeta<typeof Nav>;

const nav = [
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

const style = {
  margin: '20px',
  maxWidth: '550px',
  width: '100%',
};

const Template: ComponentStory<typeof Nav> = (args) => {
  return (
    <div style={style}>
      <Nav {...args} />
    </div>
  );
};

export const DefaultNav = Template.bind({});
DefaultNav.args = {
  nav: nav,
  gap: 's',
};

export const NavColumn = Template.bind({});
NavColumn.args = {
  nav: nav,
  column: true,
  pills: true,
  gap: 's',
};
