import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingWave from '@components/shared/LoadingWave';
import { useEffect } from '@storybook/addons';

export default {
  title: 'Shared/LoadingWave',
  component: LoadingWave,
} as ComponentMeta<typeof LoadingWave>;

const style = {
  margin: '20px',
  maxWidth: '201px',
  width: '100%',
};
const Template: ComponentStory<typeof LoadingWave> = (args) => {
  const [countPercent, setCountPercent] = useState<number>(0);

  useEffect(() => {
    let counter = countPercent;
    setInterval(() => {
      if (counter == 100) {
        clearInterval();
      } else {
        counter += 1;
        setCountPercent(counter);
      }
    }, 80);
  }, []);

  return (
    <div style={style}>
      <LoadingWave {...args} dataPercent={countPercent} />
    </div>
  );
};

export const DefaultLoadingWave = Template.bind({});
DefaultLoadingWave.args = {};
