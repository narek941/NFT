import { WithdrawList } from '@components/withdraw/WithdrawList';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nftList } from 'src/__mocks__/nftList';

export default {
  title: 'Components/WithdrawList',
  component: WithdrawList,
} as ComponentMeta<typeof WithdrawList>;

const Template: ComponentStory<typeof WithdrawList> = (args) => {
  return (
    <div style={{ width: '100%' }}>
      <WithdrawList {...args} />
    </div>
  );
};

export const DefaultWithdrawList = Template.bind({});
DefaultWithdrawList.args = {
  nftList,
  onWithdrawSelect: () => {},
};
