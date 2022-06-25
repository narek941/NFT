/* global JSX*/
import ModalTitle from '@shared/ModalTitle';
import NavButton from '@shared/NavButton';

import styles from './NotInstalledMetaMask.module.scss';

interface INotInstalledMetaMask {
  titleText: string;
  url: string;
}

export default function NotInstalledMetaMask({
  titleText,
  url,
}: INotInstalledMetaMask): JSX.Element {
  return (
    <div className={styles.general}>
      <ModalTitle text={titleText} />
      <div className={styles.message}>
        <p>Seems you have no MetaMask Installed Yet...</p>
      </div>
      <div>
        <NavButton
          size='m'
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          to={url}
        >
          Install Now
        </NavButton>
      </div>
    </div>
  );
}
