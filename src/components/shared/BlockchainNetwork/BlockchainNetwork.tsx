import React, { FC } from 'react';
import cn from 'classnames';

import BscIcon from 'public/blockchain-networks/bsc.svg';
import EthIcon from 'public/blockchain-networks/eth.svg';
import MaticIcon from 'public/blockchain-networks/matic.svg';

import styles from './BlockchainNetwork.module.scss';

export const BSC = 'BSC' as const;
export const ETH = 'ETH' as const;
export const MATIC = 'MATIC' as const;

export const blockchainNetworkIconConfig = {
  [BSC]: {
    className: styles['bsc-icon'],
    Icon: BscIcon,
  },
  [ETH]: {
    className: styles['eth-icon'],
    Icon: EthIcon,
  },
  [MATIC]: {
    className: styles['matic-icon'],
    Icon: MaticIcon,
  },
};

export interface INetwork {
  id: number;
  name: typeof BSC | typeof ETH | typeof MATIC;
  usdRate: string;
}

export interface IBlockchainNetworkProps {
  network?: INetwork;
}

const BlockchainNetwork: FC<IBlockchainNetworkProps> = ({ network }) => {
  const hasName = network && network.name;
  const name = hasName ? network.name : '';
  const icon = React.useMemo(() => {
    const iconConfig = blockchainNetworkIconConfig[name];
    if (!iconConfig) {
      console.warn(
        `Blockchain Network Icon with type: ${name} not implemented`
      );
      return null;
    }
    const { Icon, className } = iconConfig;
    return <Icon className={cn(styles.icon, className)} />;
  }, [name]);
  return (
    <div className={styles.wrapper}>
      <div>{icon}</div>
      <span className={styles.label}>{name}</span>
    </div>
  );
};

export default BlockchainNetwork;
