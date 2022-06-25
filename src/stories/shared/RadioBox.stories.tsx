import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioBox from '@shared/RadioBox';

export default {
  title: 'Shared/RadioBox',
  component: RadioBox,
} as ComponentMeta<typeof RadioBox>;

const Template: ComponentStory<typeof RadioBox> = (args) => (
  <RadioBox {...args} />
);

export const DemoRadioBox = Template.bind({});
DemoRadioBox.args = {
  id: '1',
  name: 'demo_RadioBox',
  text: 'Demo RadioBox',
  error: null,
};

export const ErrorRadioBox = Template.bind({});
ErrorRadioBox.args = {
  id: '2',
  name: 'error_checkbox',
  text: 'RadioBox with error',
  error: {
    type: 'simple error',
    message: 'RadioBox is not valid',
  },
};
