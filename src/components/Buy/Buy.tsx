import React, { FC, useEffect, useState } from 'react';
import { Card } from '@components/Card';
import Pagination from '@components/shared/Pagination';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { getPagesCnt } from 'src/common/utils/pagination';
import styles from './Buy.styles.module.scss';
import sGrid from '@styles/sGrid.module.scss';
import { ICardItem } from '@components/Card/Card';
import { BuyFilterBlock } from '@components/BuyFilterBlock';
import Modal from '@components/modal';
import { NFTDetail } from '@components/nft/NFTDetail';
import { INFT } from '@type/nft';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { ICollection, TraitTypes } from '@type/ICollection';
import { $apiWithToken } from '@services/index';
import { Spinner } from '@components/shared/Spinner';
import { BuySearchBlock } from '@components/BuySearchBlock';
import { ViewTypes } from '@components/BuySearchBlock/BuySearchBlock';
import { createCardItemFromNFt } from '@utils/nftUtils';
import PageHeader from '@shared/PageHeader';
import Container from '@shared/Container';
import classNames from 'classnames';

import NoItems from '@shared/NoItems';

export const Buy: FC = () => {
  const { page, limit, isLoading } = useTypedSelector((state) => state.filter);
  const { list, totalCount, traits, rarities } = useTypedSelector(
    (state) => state.nft
  );
  const [selectedNFTId, setSelectedNFTId] = useState<number | null>(null);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_SMALL);

  const dispatch = useDispatch();
  const setPage = (page: number) => dispatch(filtersUpdate({ page }));

  const viewNFTDetails = (item: ICardItem) => {
    const nft = list.find((nft) => nft.id === item.id);
    if (nft) {
      setSelectedNFTId(nft.id);
    }
  };
  const traitKeyValueMap = (traits || []).reduce((res, item) => {
    if (item.type === TraitTypes.string) {
      res[`${item.key}:${item.value}`] = item.count;
    }
    if (item.type === TraitTypes.boolean) {
      res[`boolean:${item.key}`] = item.count;
    }
    return res;
  }, {});

  const raritiesMap = Object.keys(rarities || {}).reduce((res, key) => {
    res[`rarities:${key}`] = rarities?.[key];
    return res;
  }, {});

  useEffect(() => {
    $apiWithToken
      .get('/collections/collections', {
        params: {
          take: 1000,
          skip: 0,
          sort: 'name',
          status: 'AVAILABLE',
          distributions: 'FIXED_PRICE, AUCTION',
        },
      })
      .then(({ data }) => {
        setCollections(data.list);
      });
    // setCollections(collectionList);
  }, []);

  const handleSetViewType = (viewType) => {
    setViewType(viewType);
  };

  const search = (searchText: { search: string }) => {
    const { search } = searchText;
    dispatch(filtersUpdate({ search }));
  };

  const sort = (sort) => {
    dispatch(filtersUpdate(sort));
  };

  const findSelectedNFT = (): INFT => {
    return list.find((item) => item.id === selectedNFTId);
  };

  return (
    <>
      <Modal
        show={selectedNFTId !== null}
        onClose={() => setSelectedNFTId(null)}
        modalData={{ selectedNFTId }}
        size='l'
      >
        {selectedNFTId !== null && (
          <NFTDetail
            nft={findSelectedNFT()}
            setSelectedNFTId={setSelectedNFTId}
          />
        )}
      </Modal>
      <Spinner isFullScreen isLoading={isLoading} />
      <div className={styles.general}>
        <PageHeader className={styles.title}>Сurrently for sale</PageHeader>

        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </div>
        <hr className={styles.line} />

        <Container className={styles.container}>
          <div className={styles.content}>
            <div className={styles.listWrapper}>
              <div
                className={classNames(
                  sGrid.list,
                  viewType === ViewTypes.GRID_BIG && sGrid.isLarge
                )}
              >
                {list.length > 0 && !isLoading ? (
                  <>
                    {list.map((nft) => {
                      return (
                        <Card
                          showLike={true}
                          className={classNames(
                            styles['collection-item'],
                            viewType === ViewTypes.GRID_BIG && styles.isLarge
                          )}
                          key={nft.id}
                          item={createCardItemFromNFt(nft)}
                          isNFTEntity
                          isLarge={viewType === ViewTypes.GRID_BIG}
                          onClick={(data) => {
                            viewNFTDetails(data);
                          }}
                        />
                      );
                    })}
                  </>
                ) : (
                  !isLoading && (
                    <NoItems isButton>No items found for this search</NoItems>
                  )
                )}
              </div>
            </div>
            {collections.length > 0 && (
              <>
                <BuySearchBlock
                  view={ViewTypes.GRID_SMALL}
                  onSortChange={sort}
                  onSearch={search}
                  handleSetViewType={handleSetViewType}
                  counter={list.length}
                />
                <BuyFilterBlock
                  traitKeyValueMap={traitKeyValueMap}
                  raritiesMap={raritiesMap}
                  collections={collections}
                  callback={(data) => console.log(data)}
                />
              </>
            )}
          </div>

          {list.length > 0 && !isLoading && (
            <div className={styles.paginationBlock}>
              <Pagination
                setCurrentPage={setPage}
                currentPage={page}
                countOfPage={getPagesCnt(totalCount, limit)}
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
