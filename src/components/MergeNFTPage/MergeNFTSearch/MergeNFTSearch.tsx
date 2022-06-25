import React, { FC, useRef } from 'react';
import Container from '@components/shared/Container';
import SearchInput from '@components/shared/SearchInput';
import DropDown from '@components/shared/DropDown';
import styles from './MergeNFTSearch.module.scss';
import { IMergeBFTSearchProps } from '@type/general';

import { dropDownOptions } from './MergeNFTSearch.helper';

const MergeNFTSearch: FC<IMergeBFTSearchProps> = ({
  onSortChange,
  onSearch,
  countCard,
}) => {
  const inputRef = useRef<any>(null);
  onSortChange = (sortOption: Record<string, string>) => {
    console.log('onSortChange', sortOption);
  };

  onSearch = (value: Record<string, string>) => {
    console.log('onSearch', value);
  };
  return (
    <Container className={styles['search-wrapper']}>
      {countCard && (
        <div className={styles['count-elem']}>
          NFTs: <span className={styles['count-value']}>{countCard}</span>
        </div>
      )}
      <div className={styles['search-block']}>
        <SearchInput
          ref={inputRef}
          size='s'
          className={styles.searchInput}
          debounceTime={3000}
          onSearch={onSearch}
          placeholder={'Search via Token ID/Name/Traits'}
        />
      </div>
      <div className={styles.sortBy}>
        <span className={styles['sortBy-title']}>Sort by:</span>
        <DropDown
          className={styles['sortBy-dropDown']}
          handleSelectedValue={onSortChange}
          usingValue={true}
          options={dropDownOptions}
          selectedOptions={'Price high to low'}
          icon={true}
          right
          isBorder
        />
      </div>
    </Container>
  );
};

export default MergeNFTSearch;
