import HomePage from '@components/HomePage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { packs } from 'src/__mocks__/packs';

export default {
  title: 'Components/HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => (
  <div style={{ width: '100%' }}>
    <HomePage userType={false} />
  </div>
);

export const DefaultHomePage = Template.bind({});
DefaultHomePage.args = {};
