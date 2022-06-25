import React, { ComponentType, useState, useRef } from 'react';
import SearchInput from '@shared/SearchInput';
import DropDown from '@shared/DropDown';
import { dropDownOptions } from './BuySearchBlock.helper';
import styles from './BuySearchBlock.module.scss';

import classNames from 'classnames';

export interface IBuySearchBlockProps {
  onSearch: (value) => void;
  onSortChange: (value) => void;
}

export const BuySearchBlockProfile: ComponentType<IBuySearchBlockProps> = ({
  onSearch,
  onSortChange,
}) => {
  const inputRef = useRef<any>(null);
  const [toggleInput, setToggleInput] = useState<boolean>(true);

  const onClickToggle = () => {
    setToggleInput(!toggleInput);
  };

  return (
    <div className={classNames(styles.wrapper, styles['wrapper-profile'])}>
      <div className={styles.column}>
        <div
          className={classNames(
            styles['search-toggle-wrapper'],
            toggleInput && styles.searchClose
          )}
        >
          <SearchInput
            ref={inputRef}
            className={classNames(styles['search-toggle'])}
            debounceTime={500}
            onSearch={onSearch}
            placeholder={'Search via Token ID/Name/Traits'}
            onToggleInput={onClickToggle}
            toggleInput={toggleInput}
          />
        </div>
        <div className={classNames(styles.sortBy, styles.sortByProfile)}>
          <span className={styles['sortBy-title']}>Sort by:</span>
          <DropDown
            className={styles['sortBy-dropDown']}
            handleSelectedValue={onSortChange}
            usingValue={true}
            options={dropDownOptions}
            selectedOptions={'Price high to low'}
            icon={true}
            isBorder
          />
        </div>
      </div>
    </div>
  );
};
