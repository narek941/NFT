import { RedeemPage } from '@components/redeem/RedeemPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { redeemList } from 'src/__mocks__/redeemList';

export default {
  title: 'Components/RedeemPage',
  component: RedeemPage,
} as ComponentMeta<typeof RedeemPage>;

const Template: ComponentStory<typeof RedeemPage> = (args) => {
  return (
    <div style={{ width: '100%' }}>
      <RedeemPage {...args} />
    </div>
  );
};

export const DefaultRedeemPage = Template.bind({});
DefaultRedeemPage.args = {
  redeemList,
  onRedeem: (redeem) => {
    console.log(redeem);
  },
  onActivate: (redeem) => {
    console.log(redeem);
  },
  userEmail: 'firstname.lastname@example.com',
};
