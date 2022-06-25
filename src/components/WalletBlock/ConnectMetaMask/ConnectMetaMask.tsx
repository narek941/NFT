/* global JSX*/
import Button from '@shared/Button';
import ModalTitle from '@shared/ModalTitle';

import styles from './ConnectMetaMask.module.scss';

interface IConnectMetaMask {
  titleText: string;
  errorMsg?: string | null;
  address?: string | null;
  balance?: string | null;
  connectHandler: () => void;
}

export default function ConnectMetaMask({
  titleText,
  errorMsg,
  address,
  connectHandler,
  balance,
}: IConnectMetaMask): JSX.Element {
  const shortAddress = address
    ? `${address?.substring(0, 5)}...${address?.substring(address.length - 4)}`
    : '---';
  return (
    <div className={styles.general}>
      <ModalTitle text={titleText} />
      {errorMsg && <p className={styles.errorMsg}>{`${errorMsg}`}</p>}
      <div className={styles.addressContainer}>
        <p>{shortAddress}</p>
      </div>
      <div className={styles.balanceContainer}>
        <p>{`Balance: ${balance ? balance : '---'}`}</p>
      </div>
      <Button
        size='m'
        color={'blue'}
        fillStyle={false}
        fullWidth={false}
        onClick={connectHandler}
      >
        Connect
      </Button>
    </div>
  );
}
