import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DropDown from '@components/shared/DropDown/DropDown';
import { menuOption } from 'configure';

export default {
  title: 'Shared/DropDown',
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const getOptions = (options) =>
  options.map((item, index) => ({
    id: index,
    name: item.name,
    value: item.name,
  }));
const handleClickSort = (option) => {
  console.log(option);
};
const Template: ComponentStory<typeof DropDown> = (args) => (
  <DropDown {...args} />
);

export const DefaultDropDown = Template.bind({});
DefaultDropDown.args = {
  options: menuOption,
  userText: 'Recently added',
  selectedOptions: 'Recently added',
  icon: true,
  usingValue: true,
  handleClick: handleClickSort,
};
export const SearchDropDown = Template.bind({});
SearchDropDown.args = {
  options: getOptions(menuOption),
  userText: 'Recently added',
  selectedOptions: 'Recently added',
  icon: true,
  showSearch: true,
  isBorder: true,
};
