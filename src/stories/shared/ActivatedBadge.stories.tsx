import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ActivatedBadge from '@shared/Badge/ActivatedBadge';

export default {
  title: 'Shared/ActivatedBadge',
  component: ActivatedBadge,
} as ComponentMeta<typeof ActivatedBadge>;

const Template: ComponentStory<typeof ActivatedBadge> = (args) => (
  <ActivatedBadge {...args} />
);

export const DefaultBadge = Template.bind({});
DefaultBadge.args = {};
