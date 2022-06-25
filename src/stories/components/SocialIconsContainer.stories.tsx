import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SocialIconsContainer from '@components/SocialIconsContainer';

export default {
  title: 'Components/SocialIconsContainer',
  component: SocialIconsContainer,
} as ComponentMeta<typeof SocialIconsContainer>;

const Template: ComponentStory<typeof SocialIconsContainer> = (args) => (
  <SocialIconsContainer />
);

export const DefaultSocialIconsContainer = Template.bind({});
DefaultSocialIconsContainer.args = {};
