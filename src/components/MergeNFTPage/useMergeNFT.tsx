import React, { useState } from 'react';

const useMergeNFT = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);

  const onClickMerge = () => {
    setOpenPopUp(!openPopUp);
  };
  const onOpenGetNFTCard = () => {
    console.log('onOpenGetNFTCard');
  };
  const onClickGotNFT = () => {
    console.log('openPopUp', openPopUp);
    setOpenPopUp(false);
  };

  return {
    onOpenGetNFTCard,
    onClickMerge,
    openPopUp,
    setOpenPopUp,
    onClickGotNFT,
    activeTab,
    setActiveTab,
  };
};

export default useMergeNFT;
