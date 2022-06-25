import HomeCarousel from '@components/Carousels/HomeCarousel';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PackCard } from '@components/pack/PackCard';
import { packs } from 'src/__mocks__/packs';
import { IPack } from 'src/common/models/pack';

export default {
  title: 'Components/HomeCarousel',
  component: HomeCarousel,
} as ComponentMeta<typeof HomeCarousel>;

const Template: ComponentStory<typeof HomeCarousel> = (args) => (
  <HomeCarousel {...args} />
);

const onCardClick = (pack: IPack) => console.log('pack is clicked: ', pack);
const onButtonClick = (pack: IPack) =>
  console.log('pack button is clicked: ', pack);

export const DefaultHomeCarousel = Template.bind({});
DefaultHomeCarousel.args = {
  slides: [
    {
      id: 0,
      item: (
        <PackCard
          key={0}
          item={packs[0]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 1,
      item: (
        <PackCard
          key={1}
          item={packs[1]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 2,
      item: (
        <PackCard
          key={2}
          item={packs[2]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 3,
      item: (
        <PackCard
          key={3}
          item={packs[3]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 4,
      item: (
        <PackCard
          key={4}
          item={packs[4]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 5,
      item: (
        <PackCard
          key={5}
          item={packs[5]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 6,
      item: (
        <PackCard
          key={6}
          item={packs[6]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
    {
      id: 7,
      item: (
        <PackCard
          key={7}
          item={packs[7]}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ),
    },
  ],
};
