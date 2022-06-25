import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OTPBlock from '@components/OTPBlock';
const user = {
  username: 'John Doe',
  email: 'userEmail@gmail.com',
};

const style = {
  margin: '20px auto',
  maxWidth: '600px',
  width: '100%',
};

export default {
  title: 'Components/OTPBlock',
  component: OTPBlock,
} as ComponentMeta<typeof OTPBlock>;

const Template: ComponentStory<typeof OTPBlock> = (args) => (
  <div style={style}>
    <OTPBlock {...args} />
  </div>
);

export const DefaultOTPBlock = Template.bind({});
DefaultOTPBlock.args = {
  user: user,
  error: 'ERROR',
  otpHandler: () => console.log('otpHandler'),
  btnClickHandler: () => console.log('btnClickHandler'),
};
