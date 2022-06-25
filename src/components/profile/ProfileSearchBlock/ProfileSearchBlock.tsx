import React, { ComponentType, useRef, useState } from 'react';
import SearchInput from '@shared/SearchInput';
import DropDown from '@shared/DropDown';
import { dropDownOptions } from './ProfileSearchBlock.helper';
import styles from './ProfileSearchBlock.module.scss';
import Button from '@components/shared/Button';
import btnStyles from '@components/shared/Button/Button.module.scss';
import classNames from 'classnames';

export interface IProfileSearchBlockProps {
  onSearch: (value) => void;
  onSortChange: (value) => void;
  withdrawCallback: () => void;
}

export const ProfileSearchBlock: ComponentType<IProfileSearchBlockProps> = ({
  onSearch,
  onSortChange,
  withdrawCallback,
}) => {
  const inputRef = useRef<any>(null);
  const [toggleInput, setToggleInput] = useState<boolean>(true);

  const onClickToggle = () => {
    setToggleInput(!toggleInput);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <div
          className={classNames(
            styles['search-toggle-wrapper'],
            toggleInput && styles.searchClose
          )}
        >
          <SearchInput
            ref={inputRef}
            size='s'
            className={classNames(styles['search-toggle'])}
            debounceTime={500}
            onSearch={onSearch}
            placeholder={'Search via Token ID/Name/Traits'}
            onToggleInput={onClickToggle}
            toggleInput={toggleInput}
          />
        </div>
        <div className={styles.sortBy}>
          <span className={styles['sortBy-title']}>Sort by:</span>
          <DropDown
            className={styles['sortBy-dropDown']}
            handleSelectedValue={onSortChange}
            usingValue={true}
            options={dropDownOptions}
            selectedOptions={'Rarity Score Low to High'}
            icon={true}
            isBorder
          />
        </div>
      </div>
      {/* Need to hide withdraw functionality for now */}
      {/* <div className={styles.withdrawBtn}>
        <Button
          className={classNames(
            styles['btn-withdraw'],
            btnStyles['btn-withdraw']
          )}
          size='s'
          color='blue'
          fillStyle
          onClick={withdrawCallback}
        >
          <span>Withdraw all NFTS</span>
        </Button>
      </div> */}
    </div>
  );
};
