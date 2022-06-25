import React, { ComponentType, useState } from 'react';
import { INFTDetail } from '@type/nft';
import styles from './RedeemConfirm.module.scss';
import { ExternalImage } from '@shared/ExternalImage';
import Placeholder from '../../../../../public/assets/img/img-placeholder.svg';
import Button from '@shared/Button';
import NFTBurnBadge from '@shared/Badge/NFTBurnBadge';
import { IMyNFT } from '@type/ntf-token';
import { ethers } from 'ethers';
import { $apiWithToken } from '@services/index';
import { toast } from 'react-toastify';
import { useMetamask } from '@hooks/useMetamask';
import { handleRedeem } from '@components/redeem/redeem.utils';

interface IRedeemConfirmProps {
  redeem: IMyNFT;
  onConfirm?: () => void;
  onRedeem: (redeem: IMyNFT) => void;
  onActivate: (redeem: IMyNFT) => void;
}
export const RedeemConfirm: ComponentType<IRedeemConfirmProps> = ({
  redeem,
  onConfirm,
  onActivate,
  onRedeem,
}) => {
  const [loading, setLoading] = useState(false);
  const { getMetamaskAddress } = useMetamask();

  // const _handleRedeem = async (token) => {
  //   console.log('_handleRedeem', token);
  //   if (token.utilityStatus === 'REDEEMABLE' && token.claimed) {
  //     if (window.ethereum) {
  //       setLoading(true);
  //       const provider = new ethers.providers.Web3Provider(window.ethereum); // create provider for metamask
  //
  //       const metamaskData = await $apiWithToken
  //         .get(`collections/nft-redeem/${token.id}`)
  //         .then(async (res) => {
  //           const { data, gas, to } = res.data;
  //           return { data, gas, to };
  //         })
  //         .catch((error) => {
  //           if (error.response) {
  //             setLoading(false);
  //             if (error.response.data.message === 'INSUFFICIENT_FUNDS') {
  //               toast.error(error.response.data.message);
  //             } else {
  //               toast.error('Crypto purchase failed');
  //             }
  //           }
  //         });
  //
  //       if (metamaskData) {
  //         const { data, gas, to } = metamaskData;
  //         provider
  //           .send('eth_requestAccounts', []) // get metamask address
  //           .then(async (accounts: string[]) => {
  //             // if metamask has connected
  //             if (accounts) {
  //               if (data && gas && to) {
  //                 //if all data is available
  //                 const transactionParameters = {
  //                   gas: ethers.utils.hexValue(Number(gas)),
  //                   to,
  //                   from: getMetamaskAddress(),
  //                   data,
  //                   value: ethers.utils.hexValue(Number(0)),
  //                 }; // create transaction parameters
  //
  //                 await provider.send('eth_estimateGas', [
  //                   transactionParameters,
  //                 ]); // get gas estimate
  //                 const transactionHash = await provider.send(
  //                   'eth_sendTransaction',
  //                   [transactionParameters]
  //                 ); // send transaction
  //                 if (transactionHash && token.id) {
  //                   // if transaction is successful
  //                   const completed = await $apiWithToken.post(
  //                     '/collections/nft-redeem-complete',
  //                     { tokenId: token.id, transactionHash }
  //                   ); // complete purchase
  //                   if (completed) {
  //                     toast.success('Redeem Successful');
  //                   }
  //                 }
  //               }
  //             } else {
  //               setLoading(false);
  //               toast.error('Metamask is not connected');
  //             }
  //           })
  //           .catch((error) => {
  //             setLoading(false);
  //             if (error.code === 4001) {
  //               toast.warn('Please connect to MetaMask.');
  //             } else {
  //               toast.error('Metamask: something went wrong.');
  //             }
  //           });
  //       }
  //     } else {
  //       toast.error('Metamask is not installed');
  //       setTimeout(() => {
  //         window.open('https://metamask.io/download/', '_blank');
  //       }, 2000);
  //     }
  //   } else {
  //     if (redeem.utilityStatus == 'ACTIVATABLE') {
  //       onActivate(redeem);
  //     }
  //     if (redeem.utilityStatus == 'REDEEMABLE') {
  //       onRedeem(redeem);
  //     }
  //     onConfirm && onConfirm();
  //   }
  // };

  const _getButtonText = (): string => {
    if (redeem.utilityStatus === 'ACTIVATABLE') {
      return 'Activate NFT';
    }
    if (redeem.utilityStatus === 'REDEEMABLE') {
      return 'Redeem NFT';
    }
    return 'Activate NFT';
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        {redeem.nft.mediaUrl ? (
          <ExternalImage
            className={styles.image}
            src={redeem.nft.mediaUrl}
            alt={redeem.nft.description}
          />
        ) : (
          <Placeholder className={styles.image} />
        )}
      </div>
      <div className={styles.title}>{redeem.nft.name}</div>
      {redeem.utilityStatus == 'REDEEMABLE' && (
        <div className={styles.confirmText}>
          Please, confirm that you want to redeem selected NFT
        </div>
      )}

      {redeem.utilityStatus == 'REDEEMABLE' && (
        <div className={styles.badge}>
          <NFTBurnBadge />
        </div>
      )}
      <div className={styles.action}>
        <Button
          loading={loading}
          disabled={loading}
          className={styles.button}
          size={'m'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          onClick={(e) => {
            e.stopPropagation();
            handleRedeem(
              redeem,
              setLoading,
              getMetamaskAddress,
              onActivate,
              onRedeem,
              onConfirm
            );
          }}
        >
          {_getButtonText()}
        </Button>
      </div>
    </div>
  );
};
