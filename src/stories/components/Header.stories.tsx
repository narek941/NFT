import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import styles from '@components/header/header.module.scss';

import { NavigationSignUp } from '@components/navigation/navigationSignUp';

export default {
  title: 'Components/Header',
  component: NavigationSignUp,
} as ComponentMeta<typeof NavigationSignUp>;

const Template: ComponentStory<typeof NavigationSignUp> = (args) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavigationSignUp />
      </div>
    </header>
  );
};

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {};
