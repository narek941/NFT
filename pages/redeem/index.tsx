import React, { ComponentType } from 'react';
import RedeemPage from '@components/redeem/RedeemPage/RedeemPage';
import { useDispatch } from 'react-redux';
import {
  claimNFTRequest,
  getUserRedeemNFTsRequest,
  redeemNFTRequest,
} from '@entities/nft/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { wrapper } from '../../src/storage/configureStore';
import { authorize } from '@utils/server';
import { getOffset } from '@utils/pagination';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { useNoInitialEffect } from '@hooks/useNoInitialEffect';
import { useRouter } from 'next/router';
import { IMyNFT } from '@type/ntf-token';

const Redeem: ComponentType<{}> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useTypedSelector((state) => state.user);
  const { list, pending, error } = useTypedSelector((state) => state.nft);

  useNoInitialEffect(() => {
    if (!pending && !error) {
      router.replace(router.asPath);
    }
  }, [pending, error]);

  const onActivate = (redeem: IMyNFT) => {
    dispatch(redeemNFTRequest({ tokenId: redeem.id }));
  };

  const onRedeem = (redeem: IMyNFT) => {
    dispatch(redeemNFTRequest({ tokenId: redeem.id }));
  };

  const onWithdraw = (nft) => {
    dispatch(claimNFTRequest({ tokenIds: nft.id }));
  };

  return (
    <>
      {list && (
        <>
          <RedeemPage
            onWithdraw={onWithdraw}
            onActivate={onActivate}
            onRedeem={onRedeem}
            redeemList={list}
            userEmail={user?.email}
          />
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  authorize(async (ctx, store) => {
    const { page, limit, sort, ...rest } = ctx.query;
    await store.dispatch(
      getUserRedeemNFTsRequest({
        take: Number(6),
        skip: getOffset(Number(page || 1), Number(6)),
        sort: String(sort || 'id'),
        redeemable: true,
        ...rest,
      })
    );
    store.dispatch(filtersUpdate({ isLoading: false }));
    return { props: {} };
  })
);

export default Redeem;
