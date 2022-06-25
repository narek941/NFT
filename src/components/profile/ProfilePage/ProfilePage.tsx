import { FC, useState } from 'react';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import Modal from '@components/modal';
import { NFTDetail } from '@components/nft/NFTDetail';
import { INFT } from '@type/nft';
import { useDispatch } from 'react-redux';
import { IPack } from 'src/common/models/pack';
import { ProfilePageComponent } from './ProfilePageComponent';
import {
  PackModalBlock,
  PackModalViews,
} from '@components/pack/PackModalBlock';
import { openPackRequest } from '@entities/pack/redux/actions';
import { claimNFTRequest } from '@entities/nft/redux/actions';
import { IMyNFT } from '@type/ntf-token';
import { WithdrawDetail } from '@components/withdraw/WithdrawDetail';
import { IModalView } from 'src/common/models/modal-view';
import {
  createCardItemFromNFt,
  createCardItemFromNFTToken,
} from '@utils/nftUtils';

export const ProfilePage: FC = () => {
  const { list: collectionsList } = useTypedSelector(
    (state) => state.nftCollection
  );
  const {
    list: nftList,
    nft: chosenNFT,
    userAllNFT: allNFT,
    likedList: nftLikedList,
  } = useTypedSelector((state) => state.nft);

  const { user } = useTypedSelector((state) => state.user);

  const {
    list: packList,
    totalCount: packTotalCount,
    revealedNFT,
  } = useTypedSelector((state) => state.pack);

  const onWithdraw = (token: IMyNFT) => {
    dispatch(claimNFTRequest({ tokenIds: [token.id] }));
  };

  const [selectedNFTId, setSelectedNFTId] = useState<number | null>(null);
  const [chosenPack, setChosenPack] = useState<IPack | undefined>(undefined);
  const [modalView, setModalView] = useState<PackModalViews>(
    PackModalViews.opened_pack
  );
  const [view, setView] = useState<IModalView>(IModalView.withdrawInfo);

  const dispatch = useDispatch();

  const handleOpenPack = (packNFTId: number) => {
    dispatch(openPackRequest({ id: packNFTId }));
  };

  const viewNFTDetails = (item: IMyNFT) => {
    const nft = nftList.find((listItem) => listItem.nft.id == item.nft.id);
    nft && setSelectedNFTId(item.id);
  };

  const viewNFTLikedDetails = (item: INFT) => {
    const nft = nftLikedList.find((listItem) => listItem.id == item.id);
    nft && setSelectedNFTId(nft.id);
  };

  const viewPackDetails = (item) => {
    const pack = packList.find((pack: any) => pack.pack.id === item.id);
    if (pack) {
      setChosenPack(item);
      setModalView(PackModalViews.detail);
    }
  };

  const onPackAction = (pack: IPack) => {
    setChosenPack(pack);
    setModalView(PackModalViews.opening_pack);
    handleOpenPack(pack.id);
  };

  const handleBlockClose = () => {
    setChosenPack(undefined);
    setModalView(PackModalViews.detail);
  };

  const gotoNFT = () => {
    setChosenPack(undefined);
    revealedNFT && setSelectedNFTId(revealedNFT.id);
  };

  const findSelectedNFT = () => {
    const combinedList = [...nftList, ...nftLikedList];
    revealedNFT && combinedList.push(revealedNFT);
    return (
      combinedList.find((item) => item.id === selectedNFTId) || { ...chosenNFT }
    );
  };

  const createProfileCardItem = () => {
    const item = findSelectedNFT();
    if ((item as any).minted) {
      return createCardItemFromNFTToken(item as IMyNFT);
    }
    return createCardItemFromNFt(item as INFT);
  };

  const selectedItem = createProfileCardItem();

  return (
    <>
      <Modal
        show={selectedNFTId !== null}
        onClose={() => setSelectedNFTId(null)}
        modalData={{ selectedNFTId }}
        size='l'
      >
        {selectedNFTId !== null &&
        user &&
        selectedItem &&
        (selectedItem as any).minted ? (
          <WithdrawDetail
            onWithdraw={onWithdraw}
            item={createProfileCardItem()}
            viewDetail={view}
            setView={setView}
          />
        ) : (
          <NFTDetail
            nft={findSelectedNFT()}
            setSelectedNFTId={setSelectedNFTId}
          />
        )}
      </Modal>
      {chosenPack && (
        <PackModalBlock
          modalView={modalView}
          setModalView={setModalView}
          chosenPack={chosenPack}
          handleBlockClose={handleBlockClose}
          handleOpenPack={handleOpenPack}
          gotoNFT={gotoNFT}
          revealedNFT={revealedNFT}
        />
      )}

      <ProfilePageComponent
        onWithdraw={onWithdraw}
        nftList={nftList}
        packList={packList}
        allNFT={allNFT}
        collectionList={collectionsList}
        onNFTCardClick={viewNFTDetails}
        onLikedNFTClick={viewNFTLikedDetails}
        onPackCardClick={viewPackDetails}
        onPackAction={onPackAction}
      />
    </>
  );
};
