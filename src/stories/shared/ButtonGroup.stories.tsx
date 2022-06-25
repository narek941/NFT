import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonGroup from '@components/shared/ButtonGroup';
import IconGrid2 from 'public/other/grid_2.svg';
import IconGrid4 from 'public/other/grid_4.svg';
import { IButtonGroupItem } from '@type/general';

const iconsButton: Array<IButtonGroupItem> = [
  {
    id: '1',
    button: <IconGrid2 />,
  },
  {
    id: '2',
    button: <IconGrid4 />,
  },
];

export default {
  title: 'Shared/ButtonGroup',
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => {
  return <ButtonGroup {...args} />;
};

export const DefaultButtonGroup = Template.bind({});
DefaultButtonGroup.args = {
  buttonGroup: iconsButton,
  isActive: true,
};
