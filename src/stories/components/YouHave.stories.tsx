import { YouHave } from '@components/profile/YouHave';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/YouHave',
  component: YouHave,
} as ComponentMeta<typeof YouHave>;

const Template: ComponentStory<typeof YouHave> = (args) => (
  <YouHave {...args} />
);

export const DefaultYouHave = Template.bind({});
DefaultYouHave.args = {
  text: 'Unopened Packs',
  total: 16,
  buttonText: 'Open now',
  onButtonClick: () => console.log('you have button is clicked'),
};
