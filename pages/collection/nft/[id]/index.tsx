import { useRouter } from 'next/router';
import { NFTDetail } from '@components/nft/NFTDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNFTByIdRequest } from '@entities/nft/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { isServer } from 'src/common/utils/common';

const NFTs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const { nft } = useTypedSelector((state) => state.nft);

  useEffect(() => {
    if (!isServer && id) {
      dispatch(getNFTByIdRequest({ id: +id }));
    }
  }, [id]);

  return nft ? <NFTDetail nft={nft} setSelectedNFTId={() => {}} /> : null;
};

export default NFTs;
