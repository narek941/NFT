import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExternalImage } from '@shared/ExternalImage';

export default {
  title: 'Shared/ExternalImage',
  component: ExternalImage,
} as ComponentMeta<typeof ExternalImage>;

const Template: ComponentStory<typeof ExternalImage> = (args) => (
  <div style={{ width: '300px', height: '300px' }}>
    <ExternalImage {...args} />
  </div>
);

export const DefaultExternalImage = Template.bind({});
DefaultExternalImage.args = {
  src: 'https://niftables-dev-collection-bucket.s3.eu-central-1.amazonaws.com/ad263d57-e07f-46dc-8f0d-ca128a11b973.png',
};
