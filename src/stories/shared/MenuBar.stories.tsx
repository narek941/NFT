import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuBar } from '@shared/MenuBar';

export default {
  title: 'Shared/MenuBar',
  component: MenuBar,
} as ComponentMeta<typeof MenuBar>;

const DemoCard: FC = () => (
  <div
    style={{
      width: '300px',
      height: '300px',
      backgroundColor: '#000',
      margin: '50px',
    }}
  ></div>
);

const children = (
  <>
    <div>Lorem 1 ipsum dolor sit amet</div>
    <div>Lorem 2 ipsum dolor sit amet</div>
    <div>Lorem 3 ipsum dolor sit amet</div>
    <div>Lorem 4 ipsum dolor sit amet</div>
    <div>Lorem 5 ipsum dolor sit amet</div>
    <div>Lorem 6 ipsum dolor sit amet</div>
  </>
);

const Template: ComponentStory<typeof MenuBar> = (args) => (
  <div style={{ display: 'flex', height: '800px' }}>
    <MenuBar {...args} />
    <div style={{ display: 'flex', flexWrap: 'wrap', flexGrow: 0 }}>
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
);

export const DefaultMenuBar = Template.bind({});
DefaultMenuBar.args = {
  children,
};
