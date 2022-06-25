import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navbar from '@shared/Navbar';

export default {
  title: 'Shared/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const DefaultNavbar = Template.bind({});
DefaultNavbar.args = {};
