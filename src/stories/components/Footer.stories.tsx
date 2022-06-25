import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from '@components/footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer />;

export const DefaultFooter = Template.bind({});
DefaultFooter.args = {};
