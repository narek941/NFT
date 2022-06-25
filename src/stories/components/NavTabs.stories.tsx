import { NavTabs } from '@components/Nav';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Components/NavTabs',
  component: NavTabs,
} as ComponentMeta<typeof NavTabs>;

const tabStyle = {
  width: '100%',
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const tabsContent = [
  <div id='profile' style={tabStyle} key={1}>
    Tab 1 content
  </div>,
  <div id='security' style={tabStyle} key={2}>
    Tab 2 content
  </div>,
  <div id='notifications' style={tabStyle} key={3}>
    Tab 3 content
  </div>,
];

const navTabs = [
  {
    id: 0,
    name: `Profile Settings`,
    linkTo: '#profile',
    content: tabsContent[0],
  },
  {
    id: 1,
    name: `Security Settings`,
    linkTo: '#security',
    content: tabsContent[1],
  },
  {
    id: 2,
    name: `Notifications Settings`,
    linkTo: '#notifications',
    content: tabsContent[2],
  },
];

const style = {
  margin: '20px',
  maxWidth: '550px',
  width: '100%',
};

const Template: ComponentStory<typeof NavTabs> = (args) => {
  const [activeTab, setActiveTab] = useState<string | number>(0);
  return (
    <div style={style}>
      <NavTabs {...args} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export const DefaultNavTabs = Template.bind({});
DefaultNavTabs.args = {
  tabs: navTabs,
  gap: 's',
};
