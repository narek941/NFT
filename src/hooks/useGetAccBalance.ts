import { useState } from 'react';
import { ethers } from 'ethers';

export const useGetAccBalance = (): [
  string | null,
  (address: string) => void
] => {
  const [balance, setBalance] = useState<string | null>(null);

  const getAccBalance = (address: string): void => {
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })
      .then((res: string) => setBalance(ethers.utils.formatEther(res)));
  };

  return [balance, getAccBalance];
};
