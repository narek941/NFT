import { Card } from '@components/Card';
import { ICardItem } from '@components/Card/Card';
import { CardCarousel } from '@components/Carousels';
import { PackCard } from '@components/pack/PackCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { nftList } from 'src/__mocks__/nftList';
import { packs } from 'src/__mocks__/packs';
import { createCardItemFromNFt } from '@utils/nftUtils';

export default {
  title: 'Components/CardCarousel',
  component: CardCarousel,
} as ComponentMeta<typeof CardCarousel>;

const TestCard = () => (
  <div
    style={{
      width: '300px',
      height: '300px',
      backgroundColor: '#000',
    }}
  ></div>
);

const createPackCards = () => {
  return packs.map((pack) => (
    <PackCard
      key={pack.id}
      item={pack}
      onCardClick={(pack: IPack) => console.log('pack is clicked: ', pack)}
      onButtonClick={(pack: IPack) => console.log('pack is clicked: ', pack)}
    />
  ));
};

const createNFTCards = () => {
  return nftList.map((nft) => {
    return (
      <Card
        key={nft.id}
        item={createCardItemFromNFt(nft)}
        isNFTEntity
        onClick={(item: ICardItem) => console.log('nft is clicked: ', item)}
      />
    );
  });
};

const Template: ComponentStory<typeof CardCarousel> = (args) => (
  <div style={{ width: '100%' }}>
    <CardCarousel {...args}>{args.children}</CardCarousel>
  </div>
);

export const DefaultCardCarousel = Template.bind({});
DefaultCardCarousel.args = {
  children: [
    <TestCard key={0} />,
    <TestCard key={1} />,
    <TestCard key={2} />,
    <TestCard key={3} />,
    <TestCard key={4} />,
    <TestCard key={5} />,
    <TestCard key={6} />,
    <TestCard key={7} />,
    <TestCard key={8} />,
  ],
};

export const PackCardCarousel = Template.bind({});
PackCardCarousel.args = {
  children: createPackCards(),
};

export const NFTCardCarousel = Template.bind({});
NFTCardCarousel.args = {
  children: createNFTCards(),
};
