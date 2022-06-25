import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Hero from '@components/Hero';

export default {
  title: 'Components/Hero',
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero />;

export const DefaultHero = Template.bind({});
DefaultHero.args = {};
