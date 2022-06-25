import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '@shared/Button';
import DateTime from '@components/shared/DateTime';
import classNames from 'classnames';

export default {
  title: 'Shared/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button className='px-s' {...args} />
);

export const BlueSmallButton = Template.bind({});
BlueSmallButton.args = {
  size: 's',
  color: 'blue',
  children: 'Blue small button',
};

export const WhiteLargeOutlinedButton = Template.bind({});
WhiteLargeOutlinedButton.args = {
  size: 's',
  color: 'transparent',
  fillStyle: true,
  children: 'White large outlined button',
};

export const DarkLargeButton = Template.bind({});
DarkLargeButton.args = {
  size: 'l',
  color: 'dark',
  children: 'Dark Large Button',
};

export const SecondaryLargeButton = Template.bind({});
SecondaryLargeButton.args = {
  size: 'l',
  color: 'secondary',
  children: 'Secondary Large Button',
};

export const DateTimeButton = Template.bind({});
DateTimeButton.args = {
  size: 'l',
  color: 'auction',
  children: (
    <>
      <DateTime dateTime='10d : 16h : 21m'>
        🔥 Auction ends in{' '}
        <span className={classNames('text-bold', 'text-fz-14')}>10</span>d :{' '}
        <span className={classNames('text-bold', 'text-fz-14')}>16</span>h :{' '}
        <span className={classNames('text-bold', 'text-fz-14')}>21</span>m
      </DateTime>
    </>
  ),
};
