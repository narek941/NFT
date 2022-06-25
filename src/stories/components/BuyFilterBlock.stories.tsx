import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BuyFilterBlock } from '@components/BuyFilterBlock';
import { collectionList } from 'src/__mocks__/collectionList';
import { MockFilterStore } from 'src/storage/mockFilterStore';
export default {
  title: 'Components/BuyFilterBlock',
  component: BuyFilterBlock,
} as ComponentMeta<typeof BuyFilterBlock>;

const DemoCard: FC = () => (
  <div
    style={{
      maxWidth: '277px',
      flex: ' 0 0 auto',
      width: '100%',
      height: '300px',
      backgroundColor: '#000',
    }}
  >
    {}
  </div>
);

const Template: ComponentStory<typeof BuyFilterBlock> = (args) => (
  <MockFilterStore>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BuyFilterBlock {...args} />
      <div
        style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          flexGrow: 1,

          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
      </div>
    </div>
  </MockFilterStore>
);

export const DefaultBuyFilterBlock = Template.bind({});
DefaultBuyFilterBlock.args = {
  collections: collectionList,
  callback: (data) => console.log('callback fired: ', data),
};
