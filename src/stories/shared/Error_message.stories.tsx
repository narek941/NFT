import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorMsg from '@shared/ErrorMsg';

export default {
  title: 'Shared/Error Message',
  component: ErrorMsg,
} as ComponentMeta<typeof ErrorMsg>;

const Template: ComponentStory<typeof ErrorMsg> = (args) => (
  <ErrorMsg {...args} />
);

export const SomethingWentWrong = Template.bind({});
SomethingWentWrong.args = {
  errorText: 'Something went wrong',
};
