import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Copyright from '@components/copyright';

export default {
  title: 'Components/Copyright',
  component: Copyright,
} as ComponentMeta<typeof Copyright>;

const Template: ComponentStory<typeof Copyright> = (args) => <Copyright />;

export const DefaultCopyright = Template.bind({});
DefaultCopyright.args = {};
