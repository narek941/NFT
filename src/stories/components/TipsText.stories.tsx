import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TipsText from '@components/TipsText';

export default {
  title: 'Components/TipsText',
  component: TipsText,
} as ComponentMeta<typeof TipsText>;

const Template: ComponentStory<typeof TipsText> = (args) => (
  <TipsText {...args} />
);

export const DefaultTipsText = Template.bind({});
DefaultTipsText.args = {
  text: 'Tips Text',
  linkText: 'Tips Link',
  linkTo: '/',
};
