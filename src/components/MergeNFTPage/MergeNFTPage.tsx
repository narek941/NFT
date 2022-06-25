/* global JSX */
import React, { FC, useState } from 'react';
import NextHead from '@components/Head';
import Container from '@shared/Container';
import PageHeader from '@components/shared/PageHeader';
import CarouselSwiper from '@components/CarouselSwiper';
import { mergeNFTList } from 'src/__mocks__/mergeNFTList';
import { newMergeNFT } from 'src/__mocks__/newMergeNFT';
import { SwiperSlide } from 'swiper/react';

import CardMerge from '@components/CardMerge';
import Section from '@components/shared/Section';
import MergeNFTsTabs from './MergeNFTsTabs';

import MergeNFTSearch from './MergeNFTSearch';
import MergeNFTList from './MergeNFTList';
import Pagination from '@components/shared/Pagination';
import { nftList } from 'src/__mocks__/nftList';

import styles from './MergeNFTPage.module.scss';
import useMergeNFT from './useMergeNFT';
import PopUpMergeNFT from './PopUpMergeNFT';
import TabContent from '@components/TabContent';

const MergeNFTPage = () => {
  const {
    onClickMerge,
    onOpenGetNFTCard,
    openPopUp,
    setOpenPopUp,
    onClickGotNFT,
    activeTab,
    setActiveTab,
  } = useMergeNFT();

  const onCloseTab = () => {
    setActiveTab('');
  };

  return (
    <>
      <NextHead
        title='Merge NFTs | Niftables'
        description='Merge NFTs | Niftables'
      />
      <Section className={styles.section}>
        <Container className={styles.container}>
          <PageHeader className={styles.header}>
            You can Merge Advanced NFTs
          </PageHeader>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </div>
          <CarouselSwiper>
            {mergeNFTList.map((item) => {
              const { id } = item;
              return (
                <SwiperSlide
                  className={styles.slide}
                  id={`#slide_${id}`}
                  key={`slide_${id}`}
                >
                  <CardMerge
                    item={item}
                    isActive={activeTab}
                    setActive={setActiveTab}
                    id={id}
                  />
                </SwiperSlide>
              );
            })}
          </CarouselSwiper>
        </Container>
      </Section>

      {mergeNFTList.length &&
        mergeNFTList.map((item) => {
          return (
            <TabContent
              className={styles.tabContent}
              key={item.id}
              id={item.id}
              activeTab={activeTab}
            >
              <MergeNFTsTabs
                collections={mergeNFTList}
                onOpenGetNFTCard={onOpenGetNFTCard}
                onClickMerge={onClickMerge}
                onCloseTab={onCloseTab}
              />
            </TabContent>
          );
        })}
      <MergeNFTSearch
        countCard={nftList.length}
        onSortChange={() => {}} //Sorting callbacl
        onSearch={() => {}} // Search callback
      />
      <MergeNFTList
        onClickCard={() => {
          console.log('onClickCard');
        }}
        list={mergeNFTList}
      />

      <Pagination
        className={styles.pagination}
        setCurrentPage={(page) => {
          console.log(page);
        }}
        currentPage={1}
        countOfPage={3}
      />

      <PopUpMergeNFT
        onClose={setOpenPopUp}
        show={openPopUp}
        onClickCardGotNFT={onClickGotNFT}
        item={newMergeNFT}
      />
    </>
  );
};

export default MergeNFTPage;
