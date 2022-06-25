import { RedeemCard } from '@components/redeem/RedeemCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { redeemList } from 'src/__mocks__/redeemList';

export default {
  title: 'Components/RedeemCard',
  component: RedeemCard,
} as ComponentMeta<typeof RedeemCard>;

const Template: ComponentStory<typeof RedeemCard> = (args) => {
  return (
    <div style={{ width: '100%' }}>
      <RedeemCard {...args} />
    </div>
  );
};

export const DefaultRedeemCard = Template.bind({});
DefaultRedeemCard.args = {
  token: redeemList[Math.floor(Math.random() * redeemList.length)],
  onRedeemSelect: (item) => console.log(item),
};
