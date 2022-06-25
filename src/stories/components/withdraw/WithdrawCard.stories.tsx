import { WithdrawCard } from '@components/withdraw/WithdrawCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nftList } from 'src/__mocks__/nftList';

export default {
  title: 'Components/WithdrawCard',
  component: WithdrawCard,
} as ComponentMeta<typeof WithdrawCard>;

const Template: ComponentStory<typeof WithdrawCard> = (args) => {
  return (
    <div style={{ width: '100%' }}>
      <WithdrawCard {...args} />
    </div>
  );
};

export const DefaultRedeemCard = Template.bind({});
DefaultRedeemCard.args = {
  nft: nftList[Math.floor(Math.random() * nftList.length)],
  onWithdrawSelect: () => {},
};
