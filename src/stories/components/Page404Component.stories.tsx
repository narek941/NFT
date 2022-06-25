import Page404Component from '@components/Page404Component';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Page404Component',
  component: Page404Component,
} as ComponentMeta<typeof Page404Component>;

const Template: ComponentStory<typeof Page404Component> = () => (
  <Page404Component />
);

export const DefaultPage404Component = Template.bind({});
