import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from '@shared/Accordion';

export default {
  title: 'Shared/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const noImage = '/other/avatar.svg';

const data = [
  {
    title: 'Item 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Item 2',
    content:
      'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Item 3',
    content:
      'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const DefaultAccordion = Template.bind({});
DefaultAccordion.args = {
  data,
  size: 'l',
};
export const PrimaryAccordion = Template.bind({});
PrimaryAccordion.args = {
  data,
  color: 'primary',
  size: 'l',
};
