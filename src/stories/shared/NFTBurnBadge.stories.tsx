import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NFTBurnBadge from '@shared/Badge/NFTBurnBadge';

export default {
  title: 'Shared/NFTBurnBadge',
  component: NFTBurnBadge,
} as ComponentMeta<typeof NFTBurnBadge>;

const Template: ComponentStory<typeof NFTBurnBadge> = (args) => (
  <NFTBurnBadge {...args} />
);

export const DefaultBadge = Template.bind({});
DefaultBadge.args = {};
