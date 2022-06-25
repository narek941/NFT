import React, { ComponentType, useState } from 'react';
import styles from './MetamaskCheckout.styles.module.scss';
import Button from '@shared/Button';
import { NFTDetailViews } from '@components/nft/NFTDetail/NFTDetail';
import BinanceLogoSmall from '/public/field-icons/binance_logo_small.svg';
import { ethers } from 'ethers';
import { $apiWithToken } from '@services/index';
import { toast } from 'react-toastify';
import { useMetamask } from '@hooks/useMetamask';
import Web3Utils from 'web3-utils';

interface IMetamaskCheckoutProps {
  renderMedia: () => any;
  nft: any;
  setView: (view: NFTDetailViews) => void;
}

export const MetamaskCheckout: ComponentType<IMetamaskCheckoutProps> = ({
  renderMedia,
  nft,
  setView,
}) => {
  const [loading, setLoading] = useState(false);
  const { getMetamaskAddress } = useMetamask();

  const _buyWithCrypto = async () => {
    // if metamask is installed
    if (window.ethereum) {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum); // create provider for metamask

      const metamaskData = await $apiWithToken
        .get(`collections/nft-crypto-purchase/${nft.id}`)
        .then(async (res) => {
          const { data, gas, to, value, tokenId } = res.data;
          return { data, gas, to, value, tokenId };
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
            if (error.response.data.message === 'INSUFFICIENT_FUNDS') {
              toast.error(error.response.data.message);
            } else {
              toast.error('Crypto purchase failed');
            }
          }
        });

      if (metamaskData) {
        const { data, gas, to, value, tokenId } = metamaskData;
        provider
          .send('eth_requestAccounts', []) // get metamask address
          .then(async (accounts: string[]) => {
            // if metamask has connected
            if (accounts) {
              if (data && gas && to && value) {
                //if all data is available
                const transactionParameters = {
                  gas: Web3Utils.toHex(gas),
                  to,
                  from: getMetamaskAddress(),
                  data,
                  value: Web3Utils.toHex(value),
                }; // create transaction parameters

                await provider.send('eth_estimateGas', [transactionParameters]); // get gas estimate
                const transactionHash = await provider.send(
                  'eth_sendTransaction',
                  [transactionParameters]
                ); // send transaction
                if (transactionHash && tokenId) {
                  // if transaction is successful
                  const completed = await $apiWithToken.post(
                    '/collections/nft-crypto-purchase-complete',
                    { tokenId, transactionHash }
                  ); // complete purchase
                  if (completed) {
                    setLoading(false);
                    setView(NFTDetailViews.successPayment);
                  }
                }
              }
            } else {
              setLoading(false);
              toast.error('Metamask is not connected');
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error.code === 4001) {
              toast.warn('Please connect to MetaMask.');
            } else {
              toast.error('Metamask: something went wrong.');
            }
          });
      }
    } else {
      toast.error('Metamask is not installed');
      setTimeout(() => {
        window.open('https://metamask.io/download/', '_blank');
      }, 2000);
    }
  };

  const priceInBNB = (nft.price / nft.collection?.network?.usdRate).toFixed(2);
  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>{renderMedia()}</div>
      <div className={styles.title}>{nft.name}</div>
      <div className={styles.price}>
        <div className={styles.priceItem}>
          <span className={styles.priceTitle}>Price in USD:</span>
          <span>$ {nft.price}</span>
        </div>
        <hr />
        <div className={styles.priceItem}>
          <span className={styles.priceTitle}>Price in BNB:</span>
          <span className={styles.binance}>
            <BinanceLogoSmall />
            BNB {priceInBNB ?? ''}
          </span>
        </div>
      </div>
      <div className={styles.action}>
        <Button
          loading={loading}
          disabled={loading}
          size={'m'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          onClick={() => _buyWithCrypto()}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
