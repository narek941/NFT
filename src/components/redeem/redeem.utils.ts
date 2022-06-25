import { ethers } from 'ethers';
import { $apiWithToken } from '@services/index';
import { toast } from 'react-toastify';

export const handleRedeem = async (
  token,
  setLoading,
  getMetamaskAddress,
  onActivate,
  onRedeem,
  onConfirm?
) => {
  if (token.utilityStatus === 'REDEEMABLE' && token.claimed) {
    if (window.ethereum) {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum); // create provider for metamask

      const metamaskData = await $apiWithToken
        .get(`collections/nft-redeem/${token.id}`)
        .then(async (res) => {
          const { data, gas, to } = res.data;
          return { data, gas, to };
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
        const { data, gas, to } = metamaskData;
        provider
          .send('eth_requestAccounts', []) // get metamask address
          .then(async (accounts: string[]) => {
            // if metamask has connected
            if (accounts) {
              if (data && gas && to) {
                //if all data is available
                const transactionParameters = {
                  gas: ethers.utils.hexValue(Number(gas)),
                  to,
                  from: getMetamaskAddress(),
                  data,
                  value: ethers.utils.hexValue(Number(0)),
                }; // create transaction parameters

                await provider.send('eth_estimateGas', [transactionParameters]); // get gas estimate
                const transactionHash = await provider.send(
                  'eth_sendTransaction',
                  [transactionParameters]
                ); // send transaction
                if (transactionHash && token.id) {
                  // if transaction is successful
                  const completed = await $apiWithToken.post(
                    '/collections/nft-redeem-complete',
                    { tokenId: token.id, transactionHash }
                  ); // complete purchase
                  if (completed) {
                    toast.success('Redeem Successful');
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
  } else {
    if (token.utilityStatus == 'ACTIVATABLE') {
      onActivate(token);
    }
    if (token.utilityStatus == 'REDEEMABLE') {
      onRedeem(token);
    }
    onConfirm && onConfirm();
  }
};
