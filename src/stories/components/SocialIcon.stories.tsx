import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SocialIcon from '@components/SocialIcon';

export default {
  title: 'Components/SocialIcon',
  component: SocialIcon,
} as ComponentMeta<typeof SocialIcon>;

const Template: ComponentStory<typeof SocialIcon> = (args) => (
  <SocialIcon {...args} />
);

export const DefaultSocialIcon = Template.bind({});
DefaultSocialIcon.args = {
  linkTo: '/',
  width: '20',
  height: '20',
  fileName: 'facebook.svg',
};
