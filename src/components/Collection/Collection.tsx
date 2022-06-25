import styles from './Collection.styles.module.scss';
import sGrid from '@styles/sGrid.module.scss';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@components/shared/Pagination';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { getPagesCnt } from 'src/common/utils/pagination';
import { useDispatch } from 'react-redux';
import { filtersUpdate } from '@entities/filters/redux/actions';
import Container from '@components/shared/Container';
import { ICollection } from '@type/ICollection';
import { Spinner } from '@components/shared/Spinner';
import { CollectionFilterBlock } from './CollectionFilterBlock';
import { ViewTypes } from '@components/BuySearchBlock/BuySearchBlock';
import { BuySearchBlock } from '@components/BuySearchBlock';
import classNames from 'classnames';
import PageHeader from '@components/shared/PageHeader';
import { CollectionCard } from '@components/Card/CollectionCard';
import NoItems from '@components/shared/NoItems';
import { collectionDropDownOptions } from './CollectionFilterBlock/CollectionFilterBlock.helper';

export interface ICollectionProps {
  list: ICollection[];
  totalCount: number;
}

export const Collection: FC<ICollectionProps> = ({ list, totalCount }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const setPage = (page: number) => dispatch(filtersUpdate({ page }));
  const { page, limit, isLoading } = useTypedSelector((state) => state.filter);
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_SMALL);

  const handleSetViewType = (viewType) => {
    setViewType(viewType);
  };

  const showCollectionNFTs = async (item: { id }) => {
    await router.push(`collection/${item.id}`);
  };

  const sort = (sort) => {
    dispatch(filtersUpdate(sort));
  };

  const search = (searchText: { search: string }) => {
    const { search } = searchText;
    dispatch(filtersUpdate({ search }));
  };

  return (
    <>
      <Spinner isFullScreen isLoading={isLoading} />
      <div className={styles.general}>
        <PageHeader className={styles.title}>Collections</PageHeader>

        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </div>
        <hr className={styles.line} />

        <Container className={styles.container}>
          <div className={styles.content}>
            <BuySearchBlock
              view={ViewTypes.GRID_SMALL}
              onSortChange={sort}
              onSearch={search}
              handleSetViewType={handleSetViewType}
              counter={list.length}
              options={collectionDropDownOptions}
              selectedOptions={'Latest drop date'}
            />

            <CollectionFilterBlock callback={(data) => console.log(data)} />

            {list.length > 0 ? (
              <div className={styles.listWrapper}>
                <div
                  className={classNames(
                    sGrid.list,
                    viewType === ViewTypes.GRID_BIG && sGrid.isLarge
                  )}
                >
                  {!isLoading &&
                    list.map((collection) => {
                      return (
                        <CollectionCard
                          className={classNames(
                            styles['collection-item'],
                            viewType === ViewTypes.GRID_BIG && styles.isLarge
                          )}
                          key={collection.id}
                          item={collection}
                          isLarge={viewType === ViewTypes.GRID_BIG}
                          onClick={(data) => {
                            showCollectionNFTs(data);
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            ) : (
              !isLoading && (
                <NoItems isButton>No items found for this search</NoItems>
              )
            )}
          </div>
          {list.length > 0 && (
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
