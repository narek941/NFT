import { MainCarousel } from '@components/Carousels';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mainCarouselSlides } from 'src/__mocks__/mainCarouselSlides';

export default {
  title: 'Components/MainCarousel',
  component: MainCarousel,
} as ComponentMeta<typeof MainCarousel>;

const Template: ComponentStory<typeof MainCarousel> = (args) => (
  <MainCarousel {...args} />
);

export const DefaultCarousel = Template.bind({});
DefaultCarousel.args = {
  slides: mainCarouselSlides,
};
