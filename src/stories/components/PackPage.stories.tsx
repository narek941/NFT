import { PackPage } from '@components/pack/PackPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { packs } from 'src/__mocks__/packs';

export default {
  title: 'Components/PackPage',
  component: PackPage,
} as ComponentMeta<typeof PackPage>;

const Template: ComponentStory<typeof PackPage> = (args) => (
  <div style={{ width: '100%' }}>
    <PackPage {...args} />
  </div>
);

export const DefaultPackPage = Template.bind({});
DefaultPackPage.args = {
  packs,
};
