import { Dispatch, FC } from 'react';
import VectorLeftIcon from 'public/other/arrow_left.svg';
import VectorRight from 'public/other/arrow_right.svg';
import styles from './Pagination.module.scss';
import cn from 'classnames';
import { isServer } from 'src/common/utils/common';
import classNames from 'classnames';

interface IPagination {
  setCurrentPage: Dispatch<number>;
  currentPage: number;
  countOfPage: number;
  className?: string;
}

const Pagination: FC<IPagination> = ({
  setCurrentPage,
  currentPage,
  countOfPage,
  className,
}) => {
  if (isServer) {
    return null;
  }

  const setPrevPage = () => {
    document.getElementById('nft-main')?.scrollTo(0, 0);
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const onClickOfNextPage = () => {
    document.getElementById('nft-main')?.scrollTo(0, 0);
    if (currentPage > countOfPage - 1) return;
    setCurrentPage(currentPage + 1);
  };

  const handleSetPage = (page) => () => {
    document.getElementById('nft-main')?.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const createPageData = Array.from({ length: countOfPage }, (_, i) => i + 1);
  const activeRange = [...createPageData].slice(
    currentPage > 1 ? currentPage - 2 : currentPage - 1,
    currentPage + 1
  );

  const isItemInArr = (item) =>
    item === currentPage - 1 ||
    item === currentPage ||
    item === currentPage + 1 ||
    item === currentPage + 2;

  if (!countOfPage) {
    return null;
  }
  const paginationClass: string = classNames(styles.paginationBox, className);

  return (
    <div className={paginationClass}>
      <div
        onClick={setPrevPage}
        className={cn([
          styles.optionItem,
          styles.arrow,
          { [styles.disabled]: currentPage === 1 },
        ])}
      >
        <VectorLeftIcon width={12} height={19} />
      </div>
      <div className={styles.optionLabelBox}>
        {!activeRange.some((i) => i === 1) && (
          <div className={styles.optionItem} onClick={handleSetPage(1)}>
            {1}
          </div>
        )}
        {currentPage > 3 && <div className={styles.optionItem}>...</div>}
        {activeRange.map(
          (item) =>
            isItemInArr(item) && (
              <div
                key={item}
                className={cn([
                  styles.optionItem,
                  { [styles.isCurrent]: item === currentPage },
                ])}
                onClick={handleSetPage(item)}
              >
                {item}
              </div>
            )
        )}
        {currentPage < countOfPage - 2 && (
          <div className={styles.optionItem}>...</div>
        )}
        {currentPage < countOfPage - 1 && (
          <div
            className={styles.optionItem}
            onClick={handleSetPage(countOfPage)}
          >
            {countOfPage}
          </div>
        )}
      </div>
      <div
        onClick={onClickOfNextPage}
        className={cn([
          styles.optionItem,
          styles.arrow,
          { [styles.disabled]: currentPage === countOfPage },
        ])}
      >
        <VectorRight width={12} height={19} />
      </div>
    </div>
  );
};

export default Pagination;
