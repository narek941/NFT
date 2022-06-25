import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ConnectMetaMask from './ConnectMetaMask';
import NotInstalledMetaMask from './NotInstalledMetaMask';
import NotSupportedBrowser from './NotSupportedBrowser';
import { customBrowserDetect } from 'src/common/utils/customBrowserDetect';
import { useGetAccBalance } from 'src/hooks/useGetAccBalance';
import { metaMaskLinks } from 'configure';
import { metamaskSendRequest } from '@entities/user/redux/actions';
import { useTypedSelector } from '@hooks/useNewTypedSelector';
import { getCookie } from '../../common/utils/cookies';
import { jsonParse } from '../../common/utils/common';

declare global {
  interface Window {
    ethereum: any;
  }
  interface Navigator {
    brave: {
      isBrave(): boolean;
    };
  }
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
  }
}

export default function WalletBlock() {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<string | null>(null);
  const [browserVer, setBrowserVer] = useState<string | null>(null);
  const [hasMetamask, setHasMetamask] = useState<boolean | null>(null);
  const [installMessage, setInstallMessage] = useState<string | null>(null);
  const [metaMaskLink, setMetaMaskLink] = useState<string>('');

  const [balance, getAccBalance] = useGetAccBalance();

  const user = useTypedSelector((state) => state.user);

  const linkPicker = (browser: string | null): string => {
    const resArrayEl = metaMaskLinks.find((el) => el.browser === browser);
    if (resArrayEl) return resArrayEl.url;
    return 'https://metamask.io/download/';
  };

  // useEffect(() => {
  //   if (user.user?.address) {
  //     const { address } = jsonParse(getCookie('user') as string);
  //     console.log(address);
  //     // address && accChangedHandler(address);
  //   }
  // }, [dispatch]);

  const connectHandler = (): void => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res: string[]) => {
          accChangedHandler(res[0]);
        });
    } else {
      setError('Metamask is not installed');
    }
  };

  const accChangedHandler = (address: string): void => {
    dispatch(metamaskSendRequest({ address }));
    setActiveAccount(address.toString());
    getAccBalance(address.toString());
  };

  //Check if MetaMask Installed
  useEffect(() => {
    if (window.ethereum) {
      setHasMetamask(true);
      return;
    }
    setHasMetamask(false);
  }, []);

  //Check on which browser website opened
  useEffect(() => {
    const browser = customBrowserDetect();
    return setBrowserVer(browser);
  }, []);

  //Choose an appropriate link to MetaMask depending on browser
  useEffect(() => setMetaMaskLink(linkPicker(browserVer)), [browserVer]);

  //Set a 'Install metamask' message for approprriate ver of browser
  useEffect(() => {
    if (hasMetamask) return;
    if (browserVer && browserVer !== 'unknown') {
      setInstallMessage(`Install metamask for ${browserVer}`);
    }
  }, [browserVer, hasMetamask]);

  //Force page reload in case user change account or network
  useEffect(() => {
    if (!window.ethereum) return;
    const chainChangedHandler = () => {
      window.location.reload();
    };
    window.ethereum.on('accountsChanged', accChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
  }, []);

  if (installMessage) {
    return (
      <NotInstalledMetaMask
        titleText='Connect to MetaMask:'
        url={metaMaskLink}
      />
    );
  }
  if (browserVer === 'unknown') return <NotSupportedBrowser />;
  return (
    <ConnectMetaMask
      titleText='Connect to MetaMask:'
      connectHandler={connectHandler}
      errorMsg={error}
      address={activeAccount}
      balance={balance}
    />
  );
}
