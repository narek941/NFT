import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Checkbox from '@shared/CheckBox';

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const DemoCheckbox = Template.bind({});
DemoCheckbox.args = {
  id: '1',
  name: 'demo_checkbox',
  text: 'Demo checkbox',
  error: null,
};

export const ErrorCheckbox = Template.bind({});
ErrorCheckbox.args = {
  id: '2',
  name: 'error_checkbox',
  text: 'Checkbox with error',
  error: {
    type: 'simple error',
    message: 'Checkbox is not valid',
  },
};
