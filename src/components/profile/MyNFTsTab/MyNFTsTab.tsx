import { Card } from '@components/Card/Card';
import Container from '@components/shared/Container';
import { ICollection } from '@type/ICollection';
import { INFTDetail } from '@type/nft';
import React, { FC, useEffect, useState } from 'react';
import { ProfileFilterBlock } from '../ProfileFilterBlock';
import styles from './MyNFTsTab.module.scss';
import sGrid from '@styles/sGrid.module.scss';
import { WithdrawDetail } from '@components/withdraw/WithdrawDetail';
import Modal from '@components/modal';
import { IModalView } from '../../../common/models/modal-view';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { toast } from 'react-toastify';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { ProfileSearchBlock } from '../ProfileSearchBlock';
import Pagination from '@shared/Pagination';
import {
  DEFAULT_LIMIT,
  getOffset,
  getPagesCnt,
} from '../../../common/utils/pagination';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import NoItems from '@shared/NoItems';
import { IMyNFT } from '@type/ntf-token';
import { createCardItemFromNFTToken } from '@utils/nftUtils';
import {
  clearClaimStatus,
  getUserNFTsRequest,
} from '@entities/nft/redux/actions';
import EmptyView from '@components/shared/EmptyView';
import { useRouter } from 'next/router';

export interface IMyNFTsTabProps {
  nftList: INFTDetail[] | IMyNFT[];
  allNFT?: INFTDetail[] | IMyNFT[];
  collections: ICollection[];
  onWithdraw: (nft: IMyNFT) => void;
}

export const MyNFTsTab: FC<IMyNFTsTabProps> = ({
  nftList,
  allNFT,
  collections,
  onWithdraw,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, pending, totalCount, claimedSuccess } = useTypedSelector(
    (state) => state.nft
  );
  const { user } = useTypedSelector((state) => state.user); //to get user metamask address
  const { page, limit } = useTypedSelector((state) => state.filter);
  const [withdrawSelect, setWithdrawSelect] = useState<any>();
  const [view, setView] = useState<IModalView>(IModalView.withdrawInfo);
  const onWithdrawSelect = (withdraw: any) => setWithdrawSelect(withdraw);
  const profileFilterCallback = (formValues) => console.log(formValues);
  const { isLoading } = useTypedSelector((state) => state.filter);
  const setPage = (page: number) => dispatch(filtersUpdate({ page }));

  useEffect(() => {
    const { page, limit, sort, collectionId, tab, ...rest } = router.query;

    dispatch(
      getUserNFTsRequest({
        take: Number(limit || DEFAULT_LIMIT),
        skip: getOffset(Number(page || 1), Number(limit || DEFAULT_LIMIT)),
        sort: 'Nft.' + String(sort || 'rarityScore'),
        collectionId: collectionId ? Number(collectionId) : undefined,
        ...rest,
      })
    );
  }, [router.query]);

  useNoInitialEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useNoInitialEffect(() => {
    if (claimedSuccess) {
      setView(IModalView.withdrawSuccess);
      dispatch(clearClaimStatus());
    }
  }, [error, pending]);

  const search = (searchText: { search: string }) => {
    const { search } = searchText;
    dispatch(filtersUpdate({ search }));
  };

  const sort = (sort) => {
    dispatch(filtersUpdate(sort));
  };

  return (
    <>
      <Modal
        show={!!withdrawSelect}
        onClose={() => {
          setWithdrawSelect(null);
          setView(IModalView.withdrawInfo);
        }}
        modalData={{ withdrawSelect }}
        size='l'
      >
        {withdrawSelect && user && (
          <WithdrawDetail
            onWithdraw={onWithdraw}
            item={withdrawSelect}
            viewDetail={view}
            setView={setView}
          />
        )}
      </Modal>
      <Container>
        {allNFT?.length ? (
          <>
            <div className={styles.wrapper}>
              <ProfileSearchBlock
                onSearch={search}
                onSortChange={sort}
                withdrawCallback={() => {}}
              />

              <ProfileFilterBlock
                collections={collections}
                callback={profileFilterCallback}
              />
              <div className={styles.listWrapper}>
                {nftList.length > 0 && !pending ? (
                  <div
                    className={classNames(styles['nft-wrapper'], sGrid.list)}
                  >
                    {nftList.map((nft) => {
                      return (
                        <Card
                          showRarity={false}
                          key={nft.tokenId || nft.id}
                          item={createCardItemFromNFTToken(nft)}
                          isNFTEntity
                          isOwned
                          onClick={onWithdrawSelect}
                        />
                      );
                    })}
                  </div>
                ) : (
                  !isLoading &&
                  !pending && (
                    <NoItems isButton>No items found for this search</NoItems>
                  )
                )}
              </div>
            </div>

            {nftList.length > 0 && !pending && (
              <div className={styles.paginationBlock}>
                <Pagination
                  setCurrentPage={setPage}
                  currentPage={page}
                  countOfPage={getPagesCnt(totalCount, limit)}
                />
              </div>
            )}
          </>
        ) : (
          !isLoading &&
          !pending && (
            <EmptyView
              emoji='😿'
              btnUrl='/buy'
              btnText='Buy NFT'
              text='No items to display'
            />
          )
        )}
      </Container>
    </>
  );
};
