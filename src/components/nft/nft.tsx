import styles from './nft.module.scss';
import sGrid from '@styles/sGrid.module.scss';
import { FC, useEffect, useMemo, useState } from 'react';
import Modal from '@components/modal';
import { NFTDetail } from '@components/nft/NFTDetail';
import type { INFT } from '@type/nft';
import { BuyFilterBlock } from '@components/BuyFilterBlock';
import { Card } from '@components/Card';
import { ICardItem } from '@components/Card/Card';
import Container from '@components/shared/Container';
import { createCardItemFromNFt } from '@utils/nftUtils';
import { Spinner } from '@components/shared/Spinner';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { getPagesCnt } from 'src/common/utils/pagination';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import Pagination from '@components/shared/Pagination';
import { $apiWithToken } from '@services/index';
import { useRouter } from 'next/router';
import { ICollection, TraitTypes } from '@type/ICollection';

import ArrowRight from '/public/field-icons/arrow-right.svg';
import PageHeader from './../shared/PageHeader/PageHeader';
import { BuySearchBlock } from '@components/BuySearchBlock';
import { ViewTypes } from '@components/BuySearchBlock/BuySearchBlock';
import classNames from 'classnames';
import HrComponent from '@components/shared/HrComponent';
import NoItems from '@shared/NoItems';

const NFTsToBuy: FC = () => {
  const [selectedNFTId, setSelectedNFTId] = useState<number | null>(null);
  const [collection, setCollection] = useState<null | ICollection>(null);
  const { page, limit, isLoading } = useTypedSelector((state) => state.filter);
  const { list, totalCount, traits } = useTypedSelector((state) => state.nft);
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_SMALL);

  const router = useRouter();

  const dispatch = useDispatch();
  const setPage = (page: number) => dispatch(filtersUpdate({ page }));

  const viewNFTDetails = (nftData: ICardItem) => {
    const nft = list?.find((item) => item.id === nftData.id);
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

  useEffect(() => {
    $apiWithToken.get(`/collections/${router.query.id}`).then(({ data }) => {
      setCollection(data);
    });
  }, []);

  const handleSetViewType = (viewType) => {
    setViewType(viewType);
  };

  const sort = (sort) => {
    dispatch(filtersUpdate(sort));
  };

  const search = (searchText: { search: string }) => {
    const { search } = searchText;
    dispatch(filtersUpdate({ search }));
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
      <Container className={styles.general}>
        <div className={styles['back-to-collections']}>
          <ArrowRight />
          <div onClick={async () => await router.push('/collection')}>
            Back to collections
          </div>
        </div>
        <PageHeader className={styles.heading} imageUrl={collection?.imageUrl}>
          {collection?.name}
        </PageHeader>

        <div className={styles.text}>{collection?.description}</div>
      </Container>
      <HrComponent className={styles.hrLine} height='1' color='light' />
      <Container className={styles.container}>
        <div className={styles.wrapper}>
          {collection && (
            <>
              <BuySearchBlock
                view={ViewTypes.GRID_SMALL}
                onSortChange={sort}
                onSearch={search}
                handleSetViewType={handleSetViewType}
                counter={list.length}
              />
              <BuyFilterBlock
                collections={[collection]}
                traitKeyValueMap={traitKeyValueMap}
                withDefaultCollection
                callback={(data) => console.log('callback fired: ', data)}
              />
            </>
          )}

          {collection && !isLoading && list.length > 0 ? (
            <div id={'nft'} className={styles.content}>
              <div className={styles.listWrapper}>
                <div
                  className={classNames(
                    sGrid.list,
                    viewType === ViewTypes.GRID_BIG && sGrid.isLarge
                  )}
                >
                  {list.map((nft) => {
                    return (
                      <Card
                        className={classNames(
                          styles['collection-item'],
                          viewType === ViewTypes.GRID_BIG && styles.isLarge
                        )}
                        key={nft.id}
                        showLike={true}
                        item={createCardItemFromNFt(nft)}
                        isNFTEntity
                        onClick={(data) => {
                          viewNFTDetails(data);
                        }}
                        isLarge={viewType === ViewTypes.GRID_BIG}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            !isLoading && (
              <NoItems className={styles.noItem} isButton>
                No items found for this search
              </NoItems>
            )
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
    </>
  );
};

export default NFTsToBuy;
