import { PackPage } from '@components/pack/PackPage';
import { getPacksRequest, openPackRequest } from '@entities/pack/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Packs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPacksRequest({ take: 1000, skip: 0, sort: 'name' }));
  }, []);

  const { list, revealedNFT } = useTypedSelector((state) => state.pack);

  const handleOpenPack = (packId: number) => {
    dispatch(openPackRequest({ id: packId }));
  };

  return (
    <>
      <PackPage
        packs={list}
        handleOpenPack={handleOpenPack}
        revealedNFT={revealedNFT}
      />
    </>
  );
};

export default Packs;
