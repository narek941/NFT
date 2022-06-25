import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletBlock from '@components/WalletBlock';
import { Provider, useStore } from 'react-redux';

export default {
  title: 'Components/WalletBlock',
  component: WalletBlock,
} as ComponentMeta<typeof WalletBlock>;

const Template: ComponentStory<typeof WalletBlock> = (args) => {
  const store = useStore();

  return (
    <Provider store={store}>
      <WalletBlock />
    </Provider>
  );
};

export const DefaultWalletBlock = Template.bind({});
DefaultWalletBlock.args = {};
