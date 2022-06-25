import { Card, ICardItem } from '@components/Card/Card';
import Container from '@components/shared/Container';
import { ICollection } from '@type/ICollection';
import { FC } from 'react';
import { createCardItemFromNFt } from '@utils/nftUtils';
import styles from './LikedNFTsTab.module.scss';
import sGrid from '@styles/sGrid.module.scss';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import classNames from 'classnames';
import { BuySearchBlockProfile } from '@components/BuySearchBlock';
import { filtersUpdate } from '@entities/filters/redux/actions';
import EmptyView from '@components/shared/EmptyView';
export interface ILikedNFTsTabProps {
  collections: ICollection[];
  onLikedNFTClick: (item: ICardItem) => void;
}

export const LikedNFTsTab: FC<ILikedNFTsTabProps> = ({
  // collections,
  onLikedNFTClick,
}) => {
  const { likedList, pending } = useTypedSelector((state) => state.nft);
  const { isLoading } = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();

  const search = (searchText: { search: string }) => {
    const { search } = searchText;
    dispatch(filtersUpdate({ search }));
  };

  const sort = (sort) => {
    dispatch(filtersUpdate(sort));
  };

  return (
    <>
      {likedList.length > 0 && !pending ? (
        <Container className={styles.container}>
          <BuySearchBlockProfile onSortChange={sort} onSearch={search} />
          <div className={styles.wrapper}>
            <div className={classNames(styles['nft-wrapper'], sGrid.list)}>
              {likedList.map((nft) => {
                return (
                  <Card
                    showLike={true}
                    key={nft.id}
                    item={createCardItemFromNFt(nft)}
                    isNFTEntity
                    onClick={(item) => onLikedNFTClick(item)}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      ) : (
        !isLoading && (
          <EmptyView
            emoji='💔'
            btnUrl='/buy'
            btnText='See all NFTs'
            text={`You haven't favorited any items yet`}
          />
        )
      )}
    </>
  );
};
