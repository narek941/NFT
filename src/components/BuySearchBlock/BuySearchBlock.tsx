import React, { ComponentType, useRef } from 'react';
import SearchInput from '@shared/SearchInput';
import DropDown from '@shared/DropDown';
import { dropDownOptions } from './BuySearchBlock.helper';
import ButtonGroup from '@shared/ButtonGroup';
import IconGrid2 from '../../../public/other/grid_2.svg';
import IconGrid4 from '../../../public/other/grid_4.svg';
import styles from './BuySearchBlock.module.scss';
import Debounce from 'lodash/debounce';
import classNames from 'classnames';
import CurrencyDordown from '@components/CurrencyDordown';

export enum ViewTypes {
  GRID_BIG = 'GRID_BIG',
  GRID_SMALL = 'GRID_SMALL',
}

export interface IBuySearchBlockProps {
  isOpenMenu?: boolean;
  onSearch: (value) => void;
  onSortChange: (value) => void;
  handleSetViewType: (view: ViewTypes) => void;
  view?: ViewTypes;
  currency?: boolean;
  counter?: string | number;
  options?: any[];
  selectedOptions?: string;
}

export const BuySearchBlock: ComponentType<IBuySearchBlockProps> = ({
  isOpenMenu,
  onSearch,
  onSortChange,
  handleSetViewType,
  currency,
  counter,
  options,
  selectedOptions,
}) => {
  const inputRef = useRef<any>(null);

  return (
    <div
      className={classNames(styles.wrapper, isOpenMenu && styles.isOpenMenu)}
    >
      <div className={styles['column-main']}>
        <div className={styles['nftCount-wrapper']}>
          {currency && <CurrencyDordown />}

          <div className={styles.nftCount}>
            NFTs: <span className={styles.value}>{counter}</span>
          </div>
        </div>
        <SearchInput
          className={styles.search}
          ref={inputRef}
          debounceTime={500}
          onSearch={onSearch}
          placeholder={'Search via Token ID/Name/Traits'}
        />
        <div className={styles.sortBy}>
          <span className={styles['sortBy-title']}>Sort by:</span>
          <DropDown
            className={styles['sortBy-dropDown']}
            handleSelectedValue={onSortChange}
            usingValue={true}
            options={!options ? dropDownOptions : options}
            selectedOptions={
              !selectedOptions ? 'Price high to low' : selectedOptions
            }
            icon={true}
            isBorder
            right
          />
        </div>
      </div>
      <div className={styles.viewBtn}>
        <ButtonGroup
          isActive={true}
          buttonGroup={[
            {
              id: '1',
              button: (
                <IconGrid4
                  onClick={Debounce((e) => {
                    handleSetViewType &&
                      handleSetViewType(ViewTypes.GRID_SMALL);
                  }, 200)}
                />
              ),
            },
            {
              id: '2',
              button: (
                <IconGrid2
                  onClick={Debounce((e) => {
                    handleSetViewType && handleSetViewType(ViewTypes.GRID_BIG);
                  }, 200)}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
