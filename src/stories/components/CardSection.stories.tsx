import { PackCard } from '@components/pack/PackCard';
import { CardSection } from '@components/profile/CardSection';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { packs } from 'src/__mocks__/packs';
import { SwiperSlide } from 'swiper/react';

export default {
  title: 'Components/CardSection',
  component: CardSection,
} as ComponentMeta<typeof CardSection>;

const Template: ComponentStory<typeof CardSection> = (args) => (
  <CardSection {...args} />
);

const createPackCards = () => {
  return packs.map((pack) => (
    <SwiperSlide key={pack.id}>
      <PackCard
        key={pack.id}
        item={pack}
        onCardClick={(pack: IPack) => console.log('pack is clicked: ', pack)}
        onButtonClick={(pack: IPack) => console.log('pack is clicked: ', pack)}
      />
    </SwiperSlide>
  ));
};

export const DefaultCardSection = Template.bind({});
DefaultCardSection.args = {
  text: 'Unopened Packs',
  total: 16,
  buttonText: 'Open now',
  onButtonClick: () => console.log('you have button is clicked'),
  children: createPackCards(),
};
