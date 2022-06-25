import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavButton from '@shared/NavButton';

export default {
  title: 'Shared/NavButton',
  component: NavButton,
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => (
  <NavButton {...args} />
);

export const DefaultNavButton = Template.bind({});
DefaultNavButton.args = {
  to: '/',
  children: 'Sign in',
};

export const BlueSNavButton = Template.bind({});
BlueSNavButton.args = {
  to: '/',
  children: 'Blue small Nav Button',
  size: 's',
  color: 'blue',
};

export const BlueOutlinedNavButton = Template.bind({});
BlueOutlinedNavButton.args = {
  to: '/',
  children: 'Blue Outlined Nav Button',
  fillStyle: true,
  color: 'blue',
  size: 'l',
};
