import React, { ComponentType, useRef } from 'react';
import styles from './RedeemList.module.scss';
import { RedeemCard } from '@components/redeem/RedeemCard/RedeemCard';
import { INFTDetail } from '@type/nft';
import SearchInput from '@shared/SearchInput';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useRouter } from 'next/router';
import NoItems from '@shared/NoItems';
import { IMyNFT } from '@type/ntf-token';
interface IRedeemListProps {
  redeemList: any;
  onRedeemSelect: (redeem: IMyNFT) => void;
  onRedeemBtnClick: (redeem: IMyNFT) => void;
}

export const RedeemList: ComponentType<IRedeemListProps> = ({
  redeemList,
  onRedeemSelect,
  onRedeemBtnClick,
}) => {
  const inputRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { pending } = useTypedSelector((state) => state.nft);
  const router = useRouter();

  const noItemCallback = () => {
    router.push({
      pathname: '/my-profile?tab=profile',
    });
  };

  return (
    <>
      <SearchInput
        className={styles.search}
        ref={inputRef}
        size='s'
        placeholder={'Search via Token ID/Name/Traits'}
        onSearch={(searchText) => {
          const { search } = searchText;
          dispatch(filtersUpdate({ search }));
        }}
      />
      <div className={styles.list}>
        {redeemList.length > 0 && !pending
          ? redeemList.map((redeem: IMyNFT) => (
              <RedeemCard
                onRedeemBtnClick={onRedeemBtnClick}
                key={redeem.id}
                token={redeem}
                onRedeemSelect={onRedeemSelect}
              />
            ))
          : !pending && (
              <NoItems callback={noItemCallback}>
                No items found for this search
              </NoItems>
            )}
      </div>
    </>
  );
};
