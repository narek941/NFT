import NFTsToBuy from '@components/nft';
import { getCollectionNFTsRequest } from '@entities/nft/redux/actions';
import { wrapper } from 'src/storage/configureStore';
import { DEFAULT_LIMIT, getOffset } from 'src/common/utils/pagination';
import { filtersUpdate } from '@entities/filters/redux/actions';

const NFTs = () => {
  return <NFTsToBuy />;
};

export default NFTs;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { page, limit, sort, id, ...rest } = ctx.query;
    await store.dispatch(
      getCollectionNFTsRequest({
        id: String(id),
        take: Number(limit || DEFAULT_LIMIT),
        skip: getOffset(Number(page || 1), Number(limit || DEFAULT_LIMIT)),
        sort: String(sort || 'name'),
        ...rest,
      })
    );
    store.dispatch(filtersUpdate({ isLoading: false }));
    return {
      props: {},
    };
  }
);
