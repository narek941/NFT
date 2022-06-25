import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageHeader from '@shared/PageHeader';

export default {
  title: 'Shared/PageHeader',
  component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
);

export const DefaultPageHeader = Template.bind({});
DefaultPageHeader.args = {
  children: 'The Collection',
};
