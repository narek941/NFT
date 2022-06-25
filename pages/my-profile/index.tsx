import { NextPage } from 'next/types';
import { wrapper } from 'src/storage/configureStore';
import { authorize } from 'src/common/utils/server';
import { ProfilePage } from '@components/profile/ProfilePage';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { getCollectionsRequest } from '@entities/nft_collection/redux/actions';
import {
  getUserLikedNFTsRequest,
  getUserNFTsRequest,
} from '@entities/nft/redux/actions';
import { DEFAULT_LIMIT, getOffset } from 'src/common/utils/pagination';
import { getUserPacksRequest } from '@entities/pack/redux/actions';

const MyProfilePage: NextPage = () => {
  return <ProfilePage />;
};

export default MyProfilePage;

export const getServerSideProps = wrapper.getServerSideProps(
  authorize(async (ctx, store) => {
    const { page, limit, sort, collectionId, tab, ...rest } = ctx.query;
    await store.dispatch(
      getCollectionsRequest({
        take: 1000,
        skip: 0,
        sort: 'name',
        ...rest,
      })
    );

    await store.dispatch(
      getUserNFTsRequest({
        take: Number(limit || DEFAULT_LIMIT),
        skip: getOffset(Number(page || 1), Number(limit || DEFAULT_LIMIT)),
        sort: 'Nft.' + String(sort || 'id'),
        collectionId: collectionId ? Number(collectionId) : undefined,
        ...rest,
      })
    );

    await store.dispatch(
      getUserNFTsRequest({
        skip: 0,
        take: DEFAULT_LIMIT,
        sort: 'Nft.id',
        isAllNFT: true,
      })
    );

    await store.dispatch(
      getUserLikedNFTsRequest({
        take: Number(limit || DEFAULT_LIMIT),
        skip: getOffset(Number(page || 1), Number(limit || DEFAULT_LIMIT)),
        sort: 'Nft.' + String(sort || 'id'),
        collectionId: collectionId ? Number(collectionId) : undefined,
        ...rest,
      })
    );

    await store.dispatch(
      getUserPacksRequest({
        take: Number(DEFAULT_LIMIT),
        skip: getOffset(Number(1), Number(DEFAULT_LIMIT)),
        sort: 'id',
      })
    );
    store.dispatch(filtersUpdate({ isLoading: false }));

    return {
      props: {},
    };
  })
);
