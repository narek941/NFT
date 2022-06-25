import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShoppingCart from '@components/shared/ShoppingCart';

export default {
  title: 'Shared/ShoppingCart',
  component: ShoppingCart,
} as ComponentMeta<typeof ShoppingCart>;

const style = {
  margin: '20px',
  maxWidth: 'max-content',
  width: '100%',
};
const Template: ComponentStory<typeof ShoppingCart> = (args) => {
  return (
    <div style={style}>
      <ShoppingCart {...args} />
    </div>
  );
};

export const DefaultShoppingCart = Template.bind({});
DefaultShoppingCart.args = {
  price: '$20',

  onClick: () => {
    console.log('onClick Shopping Cart');
  },
};
