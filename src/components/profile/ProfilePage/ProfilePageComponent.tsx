import { INFTDetail } from '@type/nft';
import { FC, useEffect, useMemo, useState } from 'react';
import { IPack } from 'src/common/models/pack';
import styles from './ProfilePage.module.scss';
import { profilePageNav, ProfileTab } from './constants';
import { mainCarouselSlides } from 'src/__mocks__/mainCarouselSlides';
import { MainCarousel } from '@components/Carousels';
import { NavTabs } from '@components/Nav';
import { MyProfileTab } from '../ MyProfileTab';
import { IMyProfileClickHandlers } from '../ MyProfileTab/MyProfileTab';
import { MyPacksTab } from '../MyPacksTab';
import { MyNFTsTab } from '../MyNFTsTab';
import { useRouter } from 'next/router';
import { ICollection } from '@type/ICollection';
import { LikedNFTsTab } from '@components/profile/LikedNFTsTab';
import { IMyNFT } from '@type/ntf-token';

export interface IProfilePageComponentProps {
  nftList: INFTDetail[] | IMyNFT[];
  allNFT: INFTDetail[] | IMyNFT[];
  packList: IPack[];
  collectionList: ICollection[];
  onNFTCardClick: (item) => void;
  onLikedNFTClick: (item) => void;
  onPackCardClick: (pack: IPack) => void;
  onPackAction: (pack: IPack) => void;
  onWithdraw: (withdraw: IMyNFT) => void;
}

export const ProfilePageComponent: FC<IProfilePageComponentProps> = ({
  nftList,
  packList,
  allNFT,
  onNFTCardClick,
  onPackCardClick,
  onPackAction,
  collectionList,
  onWithdraw,
  onLikedNFTClick,
}) => {
  const router = useRouter();

  const myProfileHidden = !allNFT.length && !packList.length;

  const filteredProfilePageNav = useMemo(() => {
    if (myProfileHidden) {
      return profilePageNav
        .filter((item) => item.contentId !== ProfileTab.MY_PROFILE)
        .map((mappedItem, index) => ({
          ...mappedItem,
          id: mappedItem.id,
        }));
    }

    return profilePageNav;
  }, [nftList, packList]);

  const initialActiveTab = useMemo(
    () =>
      filteredProfilePageNav.find((el) => {
        return el.linkTo === router.query.tab;
      })?.id,
    [filteredProfilePageNav, router.query.tab]
  );

  const [activeTab, setActiveTab] = useState<string | number>(
    initialActiveTab || 0
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // router query does not work (return pid as tab after search)
    const tabValue = router.asPath.split('=')[1].split('&')[0];
    switch (tabValue) {
      case 'my-packs':
        setActiveTab(ProfileTab.MY_PACKS);
        break;
      case 'my-nfts':
        setActiveTab(ProfileTab.MY_NFTS);
        break;
      case 'liked-nfts':
        setActiveTab(ProfileTab.LIKED_NFTS);
        break;
      default:
        setActiveTab(ProfileTab.MY_PROFILE);
    }
  }, [router.query, router.asPath]);

  const profileClickHandlers: IMyProfileClickHandlers = {
    all: () => setActiveTab(ProfileTab.MY_NFTS),
    utility: async () => await router.push('/redeem'),
    mergeable: () => console.log('mergeable'),
    pack: () => setActiveTab(ProfileTab.MY_PACKS),
  };

  const memoizedTabs = useMemo(
    () =>
      filteredProfilePageNav.map((item) => {
        const modifiedItem = { ...item };

        switch (item.contentId) {
          case ProfileTab.MY_PROFILE:
            modifiedItem.content = (
              <MyProfileTab
                nftList={allNFT}
                packList={packList}
                onNFTCardClick={onNFTCardClick}
                onPackCardClick={onPackCardClick}
                onPackAction={onPackAction}
                onClickHandlers={profileClickHandlers}
              />
            );
            break;
          case ProfileTab.MY_NFTS:
            modifiedItem.content = (
              <MyNFTsTab
                onWithdraw={onWithdraw}
                nftList={nftList}
                allNFT={allNFT}
                collections={collectionList}
              />
            );
            break;
          case ProfileTab.MY_PACKS:
            modifiedItem.content = (
              <MyPacksTab
                packList={packList}
                onPackAction={onPackAction}
                onPackCardClick={onPackCardClick}
              />
            );
            break;
          case ProfileTab.LIKED_NFTS:
            modifiedItem.content = (
              <LikedNFTsTab
                collections={collectionList}
                onLikedNFTClick={onLikedNFTClick}
              />
            );
            break;

          default:
            break;
        }

        return modifiedItem;
      }),
    [
      filteredProfilePageNav,
      nftList,
      packList,
      collectionList,
      onWithdraw,
      onPackAction,
      onNFTCardClick,
      onPackCardClick,
      onLikedNFTClick,
    ]
  );

  return (
    <>
      <MainCarousel slides={mainCarouselSlides} />
      <div className={styles['wrapper']}>
        <NavTabs
          gap='l'
          tabs={memoizedTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
};
