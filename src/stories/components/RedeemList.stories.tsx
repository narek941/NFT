import { RedeemList } from '@components/redeem/RedeemList';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { redeemList } from 'src/__mocks__/redeemList';

export default {
  title: 'Components/RedeemList',
  component: RedeemList,
} as ComponentMeta<typeof RedeemList>;

const Template: ComponentStory<typeof RedeemList> = (args) => {
  return (
    <div style={{ width: '100%' }}>
      <RedeemList {...args} />
    </div>
  );
};

export const DefaultRedeemList = Template.bind({});
DefaultRedeemList.args = {
  redeemList,
  onRedeemSelect: (item) => {
    console.log(item);
  },
};
