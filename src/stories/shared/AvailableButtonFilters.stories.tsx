import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  AvailableButtonFilters,
  AvailableValues,
} from '@shared/AvailableButtonFilters';

export default {
  title: 'Shared/AvaliableButtonFilters',
  component: AvailableButtonFilters,
} as ComponentMeta<typeof AvailableButtonFilters>;

const Template: ComponentStory<typeof AvailableButtonFilters> = (args) => (
  <AvailableButtonFilters {...args} />
);

export const DefaultFilters = Template.bind({});
DefaultFilters.args = {
  onFilterButtonClick: (value: AvailableValues) =>
    console.log('toggle filter: ', value),
};
