import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from '@shared/Badge';

export default {
  title: 'Shared/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const DefaultBadge = Template.bind({});
DefaultBadge.args = {
  children: 'Default Badge',
};
export const PrimaryBadge = Template.bind({});
PrimaryBadge.args = {
  color: 'primary',
  children: 'Primary Badge',
  rounded: true,
};

export const BadgeWithIconClose = Template.bind({});
BadgeWithIconClose.args = {
  iconClose: true,
  children: 'Badge With IconClose',
};

export const BadgeRoundedAndSmall = Template.bind({});
BadgeRoundedAndSmall.args = {
  rounded: true,
  uppercase: true,
  size: 's',
  children: 'Badge Rounded',
};
