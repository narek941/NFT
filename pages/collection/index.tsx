import { NextPage } from 'next/types';
import { Collection } from '@components/Collection';
import { getCollectionsRequest } from '@entities/nft_collection/redux/actions';
import { wrapper } from 'src/storage/configureStore';
import { DEFAULT_LIMIT, getOffset } from 'src/common/utils/pagination';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { filtersUpdate } from '@entities/filters/redux/actions';

const Collections: NextPage = () => {
  const { list, totalCount } = useTypedSelector((state) => state.nftCollection);

  return <Collection list={list} totalCount={totalCount} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { page, limit, sort, ...rest } = ctx.query;
    await store.dispatch(
      getCollectionsRequest({
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

export default Collections;
