import { useState } from 'react';
import { ethers } from 'ethers';
import { jsonParse } from '@utils/common';
import { getCookie } from '@utils/cookies';
import { metaMaskLinks } from '../../configure';
import { metamaskSendRequest } from '@entities/user/redux/actions';
import { useDispatch } from 'react-redux';
import { customBrowserDetect } from '@utils/customBrowserDetect';
import { toast } from 'react-toastify';

export const useMetamask = () => {
  const dispatch = useDispatch();

  const [activeAccount, setActiveAccount] = useState<string | null>(null);

  const getMetamaskBalance = async (
    address: string = getMetamaskAddress()
  ): Promise<number> => {
    return await window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })
      .then((res) => ethers.utils.formatEther(res))
      .then((res) => res);
  };

  const getMetamaskAddress = () => {
    if (getCookie('user')) {
      //to prevent -> Unexpected token u in JSON at position 0
      const user = jsonParse(getCookie('user') as string);
      return user != null ? user.address : null;
    }
  };

  const getMetamaskDownloadLink = (): string => {
    const browser = customBrowserDetect();
    const resArrayEl = metaMaskLinks.find((el) => el.browser === browser);
    if (resArrayEl) return resArrayEl.url;
    return 'https://metamask.io/download/';
  };

  const getMetamaskAccounts = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return provider
        .send('eth_requestAccounts', []) // get metamask address
        .then(async (accounts: string[]) => {
          setActiveAccount(accounts[0]);
          return accounts[0];
        })
        .catch((error) => {
          if (error.code === 4001) {
            toast.warn('Please connect to MetaMask.');
          } else {
            toast.error('Metamask: something went wrong.');
          }
        });
    } else {
      toast.error('Metamask is not installed');
      setTimeout(() => {
        window.open('https://metamask.io/download/', '_blank');
      }, 2000);
    }
  };

  const metamaskAccountChange = async (address: string) => {
    const metamaskRequest = await dispatch(metamaskSendRequest({ address }));
    setActiveAccount(address.toString());
    return metamaskRequest;
  };

  const metamaskInstalled = () => window.ethereum;

  return {
    getMetamaskBalance,
    getMetamaskAddress,
    getMetamaskDownloadLink,
    metamaskInstalled,
    getMetamaskAccounts,
    metamaskAccountChange,
  };
};
