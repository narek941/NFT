import { NextPage } from 'next/types';
import { wrapper } from 'src/storage/configureStore';
import { getBuyNFTsRequest } from '@entities/nft/redux/actions';
import { DEFAULT_LIMIT, getOffset } from 'src/common/utils/pagination';
import { Buy } from '@components/Buy';
import { filtersUpdate } from '@entities/filters/redux/actions';
import { authorize } from 'src/common/utils/server';

const BuyPage: NextPage = () => {
  return <Buy />;
};

export default BuyPage;

export const getServerSideProps = wrapper.getServerSideProps(
  authorize(async (ctx, store) => {
    const { page, limit, sort, collectionId, ...rest } = ctx.query;

    await store.dispatch(
      getBuyNFTsRequest({
        take: Number(limit || DEFAULT_LIMIT),
        skip: getOffset(Number(page || 1), Number(limit || DEFAULT_LIMIT)),
        sort: String(sort || 'name'),
        collectionId: collectionId ? Number(collectionId) : undefined,
        ...rest,
      })
    );
    store.dispatch(filtersUpdate({ isLoading: false }));
    return {
      props: {},
    };
  })
);
