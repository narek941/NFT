import React, { ComponentType, useState } from 'react';
import styles from './Redeem.module.scss';
import { RedeemList } from '@components/redeem/RedeemList/RedeemList';
import { INFTDetail } from '@type/nft';
import Modal from '@components/modal';
import { RedeemDetail } from '@components/redeem/RedeemDetail';
import Pagination from '@shared/Pagination';
import { getPagesCnt } from '../../../common/utils/pagination';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useDispatch } from 'react-redux';
import { IModalView } from '../../../common/models/modal-view';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { toast } from 'react-toastify';
import Container from '@components/shared/Container';
import PageHeader from '@components/shared/PageHeader';
import HrComponent from '@components/shared/HrComponent';
import { IMyNFT } from '@type/ntf-token';

interface IRedeemPageProps {
  redeemList: IMyNFT[];
  onRedeem: (redeem: IMyNFT) => void;
  onActivate: (redeem: IMyNFT) => void;
  onWithdraw: (redeem: IMyNFT) => void;
  userEmail?: string;
}

export const RedeemPage: ComponentType<IRedeemPageProps> = ({
  redeemList,
  onRedeem,
  onActivate,
  userEmail,
  onWithdraw,
}) => {
  const dispatch = useDispatch();
  const [redeemModalShow, setRedeemModalShow] = useState<boolean>(false);
  const [redeemSelect, setRedeemSelect] = useState<IMyNFT | undefined>();
  const [view, setView] = useState<IModalView>(IModalView.redeemInfo);

  const setPage = (page: number) => dispatch(filtersUpdate({ page }));
  const { page } = useTypedSelector((state) => state.filter);
  const { totalCount, error, pending } = useTypedSelector((state) => state.nft);

  const onRedeemSelect = (redeem: IMyNFT) => {
    setRedeemSelect(redeem);
    setRedeemModalShow(true);
  };

  const onRedeemBtnClick = (redeem: IMyNFT) => {
    setView(IModalView.redeemConfirm);
    onRedeemSelect(redeem);
  };

  useNoInitialEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useNoInitialEffect(() => {
    if (!error && !pending) {
      setView(IModalView.withdrawSuccess);
    }
  }, [error, pending]);

  return (
    <>
      <div className={styles.general}>
        <PageHeader className={styles.title}>NFTs with utilities</PageHeader>
        <div className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </div>

        <HrComponent height='1' color='light' className={styles.line} />
        <Container className={styles.container}>
          <RedeemList
            onRedeemBtnClick={onRedeemBtnClick}
            onRedeemSelect={onRedeemSelect}
            redeemList={redeemList}
          />
          <Modal
            className={styles.redeemModal}
            show={redeemModalShow}
            onClose={() => {
              setRedeemModalShow(false);
              setRedeemSelect(undefined);
              setView(IModalView.redeemInfo);
            }}
            modalData={{ redeemSelect }}
            size='l'
          >
            {redeemSelect && (
              <RedeemDetail
                onWithdraw={onWithdraw}
                item={redeemSelect}
                onRedeem={onRedeem}
                onActivate={onActivate}
                userEmail={userEmail}
                setView={setView}
                viewDetail={view}
              />
            )}
          </Modal>

          <div className={styles.paginationBlock}>
            <Pagination
              setCurrentPage={setPage}
              currentPage={page}
              countOfPage={getPagesCnt(totalCount, 6)}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default RedeemPage;
