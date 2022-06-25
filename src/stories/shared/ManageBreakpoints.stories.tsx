import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ManageBreakpoints from '@shared/ManageBreakpoints';

export default {
  title: 'Shared/ManageBreakpoints',
  component: ManageBreakpoints,
} as ComponentMeta<typeof ManageBreakpoints>;

const noImage = '/other/avatar.svg';

const Template: ComponentStory<typeof ManageBreakpoints> = () => (
  <ManageBreakpoints />
);

export const DefaultAvatar = Template.bind({});
