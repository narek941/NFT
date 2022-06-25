import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileFilterBlock } from '@components/profile/ProfileFilterBlock';
import { collectionList } from 'src/__mocks__/collectionList';
import { MockFilterStore } from 'src/storage/mockFilterStore';

export default {
  title: 'Components/ProfileFilterBlock',
  component: ProfileFilterBlock,
} as ComponentMeta<typeof ProfileFilterBlock>;

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

const Template: ComponentStory<typeof ProfileFilterBlock> = (args) => (
  <MockFilterStore>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ProfileFilterBlock {...args} />
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

export const DefaultProfileFilterBlock = Template.bind({});
DefaultProfileFilterBlock.args = {
  collections: collectionList,
  callback: (data) => console.log('callback fired: ', data),
};
